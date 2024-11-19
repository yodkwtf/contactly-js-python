from app import app, db
from flask import request, jsonify
from models import Contact


# Get all contact entries
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts]
    return jsonify(result), 200
