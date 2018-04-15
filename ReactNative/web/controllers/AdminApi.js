var express = require('express');
var app = express();
var router = express.Router();
var multer = require('multer');
var path = require('path');
var config = require('../config/config.js');
var formidable = require('formidable');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');
/***********************************************************************************************************************/
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("working1");
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage: storage }).single('userPhoto');
/***********************************************************************************************************************/
router.get('/',function(req, res){
    res.render('index', { layout: false });
});
/***********************************************************************************************************************/
router.get('/addItem', function (req, res) {
    res.render('AddItem');
});

/***********************************************************************************************************************/
router.get('/category', function (req, res) {
    var sql = "SELECT * FROM category"
    connection.query(sql, function (err, result) {
        if (result) {
            res.render('Category', { data: result });
        }
    });
});
/***********************************************************************************************************************/
router.get('/getCategory/:id', function (req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM category WHERE CategoryID =" + id;
    connection.query(sql, function (err, result) {
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                state: 200

            });
        }
    });
});
/***********************************************************************************************************************/
router.get('/dashboard', function (req, res) {
    res.render('Dashboard');
});
/***********************************************************************************************************************/
router.get('/account', function (req, res) {
    res.render('Account');
});

/***********************************************************************************************************************/
router.get('/cashReport', function (req, res) {
    res.render('CashReport');
});
/***********************************************************************************************************************/
router.get('/items', function (req, res) {
    var sql = "SELECT * FROM items";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log("Error ");
        }
        if (data == null) {
            console.log("No data found");
        }
        if (data) {
            res.render('Items.ejs', { data: data });
        }
    });

});

/***********************************************************************************************************************/
router.get('/users', function (req, res) {
    var sql = "SELECT * FROM users";
    connection.query(sql, function (err, data) {
        if (err) {
            console.log("Error ");
        }
        if (data == null) {
            console.log("No data found");
        }
        if (data) {
            res.render('Users.ejs', { data: data });
        }
    });
});
/***********************************************************************************************************************/
router.get('/itemDelete/:id', function (req, res) {
    var id = req.params.id;
    console.log("id", id);
    var sql = "DELETE FROM items WHERE itemid =" + id;
    connection.query(sql, function (err, result) {
        if (result) {
            res.redirect('/items');
        }
    });
});
/***********************************************************************************************************************/
router.get('/userEdit/:id', function (req, res) {
    var id = req.params.id;
    var sql = "SELECT * FROM users WHERE userid =" + id;
    connection.query(sql, function (err, result) {
        if (result) {
            res.status(200).json({
                success: true,
                data: result,
                state: 200

            });
        }
    });
});
/***********************************************************************************************************************/
router.get('/userDelete/:id', function (req, res) {
    var id = req.params.id;
    var sql = "DELETE FROM users WHERE userid=" + id;
    connection.query(sql, function (err, result) {
        if (result) {
            res.redirect('/users');
        }
    });
});
/***********************************************************************************************************************/
// Transaction 
router.post('/transaction', function (req, res) {
    var itemid = req.body.itemid;
    var userid = req.body.userid;
    var paymentby = req.body.paymentby;
    var revenue = req.body.revenue;
    var date = req.body.date;
    var status = req.body.status;
    var sql = "INSERT INTO transactions(itemid,userid,paymentby,revenue,date,status) VALUES("
        + "'" + itemid + "'" + "," + "'" + userid + "'" + "," + "'" + paymentby + "'" + "," + "'" + revenue + "'" + "," + "'" + date + "'" + ","
        + "'" + status + "'" + ")";
    connection.query(sql, function (err, result) {
        if (result) {
            res.status(200).json({
                success: true,
                message: "Data saved",
                status: 200
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Data not saved.",
                status: 403
            });
        }
    });

});


/***********************************************************************************************************************/
router.post('/updateCategory',  function(req,res){
    var id = req.body.user_id;
    console.log(id);
    var categoryname = req.body.categoryname;
    console.log(categoryname);
    var categorycolor = req.body.categorycolor;
    console.log(categorycolor);
    var categoryicon = req.body.categoryicon;
    console.log(categoryicon);
    var sql = "UPDATE category SET CategoryName =" + "'" + categoryname+ "'" + "," + "CategoryColor=" + "'" + categorycolor + "'" + "," + "CategoryIcon=" + "'" + categoryicon + "'" + "WHERE CategoryID="  +"'"+ id + "'";
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/category');
        }
    }); 
});
/***********************************************************************************************************************/
router.post('/AddCategory',  function(req,res){
    var category_name = req.body.category_name;
    var category_color = req.body.category_color;
    var category_icon = req.body.category_icon;
    var sql = "INSERT INTO category(CategoryName,CategoryColor,CategoryIcon) VALUES("+"'"+category_name+"'"+","+"'"+category_color
    +"'"+","+"'"+category_icon+"'"+")";
    connection.query(sql,function(err, result){
        if(result){
             res.redirect('/category');
        }
    });
});

