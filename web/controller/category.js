var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function index(req, res) {
  var categories = [
    //this is an array of all categories
      {
       "categoryId": 0,
       "active": "true",
       "categoryName": "Shirts",
       "categoryColor": "yellow",
       //shortName will be generated from category name using first 2 characters or categoryName
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     },
     {
       "categoryId": 1,
       "active": "true",
       "categoryName": "Pants",
       "categoryColor": "blue",
       //shortName will be generated from category name using first 2 characters or categoryName
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     },
     {
       "categoryId": 2,
       "active": "true",
       "categoryName": "Accessories",
       "categoryColor": "purple",
       //shortName will be generated from category name using first 2 characters or categoryName
       "image": "data:image/jpeg;base64,/9j/4RiDRXhpZgAATU0AKgA"
     }
  ]
  return res.status(200).json({
    success: true,
    message: 'Category list',
    data: categories,
    status: 200
  })
}


function edit(req, res) {
  var id = req.params.id
  var category = {
    "categoryId": 55555,  //if new category system with generate with next number
    "active": "true",
    "categoryName": "",
    "categoryColor": "",
    "image": ""
  }
  return res.status(200).json({
    success: true,
    message: 'Category by id',
    data: category,
    status: 200
  })
}

function create(req, res) {
  var payload = req.body
  // fake load
  payload = {
    "categoryId": 55555,  //if new category system with generate with next number
    "active": "true",
    "categoryName": "",
    "categoryColor": "",
    "image": ""
  }

  return res.status(200).json({
    success: true,
    message: 'Category created successfully',
    status: 200
  })
}


function update(req, res) {
  var id = req.params.id
  var payload = req.body

  // fake category
  payload = {
    "categoryId": 55555,  //if new category system with generate with next number
    "active": "true",
    "categoryName": "",
    "categoryColor": "",
    "image": ""
  }

  return res.status(200).json({
    success: true,
    message: 'Category updated successfully',
    status: 200
  })
}


module.exports = {
  index,
  edit,
  create,
  update
}
