import os
import json

def extract_alias_value_pairs(lines):
    alias_value_pairs = []
    alias = None

    for line in lines:
        if 'alias' in line:
            alias = line.strip(' ,"').split(':')[1].strip()
        elif 'value' in line and alias:
            value = line.strip(' ,"').split(':')[1].strip()
            alias_value_pairs.append((alias, value))
            alias = None

    return alias_value_pairs

def check_bind_contracts(file_path, extracted_objects):
    issues = []

    for label, json_object in extracted_objects.items():
        if label == 'business rule plugin definition' and 'binds' in json_object:
            for bind in json_object['binds']:
                contract = bind.get('contract', '')
                alias = bind.get('alias', '')
                value = bind.get('value', '')

                if contract == 'AttributeBindContract':
                    if alias != value:
                        issues.append({
                            'file_name': file_path,
                            'bind_alias': alias,
                            'bind_issue': 'Alias is not the same as value'
                        })

                elif contract == 'CurrentObjectBindContract':
                    if alias != 'node':
                        issues.append({
                            'file_name': file_path,
                            'bind_alias': alias,
                            'bind_issue': 'Alias is not "node" for CurrentObjectBindContract'
                        })

                elif contract == 'ManagerBindContract':
                    if alias != 'manager':
                        issues.append({
                            'file_name': file_path,
                            'bind_alias': alias,
                            'bind_issue': 'Alias is not "manager" for ManagerBindContract'
                        })

    return issues

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            alias_value_pairs = extract_alias_value_pairs(lines)

            if alias_value_pairs:
                print(f"\nAlias-Value pairs in {file_name}:")

                for alias, value in alias_value_pairs:
                    print(f'alias: {alias}, value: {value}', end=' ')

                    if alias == value:
                        print("alias is the same as value")
                    else:
                        print("----------------alias is not the same as value----------------")

                extracted_objects = extract_json_objects(file_path)
                bind_issues = check_bind_contracts(file_path, extracted_objects)

                if bind_issues:
                    print("\nBind Issues:")
                    for issue in bind_issues:
                        print(f"File: {issue['file_name']}, Bind Alias: {issue['bind_alias']}, Issue: {issue['bind_issue']}")

print("\nCheck complete.")
