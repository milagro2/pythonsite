import json

def read_json_objects_from_file(file_path):
    try:
        with open(file_path, 'r') as file:
            content = file.read()

        # Parse JSON-formatted content into a list of dictionaries
        json_objects = json.loads(content)
        return json_objects
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

file_path = 'projects/project2/TestFiles/BusinessRule_ba_InitiateInUpdateWFTIMS.js'
result = read_json_objects_from_file(file_path)

if result is not None:
    for obj in result:
        print(obj)
