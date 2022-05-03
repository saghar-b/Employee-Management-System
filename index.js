const department = require("./lib/Department")
const role = require("./lib/Role")
const employee = require("./lib/Employee")
const inquirer = require('inquirer');
const queries = require('./queries/queries.js');
const logo = require('./asset/logo.js')
const { error } = require("console");
const { start } = require("repl");
const { all } = require("async");
const Employee = require("./lib/Employee");
const operation = require("./operation.js")

function intro() {
    console.log(logo.printLogo());


    init();
}
const init = async () => {
    // let allDep;
    let allRoles;
    let allEmp;
    // try {


        let selectMenue = await ShowMenu();
        // console.log(selectMenue.menu);
        switch (selectMenue.menu) {
            case 'View all Departments':
                await operation.viewAllDep()
                await init();
                break;

            case 'View all manager Roles':
                await operation.viewAllRoles();
                await init();
                break;

            case 'view all Employees':
                await operation.viewAllEmployees()
                await init();
                break;

            case 'Add Role':
                await operation.addRole();
                await init();
                break;

            case 'Add Employee':
                await operation.addNewEmployee();
                await init();
                break;

            case 'Update Employee Role':
                await operation.UpdateEmpRole()
                await init();
                break;

            case 'Add Department':
                await operation.addDepartment()
                await init();
                break;

            case 'Delete Department':
                await operation.deleteDepartment()
                await init();
                break;
            case 'utilized budget of a department':
                await operation.utilizedDepartment()
                await init();
                break;

            case 'Quit':
                console.log("bye")
                break;

        }
//     } catch {
//         throw console.error();;
//     }
}



const ShowMenu = () => {

    return inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all manager Roles', 
            'view all Employees', 'Add Department', 'Add Role', 'Add Employee', 
            'Update Employee Role', 'Delete Department','utilized budget of a department','Quit']
        }

    ])
}
intro()