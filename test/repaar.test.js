beforeEach(() => {
  jest.resetModules()
})

describe('dispatch:', () => {
  describe('action:', () => {
    it('should update the state with regular JS', () => {
      const { init } = require('../src')

      const hello = {
        state: {
          hello: 'world',
          array: ['hello', 'world'],
        },
        reducers: {
          sayHello: state => {
            state.hello = 'hello world';
            state.array.push('whoo');
          }
        },
      }

      const store = init({
        models: { hello }
      })

      store.dispatch({ type: 'hello/sayHello' })

      expect(store.getState()).toEqual({
        hello: {
          hello: 'hello world',
          array: ['hello', 'world', 'whoo'],
        }
      })
    })
  })
})
