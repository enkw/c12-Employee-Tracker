const { Pool } = require('pg');

// Connects us to the db
const pool = new Pool(
    {
      user: 'postgres',
      password: 'wackwack',
      database: 'movies_db'
    },
    console.log(`Connected to the employee_db database.`)
)

// Tried to make the function names obvious
async function viewAllEmployees() {
    const results = await pool.query(`
    SELECT e.id, e.first_name, e.last_name, r.title AS role, r.salary, d.name AS department
    FROM employee e
    JOIN role r ON e.role_id = r.id
    JOIN department d ON r.department_id = d.id`)
};

async function addEmployee(firstName, lastName, roleId) {

};

async function viewAllRoles() {

};

async function addRole(title, salary, departmentId) {

};

async function viewAllDepartments() {

};

async function addDepartment(departmentName) {

};

