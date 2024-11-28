from app import app, db
from flask import request, jsonify
from models import Contact


# Get all contact entries
@app.route("/api/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    result = [contact.to_json() for contact in contacts]
    return jsonify(
        {
            "success": True,
            "data": {
                "message": "Contacts fetched successfully",
                "contacts": result,
                "error": None,
            },
        }
    )


# Create a new contact entry
@app.route("/api/contacts", methods=["POST"])
def create_contact():
    try:
        data = request.get_json()

        # validations
        required_fields = ["name", "phone", "occupation", "address"]
        for field in required_fields:
            if field not in data or not data.get(field):
                return (
                    jsonify(
                        {
                            "success": False,
                            "data": {
                                "message": f"{field} is required",
                                "contact": None,
                                "error": None,
                            },
                        }
                    ),
                    400,
                )

        name = data.get("name")
        phone = data.get("phone")
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
            phone=phone,
            occupation=occupation,
            address=address,
            gender=gender,
            img_url=img_url,
        )

        db.session.add(new_contact)
        db.session.commit()
        return (
            jsonify(
                {
                    "success": True,
                    "data": {
                        "message": "Contact added successfully",
                        "contact": new_contact.to_json(),
                        "error": None,
                    },
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return (
            jsonify(
                {
                    "success": False,
                    "data": {
                        "message": "Failed to add contact",
                        "contact": None,
                        "error": str(e),
                    },
                }
            ),
            500,
        )


# Delete a contact entry
@app.route("/api/contacts/<int:contact_id>", methods=["DELETE"])
def delete_contact(contact_id):
    try:
        # todo: Add empty data validation
        contact = Contact.query.get(contact_id)
        if contact is None:
            return (
                jsonify(
                    {
                        "success": False,
                        "data": {
                            "message": "Contact not found",
                            "error": None,
                        },
                    }
                ),
                404,
            )

        db.session.delete(contact)
        db.session.commit()
        return (
            jsonify(
                {
                    "success": True,
                    "data": {
                        "message": "Contact deleted successfully",
                        "error": None,
                    },
                }
            ),
            200,
        )
    except Exception as e:
        db.session.rollback()
        return (
            jsonify(
                {
                    "success": False,
                    "data": {
                        "message": "Failed to delete contact",
                        "error": str(e),
                    },
                }
            ),
            500,
        )


# Update a contact entry
@app.route("/api/contacts/<int:contact_id>", methods=["PATCH"])
def update_contact(contact_id):
    try:
        contact = Contact.query.get(contact_id)
        if contact is None:
            return (
                jsonify(
                    {
                        "success": False,
                        "data": {
                            "message": "Contact not found",
                            "contact": None,
                            "error": None,
                        },
                    }
                ),
                404,
            )

        data = request.get_json()

        contact.name = data.get("name", contact.name)
        contact.phone = data.get("phone", contact.phone)
        contact.occupation = data.get("occupation", contact.occupation)
        contact.address = data.get("address", contact.address)

        db.session.commit()
        return (
            jsonify(
                {
                    "success": True,
                    "data": {
                        "message": "Contact updated successfully",
                        "contact": contact.to_json(),
                        "error": None,
                    },
                }
            ),
            200,
        )
    except Exception as e:
        db.session.rollback()
        return (
            jsonify(
                {
                    "success": False,
                    "data": {
                        "message": "Failed to update contact",
                        "contact": None,
                        "error": str(e),
                    },
                }
            ),
            500,
        )
