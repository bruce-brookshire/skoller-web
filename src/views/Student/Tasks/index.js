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
        <div className="task-container">
          <div className="task">
            <h1>Task Name</h1>
            <div className="task-content">
              <p>Content</p>
            </div>
          </div>
        </div>
        {/* console.log(this.props.rootStore) */}
      </StudentLayout>
    )
  }
}

Tasks.propTypes = {
  rootStore: PropTypes.object
}

export default Tasks
