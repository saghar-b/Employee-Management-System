
const mysql = require('mysql2');
// var async = require("async");
// const util = require("util"); 
// const mysql = require("mysql-promisify");
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'sanaz123',
        database: 'Emp_Man_db'
    },
    console.log(`Connected to the Emp_Man_db database.`)
);

async function viewAllDepartments() {
    const sql = "SELECT * FROM department;";
    const [rows, fields] = await db.promise().query(sql);
    return rows;
}

async function viewAllEmployees() {
    const sql = "SELECT * FROM employee;";
    const [rows, field] = await db.promise().query(sql);
    return rows
}
async function viewAllRols() {
    const sql = "SELECT * FROM role;";
    const [rows, field] = await db.promise().query(sql);
    // console.log(field)
    return rows;
}

async function addNewRole(new_role) {

    const sql = 'INSERT INTO role (title, salary, department_id) VALUES (? , ? , ?)';
 
    // const sql = 'INSERT INTO role (title, salary, department_id) VALUES (?)',["new_role.title",2000,3];
    const params = [new_role.title,parseFloat(new_role.salary) ,parseInt(new_role.depId)];
    // const params = ["new_role.title",2000,3];
    console.log(params);
    const [rows, field] = await db.promise().query(sql,params);

}
module.exports = {
    viewAllDepartments,
    viewAllEmployees,
    viewAllRols,
    addNewRole
};