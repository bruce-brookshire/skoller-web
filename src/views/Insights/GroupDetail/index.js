import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import NestedNav from '../components/NestedNav'
import SkSelect from '../../components/SkSelect'

@inject('rootStore') @observer
class GroupDetail extends React.Component {
  constructor (props) {
    super(props)
    let group = this.props.rootStore.insightsStore.groups.find(g => g.id === parseInt(this.props.match.params.orgGroupId))

    this.state = {
      group
    }

    this.props.rootStore.navStore.setActivePage('insights/groups')
  }

  renderTimeframeSelect () {
    let interfaceSettings = this.props.rootStore.insightsStore.interfaceSettings
    let timeframeOptions = interfaceSettings.timeframeOptions

    return (
      <div className='si-student-detail-timeframe'>
        <div style={{paddingRight: '8px'}}>Timeframe </div>
        <SkSelect className='si-select' selection={'Next ' + interfaceSettings.timeframe + ' days'} optionsMap={() => timeframeOptions.map(o => {
          return (
            <div
              key={timeframeOptions.indexOf(o)}
              className='si-select-option'
              onClick={() => { this.props.rootStore.insightsStore.interfaceSettings.timeframe = o }}
            >{'Next ' + o + ' days'}</div>
          )
        })} />
      </div>
    )
  }

  render () {
    let insightsStore = this.props.rootStore.insightsStore
    return (
      <div className='si-group-detail-container'>
        <NestedNav pageType='groupDetail' />
        <div className='si-group-detail'>
          {this.state.group.name}
        </div>
      </div>
    )
  }
}

GroupDetail.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object
}

export default GroupDetail
