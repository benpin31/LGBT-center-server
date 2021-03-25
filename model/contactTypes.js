const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema( {
    name: {
        type: String, 
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean, 
        required: true
    }
})

const ContactTypesModel = mongoose.model("contactTypes", schema);
module.exports = ContactTypesModel;
