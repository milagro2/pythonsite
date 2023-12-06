import os
import sys

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()
            alias_lines = [line.strip() for line in lines if 'alias' in line]
            value_lines = [line.strip() for line in lines if 'value' in line]
            
            print(f"\nChecking aliases and values in {file_name}:")
            
            for i in range(len(alias_lines)):
                alias_line = alias_lines[i]
                value_line = value_lines[i] if i < len(value_lines) else None
                
                print(f'"{alias_line}", "{value_line}"')
                
                alias_value = alias_line.split('"value"')[0].strip()
                value_value = value_line.split('"value"')[1].strip() if value_line else None
                
                if alias_value == value_value:
                    print('Alias is the same as value')
                else:
                    print('Alias is not the same as value')

print("\nCheck complete.")
