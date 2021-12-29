const type = require('./type')
/**
 * 深度克隆
 * @param data 数组或者普通对象
 * @returns {*}
 */
function deepCopy(data) {
    const t = type.typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

/**
 * 将一个普通对象merge到另一个普通对象
 * @param obj0
 * @param obj2
 * @returns {返回最终的merge结果对象}
 */
function merge(obj0,obj2){
    let obj1 = deepCopy(obj0)
    Object.keys(obj2).forEach(key=>{
        if (type.typeOf(obj2[key]) ==='object'){
            if (type.typeOf(obj1[key]) ==='undefined'){
                obj1[key]={}
            }
            Object.keys(obj2[key]).forEach(k=>{
                obj1[key][k] = obj2[key][k]
            })
        }else{
            obj1[key] = obj2[key]
        }
    })
    return obj1
}

module.exports = {
    deepCopy,
    merge
}
