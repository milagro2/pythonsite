import json
import re

class JSONBlock:
    def __init__(self, name, value):
        self.name = name
        self.value = value

    @classmethod
    def from_string(cls, block_string):
        try:
            block_dict = json.loads(block_string)
            name = block_dict.get('name', '')
            value = block_dict
            return cls(name, value)
        except json.JSONDecodeError:
            return None

def get_json_blocks(filepath):
    json_blocks = []
    with open(filepath, 'r') as file:
        content = file.read()

        known_block_names = ["export metadata", "business rule plugin definition", "business rule definition"]

        json_objects = re.findall(r'\{.*?\}', content)

        for obj_string in json_objects:
            json_block = JSONBlock.from_string(obj_string)
            if json_block and json_block.name.lower() in known_block_names:
                json_blocks.append(json_block)

    return json_blocks

file_path = 'projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js' 
blocks = get_json_blocks(file_path)

for block in blocks:
    print(f"Name: {block.name}")
    print("Value:", json.dumps(block.value, indent=2))
    print()
