const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET/api/contacts
//access public 

const getContacts = asyncHandler(async(req,res)=>{
    const contact =  await Contact.find();
    res.status(200).json(contact);
})

//@desc Create New contacts
//@route POST/api/contacts
//access public 

const createContact =  asyncHandler(async(req,res)=>{
    console.log("The req body :", req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }
    const contact = await Contact.create({
        name,email,phone,
    });
    res.status(201).json(contact);
})

//@desc Get contact
//@route GET/api/contacts/:id
//access public 

const getContact = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
       res.status(400);
       throw new Error("Invalid contact ID");
    }
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

//@desc Update contact
//@route UPDATE/api/contacts/:id
//access public 

const updateContact = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
       res.status(400);
       throw new Error("Invalid contact ID");
    }
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(200).json(updateContact);
})

//@desc Delete contact
//@route DELETE/api/contacts/:id
//access public 

const deleteContact = asyncHandler(async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
       res.status(400);
       throw new Error("Invalid contact ID");
    }
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contact);
})

module.exports = { getContacts, createContact ,getContact, updateContact,deleteContact};