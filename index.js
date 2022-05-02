const department = require("./lib/Department")
const role = require("./lib/Role")
const employee = require("./lib/Employee")
const inquirer = require('inquirer');
const queries = require('./queries/queries.js');
const logo = require('./asset/logo.js')
const { error } = require("console");
const { start } = require("repl");
const { all } = require("async");

function intro() {
    console.log(logo.printLogo());


    init();
}
const init = async () => {
    var allDep;
    // try {


    let selectMenue = await ShowMenu();
    // console.log(selectMenue.menu);
    switch (selectMenue.menu) {
        case 'View all Departments':
            allDep = await queries.viewAllDepartments();
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

        case 'Add Role':
            allDep = await queries.viewAllDepartments();
            console.log(allDep)
            let new_role = await showDepartments(allDep)
            const dep=allDep.filter(i =>{
               return i.name === new_role.dep
            })
            console.log("-----")
            // console.log(new_role.dep)
            // console.log(allDep)
            // console.log(dep)
            // console.log(dep[0].id)
            let newRole= new role(new_role.title, new_role.salary , dep[0].id)
        //    console.log(newRole)
            await queries.addNewRole(newRole)
            break;

        case 'Quit':
            console.log("bye")
            break;

    }
    // } catch {
    //     throw error;
    // }
}
const showDepartments = (departments) => {
    const depName = []
    const depId = []
    departments.forEach(element => {
        depName.push(element.name)
        depId.push(element.id)
    });

    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        }, {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?',
        },
        {
            type: 'rawlist',
            name: 'dep',
            message: 'Which department this role belong to?',
            choices: depName
        }
    ])

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