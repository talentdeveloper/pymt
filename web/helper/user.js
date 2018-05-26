var connection = require('../config/connection.js');

function getUserRoles(callback) {
  var sql = 'select id, name from user_role'
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function createUser(user, callback) {
  var sql = `
  insert into users (first_name, last_name, email, pin, role_id, auth0_user_id, account_id)
  values ('${user.first_name}', '${user.last_name}', '${user.email}',
  '${user.pin}', ${user.role_id}, '${user.auth0_user_id}', ${user.account_id})
  `
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function editUser(auth0_user_id, callback) {
  var sql = `select * from users where auth0_user_id = '${auth0_user_id}'`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function deleteUser(auth0_user_id, callback) {
  var sql = `delete from users where auth0_user_id = '${auth0_user_id}'`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

module.exports = {
  getUserRoles,
  createUser,
  editUser,
  deleteUser
}
