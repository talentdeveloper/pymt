var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function index(req, res) {
  var items = { allItems: [
        {
          "itemId": 0,
          "itemName": "",
          "soldByWeight": "true",
          "trackInventory": "",
          "allowBackorder": "",
          "isTaxable": "",
          "isEBT": "",
          "isFSA": "",
          "selectors": {
            "selectorId": 0,
            "selectorName": "",
            "details": [
              {
                "itemId": 0, // first item in selectors details is same as base item
                "name": "small",
                "price": 0,
                "quantityRemaining": 0,
                "itemWeight": 0
              },
              {
                "itemId": 1,
                "name": "medium",
                "price": 0,
                "quantityRemaining": 0,
                "itemWeight": 0
              },
              {
                "itemId": 2,
                "name": "large",
                "price": 0,
                "quantityRemaining": 0,
                "itemWeight": 0
              }
            ]
          },
          "modifiers": { "modifierList": 16, "modifierList": 1 },
        },
        {
          "itemId": "",
          "itemName": "",
          "price": 0,
          "hasWeight": "true",
          "itemWeight": .5,
          "trackInventory": "",
          "quantityRemaining": 0,
          "allowBackorder": "true",
          "isTaxable": "true",
          "isEBT": "false",
          "isFSA": "false",
          "selectors": {},
          "modifiers": {},
        }
    ]
  }
  return res.status(200).json({
    success: true,
    message: 'Item list',
    data: items,
    status: 200
  })
}


function edit(req, res) {
  var id = req.params.id

  var item = {
    "itemId": 0,
    "itemName": "",
    "soldByWeight": "true",
    "trackInventory": "",
    "allowBackorder": "",
    "isTaxable": "",
    "isEBT": "",
    "isFSA": "",
    "selectors": {
      "selectorId": 0,
      "selectorName": "",
      "details": [
        {
          "itemId": 0, // first item in selectors details is same as base item
          "name": "small",
          "price": 0,
          "quantityRemaining": 0,
          "itemWeight": 0
        },
        {
          "itemId": 1,
          "name": "medium",
          "price": 0,
          "quantityRemaining": 0,
          "itemWeight": 0
        },
        {
          "itemId": 2,
          "name": "large",
          "price": 0,
          "quantityRemaining": 0,
          "itemWeight": 0
        }
      ]
    },
    "modifiers": { "modifierList": 16, "modifierList": 1 },
  }

  return res.status(200).json({
    success: true,
    message: 'Item by id',
    data: item,
    status: 200
  })
}

function create(req, res) {
  var payload = req.body
  // fake load
  payload = {
    "itemId": "", //if new item system will generate with next number and starts at 5 numbers long
    "itemName": "",
    "soldByWeight": "true",
    "trackInventory": "",
    "allowBackorder": "",
    "isTaxable": "",
    "isEBT": "",
    "isFSA": "",
    "selectors": {
      "selectorId": 0,
      "selectorName": "",
      "details": [
        {
          "itemId": 0,
          "name": null,
          "cost": 0,
          "price": 0,
          "quantityRemaining": 0,
          "itemWeight": 0
        }
      ]
    },
    "modifiers": { "modifierList": 16, "modifierList": 1 },
  }

  return res.status(200).json({
    success: true,
    message: 'Item created successfully',
    status: 200
  })
}


function update(req, res) {
  var id = req.params.id
  var payload = req.body

  // fake item
  payload = {
    "itemId": "12345", //if new item system will generate with next number and starts at 5 numbers long
    "itemName": "",
    "soldByWeight": "true",
    "trackInventory": "",
    "allowBackorder": "",
    "isTaxable": "",
    "isEBT": "",
    "isFSA": "",
    "selectors": {
      "selectorId": 0,
      "selectorName": "",
      "details": [
        {
          "itemId": 0,
          "name": null,
          "cost": 0,
          "price": 0,
          "quantityRemaining": 0,
          "itemWeight": 0
        }
      ]
    },
    "modifiers": { "modifierList": 16, "modifierList": 1 },
  }

  return res.status(200).json({
    success: true,
    message: 'Item updated successfully',
    status: 200
  })
}


module.exports = {
  index,
  edit,
  create,
  update
}
