import { init } from '@rematch/core'
import createView from './View'

const count = {
  state: {
    items: []
  },
  reducers: {
    addOne: (state) => {
      state.items.push(state.items.length)
    }
  }
}

const store = init({
  models: { count }
})

createView(store)
