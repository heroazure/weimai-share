// 数组拍平展开-扩展运算符递归
function spread1(arr){
    let arr1 = [];
    let bStop = true;
    arr.forEach((val)=>{
        if(Array.isArray(val)){
            arr1.push(...val);
            bStop = false
        }else{
            arr1.push(val)
        }
    })
    if(bStop){
        return arr1;
    }
    return spread1(arr1)
}

// 数组拍平展开-reduce递归
function spread2(arr){
    return arr.reduce((prev,cur)=>{
        return prev.concat(Array.isArray(cur)? spread2(cur) : cur)
    }, [])
}
