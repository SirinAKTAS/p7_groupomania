const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer.middleware');
const userCtrl = require('../controllers/user.controller');

// Auth
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);

// User path
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', multer, userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;