const mysql = require('mysql2/promise');

(async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'admin',
        password: '',
        database: 'stock_mfee31'
      })
    // simple query
    let [data, field] = await connection.query('select * from `stocks`')
    console.log(data)
    connection.end()
    })()