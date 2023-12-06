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

def check_bind_contract(file_name, binds):
    issues = []

    for bind in binds:
        if bind['contract'] == 'AttributeBindContract':
            if bind['alias'] != bind['value']:
                issues.append({
                    'file_name': file_name,
                    'bind_alias': bind['alias'],
                    'bind_issue': 'Bind does not match value'
                })

        elif bind['contract'] == 'CurrentObjectBindContract':
            if bind['alias'] != 'node':
                issues.append({
                    'file_name': file_name,
                    'bind_alias': bind['alias'],
                    'bind_issue': 'CurrentObjectBindContract alias should be "node"'
                })

        elif bind['contract'] == 'ManagerBindContract':
            if bind['alias'] != 'manager':
                issues.append({
                    'file_name': file_name,
                    'bind_alias': bind['alias'],
                    'bind_issue': 'ManagerBindContract alias should be "manager"'
                })

    return issues

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            content = file.read()
            json_objects = json.loads(content)

            alias_value_pairs = extract_alias_value_pairs(content)

            if alias_value_pairs:
                print(f"\nAlias-Value pairs in {file_name}:")

                binds_list = []
                for _, json_object in alias_value_pairs.items():
                    if 'binds' in json_object:
                        binds_list.extend(json_object['binds'])

                issues = check_bind_contract(file_name, binds_list)


                if issues:
                    print("Bind Issues:")
                    for issue in issues:
                        print(f"File: {issue['file_name']}, Alias: {issue['bind_alias']}, Issue: {issue['bind_issue']}")
                else:
                    print("No bind issues found")

print("\nCheck complete.")
