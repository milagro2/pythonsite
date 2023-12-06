import os
import sys

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()
            alias_lines = [line.strip() for line in lines if 'value' in line]
            if alias_lines:
                print(f"\nLines with 'value' in {file_name}:")
                for alias_line in alias_lines:
                    print(alias_line)

print("\nCheck complete.")
