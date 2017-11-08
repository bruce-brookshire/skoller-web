import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import {Provider} from 'mobx-react'
import routes from './routes'
const stores = {}

const app = document.getElementById('root')

ReactDOM.render(
  <Provider rootStore={stores}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>, app)
