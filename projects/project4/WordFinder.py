import os

def extract_alias_value_pairs(lines):
    alias_value_pairs = []
    alias = None

    contract_types = {
        'ManagerBindContract': {'alias': 'manager', 'value': 'null'},
        'CurrentObjectBindContract': {'alias': 'node', 'value': 'null'},
        'AttributeBindContract': {'alias': '', 'value': ''}
    }

    current_contract = None

    for line in lines:
        if 'contract' in line:
            current_contract = line.strip(' ,"').split(':')[1].strip()

        if 'alias' in line and current_contract in contract_types:
            alias = line.strip(' ,"').split(':')[1].strip()
        elif 'value' in line and alias is not None and current_contract in contract_types:
            value = line.strip(' ,"').split(':')[1].strip()
            alias_value_pairs.append((current_contract, alias, value))
            alias = None

    return alias_value_pairs

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            alias_value_pairs = extract_alias_value_pairs(lines)

            if alias_value_pairs:
                print(f"\nAlias-Value pairs in {file_name}:")

                for contract, alias, value in alias_value_pairs:
                    print(f'Contract: {contract}, alias: {alias}, value: {value}', end=' ')

                    if alias == value:
                        print("alias is the same as value")
                    else:
                        print("----------------alias is not the same as value----------------")

print("\nCheck complete.")
