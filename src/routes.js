import React from 'react'
import {Cookies} from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'

import MyClasses from './views/MyClasses'


import DIYTool from './views/DIYTool'

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/app' component={Layout}>
        <IndexRedirect to="/myclasses"/>
        <Route path='/myclasses' component={MyClasses}/>

        <Route path='/diy' component={DIYTool} />
      </Route>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
)

export default(router)
