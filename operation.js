const inquirer = require('inquirer');
const queries = require('./queries/queries.js');
const Department = require("./lib/Department")
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');

async function viewAllDep() {
    const allDep = await queries.viewAllDepartments();

    console.table(allDep)
    return allDep;
}
async function viewAllRoles() {
    const allRoles = await queries.viewAllRols();
    console.table(allRoles)
    return allRoles;
}
async function viewAllEmployees() {
    const allEmp = await queries.viewAllEmployees();
    console.table(allEmp)
    return allEmp;
}
async function addRole() {
    try{
      
        const allDep = await queries.viewAllDepartments();
        // console.log(allDep)
        let new_role = await getNewRoleInfo(allDep)
        const dep = allDep.filter(i => {
            return i.name === new_role.dep
        })
        let newRole = new Role(new_role.title, new_role.salary, dep[0].id)
        await queries.addNewRole(newRole)
        console.log("New " + newRole.title + " role added!!")
    }catch{
        throw error;
    }
}
async function addDepartment() {

        let new_depart = await getNewDepInfo()
       
        let newDep = new Department(new_depart.name)
         queries.addNewDepartment(newDep.name)
        console.log("New " + newDep.name + " department added!!")

}
async function deleteDepartment() {

    const allDep = await queries.viewAllDepartments();
    const msg="Which department do you want to delete? "
    let delete_depart = await getDep(allDep,msg)
    const depRow = allDep.filter(i => {
        return i.name === delete_depart.dep
    })
    console.log(depRow[0].id)
    console.log("depRow")
         queries.deleteDepartment(depRow[0].id)
        console.log(depRow[0].name + " department deleted!!")

}
async function utilizedDepartment() {

    const allDep = await queries.viewAllDepartments();
    const msg="Which department do you want to Utlized? "
    let depart = await getDep(allDep,msg)
    const depRow = allDep.filter(i => {
        return i.name === depart.dep
    })

        const rows=await queries.utilizedDepartment(depRow[0].id)


}


async function addNewEmployee(){
    allRoles = await queries.getAllRols();
    allEmp = await queries.getAllEmployees();
    let new_Emp = await getNewEmpInfo(allEmp, allRoles)

    const manager = allEmp.filter(i => {
        const fulname = i.first_name + " " + i.last_name;
        if (fulname === new_Emp.employee) {
            return i.id
        }
    })
    const rol = allRoles.filter(i => {
        if (i.title === new_Emp.role) {
            return i.id
        }
    })
    let newEmployee = new Employee(new_Emp.firstName, new_Emp.lastName, rol[0].id, manager[0].id)
    // console.log(newEmployee)
    await queries.addNewEmployee(newEmployee)
    console.log("New " + newEmployee.first_name + " " + newEmployee.last_name + " employee added!!")
}

async function UpdateEmpRole(){
    allRoles = await queries.getAllRols();
    allEmp = await queries.getAllEmployees();

    let slectedEmp = await getEmpInfo(allEmp, allRoles)
    const findEmpId = allEmp.filter(i => {
        const fulname = i.first_name + " " + i.last_name;
        if (fulname === slectedEmp.employee) {
            return i
        }
    })
    const updatedRol = allRoles.filter(i => {
        if (i.title === slectedEmp.role) {
            return i.id
        }
    })
    await queries.updateEmployeeRole(findEmpId[0].id, updatedRol[0].id)

    
}

const getEmpInfo = (emp, roles) => {
    const roleName = []
    const roleId = []
    roles.forEach(element => {
        roleName.push(element.title)
        roleId.push(element.id)
    });
    const empName = []
    const empId = []
    emp.forEach(element => {
        empName.push(element.first_name + " " + element.last_name)
        empId.push(element.id)
    });

    return inquirer.prompt([
        {
            type: 'rawlist',
            name: 'employee',
            message: 'Which employee wants to be update?',
            choices: empName
        },{
            type: 'rawlist',
            name: 'role',
            message: 'Which Role this employee want to belong to?',
            choices: roleName
        }
    ])

}
const getNewEmpInfo =async (emp, roles) => {
    const roleName = []
    const roleId = []
    roles.forEach(element => {
        roleName.push(element.title)
        roleId.push(element.id)
    });
    const empName = []
    const empId = []
    emp.forEach(element => {
        empName.push(element.first_name + " " + element.last_name)
        empId.push(element.id)
    });

    return inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name?',
        }, {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name?',
        },
        {
            type: 'rawlist',
            name: 'role',
            message: 'Which Role this employee belong to?',
            choices: roleName
        },
        {
            type: 'rawlist',
            name: 'employee',
            message: 'Which manager this employee belong to?',
            choices: empName
        }
    ])

}
 const getNewRoleInfo =async (departments) => {
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
 const getDep =async (departments,msg) => {
    const depName = []
    const depId = []
    departments.forEach(element => {
        depName.push(element.name)
       
    });

    return inquirer.prompt([
        
        {
            type: 'rawlist',
            name: 'dep',
            message: msg,
            choices: depName
        }
    ])

}

 const getNewDepInfo =async () => {
    
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        }
    ])

}

module.exports = {
    viewAllDep,
    viewAllRoles,
    viewAllEmployees,
    addRole,
    addNewEmployee,
    UpdateEmpRole,
    addDepartment,
    deleteDepartment,
    utilizedDepartment
}
