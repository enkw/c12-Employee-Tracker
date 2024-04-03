const inquirer = require('inquirer');
const { Pool } = require('pg');

const pool = new Pool(
    {
      user: 'postgres',
      password: 'wackwack',
      database: 'movies_db'
    },
    console.log(`Connected to the employee_db database.`)
  )

const menu = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'Add Employee',
            'View all Roles',
            'Add Role',
            'View all Departments',
            'Add Department',
            'Quit'
        ]
    }
];

const employeeQ = [];

const roleQ = [];

const departQ = [];

// function init() {
//     inquirer.prompt(menu).then()
// }

// init();