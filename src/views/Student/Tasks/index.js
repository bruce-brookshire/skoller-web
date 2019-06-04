import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import StudentLayout from '../../components/StudentLayout'
// import actions from '../../../actions'
// import { browserHistory } from 'react-router'

@inject('rootStore') @observer
class Tasks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  componentWillMount () {
    this.props.rootStore.studentNavStore.setActivePage('tasks')
  }

  render () {
    return (
      <StudentLayout>
        {/* TODO Kevin: Make the student tasks view */}
        {console.log(this.props.rootStore)}
        {/* <p>What is happening</p> */}
      </StudentLayout>
    )
  }
}

Tasks.propTypes = {
  rootStore: PropTypes.object
}

export default Tasks
