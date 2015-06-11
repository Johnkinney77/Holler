var express = require('express');
var app = express();
var router = express.Router();

var contactsController = require('../controllers/contacts.js');


router.get('/', contactsController.contactsAll);

router.post('/', contactsController.newContact);

router.patch('/:id', contactsController.contactAddRemoveCategory);

router.put('/:id', contactsController.contactEdit);

router.delete('/:id', contactsController.contactDelete);

module.exports = router