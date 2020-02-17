import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'mobx-react'
import routes from './routes'
import stores from './stores'
import * as firebase from 'firebase'

const app = document.getElementById('root')

// ANALYTICS
var firebaseConfig = {
  apiKey: 'AIzaSyAjE1OsYlfd2vHbacGLOPwb6fiSixvih3g',
  authDomain: 'classnavapp-e8c9b.firebaseapp.com',
  databaseURL: 'https://classnavapp-e8c9b.firebaseio.com',
  projectId: 'classnavapp-e8c9b',
  storageBucket: 'classnavapp-e8c9b.appspot.com',
  messagingSenderId: '596122259226',
  appId: '1:596122259226:web:cf03d1597789a46b4826a3',
  measurementId: 'G-R7SG6FL9N7'
}
firebase.initializeApp(firebaseConfig)
firebase.analytics()

ReactDOM.render(
  <Provider rootStore={stores}>
    <Router>{routes}</Router>
  </Provider>, app)
