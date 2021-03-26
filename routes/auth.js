const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./../model/users");

const salt = 10;

///////////////////////////////////// 
//  Signin / logout
/////////////////////////////////////

router.post("/signin", (req, res, next) => {
  //  A user is identify by a login (no email) and a password
  const { login, password } = req.body;
  User.findOne({ login })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(password, userDocument.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      
      req.session.currentUser = {id: userDocument._id, isAdmin: userDocument.isAdmin};
      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});


router.get("/isLoggedIn", (req, res, next) => {
  if (!req.session.currentUser)
    return res.status(401).json({ message: "Unauthorized" });

  const id = req.session.currentUser.id;
  
  // if the user is logged in , return all its indormation (login, isAdmin except password to client)
  User.findById(id)
    .select("-password") 
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  req.session.destroy(function (error) {
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

module.exports = router;