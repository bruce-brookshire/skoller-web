import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import SkSelect from '../../../components/SkSelect'
import SkCheckboxField from '../../../../components/SkForm/SkCheckboxField'
import SemesterOutlook from './SemesterOutlook'

@inject('rootStore') @observer
class InsightsPage extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.setActivePage('insights')
    this.props.rootStore.studentNavStore.location = this.props.location

    let dataOptions = {}
    this.props.rootStore.studentClassesStore.classes.map(cl => {
      dataOptions[cl.name] = {
        on: true,
        color: cl.getColor()
      }
    })

    this.state = {
      dataOptions,
      view: 'Weekly'
    }
  }

  renderViews = () => {
    let options = ['Daily', 'Weekly', 'Monthly']
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='sk-autocomplete-option'
            onClick={() => this.setState({view: o})}
          >
            {o}
          </div>
        )
      })
    )
  }

  updateData = (dataOptions) => {
    this.setState(dataOptions)
  }

  renderControlPanel () {
    return (
      <div className='insights-cp'>
        <h1>Insights</h1>
        <p style={{marginBottom: '8px'}}>Skoller Insights help you see trends and patterns in the assignments you have this semester. Scroll this page to explore all of your insights!</p>
        <h3>Select your data</h3>
        <div className='insights-cp-classes' style={{marginBottom: '8px'}}>
          <SkCheckboxField
            options={this.state.dataOptions}
            updateData={this.updateData}
          />
        </div>
        <h3>Select your view</h3>
        <SkSelect optionsMap={() => this.renderViews()} selection={this.state.view} />
      </div>
    )
  }

  renderSemesterOutlook () {
    return (
      <SemesterOutlook selectedClasses={Object.keys(this.state.dataOptions).filter(o => this.state.dataOptions[o].on)} view={this.state.view} />
    )
  }

  renderContent () {
    return (
      <div className='insights-container'>
        <div className='insights-cp-container'>
          {this.renderControlPanel()}
        </div>
        <div className='insights-so-container'>
          {this.renderSemesterOutlook()}
        </div>
      </div>
    )
  }

  render () {
    return (
      this.renderContent()
    )
  }
}

InsightsPage.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default InsightsPage
