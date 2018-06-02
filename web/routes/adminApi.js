var express = require('express');
var app = express();
var router = express.Router();
var multer = require('multer');
var path = require('path');
var config = require('../config/config.js');
var connection = require('../config/connection.js');
var jwt = require('jsonwebtoken');
var Client = require('node-rest-client').Client;
var client = new Client();

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
router.get('/', function(req, res){
  // var callbackUrl = 'http://localhost:3000/dashboard'
  // var parameters = 'response_type=code&client_id='+config.client_id+'&connection='+config.auth0_connection+'&redirect_uri='+callbackUrl
  // return res.redirect(config.auth0_url + 'authorize?' + parameters)
  return res.render('pages/index', {layout: false})
});

router.get('/logout',function(req, res){
  var callbackUrl = 'http://localhost:3000'
  var parameters = 'client_id='+config.client_id+'&returnTo='+callbackUrl
  return res.redirect(config.auth0_url + 'v2/logout?' + parameters)
});

/***********************************************************************************************************************/
router.get('/addItem', function (req, res) {
    res.render('pages/addItem');
});

/***********************************************************************************************************************/
router.get('/category', function (req, res) {
  var jwtToken = req.cookies.jwtToken
  if(!jwtToken) return res.render('pages/error', { layout: false, error: 'Unauthorized user' })
  var currentUser = jwt.verify(jwtToken, config.secret)

  var { getAllCategory } = require('../db/category')
  getAllCategory(currentUser.account_id, (err, result) => {
    if(err) return res.render('pages/error', { error: data.message });
    return res.render('pages/category', { data: result });
  })
});
/***********************************************************************************************************************/
router.get('/getCategory/:id', function (req, res) {
    var id = req.params.id;
    var { editCategory } = require('../db/category')
    editCategory(id, (err, result) => {
      if(err) return res.status(500).json({
        success: false,
        message: err.message,
        status: 500
      })
      return res.status(200).json({
        success: true,
        message: 'Category by id',
        data: result[0],
        status: 200
      })
    })
});
/***********************************************************************************************************************/
router.get('/dashboard', function (req, res) {
  console.log('---------------- loggedin jwt user ------------')
  console.log(req.cookies.jwtToken)
  console.log(jwt.verify(req.cookies.jwtToken, config.secret))
  res.render('pages/dashboard');
});
/***********************************************************************************************************************/
router.get('/account', function (req, res) {
    res.render('pages/account');
});

/***********************************************************************************************************************/
router.get('/cashReport', function (req, res) {
    res.render('pages/cashReport');
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
            res.render('pages/items', { data: data });
        }
    });

});

/***********************************************************************************************************************/
router.get('/users', function (req, res) {
  var token = require('../helper').token;
  if(!token) return res.send('No token exists in server')

  var { getAccountNames } = require('../db/account')
  var { getUserRoles } = require('../db/user')

  var args = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token.access_token
    }
  }
  var url = config.audience + 'users'
  client.get(url, args, function (data, response) {
    // parsed response body as js object
    console.log('------------------------- user list response body -------------------')
    console.log(data);
    var users = []
    if(data && data.length) {
       users = data.map(user => ({
         account_id: (user.user_metadata && user.user_metadata.account_id) || '',
         user_id: user.user_id,
         auth0_user_id: user.user_id,
         first_name: user.given_name,
         last_name: user.family_name,
         pin: (user.user_metadata && user.user_metadata.pin) || ''
      }))
    } else if (data && data.error) {
      return res.render('pages/error', { error: data.error_description || data.message });
    }

    getAccountNames((err, accounts) => {
      if(err) return res.render('pages/error', { error: err.message });
      getUserRoles((err, roles) => {
        if(err) return res.render('pages/error', { error: data.message });
        return res.render('pages/users', { data: users, accounts: accounts, roles: roles });
      })
    })
  })
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
    var { editUser } = require('../db/user')
    editUser(id, (err, result) => {
      if(err) return res.status(500).json({
        success: false,
        message: err.message,
        status: 500
      })
      return res.status(200).json({
        success: true,
        message: 'User by id',
        data: result[0],
        status: 200
      })
    })
});
/***********************************************************************************************************************/
router.get('/userDelete/:id', function (req, res) {
    var id = req.params.id;
    var token = require('../helper').token;

    if(!token) {
      return res.send('No token exists in server')
    }

    var args = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token.access_token
      }
    }
    var url = config.audience + 'users/' + id
    client.delete(url, args, function (data, response) {
      if(data && !data.error) return res.render('pages/error', { error: data.error_description || data.message })
      else {
        var { deleteUser } = require('../db/user')
        deleteUser(id, (err, result) => {
          if(err) return res.render('pages/error', { error: err.message })
          return res.redirect('/users');
        })
      }
    });
});
/***********************************************************************************************************************/
// Transaction
router.post('/transaction', function (req, res) {
    var itemid = req.body.itemid;
    var user_id = req.body.user_id;
    var paymentby = req.body.paymentby;
    var revenue = req.body.revenue;
    var date = req.body.date;
    var status = req.body.status;
    var sql = "INSERT INTO transactions(itemid,user_id,paymentby,revenue,date,status) VALUES("
        + "'" + itemid + "'" + "," + "'" + user_id + "'" + "," + "'" + paymentby + "'" + "," + "'" + revenue + "'" + "," + "'" + date + "'" + ","
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
  var jwtToken = req.cookies.jwtToken
  if(!jwtToken) return res.render('pages/error', { layout: false, error: 'Unauthorized user' })
  var currentUser = jwt.verify(jwtToken, config.secret)

  var category = {
    id: req.body.category_id,
    name: req.body.category_name,
    short_name: req.body.category_name.substr(0, 2),
    color: req.body.category_color,
    image: req.body.category_icon && req.body.category_icon.replace(/^data:image\/([a-z]+);base64,/, ''),
    active: req.body.active,
    account_id: currentUser.account_id
  }
  var { updateCategory } = require('../db/category')
  updateCategory(category, (err, result)=>{
    if(err) return res.render('pages/error', { error: err.message })
    return res.redirect('/category');
  })
});
/***********************************************************************************************************************/
router.post('/AddCategory',  function(req,res) {
  var jwtToken = req.cookies.jwtToken
  if(!jwtToken) return res.render('pages/error', { layout: false, error: 'Unauthorized user' })
  var currentUser = jwt.verify(jwtToken, config.secret)

  var category = {
    name: req.body.category_name,
    short_name: req.body.category_name.substr(0, 2),
    color: req.body.category_color,
    image: req.body.category_icon && req.body.category_icon.replace(/^data:image\/([a-z]+);base64,/, ''),
    active: req.body.active,
    account_id: currentUser.account_id
  }
  var { createCategory } = require('../db/category')
  createCategory(category, (err, result)=>{
    if(err) return res.render('pages/error', { error: err.message })
    return res.redirect('/category');
  })
});

