const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserController {
  static async Create_User(req, res) {
    try {
      const userData = {
        ...req.body,
        Password: await bcrypt.hash(req.body.Password, 10)
      };

      const result = await UserModel.Create_User(userData);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result
      });

    } catch (error) {
      console.error('Error in Create_User:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: error.message
      });
    }
  }

  static async Get_Users(req, res) {
    try {
      const result = await UserModel.Get_Users();
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error in Get_Users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: error.message
      });
    }
  }

  static async Get_User_By_Id(req, res) {
    try {
      const result = await UserModel.Get_User_By_Id(req.params.userId);
      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      console.error('Error in Get_User_By_Id:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: error.message
      });
    }
  }
}

module.exports = UserController; 