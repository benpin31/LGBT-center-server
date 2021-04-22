const express = require("express");
const router = express.Router();

// Middlewares
const { protectAuth, protectAccesUser, protectUpdateUser, protectDeleteUser } = require('./../middlewares/protectRoute');
const { validateUsers } = require('./../middlewares/validateUsers')

// services
const { getUsers, getOneUser, createUser, updateUser, deleteUser } = require("./../services/user");

const salt = 10;

/////////////////////////////////////
//  User CRUD
/////////////////////////////////////

router.get("/", protectAuth("admin"), async (req, res, next) => {
  // get all users : only for admins
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.toString);
  }
});


router.get("/:id", protectAuth("admin"), protectAccesUser, async (req, res, next) => {
  // Get the user with id :id for crud purpose
  // only if you are admin or if its your own account
  try {
    const { id } = req.params;
    const user = await getOneUser(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

router.post("/create", protectAuth("admin"), validateUsers("create"), async (req, res, next) => {
  // There is no signup in the app. The administators can create (and delete) account for other,
  // then the owner of an acconut can update it.
  // Only admins can create an account, thats why we use protectAuth("admin") middlware (it's a closure)
  const { login, password, isAdmin } = req.body;
  const lowerCaseLogin = login.toLowerCase();

  try {
    const newUser = await createUser({ login : lowerCaseLogin, password, isAdmin })
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.delete("/delete/:id", protectAuth("admin"), protectDeleteUser, validateUsers("delete"), async (req, res, next) => {
  // Only admins can create an account, thats why we use protectAuth("admin") middlware (it's a closure)
  // a user can't delete its own account

  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/edit/:id", protectAuth("admin"), protectUpdateUser, validateUsers("update"), async (req, res, next) => {
  const { id } = req.params;
  const { login, password, isAdmin } = req.body;
  const lowerCaseLogin = login.toLowerCase();

  //  the user can't modify the fact that he is admin or not
  //  He can also choose not to update the password. As we can't 
  //  send the password to the front to add it as default value of the input,
  //  Front can return an undifined password. In that case, the update don't change the
  //  current password

  try {
    const updatedUser = await updateUser(id, { login : lowerCaseLogin, password, isAdmin });
    const {_id} = updatedUser;
    res.status(200).json({lowerCaseLogin, isAdmin, _id});
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
