from app import app, db
from flask import request, jsonify
from models import Contact


# Get all contact entries
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts]
    return jsonify(result), 200


# Create a new contact entry
@app.route("/api/contacts", methods=["POST"])
def create_contact():
    try:
        data = request.get_json()
        name = data.get("name")
        occupation = data.get("occupation")
        address = data.get("address")
        gender = data.get("gender")

        # fetch avatar image based on gender
        # Source: https://avatar-placeholder.iran.liara.run/document
        # TODO: add source to readme
        if gender == "male":  # todo: handle casing
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        # create a new contact entry
        new_contact = Contact(
            name=name,
            occupation=occupation,
            address=address,
            gender=gender,
            img_url=img_url,
        )

        db.session.add(new_contact)
        db.session.commit()
        return jsonify(new_contact.to_json()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
