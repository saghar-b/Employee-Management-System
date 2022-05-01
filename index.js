const department = require("./lib/Department")
const role = require("./lib/Role")
const employee = require("./lib/Employee")
const inquirer = require('inquirer');
const queries = require('./queries/queries.js');
const logo = require('./asset/logo.js')
const { error } = require("console");
const { start } = require("repl");

function intro() {
    console.log(logo.printLogo());


    init();
}
const init = async () => {
    try {
       

        let selectMenue = await ShowMenu();
        console.log(selectMenue.menu);
        switch (selectMenue.menu) {
            case 'View all Departments':
                const allDep = await queries.viewAllDepartments();
                console.table(allDep)
                await init();
                break;
            case 'View all manager Roles':
                const allRoles = await queries.viewAllRols();
                console.table(allRoles)
                init();
                break
            case 'view all Employees':
                const allEmp = await queries.viewAllEmployees();
                console.table(allEmp)
                init();
                break;

            case 'Quit':
                console.log("bye")
                break;

        }
    } catch {
        throw error;
    }
}

const ShowMenu = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all manager Roles', 'view all Employees', 'Add Role', 'Add Department', 'Quit']
        }
    ])
}
intro()