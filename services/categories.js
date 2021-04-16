const CategoriesModel = require('./../model/visitCategories');

const getCategories = async () => {
   try {
      const categories = CategoriesModel
         .find()
         .sort({ name: 1 })
         .collation({ locale: 'en_US', caseLevel: true }) ; // Mongo sort uppercase before lowercase : use to avoid that
      return categories ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const createCategory = async categorieToCreate => {
   try {
      const newCategory = await CategoriesModel.create({...categorieToCreate, isActive: true}) ;
      return newCategory ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const updateCategory = async (id, newValues) => {
   try {
      const updatedCategory = await CategoriesModel.findByIdAndUpdate(id, newValues, { new: true })
      return updatedCategory ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

module.exports = { getCategories, createCategory, updateCategory };
