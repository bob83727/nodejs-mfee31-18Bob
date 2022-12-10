const fs = require('fs')

//error-first callback
fs.readFile('text.txt', 'utf-8', (err, data)=>{
    if(err){
        //如果err有值表示有錯誤發生 這裡應該要處理錯誤
        console.error('發生錯誤了',err)
    }else{
        //進來這裡表示err是空的（可能是null)
        console.log('成功讀到資料:', data)
    }
})
