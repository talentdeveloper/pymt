var express = require('express');
var route = express.Router();

var AdminApi = require('./AdminApi');
route.use( AdminApi);




module.exports = route;