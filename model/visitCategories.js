const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema( {
    name: {type: String, required: true},
    description: {type: String, required: true},
    isActive: {type: Boolean, required: true}
})

const CategoriesModel = mongoose.model("categories", schema);
module.exports = CategoriesModel;
