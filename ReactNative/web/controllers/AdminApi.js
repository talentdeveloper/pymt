var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var connection = require('../config/connection.js');


/***********************************************************************************************************************/
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var uploadDir =  path.join(__dirname, '../public/uploads');
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: function (req, file, callback) {
        callback(null, Date.now());
    }
});
  var upload = multer({ storage : storage });

/***********************************************************************************************************************/
router.post('/upload',upload.any(), function(req,res){
    console.log(req.file);

});

/***********************************************************************************************************************/
router.get('/category', function(req,res){
    var sql = "SELECT * FROM category"
    connection.query(sql, function(err,result){
        if(result){
            res.render('Category',{data:result});
        }
    });
});
/***********************************************************************************************************************/
router.get('/getCategory/:id', function(req,res){
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
router.post('/updateCategory', function(req,res){
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
router.post('/AddCategory', function(req,res){
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
router.get('/', function(req,res){
    res.render('Dashboard');
});

/***********************************************************************************************************************/
// Transaction 
router.post('/transaction', function(req,res){
    var itemid = req.body.itemid;
    var userid = req.body.userid;
    var paymentby = req.body.paymentby;
    var revenue = req.body.revenue;
    var date  = req.body.date;
    var status = req.body.status;
    var sql = "INSERT INTO transactions(itemid,userid,paymentby,revenue,date,status) VALUES("
    +"'"+itemid+"'"+","+"'"+userid+"'"+","+"'"+paymentby+"'"+","+"'"+revenue+"'"+","+"'"+date+"'"+","
    +"'"+status+"'"+")";
    connection.query(sql,function(err,result){
        if(result){
            res.status(200).json({
                success:true,
                message:"Data saved",
                status:200
            });
        }else{
            res.status(403).json({
                success:false,
                message:"Data not saved.",
                status:403
            });
        }
    });

});
/***********************************************************************************************************************/
router.get('/account', function(req,res){
    res.render('Account');
});

/***********************************************************************************************************************/
router.get('/cashReport', function(req,res){
    res.render('CashReport');
});
/***********************************************************************************************************************/
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
/***********************************************************************************************************************/
router.get('/addItem', function(req,res){
    res.render('AddItem');
});
/***********************************************************************************************************************/
router.get('/itemDeleted/:id', function(req,res){
    var id = req.params.id;
        var sql = "DELETE FROM items WHERE itemid =" + id;
        connection.query(sql, function(err, result){
            if(result){
                res.redirect('/items');
            }
        });
});
/***********************************************************************************************************************/
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
router.get('/userEdit/:id', function(req,res){
    var id = req.params.id;
    var sql = "SELECT * FROM users WHERE userid ="+id ;
    connection.query(sql, function(err,result){
        if(result){
            res.status(200).json({
                success: true,
                data:result,
                state:200

            });
        }
    });
});

/***********************************************************************************************************************/
router.post('/userUpdate', function(req,res){
    var user_id= req.body.userid;
    console.log("userid=>",user_id);
    var first_name = req.body.firstname;
    console.log("firstname=>", first_name);
    var last_name = req.body.lastname;
    console.log("lastname =>", last_name);
    var user_pin = req.body.userpin;
    console.log("userpin=>", user_pin);
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
router.get('/userDelete/:id', function(req,res){
   var id =  req.params.id;
   var sql = "DELETE FROM users WHERE userid=" + id;
   connection.query(sql, function(err, result){
       if(result){
           res.redirect('/users');
       }
   });
});

/***********************************************************************************************************************/
router.post('/AddItem',upload.any(),function(req,res, next){
    var item_name = req.body.item_name;
    var category = req.body.category;
    var description = req.body.description;
    var price = req.body.price;
    var stock = req.body.stock;
    var barcode = req.body.barcode;
    var modifier = req.body.modifier;
    var image = req.filename;
    console.log("image name". image);
   var sql = "INSERT INTO items(item_name,category,description, price,stock,image, barcode,modifier) VALUES("+"'"+item_name
    +"'"+","+"'"+category+"'"+","+"'"+description+"'"+","+"'"+price+"'"+","+"'"+stock+"'"+","+"'"+image+"'"+","+"'"+barcode+"'"+","+"'"+modifier+"'"+")";
    connection.query(sql, function(err,result){
        if(result){
            res.redirect('/items');
        }
    });   
});
/***********************************************************************************************************************/
router.get('/itemDelete/:id', function(req,res){
    var id = req.params.id;
    console.log("id", id);
    var sql = "DELETE FROM items WHERE itemid ="+ id;
    connection.query(sql, function(err,result){
        if(result){
            res.redirect('/items');
        }
    });
});

/***********************************************************************************************************************/
router.post('/accountInformation',upload.any(),function(req,res){
    var email = req.body.email;
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