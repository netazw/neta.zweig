var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});

const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
host: "localhost",
user: "root",
password: "Neta1994",
database: "mysql"
})
// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true
}));

// Create a route for getting all customers
app.get("/customers", function(req, res){
    connection.query("SELECT * FROM customers", (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "error in getting all customers: " + err});
            return;
        }
    
        console.log("got all customers...");
        res.send(mysqlres);
        return;
    });
});

connection.end();

}).listen(8080);