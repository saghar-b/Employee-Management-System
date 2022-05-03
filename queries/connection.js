const mysql = require('mysql2');
// const Connection = require('mysql2/typings/mysql/lib/Connection');
const connection = mysql.createConnection(
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

module.exports = connection;