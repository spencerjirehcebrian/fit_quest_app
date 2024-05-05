import os
import sys

# Get the absolute path of the script
script_path = os.path.abspath(sys.argv[0])

# Get the directory path of the script
script_dir = os.path.dirname(script_path)

# Change the working directory to the script directory
os.chdir(script_dir)

for filename in os.listdir():
    if filename.endswith(".png"):
        new_filename = filename.replace(".png", "")
        new_filename = new_filename.replace(" ", "_")
        new_filename = new_filename.replace("[not_highlighted]", "nh")
        new_filename = new_filename.lower() + ".png"
        os.rename(filename, new_filename)