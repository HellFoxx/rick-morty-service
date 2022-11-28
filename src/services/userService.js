const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = process.env;

const userSignUpService = async (body) => {
    const { nickname, email, password } = body;

    const encryptedPass = await bcrypt.hash(password, 10)
    
    const user = await User.create({
        nickname,
        email: email.toLowerCase(),
        password: encryptedPass,
    });

    const token = jwt.sign(
        { userId: user._id, email },
        PUBLIC_KEY,
        { expiresIn: '48h' }
    )

    user.token = token;
}

const userSignInService = async (body) => {
    const { email } = body;
    const user = await User.findOne({ email: email.toLowerCase() });
    
    const token = jwt.sign(
        { userId: user._id, email: user.email },
        PUBLIC_KEY,
        { expiresIn: '48h' }
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

const isUserAlreadyExistsService = async (query) => {
    const { email, nickname } = query;
    const options = [];

    if (email) options.push({ email });
    if (nickname) options.push({ nickname });
    if (!options.length) return false;

    return !!await User.exists({ $or: options });
}

const updateUserService = async (req) => {
    const { firstName, lastName } = req.body;

    await User.updateOne(
        { email: req.user.email },
        { $set: { first_name: firstName, last_name: lastName } }
    )

}

module.exports = {
    userSignUpService,
    userSignInService,
    isUserAlreadyExistsService,
    updateUserService,
}
