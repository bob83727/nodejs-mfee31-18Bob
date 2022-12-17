const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
      })
    // simple query
    let [data, field] = await connection.query('select * from `stocks`')
    console.log(data)
    connection.end()
    })()