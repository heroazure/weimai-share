export const parseQuery = function (query) {
    const obj = {}
    query = ['?','#'].includes(query.slice(0,1)) ? query.slice(1) : query
    query.split('&').forEach(str => {
        const index = str.indexOf('=')
        const key = str.slice(0, index)
        const val = str.slice(index + 1)
        if (key) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = Array.isArray(obj[key]) ? obj[key].concat(val) : [obj[key], val]
            } else {
                obj[key] = val
            }
        }
    })
    return obj
}

export const stringfyQuery = function (obj) {
    let query = ''
    for(let key in obj) {
        const val = obj[key]
        if (Array.isArray(val)) {
            val.forEach(n => query += ('&' + key + '=' + n))
        } else {
            query += ('&' + key + '=' + val)
        }
    }
    return query ? query.slice(1) : query
}
