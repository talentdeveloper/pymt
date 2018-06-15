const connection = require('../config/connection.js');
const { createPayment, updatePayment } = require('./payment');
const { createOrder, updateOrder } = require('./order');

const getAllTabs = (accountId, callback) => {
    const sql = `select t.id as tabId, t.first_name as firstname, t.last_name as lastname, o.*, p.* from \`tab\` t left join \`order\` o on t.order_id = o.id 
        left join payment p on t.payment_id = p.id where t.account_id =  ${accountId}`

    connection.query(sql, (err, result) => {
        if(err) callback(err, null)
        else {
            let tabs = result.map(tab => {
                return {
                    "tabId": tab.tabId,
                    "firstName": tab.firstname,
                    "lastName": tab.lastname,
                    orderObj: {
                        "orderId": tab.order_id,
                        "orderDate": tab.order_date,
                        "orderType": tab.order_type,
                        "tableNumber": tab.table_number,
                        "transactionId": tab.transaction_id,
                        "orderStatus": tab.order_status,
                        "cartTotal": tab.cart_total,
                        "discountPercent": tab.discount_percent,
                        "discountAmount": tab.discount_amount,
                        "itemQuantity": tab.item_quantity,
                        "items": []
                    },
                    paymentObj: {
                        "type": tab.type,
                        "signature": tab.signature,
                        "amountTendered": tab.amount_tendered,
                        "changeGiven": tab.change_given,
                        "amountPaid": tab.amount_paid,
                        "xmp": tab.xmp
                    }
                }
            })
            callback(err, tabs);
        }
    })
}

const createTab = (accountId, param, callback) => {
    let firstName = param.firstname;
    let lastName = param.lastName;
    let orderObj = param.orderObj;
    let paymentObj = param.paymentObj;

    if (!firstName || !lastName || !orderObj || !paymentObj) {
        callback(new Error('Validation Error'), null);
    } else {
        const sql = `INSERT INTO \'tab'\ (first_name, last_name, order_id, payment_id, account_id) VALUES 
            (${tableNumber}, ${tableStatus}, ${orderObj.orderId}, ${paymentObj.paymentId}, ${accountId})`
        
        connection.query(sql, (err, result) => {
            if (err) callback(err, null);
            else {
                createOrder(orderObj, accountId, (err, result => {
                    if (err) callback(err, null);
                    else {
                        createPayment(paymentObj, callback);
                    }
                }));
            }
        })
    }
}

const updateTab = (accountId, param, callback) => {
    let orderObj = param.orderObj;
    let paymentObj = param.paymentObj;

    if (!firstName || !lastName || !orderObj || !paymentObj) {
        callback(new Error('Validation Error'), null);
    } else {
        updateOrder(orderObj, accountId, (err, result) => {
            if (err) callback(err, null);
            else {
                updatePayment(paymentObj, callback);
            }
        })
    }
}

module.exports = {
    getAllTabs,
    createTab,
    updateTab
}