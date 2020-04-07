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

  renderSpacer () {
    return (
      <div style={{borderBottom: '1px solid rgba(0,0,0,0.15)', width: '100%', margin: '2rem 0'}} />
    )
  }

  renderContent () {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)
    return (
      <div className='insights-semester'>
        <h1>Your Semester</h1>
        <div style={{margin: '1rem 0'}}>
          <WeightsTimeline ids={ids} view={this.getView()} />
        </div>
        {this.renderSpacer()}
        <div style={{margin: '1rem 0'}}>
          <AssignmentsTimeline ids={ids} view={this.getView()} />
        </div>
        {this.renderSpacer()}
        <div style={{margin: '1rem 0 0 0'}}>
          <Distribution ids={ids} />
        </div>
      </div>
    )
  }

  render () {
    let ids = this.props.rootStore.studentClassesStore.classes.map(cl => this.props.selectedClasses.includes(cl.name) ? cl.id : null)

    return (
      ids.length > 0
        ? this.renderContent()
        : <div />
    )
  }
}

SemesterOutlook.propTypes = {
  rootStore: PropTypes.object,
  selectedClasses: PropTypes.array,
  view: PropTypes.string
}

export default SemesterOutlook
