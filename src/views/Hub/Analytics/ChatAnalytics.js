import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'
import {roundToTwo} from '../../../utilities/display'

@inject('rootStore') @observer
class ChatAnalytics extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

  componentWillMount () {
  }

  componentWillUnmount () {
  }

  /*
  * Initialize state
  */
  initializeState () {
    return {
      loading: false,
    }
  }

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////

  render () {
    const cl = this.props.data.class
    const {chat} = this.props.data
    return (
      <div>
        <div className="cn-analytics-list">
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Total classes completed: </strong></span>
            <span>{cl.completed_class}</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Classes that have chatted: </strong></span>
            <span>{chat.chat_classes} ({roundToTwo(chat.chat_classes / cl.completed_class * 100)}%)</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Total class posts: </strong></span>
            <span>{chat.chat_post_count} ({roundToTwo(chat.chat_post_count / cl.completed_class)} per active class)</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Highest chat class:  </strong></span>
            <span>{chat.max_chat_activity.class_name} {chat.max_chat_activity.count} posts</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Total students participating: </strong></span>
            <span>{chat.participating_students}</span>
          </div>
        </div>
      </div>
    )
  }
}

ChatAnalytics.propTypes = {
  data: PropTypes.object.isRequired
}

export default ChatAnalytics
