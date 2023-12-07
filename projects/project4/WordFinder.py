import os

def extract_alias_value_pairs(lines, contract):
    alias_value_pairs = []
    alias = None
    for line in lines:
        if 'alias' in line:
            alias = line.strip(' ,"').split(':')[1].strip()
        elif 'value' in line and alias:
            value = line.strip(' ,"').split(':')[1].strip()
            alias_value_pairs.append((alias, value))
            alias = None
    return alias_value_pairs

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            # Set the contracts based on your requirement
            current_object_contract = 'CurrentObjectBindContract'
            manager_contract = 'ManagerBindContract'

            alias_value_pairs_current = extract_alias_value_pairs(lines, current_object_contract)
            alias_value_pairs_manager = extract_alias_value_pairs(lines, manager_contract)

            if alias_value_pairs_current or alias_value_pairs_manager:
                print(f"\nAlias-Value pairs in {file_name}:")

                for alias, value in alias_value_pairs_current:
                    print(f'alias: {alias}, value: {value}', end=' ')
                    if alias == value:
                        print("alias and value are correct")
                    else:
                        print("----------------alias or value is not correct----------------")

                for alias, value in alias_value_pairs_manager:
                    print(f'alias: {alias}, value: {value}', end=' ')
                    if alias == value:
                        print("Maaaa case: alias and value are correct")
                    else:
                        print("Maaaa case: ----------------alias or value is not correct----------------")

                # Check for specific contracts and print corresponding messages
                if current_object_contract in file_name:
                    print("Special case: node and null")
                elif manager_contract in file_name:
                    print("Special case: manager and null")

print("\nCheck complete.")
