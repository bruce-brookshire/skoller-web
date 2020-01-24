import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'mobx-react'
import routes from './routes'
import stores from './stores'

const app = document.getElementById('root')

ReactDOM.render(
  <Provider rootStore={stores}>
    <Router>{routes}</Router>
  </Provider>, app)
