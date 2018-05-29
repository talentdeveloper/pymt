var connection = require('../config/connection.js');

function getAllOrder(account_id, callback) {
  var sql = `select * from order where account_id = ${account_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function editOrder(order_id, callback) {
  var sql = `select * from order where id = ${order_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function createOrder(order, callback) {
  var sql = `insert into order (name, short_name, color, image, active, account_id)
  values ('${order.name}', '${order.short_name}', '${order.color}', '${order.image}',
  ${order.active}, ${order.account_id})`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function updateOrder(order, callback) {
  var sql = `update order set name = '${order.name}', short_name = '${order.short_name}',
  color = '${order.color}', image = '${order.image}', active = ${order.active}
  where id = ${order.id} and account_id = ${order.account_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

module.exports = {
  getAllOrder,
  editOrder,
  createOrder,
  updateOrder
}
