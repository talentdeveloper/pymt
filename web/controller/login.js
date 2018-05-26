var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function login(req, res) {
  var payload = req.body
  // fake payload
  payload = {
    "userPin": "1234",
    "accountID": 1234
  }
  // check user by pin and account id
  var data = {
  	"userId": 1234,
    "role": 0,
  }
  return res.status(200).json({
    success: true,
    message: 'Order list',
    data: data,
    status: 200
  })
}


module.exports = {
  login
}
