var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var connection = require('../config/connection.js');

var uploadDir = (express.static(path.join(__dirname,'../public/uploads')));
var storage =   multer.diskStorage({
    
    destination: function (req, file, callback) {
      callback(null, uploadDir);
      console.log("working");
    },
    
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
      console.log("working");
    }
  });
  var upload = multer({ storage : storage });
  

/************************************************************************************/
  


/************************************************************************************/
router.get('/', function(req,res){
    res.render('Dashboard');
});
/************************************************************************************/
router.get('/account', function(req,res){
    res.render('Account');
});
/************************************************************************************/
router.get('/cashReport', function(req,res){
    res.render('CashReport');
});
/************************************************************************************/
router.get('/items', function(req,res){
    var sql = "SELECT * FROM items";
    connection.query(sql, function(err,data){
      
        if(err){
            console.log("Error ");
        }
        if(data == null){
            console.log("No data found");
        }
        if(data){
            res.render('Items.ejs',{data:data});
        }
    });

});
/************************************************************************************/
router.get('/addItem', function(req,res){
    res.render('AddItem');
});
/************************************************************************************/
router.get('/itemDeleted/:id', function(req,res){
    var id = req.params.id;
        var sql = "DELETE FROM items WHERE itemid =" + id;
        connection.query(sql, function(err, result){
            if(result){
               
                res.redirect('/items');
            }
        });
   
 
});
/************************************************************************************/
router.get('/users', function(req,res){
    var sql = "SELECT * FROM users";
    connection.query(sql, function(err,data){
      
        if(err){
            console.log("Error ");
        }
        if(data == null){
            console.log("No data found");
        }
        if(data){
            res.render('Users.ejs',{data:data});
        }
    });
    
});
/************************************************************************************/
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

/************************************************************************************/
router.get('/UserEdit/:id', function(req,res){
    var id = req.params.id;
    var sql = "SELECT * FROM users WHERE userid ="+id ;
    console.log("=======>",id);
    connection.query(sql, function(err,result){
        if(result){
            res.redirect('/users',{data:result});
        }
    });
   
});
/************************************************************************************/
router.get('/userDeleted/:id', function(req,res){
   var id =  req.params.id;
   var sql = "DELETE FROM users WHERE userid=" + id;
   connection.query(sql, function(err, result){
       if(result){
           res.redirect('/users');
       }

   });
});

/************************************************************************************/
router.post('/AddItem',upload.single('image'),function(req,res, next){
    var item_name = req.body.item_name;
    var category = req.body.category;
    var description = req.body.description;
    var price = req.body.price;
    var stock = req.body.stock;
    var barcode = req.body.barcode;
    var modifier = req.body.modifier;
    var image = req.filename;
    
   var sql = "INSERT INTO items(item_name,category,description, price,stock,image, barcode,modifier) VALUES("+"'"+item_name
    +"'"+","+"'"+category+"'"+","+"'"+description+"'"+","+"'"+price+"'"+","+"'"+stock+"'"+","+"'"+image
    +"'"+","+"'"+barcode+"'"+","+"'"+modifier+"'"+")";
    connection.query(sql, function(err,result){
        if(result){
            res.redirect('/items');
        }
    });
    
});
/************************************************************************************/
router.post('/accountInformation', function(req,res){
    var email = req.body.email;
    var company_name = req.body.company_name;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var phone_no = req.body.phone_no;
    var tax_rate =  req.body.tax_rate;
    var company_address = req.body.company_address;
    var company_address2 = req.body.company_address2;
    var state = req.body.state;
    var company_zip = req.body.company_zip;
    var sql = "INSERT INTO accountinformation(email,company_name,first_name,last_name,phone_no,tax_rate,company_address, company_address2,state) VALUES("
    +"'"+email+"'"+","+"'"+company_name+"'"+","+"'"+first_name+"'"+","+"'"+last_name+"'"+","+"'"+phone_no+"'"+","+"'"+tax_rate+"'"+","+"'"+company_address
    +"'"+","+"'"+company_address2+"'"+","+"'"+state+"'"+")";
    connection.query(sql, function(err,result){
        if(result){
            console.log("Saved successfully");
        }
    });
});
/************************************************************************************/
module.exports = router;