import os
import sys

folder_path = "projects/project2/TestFiles"
file_list = os.listdir(folder_path)

good_files = []
bad_files = []

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        if file_name.startswith('BusinessRule_ba_'):
            good_files.append(file_path)
            with open(file_path, 'r') as file:
                lines = file.readlines()
                alias_lines = [line.strip() for line in lines if 'alias' in line]
                if alias_lines:
                    print(f"\nLines with 'alias' in {file_name}:")
                    for alias_line in alias_lines:
                        print(alias_line)
        else:
            bad_files.append(file_path)

if good_files:
    print("\nThese are correct:")
    for good_file in good_files:
        print(good_file)
else:
    print("No correct filenames found.")

if bad_files:
    print("\nThese are bad:")
    for bad_file in bad_files:
        print(bad_file)
    print("\nError: We found files that violate the naming convention")
    sys.exit(1)
else:
    print("\nAll filenames are correct.")
