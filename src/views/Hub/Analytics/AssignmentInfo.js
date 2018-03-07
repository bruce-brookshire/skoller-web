import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'
import {roundToTwo} from '../../../utilities/display'

@inject('rootStore') @observer
class AssignmentInfo extends React.Component {
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
      loading: false
    }
  }

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////

  render () {
    const {assignment} = this.props.data
    const cl = this.props.data.class
    return (
      <div>
        <div className="cn-analytics-list">
          <div>
            <span className="cn-analytics-label"><strong>Assignment Count: </strong></span>
            <span>{assignment.assign_count}</span>
            <ul>
              <li>
                <span className="cn-analytics-sub-label"><strong>Skoller: </strong></span>
                <span>{assignment.skoller_assign_count} ({roundToTwo(assignment.skoller_assign_count / assignment.assign_count * 100)} %)</span>
              </li>
              <li>
                <span className="cn-analytics-sub-label"><strong>Students: </strong></span>
                <span>{assignment.student_assign_count} ({roundToTwo(assignment.student_assign_count / assignment.assign_count * 100)} %)</span>
              </li>
            </ul>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Skoller assignments per class: </strong></span>
            <span>{roundToTwo(assignment.skoller_assign_count / cl.completed_class)}</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Assignments created by Skoller with due dates: </strong></span>
            <span>{assignment.assign_due_date_count}</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong># of assignments per student: </strong></span>
            <span>{roundToTwo(assignment.assign_per_student)}</span>
          </div>
        </div>
      </div>
    )
  }
}

AssignmentInfo.propTypes = {
  data: PropTypes.object.isRequired
}

export default AssignmentInfo
