const {dequal} = require('./dequal')

describe('test dequal', () => {
    test('通过', async () => {

        expect(dequal(1, 1)).toEqual(true)
        expect(dequal({}, {})).toEqual(true)
        expect(dequal('foo', 'foo')).toEqual(true)
        expect(dequal(dequal, dequal)).toEqual(true)
        expect(dequal(/foo/, /foo/)).toEqual(true)
        expect(dequal(null, null)).toEqual(true)
        expect(dequal(NaN, NaN)).toEqual(true)
        expect(dequal([], [])).toEqual(true)
        expect(dequal(
            [{ a:1 }, [{ b:{ c:[1] } }]],
            [{ a:1 }, [{ b:{ c:[1] } }]]
        )).toEqual(true)

        expect(dequal(1, '1')).toEqual(false)
        expect(dequal(null, undefined)).toEqual(false)
        expect(dequal({ a:1, b:[2,3] }, { a:1, b:[2,5] })).toEqual(false)
        expect(dequal(/foo/i, /bar/g)).toEqual(false)
    })
})
