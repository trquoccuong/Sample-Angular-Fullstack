'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();
router.get('/', controller.event);
module.exports = router;
