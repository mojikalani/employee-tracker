const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table')


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_tracker_db'
    }
  );

  db.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    mainMenu();
});

//Starting application 
function mainMenu() { 
    inquirer.prompt([
        { 
            type: "list", 
            message: "Welcome, select an option: ", 
            name: "options", 
            choices: [ 
                "View all employees", 
                "View all employees by role", 
                "View all employees by department", //Extra
                "View all employees by manager", //Extra
                "Add employee", 
                "Add role", 
                "Add department"
            ]
        }
    ])
}