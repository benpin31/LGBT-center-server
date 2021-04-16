const User = require("./../model/users");
const bcrypt = require("bcrypt");

const salt = 10;

const getUsers = async () => {
   try {
      const users = await User
         .find()
         .select("-password")
         .sort({ login: 1 })
         .collation({ locale: 'en_US', caseLevel: true }); // Mongo sort uppercase before lowercase : use to avoid that
      return users;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const getOneUser = async id => {
   try {
      const user = await User.findById(id);
      return user ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const getOneUserByName = async name => {
   try {
      console.log(name)
      const user = await User.findOne({login: name});
      console.log(user) ;
      return user ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const createUser = async ({login, isAdmin, password}) => {
   try {
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ login, isAdmin, password: hashedPassword }) ;

      return newUser ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const deleteUser = async id => {
   try {
      const deletedUser = await User.findByIdAndDelete(id);
      return deletedUser ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

const updateUser = async (id, updatedProperties) => {
   const { login, password } = updatedProperties;

   const newProperties = { login }
   if (password) {
      newProperties.password = bcrypt.hashSync(password, 10);
   }

   try {
      const updatedUser = await User.findByIdAndUpdate(
         id,
         newProperties,
         { new: true }
      );
      return updatedUser ;
   } catch (err) {
      console.log(err);
      throw new Error(err);
   }
}

module.exports = { getUsers, getOneUser, createUser, updateUser, deleteUser, getOneUserByName };


