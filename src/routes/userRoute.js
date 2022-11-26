const { Router } = require('express');
const router = Router();
const { 
    userSignUp,
    userSignIn,
    userWelcome
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
router.get('/welcome', tokenVerifyMiddleware, userWelcome)

module.exports = router;