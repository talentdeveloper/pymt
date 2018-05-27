var connection = require('../config/connection.js');

function getAccountNames(callback) {
  var sql = 'select id, company_name, merchant_id from account'
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

module.exports = {
  getAccountNames
}
