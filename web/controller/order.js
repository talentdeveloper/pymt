var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');
var moment = require('moment');

function index(req, res) {
  var orders = [
    //This is an array of all orders
    {
      "orderDate": "2018-05-21T22:14:05.255Z",
      "transactionId": 29384, //transactionId is random and unique accross platform not just one account
      "orderStatus": "PAID",
      "cartTotal": 7.34,
      "discountPercent": "0",
      "discountAmount": 0,
      "itemQuantity": 5,
      //payment type charge
      orderObj:
      {
        "orderDate": "2018-05-21T22:14:05.255Z",
        "orderType": "delivery",
        "tableNumber": 12,
        "transactionId": 29384, //transactionId is sequential and unique
        "orderStatus": "PAID",
        "cartTotal": 7.34,
        "discountPercent": "0",
        "discountAmount": 0,
        "itemQuantity": 5,
        "items": [
          {
            "itemId": 0,
            "name": "Cheeseburger-small",
            "price": 3.00,
            "quantity": 1,
            "isTaxable": "",
            "isEBT": "",
            "isFSA": "",
            "modifiers": {
            "Cheese": 0.5,
            "Tomato": 0
             }
          },
          {
            "itemId": 0,
            "name": "Cheeseburger-medium",
            "price": 4.00,
            "quantity": 2,
            "isTaxable": "",
            "isEBT": "",
            "isFSA": "",
            "modifiers": {}
          },
        ],
        "payment": {
          "paymentType": "charge",
          "amountTendered": 20,
          "changeGiven": 17.66,
          "xmp": `
          <xmp>
          <response>
          <RefId>102</RefId>
          <ResultCode>0</ResultCode>
          <RespMSG>APPROVAL%2000</RespMSG>
          <Message>Approved</Message>
          <AuthCode>005805</AuthCode>
          <PNRef>8139012057895</PNRef>
          <PaymentType>Credit</PaymentType>
          <TransType>Sale</TransType>
          <SN>9890</SN>
          <ExtData>Amount=,InvNum=2,CardType=VISA,BatchNum=101,Tip=0.00,CashBack=0.00,Fee=0.04,AcntLast4=4504,Name=SHEETS%2fMATTHEW%20%20%20%20%20%20%20%20%20%20%20%20,SVC=0.00,TotalAmt=1.04,DISC=0.00,Donation=0.00,SHFee=0.00,RwdPoints=0,RwdBalance=0,RwdIssued=,EBTFSLedgerBalance=,EBTFSAvailBalance=,EBTFSBeginBalance=,EBTCashLedgerBalance=,EBTCashAvailBalance=,EBTCashBeginBalance=,RewardCode=,AcqRefData=,ProcessData=,RefNo=,RewardQR=,Language=English,EntryType=CHIP,table_num=0,clerk_id=,ticket_num=,ControlNum=,TaxCity=0.00,TaxState=0.00,Cust1=,Cust1Value=,Cust2=,Cust2Value=,Cust3=,Cust3Value=,AcntFirst4=4240,TaxAmount=0.00</ExtData>
          <EMVData>AID=A0000000031010,AppName=VISA DEBIT,TVR=8080008800,TSI=6800,IAD=3078F1B9AD6222CF3030,ARC=00</EMVData>
          <Receipt>Merchant</Receipt>
          <CVMResult>2</CVMResult>
          </response>
          </xmp>
          `
          },
          "tip": {
            "amount": 3.25,
            "user": "",
            "approvalCode": ""
          }
      }
    }
  ]

  return res.status(200).json({
    success: true,
    message: 'Order list',
    data: orders,
    status: 200
  })
}

function simple(req, res) {
  var orders = [
    {
      "orderDate": "2018-05-21T22:14:05.255Z",
      "transactionId": 29384, //transactionId is random and unique accross platform not just one account
      "orderStatus": "PAID",
      "cartTotal": 7.34,
      "discountPercent": "0",
      "discountAmount": 0,
      "itemQuantity": 5,
    },
    {
      "orderDate": "2018-05-21T22:14:05.255Z",
      "transactionId": 29384, //transactionId is random and unique accross platform not just one account
      "orderStatus": "PAID",
      "cartTotal": 7.34,
      "discountPercent": "0",
      "discountAmount": 0,
      "itemQuantity": 5,
    }
  ]
  return res.status(200).json({
    success: true,
    message: 'Order Simple list',
    data: orders,
    status: 200
  })
}

