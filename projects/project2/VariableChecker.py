import os
import json

def read_json_from_folder(folder_path):
    json_objects = []

    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)

        if os.path.isfile(file_path):
            with open(file_path, 'r') as file:
                file_content = file.read()

                json_start = file_content.find('{')
                json_end = file_content.rfind('}') + 1

                if json_start != -1 and json_end != -1:
                    json_str = file_content[json_start:json_end]

                    try:
                        json_object = json.loads(json_str)
                        json_objects.append(json_object)
                    except json.JSONDecodeError as e:
                        print(f"Error decoding JSON in {filename}: {e}")

    return json_objects

folder_path = 'TestFiles'
result = read_json_from_folder(folder_path)
print(result)
