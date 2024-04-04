const { Pool } = require('pg');

// Connects us to the db
const pool = new Pool(
    {
      user: 'postgres',
      password: 'wackwack',
      database: 'employee_db',
      // Found out this is important even though it's running locally, you still need to specify that
      host: 'localhost',
      port: 5432
    }
);

// Tried to make the function names obvious

async function viewAllEmployees() {
    const results = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id`);
    // Shouts out to Dan for console.table
    console.table(results.rows);
}

async function addEmployee(firstName, lastName, roleId) {
    await pool.query(`
    INSERT INTO employee (first_name, last_name, role_id)
    VALUES ($1, $2, $3)`,
    [firstName, lastName, roleId]);

    console.log('Successfully added Employee');
};

async function viewAllRoles() {
    const results = await pool.query('SELECT * FROM role');
    console.table(results.rows);
};

async function addRole(title, salary, departmentId) {
    await pool.query(`
    INSERT INTO role (title, salary, department_id)
    VALUES ($1, $2, $3)`,
    [title, salary, departmentId]);

    console.log('Successfully added Role');
};

async function viewAllDepartments() {
    const results = await pool.query('SELECT * FROM department');
    console.table(results.rows);
};

async function addDepartment(departmentName) {
    await pool.query(`
    INSERT INTO department (name)
    VALUES ($1)`,
    [departmentName]);

    console.log('Successfully added Department');
};

// Exports the functions here so they can be used in index.js
module.exports = {
    viewAllEmployees,
    addEmployee,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment
};