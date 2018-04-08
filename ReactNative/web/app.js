var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var logger = require('morgan'); 
var expressLayouts = require('express-layout');
var path  = require('path');
var ejs = require('ejs');
app.use(logger('dev'));
var port = process.env.PORT || 3000;    
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname +  '/views')));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname + '/public/')));
app.use(expressLayouts());
var Route = require('./controllers/Route');
app.use(Route);


app.listen(port, function(){
    console.log("Port is running", port);
});