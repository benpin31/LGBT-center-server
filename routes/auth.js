const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./../model/users");

const protectAuth = require("./../middlewares/protectRoute")

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

///////////////////////////////////// 
//  User CRUD 
/////////////////////////////////////

router.get("/", protectAuth("admin"), async (req, res, next) => {
  // get all users : only for admins
  try {
    const users = await User.find().select("-password") 
    res.status(200).json(users)
  } catch(err) {
    res.status(500).json({err})
  }
}) ;

router.get("/:id", protectAuth("benevole"), async (req, res, next) => {
  try {
    const {id} = req.params
    const user = await User.findById(id)

    if (req.session.currentUser.isAdmin || id === req.session.currentUser.id) {
      res.status(200).json(user)
    } else {
      res.status(403).json("Users can only see there own account") ;
    }
  } catch (err) {
    res.status(500).json({err})
  }
}) ;




router.post("/create", protectAuth("admin"), (req, res, next) => {
  // There is no signup in the app. The administators can create (and delete) account for other, 
  // then the owner of an acconut can update it.
  // Only admins can create an account, thats why we use protectAuth("admin") middlware (it's a closure)
  const { login, password, isAdmin } = req.body;

  User.findOne({ login })
    .then((userDocument) => {
      if (userDocument) {
        return res.status(400).json({ message: "Login already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = { login, isAdmin, password: hashedPassword };

      User.create(newUser)
        .then((newUserDocument) => {
          res.status(200).json(newUserDocument)
        })
        .catch(err => res.status(500).json({err}));
    })
    .catch(next);
});

router.delete("/delete/:id", protectAuth("admin"),  async (req, res, next) => {
  // Only admins can create an account, thats why we use protectAuth("admin") middlware (it's a closure)
  try {
    const {id} = req.params ;

    const deletedUser = await User.findByIdAndDelete(id) ;

    if(deletedUser) {
      res.status(200).json(deletedUser)
    } else {
      res.status(400).json("User doesn't exist")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})

router.patch("/edit/:id", protectAuth("benevole"), async (req, res, next) => {
  try {
    const {id} = req.params ;
    const {login, password} = req.body ;
    //  the user can't modify the fact that he is admin or not

    if (id != req.session.currentUser.id) {
      // the user can only update its own account
      res.status(403).json("Users can edit only their own account") ;
      return
    }

    if (login.length < 3) {
      // back properties validation
      res.status(400).json("Login must contains more than 3 characters") ;
      return ;
    }
    if (password.length < 3) {
      // back properties validation
      res.status(400).json("password must contains more than 3 characters") ;
      return ;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id, 
      {login, password: bcrypt.hashSync(password, 10)}, 
      {new: true}) ;

    if(updatedUser) {
      // updatedUser.toObject()
      // delete updatedUser.password
      const {login, isAdmin, _id} = updatedUser
      res.status(200).json({login, isAdmin, _id})
    } else {
      res.status(400).json("User doesn't exist")
    }
  } catch(err) {
    res.status(500).json(err)
  }
})


module.exports = router;