
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
// db.query = util.promisify(db.query).bind(db);
// db.connect(function(err){
//     if (err) {
//         console.log("error connecting: " + err.stack);
//         return;
//     };
//     console.log("connected as... " + db.threadId);
// });

// getUser: async (req, res) => {
//     let queryString = `SELECT * from acct WHERE ACCT_KEY = 89`;  
//     const [user] = await db.query(queryString).catch(err => {throw err}); 
//     res.json(user); 
//  }
//  const viewAllDepartments = async(req,res) =>{
//     const sql="SELECT * FROM department;";
//     const [user] = await db.query(queryString).catch(err => {throw err}); 
//     res.json(user); 
//  }
async function viewAllDepartments() {
    const sql = "SELECT * FROM department;";
    const [rows, fields] = await db.promise().query(sql);
    return rows;
}

async function viewAllEmployees() {
    const sql = "SELECT * FROM employee;";
    const [rows,field]= await db.promise().query(sql);
    return rows
}
async function viewAllRols(){
    const sql = "SELECT * FROM role;";
    const [rows,field]= await db.promise().query(sql);
    // console.log(field)
    return rows;
}
module.exports = {
    viewAllDepartments,
    viewAllEmployees,
    viewAllRols
};