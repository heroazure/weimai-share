const {Store} = require('./index')

describe('test Store', () => {
    test('多个无返回值的同名事件', async () => {
        const store = Store({
            count: 0,
            list: []
        })

        store.on('add', (state, payload) => {
            state.count += 1
            state.list.push(payload)
        })

        store.on('add', (state, payload) => {
            state.count += 3
            state.list.push(payload)
        })

        await store.dispatch('add', {id: 1, name: '第一'})

        expect(store.state.count).toEqual(4)
        expect(store.state.list.length).toEqual(2)
    })

    test('多个Promise混合无返回函数的同名事件', async () => {
        const store = Store({
            count: 0,
            list: []
        })

        store.on('Promise1', (state, payload) => {
            return new Promise((resolve) => {
                resolve({count: 100, list: [{}]})
            })
        })

        store.on('Promise1', (state, payload) => {
            state.count += 1
        })

        store.on('Promise1', (state, payload) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    state.count += 1
                    resolve(state)
                }, 500)
            })
        })

        await store.dispatch('Promise1', {id: 1, name: '第一'})

        expect(store.state.count).toEqual(102)
        expect(store.state.list.length).toEqual(1)
    })

    test('多个返回object的同名事件', async () => {
        const store = Store({
            count: 0,
            list: []
        })

        store.on('add', (state, payload) => {
            state.count += 1
            return state
        })

        store.on('add', (state, payload) => {
            state.count += 3
            state.list.push(payload)
            return state
        })

        await store.dispatch('add', {id: 1, name: '第一'})

        expect(store.state.count).toEqual(4)
        expect(store.state.list.length).toEqual(1)
    })
})
