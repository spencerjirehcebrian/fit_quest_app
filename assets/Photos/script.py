import os
import sys

# Get the absolute path of the script
script_path = os.path.abspath(sys.argv[0])

# Get the directory path of the script
script_dir = os.path.dirname(script_path)

# Change the working directory to the script directory
os.chdir(script_dir)

for filename in os.listdir():
    if filename.endswith(".jpg"):
        new_filename = filename.replace(".jpg", "")
        new_filename = new_filename.replace(" ", "_")
        new_filename = new_filename.replace("[not_highlighted]", "nh")
        new_filename = new_filename.lower() + ".jpg"
        os.rename(filename, new_filename)