import os

def extract_alias_value_contract_triplets(lines):
    triplets = []
    alias = None
    value = None
    contract = None

    for line in lines:
        if 'alias' in line:
            alias = line.strip(' ,"').split(':')[1].strip()
        elif 'value' in line and alias:
            value = line.strip(' ,"').split(':')[1].strip()
        elif 'contract' in line:
            contract = line.strip(' ,"').split(':')[1].strip()

        if alias and value and contract:
            triplets.append((alias, value, contract))
            alias = None
            value = None
            contract = None

    return triplets

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            triplets = extract_alias_value_contract_triplets(lines)

            if triplets:
                print(f"\nTriplets in {file_name}:")

                for alias, value, contract in triplets:
                    if contract == 'ManagerBindContract':
                        print("I'm the manager!")
                    else:
                        print(f'alias: {alias}, value: {value}, contract: {contract}')

print("\nCheck complete.")
