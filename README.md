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

const overlay = {
  state: {
    open: false,
    items: []
  },
  reducers: {
    open(state) {
      state.open = !state.open
    },
    add(state, item) {
      state.items.push(item)
    }
  }
}

const store = init({
  models: {
    overlay,
  }
})

store.dispatch({type: 'overlay/add', payload: 'Hello World'})

const state = store.getState()
```

## React / Vue and Angular

See TODO.

## Roadmap

* General renaming (a `reducer` doesn't reduce anything)
* Computed values built in
* Single object, no namespaces
* Anonymous actions

## License

MIT
