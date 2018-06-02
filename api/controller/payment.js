var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');
var moment = require('moment');

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
    var payload = req.body
    // fake payload
    // payload = {
    //   orderObj: {
    //     "orderDate": moment(new Date("2018-05-21T22:14:05.255Z")).format('YYYY-MM-DD HH:mm:ss'),
    //     "orderType": 'CASH_ON_DELIVERY',
    //     "tableNumber": 12,
    //     "transactionId": '7638', //cartNumber is unique across platform assigned new if null
    //     "orderStatus": "CART",
    //     "cartTotal": 7.34,
    //     "discountPercent": "0",
    //     "discountAmount": 0,
    //     "itemQuantity": 5,
    //     "items": [
    //       {
    //         "itemId": 40,
    //         "name": "Cheeseburger Small",
    //         "price": 3.00,
    //         "quantity": 1,
    //         "isTaxable": false,
    //         "isEBT": true,
    //         "isFSA": true,
    //         "modifiers": {
    //         "Cheese": 0.5,
    //         "Tomato": 0
    //         }
    //       },
    //       {
    //         "itemId": 41,
    //         "name": "Cheeseburger Medium",
    //         "price": 4.00,
    //         "quantity": 2,
    //         "isTaxable": true,
    //         "isEBT": false,
    //         "isFSA": false,
    //         "modifiers": {}
    //       },
    //     ],
    //     "payment": {
    //       "paymentType": "charge",
    //       "signature": "base64Sting",
    //       "amountTendered": 20,
    //       "changeGiven": 17.66,
    //       "xmp": `<xmp>
    //       <response>
    //       <RefId>102</RefId>
    //       <ResultCode>0</ResultCode>
    //       <RespMSG>APPROVAL%2000</RespMSG>
    //       <Message>Approved</Message>
    //       <AuthCode>005805</AuthCode>
    //       <PNRef>8139012057895</PNRef>
    //       <PaymentType>Credit</PaymentType>
    //       <TransType>Sale</TransType>
    //       <SN>9890</SN>
    //       <ExtData>Amount=,InvNum=2,CardType=VISA,BatchNum=101,Tip=0.00,CashBack=0.00,Fee=0.04,AcntLast4=4504,Name=SHEETS%2fMATTHEW%20%20%20%20%20%20%20%20%20%20%20%20,SVC=0.00,TotalAmt=1.04,DISC=0.00,Donation=0.00,SHFee=0.00,RwdPoints=0,RwdBalance=0,RwdIssued=,EBTFSLedgerBalance=,EBTFSAvailBalance=,EBTFSBeginBalance=,EBTCashLedgerBalance=,EBTCashAvailBalance=,EBTCashBeginBalance=,RewardCode=,AcqRefData=,ProcessData=,RefNo=,RewardQR=,Language=English,EntryType=CHIP,table_num=0,clerk_id=,ticket_num=,ControlNum=,TaxCity=0.00,TaxState=0.00,Cust1=,Cust1Value=,Cust2=,Cust2Value=,Cust3=,Cust3Value=,AcntFirst4=4240,TaxAmount=0.00</ExtData>
    //       <EMVData>AID=A0000000031010,AppName=VISA DEBIT,TVR=8080008800,TSI=6800,IAD=3078F1B9AD6222CF3030,ARC=00</EMVData>
    //       <Receipt>Merchant</Receipt>
    //       <CVMResult>2</CVMResult>
    //       </response>
    //       </xmp>`
    //     },
    //     "tip": {
    //       "amount": 3.25,
    //       "user": "",
    //       "approvalCode": ""
    //     }
    //   }
    // }

    if(!payload.orderObj || !payload.orderObj.payment) {
      return res.status(400).json({
        success: false,
        message: new Error('Inappropriate request params'),
        status: 400
      })
    }
    payload.account_id = currentUser.accountId

    var { createPayment } = require('../db/payment')

    createPayment(payload, (err, result)=>{
      if(err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          status: 400
        })
      }
      return res.status(200).json({
        success: true,
        message: 'Payment created successfully',
        status: 200
      })
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      success: false,
      message: err.message,
      status: 400
    })
  }

}


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


module.exports = {
  create,
  send
}
