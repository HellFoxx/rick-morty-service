const { Router } = require('express');
const router = Router();
const { 
    userSignUp,
    userSignIn,
    userWelcome,
    isUserAlreadyExists,
    updateUser,
} = require('../controllers/userController');
const {
    signUpMiddleware,
    signInMiddleware,
} = require('../middlewares/userMiddleware');

const {
    tokenVerifyMiddleware
} = require('../middlewares/tokenVerifyMiddleware');

router.post('/signup', signUpMiddleware, userSignUp);
router.post('/signin', signInMiddleware, userSignIn);
router.get('/check', isUserAlreadyExists);
router.put('/update', tokenVerifyMiddleware, updateUser); 
router.get('/auth', tokenVerifyMiddleware, (req, res) => res.sendStatus(100))

module.exports = router;