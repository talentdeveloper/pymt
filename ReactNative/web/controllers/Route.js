var express = require('express');
var route = express.Router();

var AdminApi = require('./AdminApi');
route.use(AdminApi);
var MobileApi = require('./mobileApi');
route.use('/api',MobileApi);





module.exports = route;