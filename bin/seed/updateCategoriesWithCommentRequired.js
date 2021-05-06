const mongoose = require("mongoose");
require("dotenv").config();
require("../../config/mongo");

const visitCategoriesModel = require("./../../model/visitCategories")

const updateContactType = async () => {

   const categories = await visitCategoriesModel.find();

   const categoriesIds = categories.map(category => category.id)
   // .forEach(id =>
   //    await contactTypesModel.findByIdAndUpdate(id, {requiredComment: false})
   // )

   for (id of categoriesIds) {
      await visitCategoriesModel.findByIdAndUpdate(id, { requiredComment: false })
   }

   mongoose.connection.close().then((success) => console.log("WELL CLOSED"));

}

updateContactType()

