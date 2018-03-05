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
        <ul>
          <li>
            <i className='fa fa-info general-field-info-icon'></i>
            <strong>Classes available:</strong>
            <span>{data.class_count}</span>
          </li>
        </ul>
      </div>
    )
  }

  // Classes available: 37,392
  // Classes with enrollment: 28,403
  // Classes with syllabi submitted: 25,038 (87.53%)
  // Completed classes: 25,014 (24 in review)
  // Completed by Skoller: 19,847 (76.82%)
  // Completed by DIY: 5,139 (24.47%)
  // Communities: 24,877 (98%)
  // Student created classes: 201 (1%)
  // Classes with multiple files: 821 (2.5%)
  // Classes per student (avg.): 4.8

  // student_created_classes	0
  // enrollment	1
  // completed_class	1
  // completed_by_skoller	1
  // completed_by_diy	0
  // communitites	1
  // classes_multiple_files	0
  // class_syllabus_count	7
  // class_in_review	7
  // class_count	8
  // avg_classes	1
  
}

SyllabiProcessing.propTypes = {
  data: PropTypes.object.isRequired,
  max: PropTypes.string,
  min: PropTypes.string,
}

export default SyllabiProcessing
