const UsersModel = require("./../model/users");

const getDevEnvironment = async (req, res, next) => {

    const user = await UsersModel.findOne({login: process.env.DEV_ENV}).select("-password") ;

    if(user) {
        const {id, isAdmin} = user
        req.session.currentUser = {id, isAdmin};
        console.log(req.session.currentUser) ;
    } else {
        req.session.currentUser = null ;
    }
    next()
}


module.exports = getDevEnvironment;
