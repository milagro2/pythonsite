import os

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

                    if alias == value:
                        print("alias and value are correct")
                    else:
                        print("----------------alias or value is not correct----------------")

                for bind in alias_value_pairs:
                    contract = bind[0]
                    alias = bind[1]
                    value = bind[2]
                    
                    if contract == 'CurrentObjectBindContract':
                        if alias != 'node':
                            raise Exception(f'Not node in {file_name}')
                    
                    if contract == 'ManagerBindContract':
                        if alias != 'manager':
                            raise Exception(f'Not manager in {file_name}')
                    
                    if contract == 'BusinessActionBindContract':
                        if alias != value:
                            raise Exception(f'Not the same in {file_name}')

print("\nCheck complete.")
