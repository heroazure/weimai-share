const clone = require('../clone')

// 同名事件队列依次执行，返回值为Promise类型或者带有then方法的对象，需等待执行完再执行下一个同名事件
const loop = function (list, data, state, idx) {
    let tmp, fn = list[idx++]
    if (!fn) return Promise.resolve(state)

    tmp = fn(state, data)
    if (!tmp) return loop(list, data, state, idx)
    // 判断是否返回的是带有then方法的对象，主要处理返回值Promise情况
    if (typeof tmp.then === 'function') return tmp.then((sta) => loop(list, data, sta, idx))

    // 非Promise的情况，将上一个返回结果传给下一个事件
    if (typeof tmp === 'object') return loop(list, data, tmp, idx)
}

const Store = function (obj) {
    let events = {}
    let state = clone.deepCopy(obj || {})
    return {
        get state() {
            return state
        },
        on: function (key, cb) {
            events[key] = (events[key] || []).concat(cb)
            // 执行返回函数，解除事件监听
            return () => events[key].splice(events[key].indexOf(cb) >>> 0, 1)
        },
        dispatch: function (key, payload) {
            // 执行完之后再更新state
            return loop(events[key] || [], payload, clone.deepCopy(state), 0).then(st => state = st)
        }
    }
}

module.exports = {
    Store
}