function edit(req, res) {
  var id = req.params.id
  var order = {
    "orderDate": "2018-05-21T22:14:05.255Z",
    "transactionId": 29384, //transactionId is random and unique accross platform not just one account
    "orderStatus": "PAID",
    "cartTotal": 7.34,
    "discountPercent": "0",
    "discountAmount": 0,
    "itemQuantity": 5,
    //payment type charge
    orderObj:
    {
      "orderDate": "2018-05-21T22:14:05.255Z",
      "orderType": "delivery",
      "tableNumber": 12,
      "transactionId": 29384, //transactionId is sequential and unique
      "orderStatus": "PAID",
      "cartTotal": 7.34,
      "discountPercent": "0",
      "discountAmount": 0,
      "itemQuantity": 5,
      "items": [
        {
          "itemId": 0,
          "name": "Cheeseburger-small",
          "price": 3.00,
          "quantity": 1,
          "isTaxable": "",
          "isEBT": "",
          "isFSA": "",
          "modifiers": {
          "Cheese": 0.5,
          "Tomato": 0
           }
        },
        {
          "itemId": 0,
          "name": "Cheeseburger-medium",
          "price": 4.00,
          "quantity": 2,
          "isTaxable": "",
          "isEBT": "",
          "isFSA": "",
          "modifiers": {}
        },
      ],
      "payment": {
        "paymentType": "charge",
        "amountTendered": 20,
        "changeGiven": 17.66,
        "xmp": `
        <xmp>
        <response>
        <RefId>102</RefId>
        <ResultCode>0</ResultCode>
        <RespMSG>APPROVAL%2000</RespMSG>
        <Message>Approved</Message>
        <AuthCode>005805</AuthCode>
        <PNRef>8139012057895</PNRef>
        <PaymentType>Credit</PaymentType>
        <TransType>Sale</TransType>
        <SN>9890</SN>
        <ExtData>Amount=,InvNum=2,CardType=VISA,BatchNum=101,Tip=0.00,CashBack=0.00,Fee=0.04,AcntLast4=4504,Name=SHEETS%2fMATTHEW%20%20%20%20%20%20%20%20%20%20%20%20,SVC=0.00,TotalAmt=1.04,DISC=0.00,Donation=0.00,SHFee=0.00,RwdPoints=0,RwdBalance=0,RwdIssued=,EBTFSLedgerBalance=,EBTFSAvailBalance=,EBTFSBeginBalance=,EBTCashLedgerBalance=,EBTCashAvailBalance=,EBTCashBeginBalance=,RewardCode=,AcqRefData=,ProcessData=,RefNo=,RewardQR=,Language=English,EntryType=CHIP,table_num=0,clerk_id=,ticket_num=,ControlNum=,TaxCity=0.00,TaxState=0.00,Cust1=,Cust1Value=,Cust2=,Cust2Value=,Cust3=,Cust3Value=,AcntFirst4=4240,TaxAmount=0.00</ExtData>
        <EMVData>AID=A0000000031010,AppName=VISA DEBIT,TVR=8080008800,TSI=6800,IAD=3078F1B9AD6222CF3030,ARC=00</EMVData>
        <Receipt>Merchant</Receipt>
        <CVMResult>2</CVMResult>
        </response>
        </xmp>
        `
        },
        "tip": {
          "amount": 3.25,
          "user": "",
          "approvalCode": ""
        }
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Order by id',
    data: order,
    status: 200
  })
}

