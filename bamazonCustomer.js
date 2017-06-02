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

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

var primaryKey;

connection.query("SELECT * FROM auctions", function(err, res) {

    displayItems(res)
});


function displayItems(array) {
    // loop through the array and display each item by ID and Name
    for (var i = 0; i < array.length; i++) {
        var item = "THE PRODUCT ID: " + array[i].id + "\n" + "THE PRODUCT NAME: " + array[i].product_name;
        //display item
        console.log(item);
        console.log("------------------------")
    }
    //start function
    start()
}

var start = function() {
  
    var question = {
        type: 'input',
        name: 'id',
        message: 'What\'s the ID of the product that you would like to buy?'
    };
    

    inquirer.prompt(question).then(function(answer) {
        console.log("-------------------------")
        console.log("ITEM ID SELECTED: ")
        console.log(answer.id);
        // ASSIGN A VALUE TO primaryKey
        primaryKey = answer.id

        let query = "SELECT * FROM auctions WHERE ID=" + primaryKey;

        //connect to table auction query only WHERE by primary key
        connection.query(query, function(err, res) {
            console.log("------------------------")
            console.log("NAME OF PRODUCT: ");
            console.log(res[0].product_name);
            console.log("------------------------")
            console.log("NAME OF DEPARTMENT: ");
            console.log(res[0].department_name);
            console.log("------------------------")
            console.log("PRICE: ")
            console.log("$" + res[0].price)
            console.log("------------------------")
            console.log("TOTAL STOCK: ")
            console.log(res[0].stock_quantity)

            //second question asks how many checks against inventory
            inquirer.prompt({
                type: 'input',
                name: 'stock_quantity',
                message: 'How many do you need?',

                //then the answer will go to an update stock quantity
            }).then(function(answer) {

                //remember to call with answer.stock_quanity from table with name in prompt
                updateStockQuantity(answer.stock_quantity);
            })
        });
    })
}

//write update stock quantity function
function updateStockQuantity(stock_quantity) {

    var currentStock;

    var updatedStock;

    let queryForQuantity = "SELECT * FROM auctions WHERE ID=" + primaryKey;
    connection.query(queryForQuantity, function(err, res) {
        console.log("------------------------")
        console.log("CURRENT STOCK: " + res[0].stock_quantity);
        console.log("------------------------")
        console.log("PRICE PER UNIT: " + "$" + res[0].price);
        var totalPrice = res[0].price * stock_quantity
        currentStock = parseInt(res[0].stock_quantity)
        updatedStock = currentStock - parseInt(stock_quantity);

        if (updatedStock >= 0) {
            console.log("------------------------")
            console.log("THIS IS THE STORES UPDATED INVENTORY: " + updatedStock)
            console.log("------------------------")
            console.log("THE TOTAL PRICE IS: " + "$" + totalPrice);
            let queryForUpdate = "UPDATE auctions SET STOCK_QUANTITY=" + updatedStock + " WHERE ID=" + primaryKey
            //connection to query for update using var and MYSQL to update and primaryKey
            connection.query(queryForUpdate, function(err, res) {

            })
        } else {

            console.log("Insufficient quantity!");
        }
    });


}


