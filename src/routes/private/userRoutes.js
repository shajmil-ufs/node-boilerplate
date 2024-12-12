const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');

router.get('/Get_Users', UserController.Get_Users);

module.exports = router; 