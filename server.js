const mysql = require('mysql2');
const inquirer = require('inquirer');
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
    if (err) { 
        throw (err)
    }
    console.log("\n Welcome to the Employee Tracker Application!\n")
    mainMenu();
});

//Main Menu for application
function mainMenu() { 
    inquirer.prompt([
        { 
            type: "list", 
            message: "Select an option: ", 
            name: "options", 
            choices: [ 
                "View all employees", 
                "View all employees by role", 
                "View all employees by department", 
                "Add employee", 
                "View roles",
                "Add role", 
                "View departments",
                "Add department", 
                "Exit"
            ]
        }
    ])

    .then(function(answers) {
        switch (answers.options){ 
            case "View all employees": 
                viewAllEmployees(); 
            break;

            case "View all employees by role": 
                viewAllERoles(); 
            break;

            case "View all employees by department": 
                viewAllEDepartments(); 
            break;

            case "Add employee": 
                addEmployee(); 
            break;

            case "View roles": 
                viewRoles(); 
            break; 

            case "Add role": 
                addRole(); 
            break;
            
            case "View departments": 
                viewDepartments();
            break;

            case "Add department": 
                addDepartment(); 
            break;

            case "Exit":  
                exitApp();
            break;
        }
    })
};

// Function for showing all employees
function viewAllEmployees() { 
    db.query(`
    SELECT 
    employee.id AS Id,
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

// Function for showing all Employee roles
function viewAllERoles() {
    db.query(`
    SELECT 
    employee.id AS Id,
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

// Function for showing all Employee departments
function viewAllEDepartments() {
    db.query(`
    SELECT 
    employee.id AS Id,
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


// Function for adding employee
function addEmployee() { 
    const managersArr = [];
    const roleArr = [];
    
    //Function for holding managers
    function selectManager() {
      db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
          managersArr.push(res[i].first_name);
        }
    
      })
      return managersArr;
    };

    // Function for holding roles
    function selectRole() {
    db.query("SELECT * FROM role", function(err, res) {
    if (err) { 
        throw (err)
    }
    for (let i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
        }
        })
    return roleArr;
    };


    inquirer.prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter their first name "
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter their last name "
        },
        {
            name: "id",
            type: "input",
            message: "Enter their Id "
          },
        {
          name: "role",
          type: "list",
          message: "What is their role? ",
          choices: selectRole()
        },
        {
            name: "choice",
            type: "list",
            message: "Whats their managers name?",
            choices: selectManager()
        }
    ]).then(function (answers) {
      const roleId = selectRole().indexOf(answers.role) + 1
      const managerId = selectManager().indexOf(answers.choice) + 1
      db.query("INSERT INTO employee SET ?", 
      {
          id: answers.Id, 
          first_name: answers.first_name,
          last_name: answers.last_name,
          manager_id: managerId,
          role_id: roleId
      
      }, function(err){
          if (err) { 
              throw (err)
          }
          console.table(answers)
          mainMenu()
      })

  })
}

// Functions for viewing and adding roles 
function viewRoles() { 
    db.query(`SELECT * FROM role;`, 
    function (err, res) { 
        if (err) { 
            throw (err)
        }
        console.table(res); 
        mainMenu();
    })
};

function addRole() { 
  db.query("SELECT role.title AS Title, role.salary AS Salary, role.department_id AS Department FROM role",   
  function(err, res) {
      if (err) { 
          throw(err);
      };

    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the role title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the salary?"
        }, 
        {
            name: "Department",
            type: "input",
            message: "What is the Department Id?"
  
          } 
        
    ]).then(function(answers) {
        db.query(
            "INSERT INTO role SET ?",
            {
              title: answers.Title,
              salary: answers.Salary,
              department_id: answers.Department,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                mainMenu();
            }
        )

    });
  });
  }

  // Functions for viewing and adding departments
function viewDepartments() { 
    db.query(`SELECT * FROM department;`, 
    function (err, res) { 
        if (err) { 
            throw (err)
        }
        console.table(res); 
        mainMenu();
    })
};

function addDepartment() { 
    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                mainMenu();
            }
        )
    })
  }


  function exitApp() {
      db.end();
      console.log("\nGood Bye!");
  }