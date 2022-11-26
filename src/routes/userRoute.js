const { Router } = require('express');
const router = Router();
const { userSignUp } = require('../controllers/userController');
const {
    signUpMiddleware,
    signInMiddleware,
} = require('../middlewares/userMiddleware');

router.post('/signup', signUpMiddleware, userSignUp);
router.post('/signin', signInMiddleware);

module.exports = router;