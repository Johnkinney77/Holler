var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./holler_development.db');

db.serialize(function() {
db.run("CREATE TABLE contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, category_id text, name varchar(64), email varchar(64), phone varchar(64), city varchar(64), image_url text);");

db.run("CREATE TABLE categories (id INTEGER PRIMARY KEY AUTOINCREMENT, category varchar(64));");

db.run("INSERT INTO categories (category) VALUES ('Friends');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'John Kinney', 'Johnkinney77@gmail.com', '555-555-5555', 'New York City', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAN7AAAAJDllMzlkZmFhLTU1Y2EtNDg3NC1hMGM4LWZiOTk4ZTM5M2MyMQ.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Anna Rankin', 'AnnaIsBananas@gmail.com.com', '555-555-5555', 'Tillson NY City', 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAICAAAAJDM4NmVjOTgxLTc0N2EtNDFmNy04ODQxLTExNTg1MGE3Y2IwZA.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Daniel', 'croatianSensation@cro.com', '555-555-5555', 'Tillson NY City', 'https://pbs.twimg.com/profile_images/1841987304/DSCF00024.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Liz Fonseca', 'LizIsTheBiz@gmail.com', '555-555-5555', 'Tillson NY City', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAANNAAAAJGI0MmNlYzlhLTg2NjctNGFjMS1iYTVkLWVmZDkzMmJlZDAzMA.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Jeffrey Konowitch', 'JeffGotACleft@gmail.com', '555-555-5555', 'Tillson NY City', 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/2/000/1a6/1a7/24b014b.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Julia Becker', 'JuliaIsCoolia@gmail.com', '555-555-5555', 'Tillson NY City', 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/1/005/0a3/16c/0f76d1b.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Gabby Losch', 'GabsMaTabs@gmail.com', '555-555-5555', 'Middleton VT City', 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAALHAAAAJGRhOWU3NzQyLTM0MmMtNDEzMS1iODJjLTRkOGFkYjlkYmNlMw.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Xavier Fernandez', 'XavierIsAwesome@gmail.com', '555-555-5555', 'San Jose', 'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAK4AAAAJDNmZDcyOTE0LTRiMDYtNDdkOS1hZTY5LTEyMWMxOTZlYzkxOA.jpg');");

db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Neel Petel', 'NJP3000@hotmail.com', '555-555-5555', 'New York City', 'https://media.licdn.com/media/p/8/000/1d5/2c1/1b08b8b.jpg');");


db.run("INSERT INTO contacts (category_id, name, email, phone, city, image_url) VALUES ('snaptarget All', 'Caitlin Harley', 'NJP3000@hotmail.com', '555-555-5555', 'New York City', 'https://media.licdn.com/mpr/mpr/shrink_200_200/p/3/005/080/27d/0d14159.jpg');");


});