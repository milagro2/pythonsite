import os

def extract_alias_value_pairs(lines):
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

            alias_value_pairs = extract_alias_value_pairs(lines)

            if alias_value_pairs:
                print(f"\nAlias-Value pairs in {file_name}:")

                for alias, value in alias_value_pairs:
                    print(f'alias: {alias}, value: {value}', end=' ')

                    if 'CurrentObjectBindContract' in lines:
                        if alias == 'node':
                            print("alias and value are correct")
                        else:
                            print("----------------alias or value is not correct----------------")
                    elif 'ManagerBindContract' in lines:
                        if alias == 'manager':
                            print("alias and value are correct")
                        else:
                            print("----------------alias or value is not correct----------------")
                    elif alias != value:
                        print("alias and value are correct")
                    else:
                        print("----------------alias or value is not correct----------------")

print("\nCheck complete.")
