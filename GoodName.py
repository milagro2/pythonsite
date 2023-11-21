import os
import sys

folder_path = "TestFiles"
file_list = os.listdir(folder_path)

bad_files = set()

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        if not file_name.startswith('BusinessRule_ba_'):
            print(f"Bad file: {file_path}")
            bad_files.append(file_path)
            
if bad_files:
    print("Filenames without 'BusinessRule_ba_':")
    for bad_file in bad_files:
        print(bad_file)
    sys.exit(1) 
else:
    print("All files have the expected prefix. Processing complete.")
