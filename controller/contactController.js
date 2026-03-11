import contact from "../models/contactModel.js"
import contactValidation from "../middleware/contactMiddleware.js"

export const getContact = async (req, res) => {
    try {
        const getAllContact = await contact.find({ user_id: req.user.id })
        return res.status(200).json({
            data: getAllContact
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching contacts.', error: error.message });
    }
}

export const getContactById = async (req, res) => {
    try {
        const { id } = req.params
        const getAllContactById = await contact.findOne({ _id: id, user_id: req.user.id })
        if (!getAllContactById) {
            return res.status(404).json({
                message: "contact not found"
            })
        }
        return res.status(200).json({
            data: getAllContactById
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error while fetching contact.', error: error.message });
    }
}

export const createContact = async (req, res) => {
    try {
        const { user_id, name, email, adress, phone } = req.body
        const { error } = contactValidation.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }

        const emailExists = await contact.findOne({ email });
        if (emailExists) {
            return res.status(409).json({ message: 'A contact with this email already exists.' });
        }

        const newContact = new contact({ user_id: req.user.id, name, email, adress, phone, })
        const savedContact = await newContact.save()
        return res.status(201).json({
            message: "Contact created successfully",
            data: savedContact
        })
    } catch (error) {
        res.status(500).json({ message: 'An internal server error occurred.', error: error.message });
    }
}

export const updateById = async (req, res) => {
    try {
        const { name, email, adress, phone } = req.body
        const { id } = req.params
        let updateData = { name, email, adress, phone };
        const { error } = contactValidation.validate(updateData)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            })
        }
        const updateContact = await contact.findOneAndUpdate({ _id: id, user_id: req.user.id }, updateData, { new: true })
        if (!updateContact) {
            return res.status(404).json({
                message: "contact not found"
            })
        }
        if (updateContact.user_id.toString() !== req.user.id) {
            return res.status(403).json({
                message: "you are not authorized to update this contact"
            })
        }
        return res.status(200).json({
            message: "Contact updated successfully",
            data: updateContact
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error while updating contact.', error: error.message });
    }
}

export const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        const deleteContact = await contact.findByOneAndDelete({ _id: id, user_id: req.user.id })
        if (!deleteContact) {
            return res.status(404).json({
                message: "contact not found"
            })
        }
        if (deleteContact.user_id.toString() !== req.user.id) {
            return res.status(403).json({
                message: "you are not authorized to delete this contact"
            })
        }
        return res.status(200).json({
            message: "Contact deleted successfully",
            data: deleteContact
        })
    } catch (error) {
        res.status(500).json({ message: 'Server error while deleting contact.', error: error.message });
    }
}