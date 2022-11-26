const { userSignUpService } = require("../services/userService");


const userSignUp = async (req, res, next) => {
    const user = await userSignUpService(req.body);    
    res.status(200).json(user);
}

module.exports = {
    userSignUp
};