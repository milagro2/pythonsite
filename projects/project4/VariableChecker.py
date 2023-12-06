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

def check_alias_value_relationship(alias, value):
    # Check for exceptions
    if alias == 'node' and value is None:
        return True
    elif alias == 'manager' and value is None:
        return True

    # Check if alias is not the same as value
    return alias != value

def process_files(folder_path):
    file_list = os.listdir(folder_path)

    for file_name in file_list:
        file_path = os.path.join(folder_path, file_name)

        if os.path.isfile(file_path):
            extracted_objects = extract_json_objects(file_path)

            print(f"\n--------------- these are all the JSON objects from {file_name} where alias and value are not the same ---------------")

            for label, json_object in extracted_objects.items():
                alias = json_object.get('alias')
                value = json_object.get('value')

                # Check alias-value relationship
                if check_alias_value_relationship(alias, value):
                    print(f"\n{label}:\n{json.dumps(json_object, indent=2)}")

folder_path = "projects/project4/TestFiles"
process_files(folder_path)

print("\nCheck complete.")
