import json

class JSONBlock:
    def __init__(self, name, value):
        self.name = name
        self.value = value

def get_json_blocks(filepath):
    json_blocks_array = []

    try:
        with open(filepath, 'r') as file:
            content = file.read()
            # Split content by '{' to find potential JSON blocks
            json_parts = content.split('{')
            
            for part in json_parts[1:]:
                # Check if the part starts with 'business rule plugin definition'
                if 'business rule plugin definition' in part.lower():
                    json_block_str = '{' + part
                    try:
                        json_block = json.loads(json_block_str)
                        json_blocks_array.append(JSONBlock('business rule plugin definition', json_block))
                    except json.JSONDecodeError:
                        print(f"Error decoding JSON in file: {filepath}")
                # Add more conditions for other block names if needed
                
    except FileNotFoundError:
        print(f"File not found: {filepath}")

    return json_blocks_array
