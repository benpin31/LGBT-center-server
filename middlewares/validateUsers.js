const { getOneUser, getOneUserByName } = require('./../services/user')

const validateUsers = (crudType) => {

   return async (req, res, next) => {
      const { id } = req.params;
      const { login, password } = req.body;

      try {
         let user ;
         if (crudType === "update" || crudType === "delete") {
            // protection against hacker if they acces api outside the user interface
            user = await getOneUser(id);
            if (!user) {
               return res.status(400).json("User doesn't exist");
            }
         }

         if (crudType === "create") {
            user = await getOneUserByName(login);
            if (user) {
               return res.status(400).json({ message: "Login already used" });
            }
         }

         if (login && login.length < 3) {
            // back properties validation
            return res.status(400).json("Login must contains more than 3 characters");
         }
   
         if (password && password.length < 3) {
            // back properties validation
            return res.status(400).json({ message: "password must contains more than 3 characters" });
         }
   
         next();
   
      } catch (err) {
         res.status(500).json(err.toString);
      }
   }

}


module.exports = { validateUsers };