/***********************************************************************************************************************/
router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            if (results.length > 0) {
                if (password == results[0].password) {
                    var payload = { result: results[0]};
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn: 5000
                    });
                   res.redirect('/dashboard');
                } else { 
                    res.render('index',{layout:false,error:'Incorrect password.'});
                }

            }
            else {
                res.render('index', {layout:false, error: 'Incorrect email.' });
            }
        }
    });
});
/***********************************************************************************************************************/
router.post('/forgotPassword',function(req,res){
    var email = req.body.useremail;
    console.log('inside forgot password',email);
    var sql = "SELECT * FROM users WHERE email="+"'"+email+"'";
    connection.query(sql,(err,result) =>{
      if(result){
          res.redirect('/');
      }else{
          res.redirect('/forgotpasword',{error:"Please enter correct email"});
      }
    });

});
/***********************************************************************************************************************/
router.post('/updatePassword', (req,res)=>{
    var newpassword = req.body.password;
    var email = req.body.email;
    var sql = "UPDATE users WHERE email="+"'"+email+"'"+"SET password="+"'"+newpassword+"'";
    connection.query(sql, (err,result) =>{
        if(result){
            alert("Password updated successfully");
            res.redirect('/login');
        }
    });
});

/***********************************************************************************************************************/
router.post('/UserDataInserted', function(req,res){
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var user_pin =  req.body.user_pin;
    var sql = "INSERT INTO users(First_Name, Last_Name, Pin) VALUES(" + "'"+ first_name +"'"+
    "," +"'"+ last_name +"'" + "," + "'" + user_pin + "'" + " )";
  connection.query(sql,function(err, result){
        if(err){
            res.send("Data not saved");
        }else{
            res.redirect('/users');
        }
    });
});
/***********************************************************************************************************************/
router.post('/userUpdate', function(req,res){
    var user_id= req.body.userid;
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var user_pin = req.body.userpin;
    var sql = "UPDATE users SET First_Name ="+"'"+first_name+"'"+","+"Last_Name="+"'"+last_name+"'"+","+"Pin="+"'"+user_pin+"'" +"WHERE userid="+"'"+user_id+"'";
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/users');
        }
    }); 
});

/***********************************************************************************************************************/
router.post('/addItem',upload,function(req,res, next){
    var item_name = req.body.item_name;
    var category = req.body.category;
    var description = req.body.description;
    var price = req.body.price;
    var stock = req.body.stock;
    var barcode = req.body.barcode;
    var modifier = req.body.modifier;
     var image = req.file.path;
    console.log("image name", image);
   var sql = "INSERT INTO items(item_name,category,description, price,stock,image, barcode,modifier) VALUES("+"'"+item_name
    +"'"+","+"'"+category+"'"+","+"'"+description+"'"+","+"'"+price+"'"+","+"'"+stock+"'"+","+"'"+image+"'"+","+"'"+barcode+"'"+","+"'"+modifier+"'"+")";
    connection.query(sql, function(err,result){
        if(result){
            res.redirect('/items');
        }
    });   
});
router.post('/upload',upload, function(req,res){
    res.send("uploaded");

});

/***********************************************************************************************************************/
router.post('/accountInformation',function(req,res){
    var email = req.body.email;
    console.log("email=>",email);
    var company_name = req.body.company_name;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var phone_no = req.body.phone_no;
    var tax_rate =  req.body.tax_rate;
    var company_address = req.body.company_address;
    var company_address2 = req.body.company_address2;
    var state = req.body.state;
    var companyzip = req.body.companyzip;
    var image = req.filename;
    console.log("image", image);
    var sql = "INSERT INTO accountinformation(email,company_name,first_name,last_name,phone_no,tax_rate,company_address, company_address2,state, company_zip) VALUES("
    +"'"+email+"'"+","+"'"+company_name+"'"+","+"'"+first_name+"'"+","+"'"+last_name+"'"+","+"'"+phone_no+"'"+","+"'"+tax_rate+"'"+","+"'"+company_address
    +"'"+","+"'"+company_address2+"'"+","+"'"+state+"'"+","+"'"+companyzip + "'"+")";
    connection.query(sql, function(err,result){
        if(result){
            res.render('Account',{data:result});
        }
    });
});
/***********************************************************************************************************************/
module.exports = router;

/***********************************************************************************************************************/