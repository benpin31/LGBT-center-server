const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema( {
    name: {
        type: String, 
        required: true, 
        unique: true
    },
    description: {
        type: String, 
        required: true
    },
    isActive: {
        type: Boolean, 
        required: true
    },
    requiredComment: {
        type: Boolean,
        required: true,
        default: false   
    }
})

const CategoriesModel = mongoose.model("categories", schema);
module.exports = CategoriesModel;
