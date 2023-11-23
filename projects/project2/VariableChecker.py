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
            # Handle JSON parsing error
            return None

def get_json_blocks(filepath):
    json_blocks = []
    with open(filepath, 'r') as file:
        content = file.read()

        # Define known block names
        known_block_names = ["export metadata", "business rule plugin definition", "business rule definition"]

        # Find JSON blocks within comments
        json_objects = re.findall(r'/\*.*?\*/', content, flags=re.DOTALL)

        # Parse JSON blocks
        for obj_string in json_objects:
            # Extract the content within the comment delimiters
            json_block_content = re.search(r'{.*?}', obj_string, flags=re.DOTALL)
            if json_block_content:
                json_block = JSONBlock.from_string(json_block_content.group())
                if json_block and json_block.name.lower() in known_block_names:
                    json_blocks.append(json_block)

    return json_blocks

file_path = 'projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js' 
blocks = get_json_blocks(file_path)

for block in blocks:
    print(f"Name: {block.name}")
    print("Value:", json.dumps(block.value, indent=2))
    print()
