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
        choices: async () => {
            return (await roleChoices()).map(role => ({ name: role.name, value: role.id }));
        },
        when(answers) {
            return answers;
        }
    }
];

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

const departQ = [
    {
        type: 'input',
        name: 'departmentname',
        message: 'Please enter the name of the new department:'
    }
];

async function addEmployeePrompt() {
    const answers = await inquirer.prompt(employeeQ);
    await addEmployee(answers.firstname, answers.lastname, answers.role);

    console.log('Employee added.');
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