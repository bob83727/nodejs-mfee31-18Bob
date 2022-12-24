import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Stock = () => {
  const [error, setError] = useState(null);
  const [stocks, setStocks]= useState([]);
  const [counter, setCounter]=useState(0)

  useEffect(()=>{
    console.log('沒有第二個參數');
  })
  
  useEffect(()=>{
    //在component初始化時跑一次
    //通常會把去跟後端要資料的動作放在這裡
    console.log('第二個參數是空陣列');
    async function getStocks(){
      let response = await axios.get('http://localhost:3001/api/stocks');
      setStocks(response.data)
    };
    getStocks()
    
  },[])

  useEffect(()=>{
    console.log('第二個參數是counter');
  },[counter])

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>
      <button
      onClick={()=>{
        setCounter(counter+1)
      }}>add{counter}</button>
      {stocks.map((v,i)=>{
        return (
         <div className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer" key={v.id}>
        <Link to={'/stock/1234'}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">股票代碼:{v.id}</h2>
          <p className="text-gray-700">股票名稱:{v.name}</p>
        </Link>
      </div>)
      })}
     
    </div>
  );
};

export default Stock;
