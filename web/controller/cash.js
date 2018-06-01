var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');

function openDay(req, res) {
  var payload = req.body
  // payload placeholder

  // payload = {
  //   "openingAmount": 455.99,
  //   "updateTime": "2018-05-21T19:06:18.537Z",
  //   "verifiedBy": "userId"
  // }
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
    if(currentUser.role > 2) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied',
        status: 401
      })
    }
    var { createCashOpen } = require('../db/cash')

    createCashOpen(payload.openingAmount, currentUser.accountId, currentUser.userId, (err, result)=> {
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Day open success',
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

function closeDay(req, res) {
  var payload = req.body
  // payload placeholder

  // payload = {
  // "closingAmount": 455.99,
  // "updateTime": "2018-05-21T19:06:18.537Z",
  // "verifiedBy": "userId"
  // }
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
    if(currentUser.role > 2) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied',
        status: 401
      })
    }
    var { updateCashClose } = require('../db/cash')

    var sales_amount = 1000 // fake sales amount
    var total_drop_amount = 400 // fake total drop amount
    updateCashClose(payload.closingAmount, sales_amount, total_drop_amount, currentUser.accountId, currentUser.userId, (err, result)=> {
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Day close success',
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

function setEODTillAmount(req, res) {
  var payload = req.body
  // payload placeholder

  // payload = {
  // "tillAmount": 455.99,
  // "updateTime": "2018-05-21T19:06:18.537Z",
  // "verifiedBy": "userId"
  // }
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
    if(currentUser.role > 2) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied',
        status: 401
      })
    }
    var { endDay } = require('../db/cash')

    endDay(payload.tillAmount, currentUser.accountId, currentUser.userId, (err, result)=> {
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      // Generate cash report and send email
      return res.status(200).json({
        success: true,
        message: 'Till amount set success and generated cash report',
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

function safeDrop(req, res) {
  var payload = req.body
  // payload placeholder

  // payload = {
  // "dropAmount": 455.99,
  // "dropTime": "2018-05-21T19:06:18.537Z",
  // "dropBy": "userId"
  // }
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
    if(currentUser.role > 2) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied',
        status: 401
      })
    }
    var { dropCash } = require('../db/cash')

    dropCash(payload.dropAmount, currentUser.accountId, currentUser.userId, (err, result)=> {
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Cash drop success',
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

function drops(account_id, callback) {
  var { getCashDrops } = require('../db/cash')

  getCashDrops(account_id, (err, cash)=> {
    if(err) {
      return callback(err, null)
    }
    var drops = cash.drops
    var total = 0
    drops = drops.map(drop, i => {
      total += drop.amount
      return {
        dropAmount: drop.amount,
        dropTime: drop.drop_time,
        dropBy: drop.drop_by
      }
    })
    var data = {
      cashDrop: {
        total: total,
        lastUpdate: drops[0].dropTime,
        drops: drops
      }
    }
    callback(null, {cash, data})
  })
}

function getCurrentCashDrops(req, res) {
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
    if(currentUser.role > 2) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied',
        status: 401
      })
    }
    drops(currentUser.accountId, (err, data)=>{
      if(err) return res.status(400).json({
        success: false,
        message: err.message,
        status: 400
      })
      return res.status(200).json({
        success: true,
        message: 'Current cash drops',
        data: data.data,
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

function getClosing(req, res) {
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
    if(currentUser.role > 2) {
      return res.status(401).json({
        success: false,
        message: 'Permission denied',
        status: 401
      })
    }
    var { getClosingAmounts } = require('../db/cash')

    drops(currentUser.accountId, (err, data)=>{
      if(err) return res.status(400).json({
        success: false,
        message: err.message,
        status: 400
      })
      var closing_amount = 2000 // fake closing
      var last_update = new Date() // fake last update date
      var closingAmount = {
        "currentOpeningAmount": data.cash.opening_amount,
        "currentClosingAmount": closing_amount,
        "lastUpdate": last_update,
        "cashDrop": data.data
      }
      return res.status(200).json({
        success: true,
        message: 'Current closing amount',
        data: closingAmount,
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


module.exports = {
  openDay,
  closeDay,
  setEODTillAmount,
  safeDrop,
  getCurrentCashDrops,
  getClosing
}