function create(req, res) {
  var payload = req.body
  // fake payload
  payload = {
    //payment type charge
    orderObj:
    {
      "orderDate": "2018-05-21T22:14:05.255Z",
      "orderType": "delivery",
      "tableNumber": 12,
      "transactionId": 29384, //transactionId is sequential and unique
      "orderStatus": "PAID",
      "cartTotal": 7.34,
      "discountPercent": "0",
      "discountAmount": 0,
      "itemQuantity": 5,
      "items": [
        {
          "itemId": 0,
          "name": "Cheeseburger-small",
          "price": 3.00,
          "quantity": 1,
          "isTaxable": "",
          "isEBT": "",
          "isFSA": "",
          "modifiers": {
          "Cheese": 0.5,
          "Tomato": 0
           }
        },
        {
          "itemId": 0,
          "name": "Cheeseburger-medium",
          "price": 4.00,
          "quantity": 2,
          "isTaxable": "",
          "isEBT": "",
          "isFSA": "",
          "modifiers": {}
        },
      ],
      "payment": {
        "paymentType": "charge",
        "amountTendered": 20,
        "changeGiven": 17.66,
        "xmp": `
        <xmp>
        <response>
        <RefId>102</RefId>
        <ResultCode>0</ResultCode>
        <RespMSG>APPROVAL%2000</RespMSG>
        <Message>Approved</Message>
        <AuthCode>005805</AuthCode>
        <PNRef>8139012057895</PNRef>
        <PaymentType>Credit</PaymentType>
        <TransType>Sale</TransType>
        <SN>9890</SN>
        <ExtData>Amount=,InvNum=2,CardType=VISA,BatchNum=101,Tip=0.00,CashBack=0.00,Fee=0.04,AcntLast4=4504,Name=SHEETS%2fMATTHEW%20%20%20%20%20%20%20%20%20%20%20%20,SVC=0.00,TotalAmt=1.04,DISC=0.00,Donation=0.00,SHFee=0.00,RwdPoints=0,RwdBalance=0,RwdIssued=,EBTFSLedgerBalance=,EBTFSAvailBalance=,EBTFSBeginBalance=,EBTCashLedgerBalance=,EBTCashAvailBalance=,EBTCashBeginBalance=,RewardCode=,AcqRefData=,ProcessData=,RefNo=,RewardQR=,Language=English,EntryType=CHIP,table_num=0,clerk_id=,ticket_num=,ControlNum=,TaxCity=0.00,TaxState=0.00,Cust1=,Cust1Value=,Cust2=,Cust2Value=,Cust3=,Cust3Value=,AcntFirst4=4240,TaxAmount=0.00</ExtData>
        <EMVData>AID=A0000000031010,AppName=VISA DEBIT,TVR=8080008800,TSI=6800,IAD=3078F1B9AD6222CF3030,ARC=00</EMVData>
        <Receipt>Merchant</Receipt>
        <CVMResult>2</CVMResult>
        </response>
        </xmp>
        `
        },
        "tip": {
          "amount": 3.25,
          "user": "",
          "approvalCode": ""
        }
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    status: 200
  })
}

function update(req, res) {
  var id = req.params.id
  var payload = req.body
  // fake payload
  payload = {
    orderObj: {
      "transactionId": 29384, //transactionId is random and unique accross platform not just one account
      "orderStatus": "PAID",
      "payment": {
        "paymentType": "charge",
        "amountTendered": 20,
        "changeGiven": 17.66,
        "xmp": `
        <xmp>
        <response>
        <RefId>102</RefId>
        <ResultCode>0</ResultCode>
        <RespMSG>APPROVAL%2000</RespMSG>
        <Message>Approved</Message>
        <AuthCode>005805</AuthCode>
        <PNRef>8139012057895</PNRef>
        <PaymentType>Credit</PaymentType>
        <TransType>Sale</TransType>
        <SN>9890</SN>
        <ExtData>Amount=,InvNum=2,CardType=VISA,BatchNum=101,Tip=0.00,CashBack=0.00,Fee=0.04,AcntLast4=4504,Name=SHEETS%2fMATTHEW%20%20%20%20%20%20%20%20%20%20%20%20,SVC=0.00,TotalAmt=1.04,DISC=0.00,Donation=0.00,SHFee=0.00,RwdPoints=0,RwdBalance=0,RwdIssued=,EBTFSLedgerBalance=,EBTFSAvailBalance=,EBTFSBeginBalance=,EBTCashLedgerBalance=,EBTCashAvailBalance=,EBTCashBeginBalance=,RewardCode=,AcqRefData=,ProcessData=,RefNo=,RewardQR=,Language=English,EntryType=CHIP,table_num=0,clerk_id=,ticket_num=,ControlNum=,TaxCity=0.00,TaxState=0.00,Cust1=,Cust1Value=,Cust2=,Cust2Value=,Cust3=,Cust3Value=,AcntFirst4=4240,TaxAmount=0.00</ExtData>
        <EMVData>AID=A0000000031010,AppName=VISA DEBIT,TVR=8080008800,TSI=6800,IAD=3078F1B9AD6222CF3030,ARC=00</EMVData>
        <Receipt>Merchant</Receipt>
        <CVMResult>2</CVMResult>
        </response>
        </xmp>
        `
      }
    }
  }
  return res.status(200).json({
    success: true,
    message: 'Order status updated successfully',
    status: 200
  })
}

