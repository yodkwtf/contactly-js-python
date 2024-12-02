from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# create the Flask app
app = Flask(__name__)
CORS(app)

# configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///contact.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# serve client
client_dir = os.path.join(os.getcwd(), "..", "client", "dist")


@app.route("/", defaults={"filename": ""})
@app.route("/<path:filename>")
def index(filename):
    if not filename:
        filename = "index.html"
    return send_from_directory(client_dir, filename)


# import routes
import routes

# create the database
with app.app_context():
    db.create_all()

# run the server
if __name__ == "__main__":
    app.run(debug=True)
