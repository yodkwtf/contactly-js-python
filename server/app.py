from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# create the Flask app
app = Flask(__name__)
CORS(app)

# configure the database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///contact.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# import routes
import routes

# create the database
with app.app_context():
    db.create_all()

# run the server
if __name__ == "__main__":
    app.run(debug=True)