/***********************************************************************************************************************/
router.post('/login',function(req,res){
    var email = req.body.email;
    var password = req.body.password;

    var args = {
      data: {
        "grant_type": "password",
        "username": email,
        "password": password,
        "audience": config.audience,
        "scope": "openid profile email",
        "client_id": config.client_id,
        "client_secret": config.client_secret
      },
      headers: {
        "Content-Type": "application/json"
      }
    }
    client.post(config.auth0_url + "oauth/token", args, function (data, response) {
      // parsed response body as js object
      console.log('------------------------- login response body -------------------')
      console.log(data)

      if(data && data.access_token) {
        args = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer '+ data.access_token
          }
        }
        client.post(config.auth0_url + "userinfo", args, function (profile, response) {
          // parsed response body as js object
          console.log('------------------------- profile response body -------------------')
          console.log(profile);
          if(profile && !profile.error) {
            profile.access_token = data.access_token
            profile.id_token = data.id_token

            var { getAccountIdByUserId } = require('../db/user')
            getAccountIdByUserId(profile.sub, (err, result) => {
              if(err) return res.render('pages/error', { error: err.message });

              profile.account_id = result[0].account_id
              var token = jwt.sign(profile, config.secret, {
                  expiresIn: 5000
              });
              res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true });
              res.redirect('dashboard');
            })
          } else {
            res.render('pages/error', { error: profile.error });
          }
        });

      } else {
        res.render('pages/error', { error: data.error_description || data.message });
      }
    });
});
/***********************************************************************************************************************/
router.post('/forgotPassword',function(req,res) {
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
  var user_id= req.body.userId;
  var first_name = req.body.firstName;
  var last_name = req.body.lastName;
  var token = require('../helper').token;

  if(!token) {
    return res.send('No token exists in server')
  }

  var user = {
    first_name: first_name,
    last_name: last_name,
    email: req.body.email,
    password: req.body.password,
    pin: req.body.pin,
    role_id: req.body.role_id,
    account_id: req.body.account_id
  }

  var args = {
    data: {
      "user_id": user_id,
      "connection": config.auth0_connection,
      "name": first_name+ " " + last_name,
      "given_name": first_name,
      "family_name": last_name,
      "email": user.email,
      "password": user.password,
      "user_metadata": {
        "pin": user.pin,
        "role_id": user.role_id,
        "account_id": user.account_id
      },
      "email_verified": false,
      "verify_email": false,
      "app_metadata": {}
    },
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token.access_token
    }
  }
  var url = config.audience + 'users'
  client.post(url, args, function (data, response) {
    // parsed response body as js object
    console.log('------------------------- response body -------------------')
    console.log(data);
    if(data && !data.error) {
      var { createUser } = require('../db/user')
      user.auth0_user_id = data.user_id

      createUser(user, (err, result) => {
        if(err) return res.render('pages/error', { error: err.message })
        else {
          if(err) return res.render('pages/error', { error: err.message })
          return res.redirect('/users');
        }
      })

    } else {
      return res.render('pages/error', { error: data.error_description || data.message })
    }
  });
});
/***********************************************************************************************************************/
router.post('/userUpdate', function(req,res) {
  var user_id= req.body.user_id;
  var first_name = req.body.firstname;
  var last_name = req.body.lastname;
  var user_pin = req.body.userpin;

    var sql = "UPDATE users SET First_Name ="+"'"+first_name+"'"+","+"Last_Name="+"'"+last_name+"'"+","+"Pin="+"'"+user_pin+"'" +"WHERE user_id="+"'"+user_id+"'";
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
router.post('/account',function(req,res){
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

    var sql = `
    insert into account (
      company_name,
      phone_no,
      tax_rate,
      address_id,
      merchant_id,
      device_settings,
      tip_enabled,
      bar_tab,
      signature_amount,
      cash_enabled,
      discount_enabled,
      fsa_enabled,
      ebt_enabled,
      table_tab,
      table_num,
      gift_cards,
      cash_discount
    ) values (
      '${company_name}',
      ${phone_no},
      ${tax_rate},
      NULL,
      ${Date.now()},
      'UUID',
      true,
      true,
      10000,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true
    )
    `
    connection.query(sql, function(err,result) {
      if(err) return res.render('pages/error', { error: err.message })
      if(result) return res.redirect('dashboard');
    });
});
/***********************************************************************************************************************/
module.exports = router;

/***********************************************************************************************************************/
