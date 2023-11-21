import os
import sys

folder_path = "TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):

        if file_name.startswith('BusinessRule_ba_'):
            print(f"Good filename: {file_path}")
        else:
            print(f"Bad filename: {file_path}")
            print("The filename should start with 'BusinessRule_ba_'")
            sys.exit(1)
