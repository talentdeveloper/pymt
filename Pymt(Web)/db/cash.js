var connection = require('../config/connection.js');

function createCashOpen(open_amount, account_id, user_id, callback) {
  var opening_date = Date.now()
  var sql = `select count(0) count from cash where day_opened = true and day_closed = false and account_id = ${account_id}`
  connection.query(sql, function(err, result) {
    if(err) return callback(err, null)
    else {
      var dayOpened = result[0]
      if(dayOpened && dayOpened.count > 0) {
        var error = new Error('Close current day first before opening a new day')
        return callback(error, null)
      } else {
        sql = `insert into cash (opening_amount, opening_date, account_id, day_opened, opening_user_id)
        values (${open_amount}, ${opening_date}, ${account_id}, true, ${user_id})`
        connection.query(sql, function(err, result) {
          callback(err, result)
        });
      }
    }
  });
}

function updateCashClose(close_amount, sales_amount, total_drop_amount, account_id, user_id, callback) {
  var closing_date = Date.now()
  var sql = `update cash set closing_amount = ${close_amount}, sales_amount = ${sales_amount},
  total_drop_amount = ${total_drop_amount}, closing_date = ${closing_date}, day_closed = true,
  closing_user_id = ${user_id} where account_id = ${account_id} and day_opened = true and day_closed = false`
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function endDay(eod_till_user_entry, account_id, user_id, callback) {
  var sql = `select id from cash where day_opened = true and day_closed = false order by opening_date desc`
  connection.query(sql, function(err, result) {
    if(err) callback(err, null)
    else {
      var cash = result[0]
      if(cash) {
        var eod_till_entry_date = Date.now()
        var sql = `update cash set eod_till_user_entry = ${eod_till_user_entry},
        eod_till_user_id = ${user_id}, eod_till_entry_date = ${eod_till_entry_date}
        where account_id = ${account_id} and cash_id = ${cash.id}`
        connection.query(sql, function(err, result) {
          callback(err, result)
        });
      } else {
        var error = new Error('Cash record not found')
        callback(err, null)
      }
    }
  });

}

function dropCash(drop_amount, account_id, user_id) {
  var drop_time = Date.now()
  var sql = `select id from cash where account_id = ${account_id} and
  day_opened = true and day_closed = false order by opening_date desc`
  connection.query(sql, function(err, result) {
    if(err) callback(err, null)
    else {
      var cash = result[0]
      if(cash) {
        sql = `insert into cash_drop (amount, drop_time, drop_by, cash_id)
        values (${drop_amount}, ${drop_time}, ${user_id}, ${cash.id})`
        connection.query(sql, function(err, result) {
          callback(err, result)
        });
      } else {
        var error = new Error('Cash record not found')
        callback(err, null)
      }
    }
  });
}

function getCashDrops(account_id) {
  var sql = `select * from cash where account_id = ${account_id} and
  day_opened = true and day_closed = false order by opening_date desc`
  connection.query(sql, function(err, result) {
    if(err) callback(err, null)
    else {
      var cash = result[0]
      if(cash) {
        sql = `select * from cash_drop where cash_id = ${cash.id} order by drop_time desc`
        connection.query(sql, function(err, result) {
          if(err)  callback(err, null)
          else {
            cash.drops = result
            callback(err, cash)
          }
        });
      } else {
        var error = new Error('Cash record not found for cash drops')
        callback(err, null)
      }
    }
  });
}

module.exports = {
  createCashOpen,
  updateCashClose,
  endDay,
  dropCash,
  getCashDrops
}
