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

    this.props.rootStore.navStore.setActivePage('insights')
    this.props.rootStore.navStore.location = this.props.location

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

  getStatus (id) {
    let status = ''
    if (id === 1100) {
      status = 'send syllabus'
    } else if (id === 1200) {
      status = 'in review'
    } else if (id === 1300) {
      status = 'needs setup'
    }
    return status
  }

  renderControlPanel () {
    return (
      <div className='insights-cp'>
        {/* <h1>Insights</h1> */}
        {/* <p style={{marginBottom: '8px'}}>
          See your workload in new ways.
        </p> */}
        <h3>Select your data</h3>
        <div className='insights-cp-classes' style={{marginBottom: '8px'}}>
          <SkCheckboxField
            options={this.state.dataOptions}
            updateData={this.updateData}
          />
          {this.props.rootStore.studentClassesStore.classes.filter(cl => cl.status.id < 1400).map(cl => {
            return (
              <div className='sk-form-checkbox' key={this.props.rootStore.studentClassesStore.classes.indexOf(cl)}>
                <label className='checkbox-container' style={{color: 'rgb(204, 204, 204)', fontWeight: 600}}>{cl.name + ' (' + this.getStatus(cl.status.id) + ')'}
                  <input
                    type="checkbox"
                    checked={false}
                  />
                  <span
                    className='checkmark'
                    style={
                      null
                    }
                  />
                </label>
              </div>
            )
          })}
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

  renderContent () {
    let hasCompletedClasses = (this.props.rootStore.studentClassesStore.classes.filter(cl => cl.status.id === 1400).length > 0)
    return (
      <div className='insights'>
        <div className='insights-container' id='insights-container'>
          {hasCompletedClasses
            ? <React.Fragment>
              <div onClick={() => this.downloadGraphs()} className='insights-so-container' id='insights-so-container'>
                {this.renderSemesterOutlook()}
                {this.renderKeyInsights()}
              </div>
              <div className='insights-cp-container'>
                {this.renderControlPanel()}
              </div>
            </React.Fragment>
            : <React.Fragment>
              <div className='insights-cp-container'>
                <div className='insights-cp'>
                  <h1>Insights</h1>
                  <p style={{marginBottom: '8px'}}>
                    Set up your classes, then navigate back here to see your workload in brand new ways.
                  </p>
                  <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '8px 0 0 0'}}>
                    <div style={{width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#4a4a4a15'}} />
                    <div style={{width: 'calc(100% - 16px - 6px', height: '16px', borderRadius: '4px', backgroundColor: '#4a4a4a15'}} />
                  </div>
                  <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '8px 0 0 0'}}>
                    <div style={{width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#4a4a4a15'}} />
                    <div style={{width: 'calc(100% - 16px - 6px', height: '16px', borderRadius: '4px', backgroundColor: '#4a4a4a15'}} />
                  </div>
                  <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '8px 0 0 0'}}>
                    <div style={{width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#4a4a4a15'}} />
                    <div style={{width: 'calc(100% - 16px - 6px', height: '16px', borderRadius: '4px', backgroundColor: '#4a4a4a15'}} />
                  </div>
                </div>
              </div>
              <div onClick={() => this.downloadGraphs()} className='insights-so-container' id='insights-so-container'>
                <div className='insights-semester'>
                  <h1>Insights</h1>
                  <div style={{margin: '1rem 0 0 0', height: '180px', width: '100%', backgroundColor: '#4a4a4a15', borderRadius: '8px'}} />
                  <div style={{margin: '1rem 0 0 0', height: '180px', width: '100%', backgroundColor: '#4a4a4a15', borderRadius: '8px'}} />
                  <div style={{margin: '1rem 0 0 0', height: '180px', width: '100%', backgroundColor: '#4a4a4a15', borderRadius: '8px'}} />
                </div>
              </div>
            </React.Fragment>
          }
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
