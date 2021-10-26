-- Query for viewing all employees -- 
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

-- Query for Viewing all roles -- 
SELECT 
employee.first_name AS "First Name", 
employee.last_name AS "Last Name", 
role.title AS Title 
FROM employee 
JOIN role ON employee.role_id = role.id;

-- Query for Viewing all Departments -- 
SELECT 
employee.first_name AS "First Name",
employee.last_name AS "Last Name", 
department.name AS Department 
FROM employee 
JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id 
ORDER BY employee.id;