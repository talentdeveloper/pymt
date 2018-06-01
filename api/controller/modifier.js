var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function index(req, res) {
  var modifiers = { allModifiers: [
    //this is an array of all modifierLists
        {
        "modifierId": 0,
        "modifierName": "condiments",
        "modifiers": {
          "Cheese": 0.25,
          "Lettuce": null,
          "Tomato": null,
          "Onion": null,
          "Mayo": null,
          "Ketchup": null,
          "Mustard": null,
          "Pickle": null
          }
        },
        {
        "modifierId": 1,
        "modifierName": "extras",
        "modifiers": {
          "To Go": null,
          "Pickup": null,
          "Dine in": null,
          }
        }
    ]
  }
  return res.status(200).json({
    success: true,
    message: 'Modifier list',
    data: modifiers,
    status: 200
  })
}


function edit(req, res) {
  var id = req.params.id
  var modifier = {
    "modifierId": 0, //if new modifier system will generate with next sequential number
    "modifierName": "condiments",
    "modifiers": {
      "Cheese": 0.25,
      "Lettuce": null,
      "Tomato": null,
      "Onion": null,
      "Mayo": null,
      "Ketchup": null,
      "Mustard": null,
      "Pickle": null
      }
  }
  return res.status(200).json({
    success: true,
    message: 'Modifier by id',
    data: modifier,
    status: 200
  })
}

function create(req, res) {
  var payload = req.body
  // fake load
  payload = {
    "modifierId": 0, //if new modifier system will generate with next sequential number
    "modifierName": "condiments",
    "modifiers": {
      "Cheese": 0.25,
      "Lettuce": null,
      "Tomato": null,
      "Onion": null,
      "Mayo": null,
      "Ketchup": null,
      "Mustard": null,
      "Pickle": null
      }
  }

  return res.status(200).json({
    success: true,
    message: 'Modifier created successfully',
    status: 200
  })
}


function update(req, res) {
  var id = req.params.id
  var payload = req.body

  // fake modifier
  payload = {
    "modifierId": 0, //if new modifier system will generate with next sequential number
    "modifierName": "condiments",
    "modifiers": {
      "Cheese": 0.25,
      "Lettuce": null,
      "Tomato": null,
      "Onion": null,
      "Mayo": null,
      "Ketchup": null,
      "Mustard": null,
      "Pickle": null
      }
  }

  return res.status(200).json({
    success: true,
    message: 'Modifier updated successfully',
    status: 200
  })
}


module.exports = {
  index,
  edit,
  create,
  update
}
