import os

folder_path = "projects/project4/TestFiles"
file_list = os.listdir(folder_path)

for file_name in file_list:
    file_path = os.path.join(folder_path, file_name)

    if os.path.isfile(file_path):
        with open(file_path, 'r') as file:
            lines = file.readlines()

            alias_and_value_lines = []
            current_object = ""

            for line in lines:
                if 'alias' in line or 'value' in line:
                    current_object += line.strip() + ' '
                
                # Check if both 'alias' and 'value' are present in the current object
                if 'alias' in current_object and 'value' in current_object:
                    alias_and_value_lines.append(current_object)
                    current_object = ""

            if alias_and_value_lines:
                print(f"\nLines with 'alias' and 'value' in {file_name}:")
                for line in alias_and_value_lines:
                    print(line)

print("\nCheck complete.")
