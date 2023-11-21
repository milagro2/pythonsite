import os

folder_path = "TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        # Check if the file starts with 'BusinessRule_ba_'
        if file_name.startswith('BusinessRule_ba_'):
            print(f"Processing file: {file_path}")
            print("Hello")
        else:
            print(f"Bad file: {file_path}")
