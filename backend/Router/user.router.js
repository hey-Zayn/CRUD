const express = require('express');
const { regiserUser, updateUser, getUserById, getUser, DeleteUser } = require('../Controller/user.controller');
const multerFile = require('../utils/multerFile');
const upload = require('../utils/multerFile');
const router = express.Router();

router.post('/register', multerFile, regiserUser);
router.put('/update/:id', multerFile, updateUser);
router.get('/users/:id', multerFile, getUserById);
router.get('/users', multerFile, getUser);
router.delete('/delete/:id', multerFile, DeleteUser);

module.exports = router;