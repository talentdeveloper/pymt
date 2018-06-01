var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function index(req, res) {
  var auth = req.headers.authorization
  if(!auth || auth.indexOf('Bearer ') !== 0) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized request',
      status: 401
    })
  }
  var jwtToken = auth.split(' ')[1]
  try {
    var currentUser = jwt.verify(jwtToken, config.secret)
    var { getAllAccounts } = require('../db/account')

    getAllAccounts((err, accounts)=> {
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Account list',
        data: accounts,
        status: 200
      })
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      status: 400
    })
  }

}


function edit(req, res) {
  var id = req.params.id

  var account = {
    "firstName": "Matthew",
    "lastName": "Sheets",
    "emailAddress": "matt@mattsheets.com",
    "password": "Copyright@2018",
    "physicalAddress": "123 Main St",
    "street2": "Ste 100",
    "city": "Birmingham",
    "state": "AL",
    "zip": "123456",
    "phoneNumber": "999-999-9999",
    "accountId": 1234,
    "userPin": "1234",
    "role": 1, //"owner",
    "merchantId": 98989,
    "deviceSettings": {
      "1": {
        "UUID": "",
        "printer": "",
        "kds": "",
        "kitchenPrinter": "",
      },
      "2": {
        "UUID": "",
        "printer": "",
        "kds": "",
        "kitchenPrinter": "",
      },
    },
    "preferences": {
      "tipsEnabled": "true",
      "barTab": "true",
      "taxRate": 7,
      "signatureAmount": 25,
      "cashEnabled": "true",
      "discountEnabled": "true",
      "FSAEnabled": "true",
      "EBTEnabled": "true",
      "tableTab": "true",
      "tableNum": "true",
      "giftCards": "true",
      "cashDiscount": "true"
    },
    "categories": [
      {
       "categoryId": 0,
       "categoryName": "Shirts",
       "shortName": "Sh",
       "categoryColor": "yellow",
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     },
     {
       "categoryId": 0,
       "categoryName": "Pants",
       "shortName": "Pa",
       "categoryColor": "blue",
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     },
     {
       "categoryId": 0,
       "categoryName": "Accessories",
       "shortName": "Ac",
       "categoryColor": "purple",
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     }
    ],
     "accountUsers": [
      {
        "firstName": "Matthew",
        "lastName": "Sheets",
        "emailAddress": "matt@mattsheets.com",
        "password": "Copyright@2018",
        "userPin": "1234",
        "userId": 1234,
        "role": 2 //"Manager"
     }
    ]
  }

  return res.status(200).json({
    success: true,
    message: 'Account by id',
    data: account,
    status: 200
  })
}

function create(req, res) {
  var auth = req.headers.authorization
  if(!auth || auth.indexOf('Bearer ') !== 0) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized request',
      status: 401
    })
  }
  var jwtToken = auth.split(' ')[1]
  try {
    var currentUser = jwt.verify(jwtToken, config.secret)
    var { createAccount } = require('../db/account')

    var payload = req.body
    // fake load
    payload = {
      "firstName": "Matthew",
      "lastName": "Sheets",
      "emailAddress": "matt@mattsheets.com",
      "password": "Copyright@2018",
      "physicalAddress": "123 Main St",
      "street2": "Ste 100",
      "city": "Birmingham",
      "state": "AL",
      "zip": "123456",
      "phoneNumber": "999-999-9999",
      "accountId": 1234,
      "userPin": "1234",
      "role": 1, //"owner",
      "merchantId": Math.floor(Math.random(Date.now())*100000),
      "deviceSettings": {
        "1": {
          "UUID": "",
          "printer": "",
          "kds": "",
          "kitchenPrinter": "",
        },
        "2": {
          "UUID": "",
          "printer": "",
          "kds": "",
          "kitchenPrinter": "",
        },
      },
      "preferences": {
        "tipsEnabled": "true",
        "barTab": "true",
        "taxRate": 7,
        "signatureAmount": 25,
        "cashEnabled": "true",
        "discountEnabled": "true",
        "FSAEnabled": "true",
        "EBTEnabled": "true",
        "tableTab": "true",
        "tableNum": "true",
        "giftCards": "true",
        "cashDiscount": "true"
      },
      "categories": [
        {
         "categoryId": 0,
         "categoryName": "Shirts",
         "shortName": "Sh",
         "categoryColor": "yellow",
         "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
       },
       {
         "categoryId": 0,
         "categoryName": "Pants",
         "shortName": "Pa",
         "categoryColor": "blue",
         "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
       },
       {
         "categoryId": 0,
         "categoryName": "Accessories",
         "shortName": "Ac",
         "categoryColor": "purple",
         "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
       }
      ],
       "accountUsers": [
        {
          "firstName": "Kthrine",
          "lastName": "Zeta",
          "emailAddress": "kettren@universalstudio.com",
          "password": "Copyright@2018",
          "userPin": "1234",
          "userId": 1234,
          "role": 2, //"Manager"
       }
      ]
    }

    createAccount(payload, (err, result)=>{
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Account created successfully',
        status: 200
      })
    })
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
      status: 400
    })
  }
}


function update(req, res) {
  var id = req.params.id
  var payload = req.body

  // fake account
  var payload = {
    "firstName": "Matthew",
    "lastName": "Sheets",
    "emailAddress": "matt@mattsheets.com",
    "physicalAddress": "123 Main St",
    "street2": "Ste 100",
    "city": "Birmingham",
    "state": "AL",
    "zip": "123456",
    "phoneNumber": "999-999-9999",
    "accountId": 1234,
    "userPin": "1234",
    "role": 1, //"owner",
    "merchantId": 98989,
    "deviceSettings": "UUID",
    "preferences": {
      "tipsEnabled": "true",
      "barTab": "true",
      "taxRate": 7,
      "signatureAmount": 25,
      "cashEnabled": "true",
      "discountEnabled": "true",
      "FSAEnabled": "true",
      "EBTEnabled": "true",
      "tableTab": "true",
      "tableNum": "true",
      "giftCards": "true",
      "cashDiscount": "true"
    },
    "categories": [
      {
       "categoryId": 0,
       "categoryName": "Shirts",
       "shortName": "Sh",
       "categoryColor": "yellow",
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     }
    ],
      "accountUsers": [
        {
          "firstName": "Matthew",
          "lastName": "Sheets",
          "emailAddress": "matt@mattsheets.com",
          "userPin": "1234",
          "userId": 1234,   //if new account system with generate with next number
          "role": 2, //"Manager",
          "password": "djskladjalk"   //optional used to reset or create new users

       }
      ]
  }

  return res.status(200).json({
    success: true,
    message: 'Account updated successfully',
    status: 200
  })
}


module.exports = {
  index,
  edit,
  create,
  update
}
