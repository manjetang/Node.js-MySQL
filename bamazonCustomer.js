var mysql = require('mysql');
var table = require('console.table');
var inquirer = require('inquirer');
var connection = mysql.createConnection({
    host: "127.0.0.1",
  
    port: 3306,
  
    user: "root",
  
    password: "password",
    database: "bamazonDB"
  });

  function productItems (){
      connection.connect (function(error) {
          connection.query("SELECT * FROM products", function (error, res){
              if (error) throw err;
              else console.table(res, "\n");
              productId();
          });
      });
  }
  productItems();

  function productId () {
        inquirer
          .prompt([
              {
            name: "id",
            type: "input",
            message: "Please enter the item ID of the product you will like to purchase.\n",
            validate: function(name) {
                if (isNaN(name) === false && name < 11) {
                    return true;
                }
                return false;
            }
  },
  {
      type: "input",
      name: "quant",
      message: "How many units of the product will you like to purchase?\n",
      validate: function(quant) {
        if (isNaN(quant) === false) {
            return true;
        }
        return false;
    }
  }
]).then(function(answer){
    var userId = answer.id;
    console.log("chosen item id: " , userId);
    var userQuant = answer.quant;
    console.log("Chosen quantity from stock: " , userQuant , "\n");
    connection.query("SELECT * FROM products WHERE ?", [{item_id: answer.id }], function(error, res){
        if (error) throw error;

        console.table(res);
        var current_quantity = res[0].stock_quantity;
        console.log("Current quantity in stock: ", current_quantity);
        var price = res[0].price;
        var remaining_quantity = current_quantity - answer.quant;
        console.log("Remaining quantity in stock: " , remaining_quantity);

        if (current_quantity > answer.quant) {
            console.log("Amount remaining: " + remaining_quantity);
            console.log("Total amount: " + (answer.quant * price) + "\n");
            connection.query("Update products set stock_quantity=? where item_id=?", [remaining_quantity, answer.id],

            function (error, res) {
                console.table(res);
            });
            connection.query("SELECT * FROM products", function(err, res){
                console.log("This is the updated inventory: ");
                console.log("-------------\n");
                console.table(res);
            });

            }else {
                console.log("Insufficient quantity, please enter other amount");
            }
            connection.end();
        });
        
    });
}

  