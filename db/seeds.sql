-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUES 
("Sales"),
("Engineering"),
("Finance"),
("Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 1),
("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant", 125000, 3),
("Account Manager", 160000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

-- EMPLOYEE SEEDS -------
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
("Mikey", "Chan", null, 1),
("Ashley", "Rodriguez", null, 2),
("Kevin","Tupik",null,3),
("Kuunal", "Singh", 1, 4),
("Malia", "Brown", 4, 5),
("Sarah", "Lourd", 1, 6),
("Tom", "Bihn", 2, 7),
("Barry", "Allen", null, 8);