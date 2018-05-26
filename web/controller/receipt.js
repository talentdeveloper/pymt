function send(req, res) {
  var contact = req.params.contact  //"email@email.com" or "999-999-9999"
  var order = req.body
  // fake order
  order = {
    orderObj: {
      "cartTotal": 0,
      "itemQuantity": 5,
      "items": [
        {
          "itemId": "",
          "itemName": "",
          "quantity": 3,
          "price": 0,
          "itemWeight": .5,
          "trackInventory": "",
          "quantityRemaining": 0,
          "isTaxable": "true",
          "isEBT": "false",
          "isFSA": "false",
          "isWeight": "true",
          "selectors": {
            "itemSize": {
              "Small": 0,
              "Medium": 0,
              "Large": 0
            }
          },
          "modifiers": {
            "Cheese": 0,
            "Lettuce": 0,
            "Tomato": 0,
            "Onion": 0,
            "Mayo": 0,
            "Ketchup": 0,
            "Mustard": 0,
            "Pickle": 0
          }
        },
        {
          "itemId": "",
          "itemName": "",
          "quantity": 2,
          "price": 0,
          "trackInventory": "",
          "quantityRemaining": 0,
          "isTaxable": "true",
        }
      ],
      "payment": {
        "paymentType": "cash",
        "amountTendered": 20,
        "changeGiven": 17.66,
        "xmp": "null"
      }
    }
  }

  // send receipt to email ro sms

  return res.status(200).json({
    success: true,
    message: 'Receipt sent successfully',
    status: 200
  })
}


function deliver(req, res) {
  var contact = req.params.contact  //"email@email.com" or "999-999-9999"
  var order = JSON.parse(req.params.order)
  // fake order
  order = {
    orderObj: {
      "cartTotal": 0,
      "itemQuantity": 5,
      "items": [
        {
          "itemId": "",
          "itemName": "",
          "quantity": 3,
          "price": 0,
          "itemWeight": .5,
          "trackInventory": "",
          "quantityRemaining": 0,
          "isTaxable": "true",
          "isEBT": "false",
          "isFSA": "false",
          "isWeight": "true",
          "selectors": {
            "itemSize": {
              "Small": 0,
              "Medium": 0,
              "Large": 0
            }
          },
          "modifiers": {
            "Cheese": 0,
            "Lettuce": 0,
            "Tomato": 0,
            "Onion": 0,
            "Mayo": 0,
            "Ketchup": 0,
            "Mustard": 0,
            "Pickle": 0
          }
        },
        {
          "itemId": "",
          "itemName": "",
          "quantity": 2,
          "price": 0,
          "trackInventory": "",
          "quantityRemaining": 0,
          "isTaxable": "true",
        }
      ],
      "payment": {
        "paymentType": "cash",
        "amountTendered": 20,
        "changeGiven": 17.66,
        "xmp": "null"
      }
    }
  }

  // send receipt to email ro sms

  return res.status(200).json({
    success: true,
    message: 'Receipt sent successfully',
    status: 200
  })
}

module.exports = {
  send,
  deliver
}
