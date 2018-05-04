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
        // Log table of all inventory
        console.table(data)
        
        // Prompt to select item and quantity
        inquirer.prompt([ 
            {type: "input", message: "Enter the item_id of the product you'd like to buy:", name: "itemId"},
            {type: "input", message: "How many?", name: "quantity"}
        ]).then(function(inquirerResponse) {
            var quan = Number(inquirerResponse.quantity);
            var i = Number(inquirerResponse.itemId) - 1;
            // Call database and check if quantity exists
            con.query("SELECT * FROM products", function(err, data) {
                if (err) throw err;
                var id = data[i].item_id;
                var prod = data[i].product_name;
                var cost = quan*data[i].price
                console.log(data[i].stock_quantity)
                // if not enough, prompt to select again
                if (quan > data[i].stock_quantity){
                    console.log("There aren't enough quantities of item in stock to process order.")
                    inquirer.prompt([
                        {type: "confirm", message: "Start new order?", name: "newOrder"}
                    ]).then(function(res) {
                        if (res.newOrder) {
                            mainMenu();
                        } else if (!res.newOrder) {
                            con.end();
                        }
                    })
                } else if (quan <= data[i].stock_quantity) {
                    // if enough, update database with new quantities

                    // and log confirmation message
                    confirmationMessage(quan, id, prod, cost);
                }
            })        
        })
    })
}

function confirmationMessage(quan, id, prod, cost ) {
    console.log(`\nYou have purchased ${quan} quantities of`);
    console.log("item_id: " + id + " | product_name: " + prod);
    console.log("TOTAL COST: " + cost);

}