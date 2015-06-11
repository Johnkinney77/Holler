var express = require("express");
var app = express();

//middleware
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var morgan = require('morgan');

app.use(methodOverride('_method'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));

//pulling routes
app.use('/contacts', require('./routes/contacts.js'));
app.use('/categories', require('./routes/categories.js'));


//setting static folder
app.use(express.static('public'));

//initializing server
app.listen(3000, function() {
  console.log('Listening on port 3000...')
})