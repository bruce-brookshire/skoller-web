import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import SkSelect from '../../../components/SkSelect'
import SkCheckboxField from '../../../../components/SkForm/SkCheckboxField'
import SemesterOutlook from './SemesterOutlook'
import KeyInsights from './KeyInsights'

@inject('rootStore') @observer
class InsightsPage extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.studentNavStore.setActivePage('insights')
    this.props.rootStore.studentNavStore.location = this.props.location

    let dataOptions = {}
    this.props.rootStore.studentClassesStore.classes.filter(cl => cl.status.id >= 1400).map(cl => {
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

  renderKeyInsights () {
    return (
      <KeyInsights selectedClasses={Object.keys(this.state.dataOptions).filter(o => this.state.dataOptions[o].on)} />
    )
  }

  downloadGraphs () {
    // html2canvas(document.getElementById('insights-so-container')).then(canvas => {
    //   let img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
    //   window.location.href = img
    // })
  }

  renderContent () {
    return (
      <div className='insights'>
        <div className='insights-container' id='insights-container'>
          <div className='insights-cp-container'>
            {this.renderControlPanel()}
          </div>
          <div onClick={() => this.downloadGraphs()} className='insights-so-container' id='insights-so-container'>
            {this.renderSemesterOutlook()}
            {this.renderKeyInsights()}
          </div>
        </div>
        {/* <div className='key-insights-wrapper'>
          {this.renderKeyInsights()}
        </div> */}
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
