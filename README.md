<p align="center">
  <img src="https://raw.githubusercontent.com/naminho/repaar/master/logo.svg" alt="repaar library logo">
</p>

# repaar

> Pronounced "repair"

JavaScript state-management with unprecedented ease-of-use and performance by
combining the best of `redux` and `mobx`.

## Overview

`rematch` is a library with the intent to simplify `redux` even more and is used as the basis for `repaar`. Unfortunately `rematch` doesn't solve some of
the core issues with redux, which have been solved by `mobx` though. So for `repaar` a small library from the
`mobx` creator called `immer` was included. By including this library the state inside the
reducers can be mutated instead of always recreating the state again by hand.
With this approach immutability without any additional effort and minimal
effects on performance is achieved.

### Includes

* Immutability from `immer`
  * Writing regular JS inside reducers
  * Performance comparable to using `ImmutableJS`
* Middleware from `redux`
* Async effects from `rematch`
  * No `redux-thunk` necessary

### Avoids

* Recreating state by hand with `Object.assign()`
* No classes, state stored as POJO
* No decorators which are still experimental syntax

## Installation

```
npm i repaar
```

## Getting Started

```
import { init } from 'repaar'

const todo = {
  state: {
    username: '',
    items: [{
      title: 'Enter a username to get started.',
      done: false
    }]
  },
  reducers: {
    auth(state, username) {
      state.username = username
    },
    add(state, title) {
      const item = {title, done: false}
      state.items.push(item)
    },
    complete(state, index) {
      state.items[index].done = true
    }
  }
}

const store = init({
  models: {
    overlay,
  }
})

store.dispatch({type: 'todo/auth', payload: 'repaar'})
store.dispatch({type: 'todo/complete', payload: 0})
store.dispatch({type: 'todo/add', payload: 'Say Hello World'})

const state = store.getState()

=>
{
  username: 'repaar',
  items: [
    {title: 'Enter ...', done: true}, {title: 'Say ...', done: false}
  ]
}
```

## React, Vue and Angular

See TODO.

## Roadmap

* General renaming (a `reducer` doesn't reduce anything)
* Computed values built in
* Single object, no namespaces
* Anonymous actions

## License

MIT
