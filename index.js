const inquirer = require('inquirer');
const {
    pool,
    viewAllEmployees,
    addEmployee,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment
} = require('./modules/queries');

async function mainMenu() {
    console.log('You are now connected to the employee_db database.');

    while (true) {
        const { main } = await inquirer.prompt(menu);

        switch (main) {
            case 'View all Employees':
                await viewAllEmployees();
                break;
            case 'Add Employee':
                await addEmployeePrompt();
                break;
            case 'Update Employee Role':
                await updateEmployeePrompt();
                break;
            case 'View all Roles':
                await viewAllRoles();
                break;
            case 'Add Role':
                await addRolePrompt();
                break;
            case 'View all Departments':
                await viewAllDepartments();
                break;
            case 'Add Department':
                await addDepartmentPrompt();
                break;
            case 'Quit':
                console.log('Smell ya l8r, rat fink');
                return;
        }
    }
}

// Main menu options
const menu = [
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'Add Employee',
            'Update Employee Role',
            'View all Roles',
            'Add Role',
            'View all Departments',
            'Add Department',
            'Quit'
        ]
    }
];

// Prompts handling adding an employee
const employeeQ = [
    {
        type: 'input',
        name: 'firstname',
        message: 'Please enter the Employees first name:'
    },
    {
        type: 'input',
        name: 'lastname',
        message: 'Please enter the Employees last name:'
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select the Employees role:',
        // Learned how to do work with this portion from https://stackoverflow.com/questions/66626936/inquirer-js-populate-list-choices-from-sql-database
        // and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
        choices: async () => {
            return (await roleChoices()).map(role => ({ name: role.name, value: role.id }));
        },
        when(answers) {
            return answers;
        }
    }
];

// Prompts handling updating an employee
const updateEmployeeQ = [
    {
        type: 'list',
        name: 'employeename',
        message: 'Please select the employee to update:',
        choices: async () => {
            const employees = await empChoices();
            return employees.map(employee => ({ 
                name: `${employee.firstname} ${employee.lastname}`, 
                value: employee.id 
            }));
        },
        when(answers) {
            return answers;
        }
    },
    {
        type: 'list',
        name: 'role',
        message: 'Please select the Employees new role:',
        choices: async () => {
            const roles = await roleChoices();
            return roles.map(role => ({ name: role.name, value: role.id }));
        },
        when(answers) {
            return answers;
        }
    }
];

// Prompts handling adding a role
const roleQ = [
    {
        type: 'list',
        name: 'departmentlist',
        message: 'Please select the department for this new role:',
        choices: async () => {
            return (await departmentChoices()).map(department => ({ name: department.name, value: department.value }));
        },
        when(answers) {
            return answers;
        }
    },
    {
        type: 'input',
        name: 'rolename',
        message: 'Please enter the name of this new role:'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary for this new role:'
    }
];

// Prompt handling adding a department
const departQ = [
    {
        type: 'input',
        name: 'departmentname',
        message: 'Please enter the name of the new department:'
    }
];

// Heavily referenced https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function and class activities for guidance here
// Functions that handle the different prompts that add data to the database
async function addEmployeePrompt() {
    const answers = await inquirer.prompt(employeeQ);
    await addEmployee(answers.firstname, answers.lastname, answers.role);

    console.log('Employee added.');
}

async function updateEmployeePrompt() {
    const answers = await inquirer.prompt(updateEmployeeQ);
    await updateEmployeeRole(answers.employeename, answers.role);

    console.log('Employee role updated.');
}

async function addRolePrompt() {
    const answers = await inquirer.prompt(roleQ);
    await addRole(answers.rolename, answers.salary, answers.departmentlist);
    
    console.log('Role added.');
}

async function addDepartmentPrompt() {
    const answers = await inquirer.prompt(departQ);
    await addDepartment(answers.departmentname);
    
    console.log('Department added.');
}

// This function updates the employee role based on the users selection
async function updateEmployeeRole(employeeId, roleId) {
    const updateQuery = `
        UPDATE employee
        SET role_id = $1
        WHERE id = $2
    `;
    await pool.query(updateQuery, [roleId, employeeId]);
}

// All functions handling reading the database to assign data to choices
async function empChoices() {
    const employeeQuery = `SELECT id, first_name, last_name FROM employee;`;
    const employees = await pool.query(employeeQuery);
    return employees.rows.map(employee => ({
        id: employee.id,
        firstname: employee.first_name,
        lastname: employee.last_name
    }));
}

async function roleChoices() {
    const roleQuery = `SELECT id, title as name FROM role;`;
    const role = await pool.query(roleQuery);
    return role.rows;
}

async function departmentChoices() {
    const departmentQuery = `SELECT id AS value, name FROM department;`;
    const department = await pool.query(departmentQuery);
    return department.rows;
}

mainMenu();