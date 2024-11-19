## Virtual Environment for Python Development

It is a good practice to create a virtual environment for each project in Python to maintain the project dependencies isolated from the system. This way, you can avoid conflicts between different projects that use different versions of the same package.

#### Create a virtual environment:

Move into the project directory where you want to create a virtual environment.

```bash
cd <project_directory>
```

Run the following command to create a virtual environment:

```bash
# python -m venv <name_of_virtual_environment>
python3 -m venv venv
```

#### Activate or Deactivate the virtual environment:

Activate the virtual environment:

```bash
./venv/Scripts/activate # enters the virtual environment
```

To deactivate the virtual environment, run:

```bash
 deactivate
```

#### Running Flask App via Virtual Environment:

Set variable to run the virtual environment in the project directory:

```bash
# Windows
set FLASK_APP=app.py
set FLASK_ENV=development

# Linux or MacOS
export FLASK_APP=app.py
export FLASK_ENV=development
```

Run the Flask app:

```bash
flask run
```
