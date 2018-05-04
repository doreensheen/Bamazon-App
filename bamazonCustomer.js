var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var con = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "dsheen90",
    database: "bamazonDB"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected as id " + con.threadId);

    // place functions here:
    mainMenu();

});

function mainMenu() {
    con.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        console.table(data);

    })
}