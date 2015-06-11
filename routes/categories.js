var express = require('express');
var app = express();
var router = express.Router();

var categoriesController = require('../controllers/categories.js');


router.get('/', categoriesController.categoriesAll);

router.post('/', categoriesController.categoriesNew);

module.exports = router