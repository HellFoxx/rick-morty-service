const User = require("../models/user");
const bcrypt = require('bcrypt');

const signUpMiddleware = async (req, res, next) => {
    const { nickname, email, password } = req.body;
    if (!(nickname && email && password)) {
        return res.status(400).json('All fields is required');
    }

    const existedUser = await User.findOne({
        $or: [
            { email: email.toLowerCase() },
            { nickname }
        ]
    });

    if (existedUser) {
        return res.status(409).json("User with such email or nickname is already exist")
    }

    return next();
}

const signInMiddleware = async (req, res, next) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json('All fields is required')
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!(user && (await bcrypt.compare(password, user.password)))) {
        return res.status(400).json('Invalid Credentials')
    }

    return next();
}

module.exports = { signInMiddleware, signUpMiddleware };