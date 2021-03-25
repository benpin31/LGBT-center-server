const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema( {
    login: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    isAdmin: {
        type: Boolean, 
        required: true
    }
})

const UserModel = mongoose.model("users", schema);
module.exports = UserModel;
