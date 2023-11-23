import json

class JSONBlock:
    def __init__(self, name, value):
        self.name = name
        self.value = value

    @classmethod
    def from_string(cls, json_str):
        try:
            json_obj = json.loads(json_str)
            name = cls.get_block_name(json_obj)
            return cls(name, json_obj)
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
            return None

    @staticmethod
    def get_block_name(json_obj):
        if "businessRule" in json_obj:
            return "business_rule"
        elif "exportMetadata" in json_obj:
            return "export_metadata"
        elif "businessRuleDefinition" in json_obj:
            return "business_rule_definition"
        else:
            return "unknown"

def get_json_blocks(filepath):
    json_blocks = []

    with open(filepath, 'r') as file:
        file_content = file.read()

        while True:
            json_start = file_content.find('{')
            json_end = file_content.find('}')

            if json_start != -1 and json_end != -1:
                json_str = file_content[json_start:json_end + 1]

                json_block = JSONBlock.from_string(json_str)

                if json_block:
                    json_blocks.append(json_block)

                file_content = file_content[json_end + 1:]
            else:
                break

    return json_blocks

filepath = 'projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js'
result = get_json_blocks(filepath)

for json_block in result:
    print(f"Name: {json_block.name}")
    print(f"Value: {json_block.value}")
    print()
