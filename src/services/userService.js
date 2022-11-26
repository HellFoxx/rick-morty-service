const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY, SALT_ROUNDS } = process.env;

const userSignUpService = async (body) => {
    const { nickname, email, password } = body;

    const encryptedPass = await bcrypt.hash(password, parseInt(SALT_ROUNDS))
    
    const user = await User.create({
        nickname,
        email: email.toLowerCase(),
        password: encryptedPass,
    });

    const token = jwt.sign(
        { userId: user._id, email },
        PUBLIC_KEY,
        { expiresIn: '2h' }
    )

    user.token = token;
    
    return user;
}

const userSignInService = async (body) => {
    const { email } = body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        PUBLIC_KEY,
        { expiresIn: '2h' }
    );

    user.token = token;

    return {
        firstName: user.first_name,
        lastName: user.last_name,
        nickname: user.nickname,
        email: user.email,
        token: user.token,
    }
}

module.exports = {
    userSignUpService,
    userSignInService,
}
