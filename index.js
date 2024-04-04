const inquirer = require('inquirer');
const {
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

async function addEmployeePrompt() {
    const roleChoices = await viewAllRoles();
    if (roleChoices.length === 0) {
        console.log('No roles found. Please add a role first.');
        return;
    }

    employeeQ[2].choices = roleChoices.map(role => ({ name: role.title, value: role.id }));

    const answers = await inquirer.prompt(employeeQ);
    await addEmployee(answers.firstname, answers.lastname, answers.role);

    console.log('Employee added successfully!');
}
  
  async function addRolePrompt() {
    const departmentChoices = await viewAllDepartments();
    roleQ[0].choices = departmentChoices.map(department => ({ name: department.name, value: department.id }));

    const answers = await inquirer.prompt(roleQ);
    await addRole(answers.rolename, answers.salary, answers.departmentlist);

    console.log('Role added successfully!');
}
  
  async function addDepartmentPrompt() {
    const answers = await inquirer.prompt(departQ);
    await addDepartment(answers.departmentname);
  
    console.log('Department added successfully!');
  }
  
  mainMenu();