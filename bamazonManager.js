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
    console.log("Connected as id " + con.threadId + "\n--------------------\n");

    // place functions here:
    managerMenu();

});

function managerMenu() {
    inquirer.prompt([
        {type: "list", choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"], message: "MANAGER MENU ", name: "managerMenu"}
    ]).then(function(inquirerResponse) {
        if (inquirerResponse.managerMenu === "View Products for Sale") {
            viewProductsForSale();
        }else if (inquirerResponse.managerMenu === "View Low Inventory") {
            viewLowInventory();
        }else if (inquirerResponse.managerMenu === "Add to Inventory") {
            addToInventory();
        }else if (inquirerResponse.managerMenu === "Add New Product") {
            addNewProduct();
        }
    })
}

function menuOrQuit() {
    inquirer.prompt([
        {type: "list", choices: ["Back to Manager Menu", "Quit Program"], message: "\n", name: "menuOrQuit"}
    ]).then(function(inquirerResponse) {
        if (inquirerResponse.menuOrQuit === "Back to Manager Menu") {
            console.log("\n--------------------\n")
            managerMenu();
        }else if (inquirerResponse.menuOrQuit === "Quit Program") {
            con.end();
        }
    })
}

function viewProductsForSale() {
    con.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        // Log table of all inventory
        console.log("\nAll inventory: \n");
        console.table(data);
        menuOrQuit();
    });
}
function viewLowInventory() {
    con.query("SELECT * FROM products WHERE stock_quantity<5",function(err, data) {
        if (err) throw err;
        console.log("\nInventory of products with less than 5 quantites remaining: \n");
        console.table(data);
        menuOrQuit();
    });
}
function addToInventory() {
    console.log("\n")
    con.query("SELECT * FROM products", function(err, data) {
        if (err) throw err;
        inquirer.prompt([
            {type: "input", message: "item_id: ", name: "productId"},
            {type: "input", message: "amount: ", name: "additionalStock"} 
        ]).then(function(ires) {
            let productId = Number(ires.productId);
            let i = productId - 1;
            let additionalStock = Number(ires.additionalStock);
            let productName = data[i].product_name;
            let newStock = Number(data[i].stock_quantity) + additionalStock;
            console.log("\nIs this right? Add " + additionalStock + " units of item_id " + productId + " - " + productName + "\n")
            inquirer.prompt([
                {type: "list", choices: ["Y", "N"], message: "Choose Y to confirm or N to re-enter.", name: "confirmation"}
            ]).then(function(ires) {
                if (ires.confirmation === "Y") {
                    con.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newStock, productId], function(err, data) {
                        if (err) throw err;
                        console.log("\nUpdate complete. There are now " + newStock + " units in stock.");
                        menuOrQuit();
                    })
                } else if (ires.confirmation === "N") {
                    addToInventory();
                }
            })
        })

    })
}
function addNewProduct() {
    console.log("Did not finish coding this function")
    menuOrQuit();
}

