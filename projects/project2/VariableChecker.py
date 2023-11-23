import os
import sys
import json
import re

class JSONBlock:
    def __init__(self, name, value):
        self.name = name
        self.value = value

def parse_file_content(content):
    json_blocks = []
    current_block = None

    for line in content.splitlines():
        # Check if the line contains the start of a JSON block
        match = re.match(r'\s*\/\*===== (\w+) =====', line)
        if match:
            block_name = match.group(1)
            current_block = JSONBlock(name=block_name, value={})

        # Check if the line contains JSON data
        elif current_block and line.strip() and line.strip() != '*/':
            try:
                json_data = json.loads(line)
                current_block.value = json_data
            except json.JSONDecodeError:
                print(f"Error decoding JSON in block {current_block.name}")

        # Check if the line contains the end of a JSON block
        elif current_block and line.strip() == '*/':
            json_blocks.append(current_block)
            current_block = None

    return json_blocks

folder_path = "TestFiles"
file_list = os.listdir(folder_path)

good_files = []
bad_files = []
for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)
    if os.path.isfile(file_path) and file_name.startswith('BusinessRule_ba_'):
        good_files.append(file_path)

if good_files:
    print("These are correct:")
    for good_file in good_files:
        with open(good_file, 'r') as file:
            content = file.read()
            blocks = parse_file_content(content)
            for block in blocks:
                print(f"File: {good_file}, Block Name: {block.name}")
                print("Block Value:")
                print(json.dumps(block.value, indent=2))
                print("\n")
else:
    print("No correct filenames found.")

if bad_files:
    print("\nThese are bad:")
    for bad_file in bad_files:
        print(bad_file)
    print("\nError: We found files that violate the naming convention")
    sys.exit(1)
else:
    print("\nAll filenames are correct.")
