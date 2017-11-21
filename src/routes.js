import React from 'react'
import {Cookies} from 'react-cookie'
import { Router, Route, Redirect, IndexRedirect, IndexRoute, browserHistory } from 'react-router'
import App from './containers/App'
import Layout from './containers/Layout'

import MyClasses from './views/MyClasses'

import DIYLanding from './views/DIYTool/DIYLanding'
import DIYTool from './views/DIYTool'
import HubLanding from './views/HubLanding'
import Landing from './views/Landing'
import AssignmentsTutorial from './views/SyllabusTutorial/AssignmentsTutorial'
import WeightsTutorial from './views/SyllabusTutorial/WeightsTutorial'

import Onboard from './views/Onboard'

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/app"/>
      <Route path='/landing' component={Landing} />
      <Route path='/onboard' component={Onboard} />
      <Route path='/app' component={Layout}>
        <IndexRedirect to="/myclasses"/>
        <Route path='/myclasses' component={MyClasses}/>

        <Route path='/hub'>
          <IndexRedirect to='/hub/landing'/>
          <Route path='/hub/landing' component={HubLanding}/>
        </Route>

        <Route path='/tutorial/assignments' component={AssignmentsTutorial} />
        <Route path='/tutorial/weights' component={WeightsTutorial} />
        <Route path='/diy'>
          <IndexRoute component={DIYLanding} />
          <Route path='/diy/tool' component={DIYTool} />
        </Route>
      </Route>
      <Redirect from="*" to="/"/>
    </Route>
  </Router>
)

export default(router)
