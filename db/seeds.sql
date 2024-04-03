INSERT INTO department ( id, name )
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales');

INSERT INTO role ( id, title, salary, department_id )
VALUES (1, 'Sales Lead', 100000, 4),
       (2, 'Salesperson', 80000, 4),
       (3, 'Lead Engineer', 150000, 1),
       (4, 'Software Engineer', 120000, 1),
       (5, 'Account Manager', 160000, 2),
       (6, 'Accountant', 125000, 2),
       (7, 'Legal Team Lead', 250000, 3),
       (8, 'Lawyer', 190000, 3);

INSERT INTO employee ( id, first_name, last_name, role_id )
VALUES (1, 'John', 'Doe', 4),
       (2, 'Mike', 'Chan', 4),
       (3, 'Ashley', 'Rodriguez', 1),
       (4, 'Kevin', 'Tupik', 1),
       (5, 'Kunal', 'Singh', 2),
       (6, 'Malia', 'Brown', 2),
       (7, 'Sarah', 'Lourd', 3),
       (8, 'Tom', 'Allen', 3);