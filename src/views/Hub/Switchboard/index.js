import React from 'react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'

class Switchboard extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
  }

  send() {
    actions.notifications.sendNeedsSyllabusNotification((r) => console.log(r))
  }

  render () {
    return (
      <div className='cn-switchboard-container'>
        <h2 className='center-text'>Switchboard</h2>
        <div className='content row'>
          <div className='notifications-container'>
            <h3 className='cn-blue center-text'>Notifications</h3>
            <button className='button' onClick={() => this.send()}>
              Send 'Needs Syllabus' Notification
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Switchboard
