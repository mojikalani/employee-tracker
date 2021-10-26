const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table')


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_trackerDB'
    }
  );

  db.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + db.threadId)
    mainMenu();
});

//Main Menu for application
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

            case "View all employees by role": 
                viewAllRoles(); 
            break;

            case "View all employees by department": 
                viewAllDepartments(); 
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
};

// Function for showing all employees
function viewAllEmployees() { 
    db.query(`
    SELECT 
    employee.first_name AS "First Name", 
    employee.last_name AS "Last Name", 
    role.title AS Title, 
    role.salary AS Salary, 
    department.name AS Department, 
    CONCAT(m.first_name, ' ' ,m.last_name) AS Manager 
    FROM employee 
    INNER JOIN role on role.id = employee.role_id 
    INNER JOIN department on department.id = role.department_id 
    left join employee m on employee.manager_id = m.id;
    `, 
    function(err, res) { 
        if (err) { 
            throw (err)
        }
        console.table(res)
        mainMenu();
    })
};

// Function for showing all employee roles
function viewAllRoles() {
    db.query(`
    SELECT 
    employee.first_name AS "First Name", 
    employee.last_name AS "Last Name", 
    role.title AS Title 
    FROM employee 
    JOIN role ON employee.role_id = role.id;
    `, 
    function(err, res) { 
        if (err) { 
            throw (err)
        }
        console.table(res)
        mainMenu();
    })
};

function viewAllDepartments() {
    db.query(`
    SELECT 
    employee.first_name AS "First Name",
    employee.last_name AS "Last Name", 
    department.name AS Department 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id 
    ORDER BY employee.id;
    `, 
    function(err, res) { 
        if (err) { 
            throw (err)
        }
        console.table(res)
        mainMenu();
    })
};
