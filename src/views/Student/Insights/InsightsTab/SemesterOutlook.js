import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import AssignmentsTimeline from '../AssignmentsTimeline'
import WeightsTimeline from '../WeightsTimeline'
import Distribution from '../Distribution'

@inject('rootStore') @observer
class SemesterOutlook extends React.Component {
  getView () {
    if (this.props.view) {
      return this.props.view.charAt(0).toLowerCase()
    } else {
      return null
    }
  }

  render () {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)
    return (
      <div className='insights-semester'>
        <h1>{this.props.rootStore.userStore.user.student.name_first}&apos;s Semester</h1>
        <div style={{margin: '1rem 0'}}>
          <WeightsTimeline ids={ids} view={this.getView()} />
        </div>
        <div style={{margin: '1rem 0'}}>
          <AssignmentsTimeline ids={ids} view={this.getView()} />
        </div>
        <div style={{margin: '1rem 0 0 0'}}>
          <Distribution ids={ids} />
        </div>
      </div>
    )
  }
}

SemesterOutlook.propTypes = {
  rootStore: PropTypes.object,
  selectedClasses: PropTypes.array,
  view: PropTypes.string
}

export default SemesterOutlook
