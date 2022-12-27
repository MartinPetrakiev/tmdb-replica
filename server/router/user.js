const express = require('express');
const router = express.Router();
const { authController, userController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile', auth(), authController.getProfileInfo);
// router.put('/profile', auth(),authController.editProfileInfo);

router.get('/favorites', auth(), userController.getUserFavorites);
router.put('/favorites/add', auth(), userController.addUserFavorite);

module.exports = router