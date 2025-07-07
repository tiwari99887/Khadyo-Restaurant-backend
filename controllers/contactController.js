const Contact = require("../models/contact");

exports.contactResturant = async (req, res) => {
    const {name, email, number, description} = req.body;
    try{
        if(!name || !email || !number || !description) {
            return res.status(400).json({msg: "All fields are required"});
        }

        const newContact = new Contact({name, email, number, description});
        await newContact.save();

        res.status(201).json({msg: "Message sent successfully"});
    }
    catch(error) {
        return res.status(500).json({msg: "Server error", error});
    }
};