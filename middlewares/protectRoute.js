const protectAuth = (protectionLevel) => {
    // return an authentification middleware depending of the type a account : 
    //  if "admin" protection : the session must belongs to an admin user, 
    //  else, all volunteers can connect

    return  (req, res, next) => {
        // console.log(req.session)
        if (!req.session.currentUser) {
          return res.status(401).json({ message: "Unauthorized" });
        } else {
            if (protectionLevel === "volunteer" || req.session.currentUser.isAdmin) {
                // Here, a user has a session : he/her can be a volunteer or an admin.
                // there is autentification if : 
                //  - the protection level is volunteer
                //      or
                //  - the protection level is admin and the user is an admin
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized" });
            }
        }
      };

}



  
module.exports = protectAuth;
  