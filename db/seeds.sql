-- Department --
INSERT INTO department (name)
VALUE ("Sales"); 

INSERT INTO department (name)
VALUE ("Engineering"); 

INSERT INTO department (name)
VALUE ("Finance"); 

INSERT INTO department (name)
VALUE ("Legal"); 

-- Role -- 
INSERT INTO role (department_id, title, salary)
VALUE (1, "Sales Lead", 100000),

INSERT INTO role (department_id, title, salary)
VALUE (2, "Salesperson", 80000),

INSERT INTO role (department_id, title, salary)
VALUE (3, "Lead Engineer", 150000),

INSERT INTO role (department_id, title, salary)
VALUE (4, "Software Engineer", 120000),

INSERT INTO role (department_id, title, salary)
VALUE (5, "Account Manager", 160000),

INSERT INTO role (department_id, title, salary)
VALUE (6, "Accountant", 125000),

INSERT INTO role (department_id, title, salary)
VALUE (7, "Legal Team Lead", 250000),

INSERT INTO role (department_id, title, salary)
VALUE (8, "Lawyer", 190000)

-- Employee -- 
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mike", "Chan", null, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ashley", "Rodrigues", null, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kevin", "Tupik", null, 3);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kunal", "Singh", null, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Malia", "Brown", 1, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Lourd", 4, 6);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Santiago", 3, 7);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Barry", "Allen", 6, 8);