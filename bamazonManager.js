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

//connection query select all from table auctions
// connection.query("SELECT * FROM auctions", function(err, res) {

//     //display function
//     displayItems(res)
// });


// function displayItems(array) {
//     // loop through the array and display each item by ID and Name
//     for (var i = 0; i < array.length; i++) {
//         var item = "THE PRODUCT ID: " + array[i].id + "\n" + "THE PRODUCT NAME: " + array[i].product_name;
//         //display item
//         console.log(item);
//         //break
//         console.log("------------------------")
//     }
//     //start function
// start()
// }
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

// // connection query select all from table auctions
//  connection.query("SELECT * FROM auctions", function(err, res) {

//      //display function passing res
//      displayItems(res)
//  });


// function displayItems(array) {

// 	for (var i = 0; i <array.length; i++){
// 		var item = "THE PRODUCT ID: " + array[i].id + "\n" + "THE PRODUCT NAME: " + array[i].product_name;

// 		console.log(item);
// 			console.log("-------------------------")
// 		}
// }

var displayItems = function() {
    var query = "SELECT * FROM auctions";
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            // console.log("PRODUCTS FOR Sale")
            // console.log("ID: " + res[i].id)
            console.log("--------------------------------------------------")
            console.log("PRODUCT NAME: " + res[i].product_name);
            console.log("--------------------------------------------------")
            // console.log("DEPARTMENT NAME: " + res[i].department_name);
            // console.log("--------------------------------------------------")
            // console.log("PRICE: " + "$" +res[i].price)
            // console.log("--------------------------------------------------")
            // console.log("STOCK QUANTITY: " + res[i].stock_quantity)

        }
        start()
    })
}

var viewLowInventory = function(){
    // var currentStock;

    // var updatedStock;

    connection.query("SELECT * FROM auctions WHERE=stock_quantity", function(err, res){

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id);
        };
         start()
    });
}
    // console.log(queryForQuantity)


//    queryForQuantity, function(err, res) {
//         console.log("------------------------")

//         console.log("CURRENT STOCK: " + res[0].stock_quantity);
//         console.log("------------------------")

//         console.log("PRICE PER UNIT: " + "$" + res[0].price);
//         var totalPrice = res[0].price * stock_quantity


//         currentStock = parseInt(res[0].stock_quantity)


//         // console.log(currentStock)
//         updatedStock = currentStock - parseInt(stock_quantity);



// }
// )};

// var start = function() {
//     //inquirer question with input
//     var questions = {
//         type: 'list',
//         name: "choice",
//         message: 'Please select from the choices below:', 
//         choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']

//     };
//     //first prompt user to select from display by ID
//     inquirer.prompt(questions).then(function(answer) {
//         console.log("-------------------------")
//         console.log("ITEM ID SELECTED: ")
//         console.log(answer.choice);

//         // ASSIGN A VALUE TO primaryKey
//         primaryKey = answer.id

//         //variable to query all from auction table WHERE user answer, use let for block line
//         let query = "SELECT * FROM auctions WHERE ID=" + primaryKey;

//         //connect to table auction query only WHERE by primary key
//         connection.query(query, function(err, res) {

//             // console.log(res[0]);
//             console.log("------------------------")
//             console.log("NAME OF PRODUCT: ");
//             console.log(res[0].product_name);
//             console.log("------------------------")
//             console.log("NAME OF DEPARTMENT: ");
//             console.log(res[0].department_name);
//             console.log("------------------------")
//             console.log("PRICE: ")
//             console.log("$" + res[0].price)
//             console.log("------------------------")
//             console.log("TOTAL STOCK: ")
//             console.log(res[0].stock_quantity)

//             //second question asks how many checks against inventory
//             inquirer.prompt({
//                 type: 'input',
//                 name: 'stock_quantity',
//                 message: 'How many do you need?',

//                 //then the answer will go to an update stock quantity
//             }).then(function(answer) {

//                 //remember to call with answer.stock_quanity from table with name in prompt
//                 updateStockQuantity(answer.stock_quantity);
//             })
//         });
//     })
// }

// start()

//write update stock quantity function
// function updateStockQuantity(stock_quantity) {

//     // 1.  GET CURRENT STOCK
//     // 2.  COMPARE CURRENT STOCK AGAINST REQUESTED STOCK
//     // 3.  IF THERE IS ENOUGH STOCK UPDATE THE STOCK QUANTITY FOR THE TRANSACTION, ELSE TELL USER THERE ISN'T ENOUGH

//     // USE VALUE OF CURRENT SELECTED ID TO MAKE THE APPROPRIATE QUERY
//     var currentStock;

//     var updatedStock;

//     let queryForQuantity = "SELECT * FROM auctions WHERE ID=" + primaryKey;
//     // console.log(queryForQuantity)


//     connection.query(queryForQuantity, function(err, res) {
//         console.log("------------------------")

//         console.log("CURRENT STOCK: " + res[0].stock_quantity);
//         console.log("------------------------")

//         console.log("PRICE PER UNIT: " + "$" + res[0].price);
//         var totalPrice = res[0].price * stock_quantity


//         currentStock = parseInt(res[0].stock_quantity)


//         // console.log(currentStock)
//         updatedStock = currentStock - parseInt(stock_quantity);



//         if (updatedStock >= 0) {

//             console.log("------------------------")
//             console.log("THIS IS THE STORES UPDATED INVENTORY: " + updatedStock)

//             console.log("------------------------")
//             console.log("THE TOTAL PRICE IS: " + "$" + totalPrice);
//             let queryForUpdate = "UPDATE auctions SET STOCK_QUANTITY=" + updatedStock + " WHERE ID=" + primaryKey

//             //connection to query for update using var and MYSQL to update and primaryKey
//             connection.query(queryForUpdate, function(err, res) {

//             })
//         } else {

//             console.log("Insufficient quantity!");
//         }
//     });


// }

// start()