import os

def extract_alias_value_pairs(lines):
    alias_value_pairs = []
    alias = None
    contract = None

    for line in lines:
        line = line.replace('"', '')
        parts = line.split(':')
        if 'alias' in parts[0]:
            alias = parts[1].strip().strip(', ')
        elif 'value' in parts[0] and alias:
            value = parts[1].strip().strip(', ')
            alias_value_pairs.append((alias, value, contract))
            alias = None
        elif 'contract' in parts[0]:
            contract = parts[1].strip().strip(', ')

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
                print(f"\nAlias and Value in {file_name}:")

                for alias, value, contract in alias_value_pairs:
                    print(f'alias: {alias} -  value: {value} -  contract: {contract} - ', end=' ')

                    if contract == 'CurrentObjectBindContract':
                        print("Special case: alias and value are correct (:")
                    else:
                        print("Special case: alias is not node")
                        
                    elif contract == 'ManagerBindContract':
                        if alias == 'manager':
                            print("Special case: I'm the manager (;")
                        else:
                            print("Special case: I'm not the manager ^.^")
                    else:
                        if alias == value:
                            print("alias and value are correct (:")
                        else:
                            print("----------------alias or value is not correct----------------")

print("\nCheck complete.")
