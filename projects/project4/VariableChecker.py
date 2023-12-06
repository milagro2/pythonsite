import os
import re
import json

def extract_json_objects(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    patterns = [
        r'/\*===== export metadata =====\s*({.*?})\s*\*/',
        r'/\*===== business rule definition =====\s*({.*?})\s*\*/',
        r'/\*===== business rule plugin definition =====\s*({.*?})\s*\*/'
    ]

    extracted_objects = {}

    for pattern in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            object_label = re.search(r'===== (.*?) =====', pattern).group(1)
            object_json = match.group(1)
            extracted_objects[object_label] = json.loads(object_json)

    return extracted_objects

def check_alias_value_relationship(file_name, json_object):
    issues = []

    for bind in json_object.get('binds', []):
        if bind['contract'] == 'CurrentObjectBindContract' and bind['alias'] != 'node' and bind['value'] is not None:
            if bind['alias'] != bind['value']:
                issue = {
                    'file_name': file_name,
                    'bind_alias': bind['alias'],
                    'bind_issue': 'Bind does not match value'
                }
                issues.append(issue)

        if bind['contract'] == 'ManagerBindContract' and bind['alias'] != 'manager' and bind['value'] is not None:
            if bind['alias'] != bind['value']:
                issue = {
                    'file_name': file_name,
                    'bind_alias': bind['alias'],
                    'bind_issue': 'Bind does not match value'
                }
                issues.append(issue)

        if bind['contract'] == 'BusinessActionBindContract' and bind['alias'] != bind['value']:
            issue = {
                'file_name': file_name,
                'bind_alias': bind['alias'],
                'bind_issue': 'Bind does not match value'
            }
            issues.append(issue)

    return issues

def process_files(folder_path):
    file_list = os.listdir(folder_path)

    all_issues = []

    for file_name in file_list:
        file_path = os.path.join(folder_path, file_name)

        if os.path.isfile(file_path):
            extracted_objects = extract_json_objects(file_path)

            for label, json_object in extracted_objects.items():
                if label == 'business rule plugin definition':
                    issues = check_alias_value_relationship(file_name, json_object)
                    all_issues.extend(issues)

    return all_issues

# Replace 'folder_path' with the actual path to your folder
folder_path = "projects/project4/TestFiles"
all_issues = process_files(folder_path)

if all_issues:
    print("\nIssues found:")
    for issue in all_issues:
        print(f"File: {issue['file_name']}, Bind Alias: {issue['bind_alias']}, Issue: {issue['bind_issue']}")
else:
    print("\nNo issues found.")

print("\nCheck complete.")
