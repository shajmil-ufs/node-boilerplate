const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/userController');
const { validateUser } = require('../../middlewares/validators');

router.post('/Create_User', validateUser, UserController.Create_User);
router.get('/Get_Users', UserController.Get_Users);
router.get('/Get_User_By_Id/:userId', UserController.Get_User_By_Id);
router.put('/Update_User/:userId', validateUser, UserController.Update_User);
router.delete('/Delete_User/:userId', UserController.Delete_User);

module.exports = router; 