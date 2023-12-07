import os
import xml.etree.ElementTree as ET

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
            contract = parts[2].strip().strip(', ')
            alias_value_pairs.append((alias, value, contract))
            alias = None

    return alias_value_pairs

def extract_business_function(xml_content):
    try:
        root = ET.fromstring(xml_content)
        business_function = root.find('.//BusinessFunction').text
        return business_function
    except ET.ParseError:
        return None

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

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
                            print("|>|>|> alias should be 'node' <|<|<|")

                    elif contract == 'ManagerBindContract':
                        if alias == 'manager':
                            print("alias and value are correct (:")
                        else:
                            print("|>|>|> alias should be 'manager' <|<|<|")

                    elif contract == 'LoggerBindContract':
                        if alias == 'logger':
                            print("alias and value are correct (:")
                        else:
                            print("|>|>|> alias should be 'log' <|<|<|")

                    elif contract == 'BusinessFunctionBindContract':
                        business_function = extract_business_function(value)
                        if business_function and alias == business_function:
                            print("alias and value are correct (:")
                        else:
                            print("|>|>|> alias and value are not the same <|<|<|")

                    else:
                        if alias == value:
                            print("alias and value are correct (:")
                        else:
                            print("|>|>|> alias and value are not the same <|<|<|")

print("\nCheck complete.")
