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
        for line in file:
            json_start = line.find('{')
            json_end = line.find('}')

            while json_start != -1 and json_end != -1:
                json_str = line[json_start:json_end + 1]

                json_block = JSONBlock.from_string(json_str)

                if json_block:
                    json_blocks.append(json_block)

                line = line[json_end + 1:]
                json_start = line.find('{')
                json_end = line.find('}')

    return json_blocks

filepath = 'projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js'
result = get_json_blocks(filepath)

for json_block in result:
    print(f"Name: {json_block.name}")
    print(f"Value: {json.dumps(json_block.value, indent=2)}")
    print()
