const UsersModel = require("./../model/users");

const getDevEnvironment = async (req, res, next) => {

    const user = await UsersModel.findOne({login: process.env.DEV_ENV}).select("-password") ;

    if(user) {
        const {id, isAdmin} = user
        req.session.currentUser = {id, isAdmin};

    }
    next()
}


module.exports = getDevEnvironment;
