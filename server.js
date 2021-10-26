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
    console.log("Connected as Id" + db.threadId)
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
    .then(function(answers) {
        switch (answers.options){ 
            case "View all employees": 
                viewAllEmployees(); 
            break;

            case "View all employees by roll": 
                viewAllRoles(); 
            break;

            case "View all employees by departement": 
                viewAllDepartements(); 
            break;

            case "View all employees by manager": 
                viewAllByManager(); 
            break;

            case "Add Employee": 
                addEmployee(); 
            break;

            case "Add Role": 
                addRole(); 
            break;

            case "Add Departement": 
                addDepartement(); 
            break;
        }
    })
}