const clone = require('../clone')

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
    let state = clone.deepCopy(obj)
    return {
        get state() {
            return state
        },
        on: function (key, cb) {
            events[key] = (events[key] || []).concat(cb)
        },
        dispatch: function (key, payload) {
            return loop(events[key] || [], payload, clone.deepCopy(state), 0).then(st => state = st)
        }
    }
}

module.exports = {
    Store
}
