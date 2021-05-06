const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const schema = new Schema( {
    category:       {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
      },
    contactType: {
        type: Schema.Types.ObjectId, 
        ref: "contactTypes",
        required: true
    },
    comment: {
        type: String
    },
    date: {type: Date, default: Date.now},
})

const VisitsModel = mongoose.model("visits", schema);
module.exports = VisitsModel;
