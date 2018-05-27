var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function login(req, res) {
  var payload = req.body
  // payload placeholder

  // payload = {
  //   'userPin': '1234',
  //   'auth0UserId': 1234
  // }
  var { loginUser } = require('../db/user')
  loginUser(payload.auth0UserId, payload.userPin, (err, result)=> {
    if(err) {
      return res.status(400).json({
        success: false,
        message: err.message,
        status: 400
      })
    }
    var user = result[0]
    if(!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid login credentials',
        status: 401
      })
    }
    var data = {
    	'userId': user.user_id,
      'auth0UserId': payload.auth0UserId,
      'accountId': user.account_id,
      'role': user.role_id,
      'roleName': user.role
    }
    var token = jwt.sign(data, config.secret, {
        expiresIn: 5000
    });
    data.token = token
    return res.status(200).json({
      success: true,
      message: 'Login success',
      data: data,
      status: 200
    })
  })
}


module.exports = {
  login
}