function payment(req, res) {
  var payload = req.body
  // fake payload
  payload = {
    "payment": {
      "paymentType": "charge",
      "amountTendered": 20,
      "changeGiven": 17.66,
      "xmp": `
      <xmp>
      <response>
      <RefId>102</RefId>
      <ResultCode>0</ResultCode>
      <RespMSG>APPROVAL%2000</RespMSG>
      <Message>Approved</Message>
      <AuthCode>005805</AuthCode>
      <PNRef>8139012057895</PNRef>
      <PaymentType>Credit</PaymentType>
      <TransType>Sale</TransType>
      <SN>9890</SN>
      <ExtData>Amount=,InvNum=2,CardType=VISA,BatchNum=101,Tip=0.00,CashBack=0.00,Fee=0.04,AcntLast4=4504,Name=SHEETS%2fMATTHEW%20%20%20%20%20%20%20%20%20%20%20%20,SVC=0.00,TotalAmt=1.04,DISC=0.00,Donation=0.00,SHFee=0.00,RwdPoints=0,RwdBalance=0,RwdIssued=,EBTFSLedgerBalance=,EBTFSAvailBalance=,EBTFSBeginBalance=,EBTCashLedgerBalance=,EBTCashAvailBalance=,EBTCashBeginBalance=,RewardCode=,AcqRefData=,ProcessData=,RefNo=,RewardQR=,Language=English,EntryType=CHIP,table_num=0,clerk_id=,ticket_num=,ControlNum=,TaxCity=0.00,TaxState=0.00,Cust1=,Cust1Value=,Cust2=,Cust2Value=,Cust3=,Cust3Value=,AcntFirst4=4240,TaxAmount=0.00</ExtData>
      <EMVData>AID=A0000000031010,AppName=VISA DEBIT,TVR=8080008800,TSI=6800,IAD=3078F1B9AD6222CF3030,ARC=00</EMVData>
      <Receipt>Merchant</Receipt>
      <CVMResult>2</CVMResult>
      </response>
      </xmp>
      `
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Payment created successfully',
    status: 200
  })
}

function totals(req, res) {
  var from = moment(req.params.from, 'MMDDYYYY')
  var to = moment(req.params.to, 'MMDDYYYY')
  var totals = [
    //this is an array of order totals
    {
      "date": "2018-05-21",
      "ordersAmount": 400.50,
    },
    {
      "date": "2018-05-22",
      "ordersAmount": 400.50,
    },
    {
      "date": "2018-05-23",
      "ordersAmount": 400.50,
    },
  ]

  return res.status(200).json({
    success: true,
    message: 'Order totals',
    data: totals,
    status: 200
  })
}

function tips(req, res) {
  var from = moment(req.params.from, 'MMDDYYYY')
  var to = moment(req.params.to, 'MMDDYYYY')
  var tips = [
    //this is an array of users and their tip amount based off the provided range
    {
      "userId": "",
      "tipAmount": 4.50,
      "lastUpdated": "2018-05-21T19:11:26.777Z",
    },
    {
      "userId": "",
      "tipAmount": 4.50,
      "lastUpdated": "2018-05-21T19:11:26.777Z",
    },
    {
      "userId": "",
      "tipAmount": 4.50,
      "lastUpdated": "2018-05-21T19:11:26.777Z",
    }
  ]

  return res.status(200).json({
    success: true,
    message: 'Order user tips',
    data: tips,
    status: 200
  })
}

module.exports = {
  index,
  simple,
  edit,
  create,
  update,
  payment,
  totals,
  tips
}
