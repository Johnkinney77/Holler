var categoriesController = {};

//dependencies
var express = require('express');
var app = express();
var router = express.Router()
var fs = require('fs');

//database connection
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./holler_development.db');

//Grabbing brewery Information
categoriesController.categoriesAll = function (req, res) {
  db.all("SELECT * FROM categories;", {}, function (err, data){
    res.send(data);
  });
};

categoriesController.categoriesNew = function (req, res) {
  db.run("INSERT INTO categories (category) VALUES ('" + req.body.categoryName + "');", {}, function (err, data){
    console.log(data)
    res.send(data)
  });
};

module.exports = categoriesController