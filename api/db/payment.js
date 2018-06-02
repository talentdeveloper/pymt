var connection = require('../config/connection.js');

function getAllPayments(account_id, callback) {
  var sql = `select * from payment where account_id = ${account_id}`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function createPayment(payment, callback) {
  var { getOrderInfoByTransactionId } = require('./order')
  var transId = (payment.orderObj && payment.orderObj.transactionId) || ''
  getOrderInfoByTransactionId(payment.account_id, transId, (err, result) => {
    if(err) return callback(err, null)
    var order = result[0]
    if(!order) return callback(new Error(`Order not found for Transaction ID: '${transId}'`), null)

    var paymentObj = payment.orderObj.payment
    var sql = `insert into payment (order_id, cash_id, type, signature, amount_tendered, change_given, xmp, account_id)
    values (${order.order_id}, ${order.cash_id}, '${paymentObj.paymentType}', '${paymentObj.signature}', ${paymentObj.amountTendered},
    ${paymentObj.changeGiven}, '${paymentObj.xmp}', ${payment.account_id})`
    console.log(sql)
    connection.query(sql, function(err, result) {
      callback(err, result)
    });
  })

}


module.exports = {
  getAllPayments,
  createPayment
}
