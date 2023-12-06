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
            value_found = False

            for line in lines:
                if 'alias' in line:
                    current_object = line.strip()
                    value_found = False
                elif 'value' in line and not value_found:
                    current_object += ' ' + line.strip()
                    alias_and_value_lines.append(current_object)
                    value_found = True

            if alias_and_value_lines:
                print(f"\nLines with 'alias' followed by 'value' in {file_name}:")
                for line in alias_and_value_lines:
                    print(line)

print("\nCheck complete.")
