const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = process.env;

const tokenVerifyMiddleware = async (req, res, next) => {
    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
        return res.status(403).json('A token is required for authentication')
    }

    try {
        const decoded = jwt.verify(token, PUBLIC_KEY);
        req.user = decoded;
    } catch (e) {
        return res.status(401).json('Invalid Token')
    }

    return next();
}

module.exports = { tokenVerifyMiddleware }