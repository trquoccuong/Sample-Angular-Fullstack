'use strict';

var express = require('express');
var controller = require('./course.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/:id/like', auth.isAuthenticated() , controller.like);
router.put('/:id', controller.edit);
router.delete('/:id', controller.destroy);

module.exports = router;
