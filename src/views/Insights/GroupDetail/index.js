import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import NestedNav from '../components/NestedNav'
import SkSelect from '../../components/SkSelect'
import GroupStudent from './GroupStudent'
import { optionalPlural } from '../utils'
import StatusIndicators from '../components/StatusIndicators'
import CreateStudents from '../components/CreateStudents'
import SkModal from '../../components/SkModal/SkModal'
import GroupSettings from './GroupSettings'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import GroupInsights from './GroupInsights'
import GroupCalendar from './GroupCalendar'

const GroupStudents = (props) => {
  const [searching, setSearching] = React.useState('')

  const renderContent = () => {
    if (props.group.students.length > 0 || props.group.invitations.length > 0) {
      return (
        <React.Fragment>
          <div className='si-gd-group-students-subtitle'>
            <div className='email-invite'>{props.group.invitations.length > 0 ? optionalPlural(props.group.invitations, 'Email invitations (#)') : null}</div>
            <div><StatusIndicators group={props.group} /></div>
          </div>
          <div className='si-gd-group-students-list'>
            {props.group.students.map(s => {
              if (!(s.student.name_first.toLowerCase() + ' ' + s.student.name_last.toLowerCase()).includes(searching.toLowerCase())) return null
              return <GroupStudent key={s.id} student={s} />
            })}
            {props.group.invitations.map(i => {
              if (!(i.name_first.toLowerCase() + ' ' + i.name_last.toLowerCase()).includes(searching.toLowerCase())) return null
              return <GroupStudent key={i.id} invitation={i} />
            })}
          </div>
        </React.Fragment>
      )
    } else {
      return (
        <div className='add-athletes-callout'>
          <h1>Add athletes!</h1>
          <div onClick={() => props.toggleShowAddStudents(true)} className='plus'>+</div>
          <i className='fas fa-running' />
        </div>
      )
    }
  }

  return (
    <div className='si-gd-group-students'>
      <div className='si-gd-group-students-title'>
        <h2>Athletes <span onClick={() => props.toggleShowAddStudents(true)} className='add-athletes'>+</span></h2>
        <input value={searching} onChange={(e) => setSearching(e.target.value)} placeholder={'Search for an athlete'} />
      </div>
      {renderContent()}
    </div>
  )
}

GroupStudents.propTypes = {
  group: PropTypes.object,
  toggleShowAddStudents: PropTypes.func
}

@inject('rootStore') @observer
class GroupDetail extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showAddStudents: false
    }

    this.props.rootStore.navStore.setActivePage('insights/groups')
  }

  group () {
    return this.props.rootStore.insightsStore.groups.find(g => g.id === parseInt(this.props.match.params.orgGroupId))
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

  renderCreateStudentsModal () {
    return (
      this.state.showAddStudents && <SkModal disableOutsideClick={true} closeModal={() => {
        this.setState({showAddStudents: false})
      }}>
        <CreateStudents group={this.group()} onSubmit={() => {
          this.props.rootStore.insightsStore.updateData()
          this.setState({showAddStudents: false})
        }} />
      </SkModal>
    )
  }

  renderGroupSettings () {
    if (!this.state.showGroupSettings) return null

    return (
      <SkModal closeModal={() => this.setState({showGroupSettings: false})}>
        <GroupSettings group={this.group()} onSubmit={() => {
          this.setState({showGroupSettings: false})
        }}/>
      </SkModal>
    )
  }

  renderContent () {
    return (
      <div className='si-group-detail-container'>
        {this.renderGroupSettings()}
        {this.renderCreateStudentsModal()}
        <NestedNav pageType='groupDetail' />
        <div className='si-group-detail'>
          <div className='si-group-detail-column lg'>
            <div className='si-group-detail-cell si-gd-header'>
              <div>
                <h1>{this.group().name}</h1>
                <i className='fas fa-ellipsis-h' onClick={() => this.setState({showGroupSettings: true})} />
              </div>
              {this.group().students.concat(this.group().invitations).length > 0 && this.group().owners.length > 0 &&
                <div>
                  <p>{optionalPlural(this.group().students.concat(this.group().invitations), '# Athlete@')} | {optionalPlural(this.group().owners, '# Coach@', 'es')}</p>
                </div>
              }
            </div>
            <div className='si-group-detail-cell'>
              <GroupCalendar group={this.group()} />
            </div>
          </div>
          <div className='si-group-detail-column sm'>
            <div className='si-group-detail-cell'>
              <GroupStudents toggleShowAddStudents={(bool) => this.setState({showAddStudents: bool})} group={this.group()} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render () {
    if (this.state.loading) return <SkLoader />
    return this.renderContent()
  }
}

GroupDetail.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object
}

export default GroupDetail
