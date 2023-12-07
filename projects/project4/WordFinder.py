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

            contract = 'ManagerBindContract'
            
            alias_value_pairs = extract_alias_value_pairs(lines, contract)

            if alias_value_pairs:
                print(f"\nAlias-Value pairs in {file_name}:")
                for alias, value in alias_value_pairs:
                    print(f'alias: {alias}, value: {value}', end=' ')
                    if alias == value:
                        print("alias and value are correct", end=' ')

                        if contract == 'CurrentObjectBindContract' and alias == 'node' and value == 'null':
                            print("Special case: node and null")
                        elif contract == 'ManagerBindContract' and alias == 'manager' and value == 'null':
                            print("Special case: manager and null")
                    else:
                        print("----------------alias or value is not correct----------------")

print("\nCheck complete.")
