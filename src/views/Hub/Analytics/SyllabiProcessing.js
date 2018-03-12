import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'
import {roundToTwo} from '../../../utilities/display'

@inject('rootStore') @observer
class SyllabiProcessing extends React.Component {
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
    const cl = this.props.data.class
    return (
      <div>
        <div className="cn-analytics-list">
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Classes available: </strong></span>
            <span>{cl.class_count}</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Classes with enrollment: </strong></span>
            <span>{cl.enrollment}</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Enrolled classes with syllabi submitted: </strong></span>
            <span>{cl.enrolled_class_syllabus_count} ({roundToTwo(cl.enrolled_class_syllabus_count / cl.enrollment * 100)} %)</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Completed classes: </strong></span>
            <span>{cl.completed_class} </span><span className="cn-red">({cl.class_in_review} in review)</span>
            <ul>
              <li>
                <span className="cn-analytics-sub-label"><strong>Completed by Skoller: </strong></span>
                <span>{cl.completed_by_skoller} ({roundToTwo(cl.completed_by_skoller / cl.completed_class * 100)} %)</span>
              </li>
              <li>
                <span className="cn-analytics-sub-label"><strong>Completed by DIY: </strong></span>
                <span>{cl.completed_by_diy} ({roundToTwo(cl.completed_by_diy / cl.completed_class * 100)} %)</span>
              </li>
            </ul>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Communities: </strong></span>
            <span>{cl.communitites} ({roundToTwo(cl.communitites / cl.enrollment * 100)} %)</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Student created classes: </strong></span>
            <span>{cl.student_created_classes} ({roundToTwo(cl.student_created_classes / cl.class_count * 100)} %)</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Classes with multiple files: </strong></span>
            <span>{cl.classes_multiple_files} ({roundToTwo(cl.classes_multiple_files / cl.enrollment * 100)} %)</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Classes per student (avg.): </strong></span>
            <span>{roundToTwo(cl.avg_classes)}</span>
          </div>
        </div>
      </div>
    )
  }
}

SyllabiProcessing.propTypes = {
  data: PropTypes.object.isRequired
}

export default SyllabiProcessing
