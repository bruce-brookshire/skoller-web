import React from 'react'
import {Cookies} from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'

import MyClasses from './views/MyClasses'

import DIYLanding from './views/DIYTool/DIYLanding'
import DIYTool from './views/DIYTool'
import Tutorial from './views/DIYTool/Tutorial'

import Onboard from './views/Onboard'

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/onboard' component={Onboard} />
      <Route path='/app' component={Layout}>
        <IndexRedirect to="/myclasses"/>
        <Route path='/myclasses' component={MyClasses}/>
        <Route path='/diy'>
          <IndexRoute component={DIYLanding} />
          <Route path='/diy/tutorial' component={Tutorial} />
          <Route path='/diy/tool' component={DIYTool} />
        </Route>
      </Route>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
)

export default(router)
