-- Department --
INSERT INTO department (department_name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"), 
    ("Legal");

-- Role -- 
INSERT INTO employeeRole (department_id, title, salary)
VALUES
    (1, "Sales Lead", 100000),
    (2, "Salesperson", 80000),
    (3, "Lead Engineer", 150000),
    (4, "Software Engineer", 120000),
    (5, "Account Manager", 160000),
    (6, "Accountant", 125000),
    (7, "Legal Team Lead", 250000),
    (8, "Lawyer", 190000);

-- Employee -- 
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
    ("Mikey", "Chan", null, 1),
    ("Ashley", "Rodriguez", null, 2),
    ("Kevin","Tupic",null,3),
    ("Barry", "Allen", null, 8),
    ("Kunal", "Singh", 1, 4),
    ("Malia", "Brown", 4, 5),
    ("Sarah", "Lourd", 1, 6),
    ("Tom", "Nice", 2, 7);
