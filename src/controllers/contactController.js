const Contact = require("../models/Contact")
const sendEmail = require("../utils/emailService")


const createContact = async (req, res)=>{
    const {name, email, phone, message} = req.body;
    try {
        const contact = await Contact.create({name, email, phone, message})
        // await sendEmail(email, "Contact Form Submitted", "Thank you for contacting us. We will get back to you soon.")
        // await sendEmai(process.env.ADMIN_EMAIL, "New Contact", `contact from ${name} : ${message}`)
        
        res.status(201).json({message:"contact created succesfully", success:true})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}


const getAllContacts = async (req, res)=>{
    try {
        const contacts = await Contact.find();
        res.status(200).json({contacts})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteContact = async(req, res)=>{
    const {id} = req.params;
    try {
        await Contact.findByIdAndDelete(id)
        res.status(200).json({message:"contact deleted successfully "})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {createContact, getAllContacts, deleteContact}