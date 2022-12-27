const router = require('express').Router();
const user = require('./user');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/user', user);
router.use('/test', test);

module.exports = router;
