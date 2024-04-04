const inquirer = require('inquirer');
const {
    viewAllEmployees,
    addEmployee,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment
} = require('./modules/queries');

mainModule() {
    console.log('You are now connected to the employee_db database.');

    while (true) {
        const { main } = await inquirer.createPromptModule(menu);

        switch (main) {
            case 'View all Emloyees':
                await viewAllEmployees();
                break;
        }
    }
}

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
        choices: []
    }
];

const roleQ = [
    {
        type: 'list',
        name: 'departmentlist',
        message: 'Please select the department for this new role:',
        choices: []
    },
    {
        type: 'input',
        name: 'rolename',
        message: 'Please enter the name of this new role:'
    }
];

const departQ = [
    {
        type: 'input',
        name: 'departmentname',
        message: 'Please enter the name of the new department:'
    }
];