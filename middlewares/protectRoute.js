const protectAuth = (protectionLevel) => {
    // return an authentification middleware depending of the type a account : 
    //  if "admin" protection : the session must belongs to an admin user, 
    //  else, all volunteers can connect

    return (req, res, next) => {
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

const protectAccesUser = (req, res, next) => {
    const { id } = req.params;
    if (req.session.currentUser.isAdmin || id === req.session.currentUser.id) {
        next();
    } else {
        res.status(403).json("Users can only see there own account");
    }
}

const protectUpdateUser = (req, res, next) => {
    const { id } = req.params;

    if (id !== req.session.currentUser.id) {
        // the user can only update its own account
        return res.status(403).json("Users can edit only their own account");
    }

    next()

}

const protectDeleteUser = (req, res, next) => {
    const { id } = req.params;
    const { currentUser } = req.session;

    if (currentUser.id === id) {
        return res.status(403).json({ message: "A user can't delete his/her own account" })
    }

    next()

}






module.exports = { protectAuth, protectAccesUser, protectUpdateUser, protectDeleteUser };
