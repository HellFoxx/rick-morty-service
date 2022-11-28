const {
    userSignUpService,
    userSignInService,
    isUserAlreadyExistsService,
    updateUserService,
} = require("../services/userService");


const userSignUp = async (req, res, next) => {
    try {
        await userSignUpService(req.body);    
        res.sendStatus(201);   
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

const isUserAlreadyExists = async (req, res, next) => {
    try {
        const result = await isUserAlreadyExistsService(req.query);    
        res.status(200).json(result);   
    } catch (e) {
        res.status(500).json(e);
    }
}

const updateUser = async (req, res, next) => {
    try {
        await updateUserService(req);    
        res.sendStatus(201); 
    } catch (e) {
        res.status(500).json(e);
    }
}

const userAuth = async (req, res, next) => {
    res.sendStatus(100)
}

module.exports = {
    userSignUp,
    userSignIn,
    userWelcome,
    isUserAlreadyExists,
    updateUser,
};