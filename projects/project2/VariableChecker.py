import os


def get_json_blocks_from_folder(folder_path):
    json_blocks = []

    known_block_names = ["export metadata", "business rule definition", "business rule plugin definition"]

    # Iterate through files in the folder
    for filename in os.listdir(folder_path):
        filepath = os.path.join(folder_path, filename)

        if os.path.isfile(filepath):
            # Read the file and extract JSON blocks
            with open(filepath, 'r', encoding='utf-8') as file:
                file_content = file.read()

                pattern = re.compile(r'/\*={5} (\w+) ={5}\n(.*?)\n\*/', re.DOTALL)
                matches = pattern.findall(file_content)

                for match in matches:
                    block_name, block_string = match
                    if block_name.lower() in known_block_names:
                        json_block = from_string(block_name, block_string)
                        if json_block:
                            json_blocks.append(json_block)

    return json_blocks

# Example usage:
folder_path = 'TestFiles'
blocks = get_json_blocks_from_folder(folder_path)

# Now 'blocks' contains a list of JSONBlock objects
for block in blocks:
    print(f"Block Name: {block.name}")
    print("Block Value:", block.value)
    print()
