var connection = require('../config/connection.js');

function getAccountNames(callback) {
  var sql = 'select id, company_name, merchant_id from account'
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function createAccount(account, callback) {
  var sql = `
  insert into account (
    account_id,
    phone_no,
    address,
    street,
    city,
    state,
    zip,
    country,
    merchant_id,
    device_settings,
    tip_enabled,
    bar_tab,
    tax_rate,
    signature_amount,
    cash_enabled,
    discount_enabled,
    fsa_enabled,
    ebt_enabled,
    table_tab,
    table_num,
    gift_cards,
    cash_discount
  ) values (
    '${account.accountId}',
    '${account.phoneNumber}',
    '${account.physicalAddress}',
    '${account.street2}',
    '${account.city}',
    '${account.state}',
    '${account.zip}',
    'China',
    '${account.merchantId}',
    '${JSON.stringify(account.deviceSettings)}',
    ${account.preferences.tipsEnabled},
    ${account.preferences.barTab},
    ${account.preferences.taxRate},
    ${account.preferences.signatureAmount},
    ${account.preferences.cashEnabled},
    ${account.preferences.discountEnabled},
    ${account.preferences.FSAEnabled},
    ${account.preferences.EBTEnabled},
    ${account.preferences.tableTab},
    ${account.preferences.tableNum},
    ${account.preferences.giftCards},
    ${account.preferences.cashDiscount}
  )
  `
  connection.query(sql, function(err, result) {
    if(err) callback(err, null)
    else {
      var { createCategory } = require('./category')
      var categories = account.categories
      var addCategory = () => {
        var category = categories.pop()
        var cat = {
          name: category.categoryName,
          short_name: category.shortName,
          color: category.categoryColor,
          image: category.image,
          active: 1
        }
        createCategory(cat, (err, result) => {
          if(err) callback(err, null)
          else {
            if(categories.length) addCategory()
            else {
              callback(err, result)
            }
          }
        })
      }
      addCategory()
    }
  });
}

module.exports = {
  getAccountNames,
  createAccount
}
