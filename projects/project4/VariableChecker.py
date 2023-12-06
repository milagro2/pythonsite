import os
import re
import json

def process_files(folder_path):
    file_list = os.listdir(folder_path)

    issues = []

    for file_name in file_list:
        file_path = os.path.join(folder_path, file_name)

        if os.path.isfile(file_path):
            extracted_objects = extract_json_objects(file_path)

            for label, json_object in extracted_objects.items():
                if label == 'business rule plugin definition':
                    issues += check_plugin_definition(json_object, file_name)

    return issues

def check_plugin_definition(json_object, file_name):
    issues = []

    for bind in json_object.get('binds', []):
        if bind.get('contract') == 'CurrentObjectBindContract':
            if bind.get('alias') != 'node' and bind.get('value') is not None:
                issues.append({
                    'file_name': file_name,
                    'bind_alias': bind.get('alias'),
                    'bind_issue': 'Not node'
                })
            
        elif bind.get('contract') == 'ManagerBindContract':
            if bind.get('alias') != 'manager' and bind.get('value') is not None:
                issues.append({
                    'file_name': file_name,
                    'bind_alias': bind.get('alias'),
                    'bind_issue': 'Manager bind is not named manager'
                })

        elif bind.get('contract') == 'BusinessActionBindContract':
            if bind.get('alias') != bind.get('value'):
                issues.append({
                    'file_name': file_name,
                    'bind_alias': bind.get('alias'),
                    'bind_issue': 'Bind does not match value'
                })

    return issues

folder_path = "projects/project4/TestFiles"
resulting_issues = process_files(folder_path)

if resulting_issues:
    print("\nIssues found:")
    for issue in resulting_issues:
        print(f"\nFile: {issue['file_name']}")
        print(f"Bind Alias: {issue['bind_alias']}")
        print(f"Issue: {issue['bind_issue']}")
else:
    print("\nNo issues found.")

print("\nCheck complete.")
