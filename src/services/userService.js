const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const userSignUpService = async (body) => {
    const { nickname, email, password } = body;
    const { PUBLIC_KEY, SALT_ROUNDS } = process.env;

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

module.exports = {
    userSignUpService,
}
