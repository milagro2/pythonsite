import re
import json

def extract_json_objects(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Define patterns for extracting JSON objects within comments
    patterns = [
        r'/\*===== export metadata =====\s*({.*?})\s*\*/',
        r'/\*===== business rule definition =====\s*({.*?})\s*\*/',
        r'/\*===== business rule plugin definition =====\s*({.*?})\s*\*/'
    ]

    extracted_objects = {}

    # Extract JSON objects using regular expressions
    for pattern in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            object_label = re.search(r'===== (.*?) =====', pattern).group(1)
            object_json = match.group(1)
            extracted_objects[object_label] = json.loads(object_json)

    return extracted_objects

# Replace 'file_path' with the actual path to your file
file_path = 'projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js'
result = extract_json_objects(file_path)

# Print the extracted JSON objects
for label, json_object in result.items():
    print(f"\n{label}:\n{json.dumps(json_object, indent=2)}")
