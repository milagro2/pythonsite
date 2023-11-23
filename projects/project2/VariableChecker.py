import re
import json

class JSONBlock:
    def __init__(self, value):
        self.value = value

    @classmethod
    def from_string(cls, string):
        try:
            json_data = json.loads(string)
            return cls(value=json_data)
        except json.JSONDecodeError:
            # Handle the case where the block is not valid JSON
            return None

def get_json_blocks(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()

    # Use a regular expression to find JSON blocks within comment delimiters
    json_blocks = re.findall(r'/\*={4}\s*([\s\S]*?)\*/', content)

    # Create JSONBlock objects from the matched blocks
    blocks = []
    for block in json_blocks:
        json_block = JSONBlock.from_string(block)
        if json_block:
            blocks.append(json_block)

    return blocks

if __name__ == "__main__":
    filepath = "projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js"
    json_blocks = get_json_blocks(filepath)

    # Log JSON blocks
    for index, block in enumerate(json_blocks):
        print(f"JSON Block {index + 1}:")
        print(f"Value: {block.value}")
        print("\n")
