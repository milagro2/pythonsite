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
            if alias_lines:
                print(f"\nLines with 'alias' followed by 'value' in {file_name}:")
                for alias_line, value_line in zip(alias_lines, value_lines):
                    alias_value_pair = f"{alias_line}, {value_line}"

                    alias = alias_line.split('"')[3]
                    value = value_line.split('"')[3]

                    print(alias_value_pair)

                    if alias == value:
                        print("Alias is the same as value")
                    else:
                        print("Alias is not the same as value")

print("\nCheck complete.")
