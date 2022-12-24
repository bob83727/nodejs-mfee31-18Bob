const express = require('express')
//利用 express 這個框架建立一個 web app
const app = express()

require('dotenv').config();
const mysql2 = require('mysql2/promise');

// let connection;
// (async ()=>{
//     connection = await mysql2.createConnection({
//         host: process.env.DB_HOST,
//         port: process.env.DB_PORT,
//         user: process.env.DB_USER,
//         password: process.env.DB_PWD,
//         database: process.env.DB_NAME,
// })})();

//使用pool方法
let pool = mysql2.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    // 限制 pool 連線數的上限
    connectionLimit: 10,
  });

  //允許跨源存取
  const cors = require('cors')
  app.use(cors({
    origin: '*',
  }))

//middleware => pipeline pattern

//設定express處理靜態檔案
//-> express內建 ->不需要安裝任何東西
app.use('/2048', express.static('./2048'))

//寫中間件 不用網址 中間件是一個有三個參數的函式
app.use((req, res, next) => {
    console.log('這裡是第一個中間件 A');
    req.mfee31 = '水母班'
    next()
})
app.use((req, res, next) => {
    console.log('這裡是第一個中間件 B');
    req.dt= new Date().toLocaleDateString()
    next()
})

//app.[method]
//get, post, put, patch, delete, option, head

//路由中間件
app.get('/', (req, res, next) => {
    console.log('這裡是首頁',req.mfee31, req.dt);
    res.send('Hello Express 8')
})

app.use( (req, res, next) => {
    console.log('這裡是第一個中間件C');
    next()
})

app.get('/test', (req, res, next) => {
    console.log('這裡是test頁面');
    res.send('Hello Test2')
})

app.get('/api', (req, res, next)=>{
    res.json({
        name: 'John',
        age: 18
    })
})

// app.get('/api/stocks', async (req, res, next)=>{
//     let [data] = await connection.query('SELECT * FROM stocks');
//     res.json(data);
// })

//使用pool方法
app.get('/api/stocks', async (req, res, next) => {
    // let results = await connection.query('SELECT * FROM stocks');
    // let data = results[0];
  
    let [data] = await pool.query('SELECT * FROM stocks');
    res.json(data);
  });
  

//放在所有的路由中間件後面
app.use((req, res, next) => {
    console.log('這裡404');
    res.send('沒有這個網頁啦')
})

app.listen(3001, ()=> {
    console.log('Server running at port 3001')
})