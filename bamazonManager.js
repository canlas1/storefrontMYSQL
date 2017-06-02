var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query("SELECT * FROM auctions", function(err, res) {

start()
    // //display function
    // displayItems(res)
});

// GLOBAL VARIABLE USED TO CARRY CURRENT SELECTED ID FOR QUERIES
var primaryKey;

var start = function() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }).then(function(answer) {

        switch (answer.action) {
            case 'View Products for Sale':
                displayItems();
                break;

            case 'View Low Inventory':
                viewLowInventory();
                break;

            case 'Add to Inventory':
                addToInventoy();
                break;

            case 'Add New Product':
                addNewProduct();
                break;
        }
    });
};

start()

var displayItems = function() {
    var query = "SELECT * FROM auctions";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("--------------------------------------------------")
            console.log("PRODUCT NAME: " + res[i].product_name);
            console.log("--------------------------------------------------")
        }
        start()
    })
}

var viewLowInventory = function(){
    
    connection.query("SELECT * FROM auctions WHERE=stock_quantity", function(err, res){

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id);
        };
         start()
    });
}
