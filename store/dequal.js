const {typeOf} = require('../clone/type')
const dequal = function (left, right) {
    if (typeOf(left) !== typeOf(right)) return false
    if ((isNaN(left) && !isNaN(right)) || (!isNaN(left) && isNaN(right))) return false
    if (['object', 'array'].includes(typeOf(left))) {
        return JSON.stringify(left) === JSON.stringify(right)
    }
    return String(left) === String(right)
}

module.exports = {
    dequal
}
