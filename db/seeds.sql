INSERT INTO department ( name )
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role ( title, salary, department_id )
VALUES ('Sales Lead', 100000, 4),
       ('Salesperson', 80000, 4),
       ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 160000, 2),
       ('Accountant', 125000, 2),
       ('Legal Team Lead', 250000, 3),
       ('Lawyer', 190000, 3);

INSERT INTO employee ( first_name, last_name, role_id )
VALUES ('John', 'Doe', 4),
       ('Mike', 'Chan', 4),
       ('Ashley', 'Rodriguez', 1),
       ('Kevin', 'Tupik', 1),
       ('Kunal', 'Singh', 2),
       ('Malia', 'Brown', 2),
       ('Sarah', 'Lourd', 3),
       ('Tom', 'Allen', 3);