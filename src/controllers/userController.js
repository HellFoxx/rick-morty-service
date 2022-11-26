const {
    userSignUpService,
    userSignInService
} = require("../services/userService");


const userSignUp = async (req, res, next) => {
    try {
        await userSignUpService(req.body);    
        res.status(201);   
    } catch (e) {
        res.status(500).json(e)
    }
}

const userSignIn = async (req, res, next) => {
    try {
        const user = await userSignInService(req.body);    
        res.status(200).json(user);   
    } catch (e) {
        res.status(500).json(e)
    }
}

const userWelcome = async (req, res, next) => {
    res.status(200).json('Welcome!')
}

module.exports = {
    userSignUp,
    userSignIn,
    userWelcome
};