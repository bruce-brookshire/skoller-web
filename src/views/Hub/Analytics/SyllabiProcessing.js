import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'

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
    const {data} = this.props
    return (
      <div>
        <div className="cn-analytics-list">
          <div>
            <span className="cn-analytics-label"><strong>Classes available: </strong></span>
            <span>{data.class_count}</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Classes with enrollment: </strong></span>
            <span>{data.enrollment}</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Classes with syllabi submitted: </strong></span>
            <span>{data.class_syllabus_count} ({(data.class_syllabus_count / data.class_count) * 100} %)</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Completed classes: </strong></span>
            <span>{data.completed_class} </span><span className="cn-red">({data.class_in_review} in review)</span>
            <ul>
              <li>
                <span className="cn-analytics-sub-label"><strong>Completed by Skoller: </strong></span>
                <span>{data.completed_by_skoller} ({(data.completed_by_skoller / data.completed_class) * 100} %)</span>
              </li>
              <li>
                <span className="cn-analytics-sub-label"><strong>Completed by DIY: </strong></span>
                <span>{data.completed_by_diy} ({(data.completed_by_diy / data.completed_class) * 100} %)</span>
              </li>
            </ul>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Communities: </strong></span>
            <span>{data.communitites} ({(data.communitites / data.enrollment) * 100} %)</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Student created classes: </strong></span>
            <span>{data.student_created_classes} ({(data.student_created_classes / data.class_count) * 100} %)</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Classes with multiple files: </strong></span>
            <span>{data.classes_multiple_files} ({(data.classes_multiple_files / data.class_syllabus_count) * 100} %)</span>
          </div>
          <div>
            <span className="cn-analytics-label"><strong>Classes per student (avg.): </strong></span>
            <span>{data.avg_classes}</span>
          </div>
        </div>
      </div>
    )
  }
}

SyllabiProcessing.propTypes = {
  data: PropTypes.object.isRequired,
  max: PropTypes.string,
  min: PropTypes.string,
}

export default SyllabiProcessing
