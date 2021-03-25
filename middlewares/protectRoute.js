const protectAuth = (sessionType) => {
    // return an authentification middleware depending of the type a account : 
    //  if "admin" protection : the session must belongs to an admin user, 
    //  else, all benevoles can connect

    return  (req, res, next) => {
        // console.log(req.session)
        if (!req.session.currentUser) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
            if (sessionType === "benevole" || req.session.currentUser.isAdmin) {
                // equivalent to if (sessionType === "benevole" ) next
                // else id (sessionType === "admin" && user=admin) next    
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
      };

}



  
module.exports = protectAuth;
  