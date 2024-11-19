## Virtual Environment for Python Development

It is a good practice to create a virtual environment for each project in Python to maintain the project dependencies isolated from the system. This way, you can avoid conflicts between different projects that use different versions of the same package.

#### Steps to create a virtual environment:

1. Move into the project directory where you want to create a virtual environment.

   ```bash
   cd <project_directory>
   ```

2. Run the following command to create a virtual environment:

   ```bash
   # python -m venv <name_of_virtual_environment>
   python3 -m venv venv
   ```

3. Activate the virtual environment:

   ```bash
   ./venv/Scripts/activate # enters the virtual environment
   ```

4. To deactivate the virtual environment, run:

   ```bash
    deactivate
   ```
