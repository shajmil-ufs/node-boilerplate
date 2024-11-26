const {executeTransaction} = require('../utils/sp-caller');

class UserModel {
  static async Create_User(userData) {
    return executeTransaction('Create_User', [
      userData.User_Details_Name,
      userData.Password,
      userData.User_Type_Id,
      userData.User_Type_Name,
      userData.Working_Status_Id,
      userData.Working_Status_Name,
      userData.Mobile_No,
      userData.Email,
      userData.Is_Applogin,
      userData.CreatedBy
    ]);
  }

  static async Get_Users() {
    return executeTransaction('Get_Users', []);
  }

  static async Get_User_By_Id(userId) {
    return executeTransaction('Get_User_By_Id', [userId]);
  }

  static async Update_User(userId, userData) {
    return executeTransaction('Update_User', [
      userId,
      userData.User_Details_Name,
      userData.User_Type_Id,
      userData.User_Type_Name,
      userData.Working_Status_Id,
      userData.Working_Status_Name,
      userData.Mobile_No,
      userData.Email,
      userData.ModifiedBy
    ]);
  }

  static async Delete_User(userId, deletedBy) {
    return executeTransaction('Delete_User', [userId, deletedBy]);
  }
}

module.exports = UserModel; 