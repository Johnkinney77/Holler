var contactsController = {};

//dependencies
var express = require('express');
var app = express();
var router = express.Router()
var fs = require('fs');

//database connection
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./holler_development.db');

//Grabbing all contacts 
contactsController.contactsAll = function (req, res) {
  db.all("SELECT * FROM contacts;", {}, function (err, data){
    res.send(data);
  });
};

//new contact 
contactsController.newContact = function (req, res) {
  db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('" + req.body.category_id + "', '" + req.body.name + "', '" + req.body.email + "','" + req.body.phone + "','" + req.body.city + "','" + req.body.image_url + "');", {}, function (err, data){
    res.send({id: this.lastID});
  });
};

//edit contact 
contactsController.contactEdit = function (req, res) {
  db.all("UPDATE contacts SET name='" + req.body.name + "', email='" + req.body.email + "', phone='" + req.body.phone + "', city='" + req.body.city + "', image_url='" + req.body.image_url + "' WHERE id=" + req.params.id + ";", {}, function (err, data){
    console.log(data)
    res.send(data);
  });
};

//detele contact 
contactsController.contactDelete = function (req, res) {
  console.log(req.params)
  db.run("DELETE FROM contacts WHERE id=" + req.params.id + ";", {}, function (err, data){
    console.log(data)
  });
};

//add/remove contact from category
contactsController.contactAddRemoveCategory = function (req, rez) {
  console.log('hit')
  db.run('UPDATE contacts SET category_id="' + req.body.category_id + '" WHERE id=' + req.params.id + ';');
}

module.exports = contactsController