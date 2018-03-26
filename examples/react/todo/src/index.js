import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { init, dispatch } from 'repaar'

// Step 1: Create the stores
const user = {
  state: {
    username: '',
    authenticated: false,
  },
  reducers: {
    auth(state) {
      state.authenticated = true
    },
    username(state, username) {
      state.username = username
    }
  },
  effects: {
    async startAuth() {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
      this.auth()
      dispatch({type: 'todos/complete', payload: 0})
    }
  }
}
const todos = {
  state: [
    {
      title: 'Enter a username to get started.',
      done: false
    }
  ],
  reducers: {
    add(state, title) {
      const item = {title, done: false}
      state.push(item)
    },
    complete(state, index) {
      state[index].done = true
    }
  }
}

const store = init({
  models: {
    user,
    todos
  }
})

// Step 2: Connect the App to the store
const AppRenderer = ({ authenticated, username, onUsername, items, onAuth, onAdd }) => {
  if (!authenticated) {
    return (
      <div>
        <input
          value={username}
          onChange={event => onUsername(event.target.value)}
        />
        <button onClick={onAuth}>Log in</button>
      </div>
    )
  }

  return (
    <div>
      Hello {username}
      <p>Your TODOs</p>
      <ul>
        {items.map((item, index) => <li key={index} style={{textDecoration: item.done ? 'line-through' : 'none'}}>{item.title}</li>)}
      </ul>
      <button onClick={onAdd}>Add TODO</button>
    </div>
  )
}

const mapState = state => ({
  authenticated: state.user.authenticated,
  username: state.user.username,
  items: state.todos,
})

const mapDispatch = dispatch => ({
  onUsername: dispatch.user.username,
  onAuth: dispatch.user.startAuth,
  onAdd: () => dispatch.todos.add('You\'ve got a lot TODO...')
})

const App = connect(mapState, mapDispatch)(AppRenderer)

// Step 3: Render the App inside a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
