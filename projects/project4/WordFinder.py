import os

def extract_alias_value_contract_triplets(lines):
    alias_value_contract_triplets = []
    alias = None
    value = None
    contract = None

    for line in lines:
        if 'alias' in line:
            alias = line.strip(' ,"').split(':')[1].strip()
        elif 'value' in line and alias:
            value = line.strip(' ,"').split(':')[1].strip()
        elif 'contract' in line and alias and value:
            contract = line.strip(' ,"').split(':')[1].strip()

            alias_value_contract_triplets.append((alias, value, contract))
            alias = None
            value = None
            contract = None

    return alias_value_contract_triplets

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            alias_value_contract_triplets = extract_alias_value_contract_triplets(lines)

            if alias_value_contract_triplets:
                print(f"\nAlias-Value-Contract triplets in {file_name}:")

                for alias, value, contract in alias_value_contract_triplets:
                    print(f'alias: {alias}, value: {value}, contract: {contract}', end=' ')

                    if alias == value:
                        print("alias and value are correct")
                    else:
                        print("----------------alias or value is not correct----------------")

                    if contract == 'CurrentObjectBindContract':
                        print("Special case: node and null")
                    elif contract == 'ManagerBindContract':
                        print("Special case: manager and null")

print("\nCheck complete.")
