import os
import sys

def extract_alias_value_pairs(lines):
    alias_value_pairs = []
    alias = None
    contract = None

    for line in lines:
        line = line.replace('"', '')
        parts = line.split(':')
        if 'alias' in parts[0] and len(parts) > 1:
            alias = parts[1].strip().strip(', ')
        elif 'value' in parts[0] and alias and len(parts) > 1:
            value = parts[1].strip().strip(', ')
            alias_value_pairs.append((alias, value, contract))
            alias = None
        elif 'contract' in parts[0] and len(parts) > 1:
            contract = parts[1].strip().strip(', ')

    return alias_value_pairs

def print_error(message):
    print(f"\033[91m{message}\033[0m")

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

error_found = False

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            alias_value_pairs = extract_alias_value_pairs(lines)

            if alias_value_pairs:
                print(f"\n- - - - - Alias and Value in {file_name}: - - - - -")

                for alias, value, contract in alias_value_pairs:
                    print(f'alias: {alias} -  value: {value} -  contract: {contract} - ', end=' ')

                    if contract == 'CurrentObjectBindContract':
                        if alias == 'node':
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias should be 'node' <|<|<|")
                            error_found = True
                            
                    elif contract == 'NodeBindContract':
                        if alias == 'node':
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias should be 'node' <|<|<|")
                            error_found = True
                        
                    elif contract == 'ManagerBindContract':
                        if alias == 'manager':
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias should be 'manager' <|<|<|")
                            error_found = True
                            
                    elif contract == 'LoggerBindContract':
                        if alias == 'logger':
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias should be 'logger' <|<|<|")
                            error_found = True
                    
                    elif contract == 'WebUiContextBind':
                        if alias == 'webUI':
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias should be 'webUI' <|<|<|")
                            error_found = True
                            
                    elif contract == 'CurrentWorkflowBindContract ':
                        if alias == 'workflow':
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias should be 'workflow' <|<|<|")
                            error_found = True
                    
                    elif contract == 'BusinessFunctionBindContract':
                        if alias in value:
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias and value are not the same <|<|<|")
                            error_found = True

                    else:
                        if alias == value:
                            print("alias and value are correct (:")
                        else:
                            print_error("|>|>|> Error: alias and value are not the same <|<|<|")
                            error_found = True

if error_found:
    sys.exit(1)

print("\nCheck complete.")
