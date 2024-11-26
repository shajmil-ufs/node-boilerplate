const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await UserModel.login(email, password);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        { 
          userId: user.User_Details_Id,
          userType: user.User_Type_Id 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: user.User_Details_Id,
            name: user.User_Details_Name,
            email: user.Email,
            userType: user.User_Type_Name
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AuthController; 