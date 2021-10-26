drop database if exists employer_trackerDB;
create database employer_trackerDB;
use employer_trackerDB; 

create table employee (
id int not null auto_increment,
first_name varchar(30),
last_name varchar(30),
role_id integer,
manager_id integer,
primary key (id)
);

create table department (
id int not null auto_increment,
department_name varchar(30),
primary key (id)
);

create table employeeRole (
id int not null auto_increment,
title varchar(30),
salary decimal (8,2),
department_id integer,
primary key (id)
);
