function sum(n){
    //回傳1+到n的結果
    let result=0
    for(let i=0;i<=n;i++){
        result+=i
        return result
    }
}

console.log(sum(1))//1
console.log(sum(2))//3
console.log(sum(3))//6
console.log(sum(10))//55