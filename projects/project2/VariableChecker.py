import os
import json

class JSONBlock:
    def __init__(self, name, value):
        self.name = name
        self.value = value

def parse_json_blocks(content):
    json_blocks = []
    current_block = None

    for line in content.splitlines():
        if line.strip().startswith("/*===== ") and line.strip().endswith(" =====*/"):
            # New JSON block
            if current_block is not None:
                json_blocks.append(current_block)

            name = line.strip()[8:-9]
            current_block = JSONBlock(name, {})
        elif current_block is not None:
            try:
                data = json.loads(line)
                current_block.value.update(data)
            except json.JSONDecodeError:
                pass  # Ignore lines that are not valid JSON

    if current_block is not None:
        json_blocks.append(current_block)

    return json_blocks

def get_json_blocks(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    return parse_json_blocks(content)

folder_path = os.path.join(os.path.dirname(__file__), "TestFiles")
file_list = os.listdir(folder_path)

json_blocks_array = []

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)
    if os.path.isfile(file_path):
        json_blocks_array.extend(get_json_blocks(file_path))

# Now json_blocks_array contains an array of JSONBlock objects
for block in json_blocks_array:
    print("Name:", block.name)
    print("Value:", block.value)
    print()
