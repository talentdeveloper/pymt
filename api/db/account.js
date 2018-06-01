var connection = require('../config/connection.js');

function getAccountNames(callback) {
  var sql = 'select * from account'
  connection.query(sql, function(err, result) {
    callback(err, result)
  });
}

function getAllAccounts(callback) {
  var sql = 'select * from account'
  connection.query(sql, function(err, accounts) {
    if(err) callback(err, null)
    else {
      if(accounts && accounts.length) {
        accounts = accounts.map(account => ({
          "id": account.id,
          "physicalAddress": account.address,
          "street2": account.street,
          "city": account.city,
          "state": account.state,
          "zip": account.zip,
          "phoneNumber": account.phone_no,
          "accountId": account.account_no,
          "merchantId": account.merchant_id,
          "deviceSettings": JSON.parse(account.device_settings),
          "preferences": {
            "tipsEnabled": account.tip_enabled,
            "barTab": account.bar_tab,
            "taxRate": account.tax_rate,
            "signatureAmount": account.signature_amount,
            "cashEnabled": account.cash_enabled,
            "discountEnabled": account.discount_enabled,
            "FSAEnabled": account.fsa_enabled,
            "EBTEnabled": account.ebt_enabled,
            "tableTab": account.table_tab,
            "tableNum": account.table_num,
            "giftCards": account.gift_cards,
            "cashDiscount": account.cash_discount
          },
        }))
        var count = accounts.length
        var getChildren = () => {
          --count
          var account = accounts[count]
          var { getAllCategory } = require('./category')
          getAllCategory(account.id, (err, categories)=> {
            if(err) callback(err, null)
            else {
              account.categories = categories.map(it => ({
                "categoryId": it.id,
                "categoryName": it.name,
                "shortName": it.short_name,
                "categoryColor": it.color,
                "image": it.image
              }))

              var { getAllUsers } = require('./user')
              getAllUsers(account.id, (err, users) => {
                if(err) callback(err, null)
                else {
                  let owner = users.filter(user => user.role_id === 1)[0]
                  if(!owner) return callback(new Error('Owner not found for account no: ' + account.account_no), null)

                  account.firstName = owner.first_name
                  account.lastName = owner.last_name
                  account.emailAddress = owner.email
                  account.userPin = owner.pin
                  account.role = owner.role_id

                  account.accountUsers = users.splice(users.indexOf(owner), 1).map(user => ({
                    "firstName": user.first_name,
                    "lastName": user.last_name,
                    "emailAddress": user.email,
                    "userPin": user.pin,
                    "userId": user.id,
                    "role": user.role_id
                  }))
                  if(count -1 != -1) getChildren()
                  else callback(err, accounts)
                }

              })

            }
          })
        }

        getChildren()

      } else {
        callback(err, [])
      }
    }
  });
}

function createAccount(account, callback) {
  var sql = `
  insert into account (
    account_no,
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
  connection.query(sql, function(err, createdAccount) {
    if(err) callback(err, null)
    else {
      var { createCategory } = require('./category')
      var categories = account.categories
      var addCategory = () => {
        var category = categories.shift()
        var cat = {
          name: category.categoryName,
          short_name: category.shortName,
          color: category.categoryColor,
          image: category.image,
          active: 1,
          account_id: createdAccount.insertId
        }
        createCategory(cat, (err, result) => {
          if(err) callback(err, null)
          else {
            if(categories.length) addCategory()
            else {

              var users = account.accountUsers
              users.unshift({
                "firstName": account.firstName,
                "lastName": account.lastName,
                "emailAddress": account.emailAddress,
                "password": account.password,
                "userPin": account.userPin,
                "userId": account.merchantId,
                "role": account.role
              })
              var addUser = () => {
                var user = users.shift()
                var usr = {
                  first_name: user.firstName,
                  last_name: user.lastName,
                  email: user.emailAddress,
                  password: user.password,
                  pin: user.userPin,
                  role_id: user.role,
                  account_id: createdAccount.insertId
                }

                var { createAuth0User } = require('../helper/auth0')
                createAuth0User(usr, (err, result) => {
                  if(err) callback(err, null)
                  else {

                    usr.auth0_user_id = result.user_id

                    var { createUser } = require('./user')
                    createUser(usr, (err, result) => {
                      if(err) callback(err, null)
                      else {
                        if(users.length) addUser()
                        else {
                          callback(err, result)
                        }
                      }
                    })
                  }
                })
              }
              addUser()
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
  getAllAccounts,
  createAccount
}
