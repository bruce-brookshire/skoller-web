import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'mobx-react'
import routes from './routes'
import stores from './stores'
import ReactGA from 'react-ga'

const app = document.getElementById('root')
ReactGA.initialize('UA-00000-1')

ReactDOM.render(
  <Provider rootStore={stores}>
    <Router>{routes}</Router>
  </Provider>, app)
