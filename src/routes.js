import React from 'react'
import {Cookies} from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'

import MyClasses from './views/MyClasses'

import Weights from './views/ClassEditor/Weights'

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/app' component={Layout}>
        <IndexRedirect to="/weights"/>
        <Route path='/myclasses' component={MyClasses}/>
        <Route path='/weights' component={Weights} />
      </Route>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
)

export default(router)
