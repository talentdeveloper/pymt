var express = require('express');
var router = express.Router();

var adminApi = require('./adminApi');
router.use(adminApi);

var mobileApi = require('./mobileApi');
router.use(mobileApi);

module.exports = router;
