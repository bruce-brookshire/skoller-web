import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {roundToTwo} from '../../../utilities/display'

@inject('rootStore') @observer
class GradeEntry extends React.Component {
  render () {
    const {grades} = this.props.data
    return (
      <div>
        <div className="cn-analytics-list">
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Grades entered: </strong></span>
            <span>{grades.grades_entered}</span>
          </div>
          <div className="cn-analytics-item">
            <span className="cn-analytics-label"><strong>Participation Rate: </strong></span>
            <span>{roundToTwo(grades.student_classes_with_grades / grades.student_classes * 100)}%</span>
          </div>
        </div>
      </div>
    )
  }
}

GradeEntry.propTypes = {
  data: PropTypes.object.isRequired
}

export default GradeEntry
