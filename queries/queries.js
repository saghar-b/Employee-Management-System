
const mysql = require('mysql2');
const db=require('./connection.js')

async function viewAllDepartments() {
    const sql = "SELECT * FROM department;";
    const [rows, fields] = await db.promise().query(sql);
    return rows;
}

async function viewAllEmployees() {
    const sql = "SELECT employee.id,employee.first_name,employee.last_name,department.name as department,role.salary as salary FROM ((employee join role on employee.role_id = role.id)join department on role.department_id=department.id) ;";
    const [rows, field] = await db.promise().query(sql);
    return rows
}
async function getAllEmployees() {
    const sql = "SELECT * FROM employee;";
    const [rows, field] = await db.promise().query(sql);
    return rows
}
async function viewAllRols() {
    const sql = "SELECT role.id as id,role.title as title,department.name as department, role.salary as salary FROM role join department where role.department_id = department.id ;";
    const [rows, field] = await db.promise().query(sql);
    // console.log(field)
    return rows;
}
async function getAllRols() {
    const sql = "SELECT * FROM role;";
    const [rows, field] = await db.promise().query(sql);
    // console.log(field)
    return rows;
}
async function addNewDepartment(new_department) {

    const sql = 'INSERT INTO department (name) VALUES (?)';
    const params = [new_department];
     
    const [rows, field] = await db.promise().query(sql,params);

}
async function deleteDepartment(depId) {

    const sql = 'DELETE from department WHERE id = ?';
    const params = [depId];
    // console.log(params)
   
    const [rows, field] = await db.promise().query(sql,params);

}
async function utilizedDepartment(depId) {

    const sql = `SELECT
    department.name as department,
    SUM(role.salary)
    FROM (
            (
                employee
                join role
                on employee.role_id = role.id
            )
            join department
            on role.department_id = department.id
        )
    WHERE department.id = ?;`;
    const params = [depId];
    
   
    const [rows, field] = await db.promise().query(sql,params);
    console.table(rows)
    return rows;

}
async function addNewRole(new_role) {

    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (? , ? , ?)';
    const params = [new_role.title,parseFloat(new_role.salary) ,parseInt(new_role.depId)];
    
    const [rows, field] = await db.promise().query(sql,params);

}
async function addNewEmployee(new_Employee) {

    const sql = 'INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (? , ? , ? , ?)';
    const params = [new_Employee.name,new_Employee.last_name,parseFloat(new_Employee.role_id) ,parseInt(new_Employee.manager_id)];
    console.log(params);
    const [rows, field] = await db.promise().query(sql,params);

}
async function updateEmployeeRole(id,roleId) {

    const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const params = [roleId,id];
    console.log(params);
    const [rows, field] = await db.promise().query(sql,params);

}
module.exports = {
    viewAllDepartments,
    viewAllEmployees,
    viewAllRols,
    addNewRole,
    addNewEmployee,
    updateEmployeeRole,
    getAllRols,
    getAllEmployees,
    addNewDepartment,
    deleteDepartment,
    utilizedDepartment
};