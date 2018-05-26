var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function index(req, res) {
  var accounts = [
    // This is an array of all users
    //User 1:
    {
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
      "role": "owner",
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
          "userPin": "1234",
          "userId": 1234,
          "role": "Manager"
       }
      ]
    },
    //User 2:
    {
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
      "role": "owner",
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
          "userPin": "1234",
          "userId": 1234,
          "role": "Manager"
       }
      ]
    }
  ]
  return res.status(200).json({
    success: true,
    message: 'Account list',
    data: accounts,
    status: 200
  })
}


function edit(req, res) {
  var id = req.params.id

  var account = {
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
    "role": "owner",
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
        "userPin": "1234",
        "userId": 1234,
        "role": "Manager"
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
  var payload = req.body
  // fake load
  payload = {
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
    "role": "owner",
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
     "accountUsers": [
      {
        "firstName": "Matthew",
        "lastName": "Sheets",
        "emailAddress": "matt@mattsheets.com",
        "userPin": "1234",
        "userId": 1234,
        "role": "Manager"
     }
    ]
  }

  return res.status(200).json({
    success: true,
    message: 'Account created successfully',
    status: 200
  })
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
    "role": "owner",
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
          "role": "Manager",
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
