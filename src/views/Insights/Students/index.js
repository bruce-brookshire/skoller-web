import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import Table from '../components/Table'
import TeamsCell from '../components/TeamsCell'
// import CopyCell from '../components/CopyCell'
import GentleModal from '../components/GentleModal'
import SkSelect from '../../components/SkSelect'
import { Link } from 'react-router-dom'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays, toTitleCase } from '../utils'
import LoadingIndicator from '../components/LoadingIndicator'
import SkModal from '../../components/SkModal/SkModal'
import CreateStudentForm from '../components/CreateStudents/CreateStudentForm'
import { asyncForEach } from '../../../utilities/api'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import ActionModal from '../components/ActionModal'
import CreateStudents from '../components/CreateStudents'

@inject('rootStore') @observer
class Students extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.setActivePage('insights/students')

    this.state = {
      showFilter: false,
      showSort: false,
      showNewStudentModal: false,
      teamsQuery: '',
      studentsQuery: '',
      sort: {
        value: 'Last name',
        type: 'Ascending'
      },
      timeframe: 7,
      loading: true
    }

    this.getStudents()
  }

  async getStudents () {
    await asyncForEach(this.props.rootStore.insightsStore.invitations, async i => {
      await asyncForEach(i.class_ids, async id => {
        await actions.classes.getClassById(id)
          .then(r => {
            i.classes.push(r)
          })
      })
    })
    this.setState({loading: false})
  }

  sortStudents (students) {
    let days = this.state.timeframe
    let sortedStudents = []
    if (this.state.sort.value === 'Last name') {
      sortedStudents = students.sort((a, b) => {
        if (a.student.name_last.toLowerCase() > b.student.name_last.toLowerCase()) {
          return 1
        } else {
          return -1
        }
      })
    }

    if (this.state.sort.value === 'First name') {
      sortedStudents = students.sort((a, b) => {
        if (a.student.name_first.toLowerCase() > b.student.name_first.toLowerCase()) {
          return 1
        } else {
          return -1
        }
      })
    }

    if (this.state.sort.value === 'Watching') {
      sortedStudents = students.sort((a, b) => {
        if (this.props.rootStore.insightsStore.isWatching(a) === this.props.rootStore.insightsStore.isWatching(b)) {
          return 0
        } else {
          if (this.props.rootStore.insightsStore.isWatching(a)) {
            return -1
          } else {
            return 1
          }
        }
      })
    }

    if (this.state.sort.value === 'Assignments') {
      sortedStudents = students.sort((a, b) => {
        if (getAssignmentCountInNextNDays(a.assignments, days) < getAssignmentCountInNextNDays(b.assignments, days)) {
          return 1
        } else {
          return -1
        }
      })
    }

    if (this.state.sort.value === 'Weights') {
      sortedStudents = students.sort((a, b) => {
        if (getAssignmentWeightsInNextNDays(a.assignments, days) < getAssignmentWeightsInNextNDays(b.assignments, days)) {
          return 1
        } else {
          return -1
        }
      })
    }

    if (this.state.sort.value === 'Personal Intensity') {
      let intensityString = days === 7
      sortedStudents = students.sort((a, b) => {
        if (a.intensity[intensityString] < b.intensity[intensityString]) {
          return 1
        } else {
          return -1
        }
      })
    }

    if (this.state.sort.type === 'Descending') {
      sortedStudents = sortedStudents.reverse()
    }
    return sortedStudents
  }

  renderFilteredStudents (students) {
    if (this.state.teamsQuery) {
      students = students.filter(s => s.org_groups.map(g => g.name.toLowerCase()).join(' ').includes(this.state.teamsQuery.toLowerCase()))
    }

    if (this.state.studentsQuery) {
      students = students.filter(s => (s.student.name_first + ' ' + s.student.name_last).toLowerCase().includes(this.state.studentsQuery.toLowerCase()))
    }

    return this.sortStudents(students)
  }

  renderStudentAthleteCell (d) {
    return (
      <Link to={'/insights/students/' + d.id}>
        <div
          className='si-students-table-sa'
        >
          {d.student.name_first + ' ' + d.student.name_last}
        </div>
      </Link>
    )
  }

  renderHeaderItem (d, rowSpan = 1, colSpan = 1) {
    return (
      <div colSpan={colSpan} rowSpan={rowSpan}>{d}</div>
    )
  }

  renderTimeframe () {
    let options = this.props.rootStore.insightsStore.interfaceSettings.timeframeOptions
    return (
      <div className='si-students-timeframe'>
        <span style={{marginRight: '8px'}}>Timeframe:</span>
        <SkSelect
          className='si-select'
          selection={'Next ' + this.state.timeframe + ' days'}
          optionsMap={() => options.map(o => {
            return (
              <div
                className='si-select-option'
                key={options.indexOf(o)}
                onClick={() => {
                  this.setState({timeframe: o})
                }}
              >
                {'Next ' + o + ' days'}
              </div>
            )
          })}
        />
      </div>
    )
  }

  renderSetup () {
    return (
      <div style={{width: '100%', textAlign: 'center'}}>Setup</div>
    )
  }

  async delInvitation (invitationId) {
    await actions.insights.invitations.deleteInvitation(this.props.rootStore.insightsStore.org.id, invitationId)
      .then(async () => {
        await this.props.rootStore.insightsStore.updateData(['invitations'])
        this.setState({loading: false})
      })
  }

  renderInvitationNameCell (d) {
    return (
      <div key={d.id + 1000} colSpan={3} style={{fontStyle: 'oblique', display: 'flex'}}>
        {d.name_first + ' ' + d.name_last} (pending invitation) <ActionModal>
          <div onClick={() => this.delInvitation(d.id)} className='si-action-modal-item delete'>Delete {d.name_first + ' ' + d.name_last}&apos;s invitation</div>
        </ActionModal>
      </div>
    )
  }

  renderTable () {
    const headers = [
      [
        this.renderHeaderItem('📷', 2, 1),
        this.renderHeaderItem('Athlete', 2, 1),
        this.renderHeaderItem('My Watchlist', 2, 1),
        this.renderHeaderItem('Teams', 2, 1),
        // this.renderHeaderItem('Phone (click to copy)', 2, 1),
        this.renderHeaderItem(this.renderSetup(), 1, 3),
        this.renderHeaderItem(this.renderTimeframe(), 1, 3)
      ],
      [
        this.renderHeaderItem('Activation', 1, 1),
        this.renderHeaderItem('Classes', 1, 1),
        this.renderHeaderItem('Setup', 1, 1),
        this.renderHeaderItem('Assignments', 1, 1),
        this.renderHeaderItem('Weight', 1, 1),
        this.renderHeaderItem('Personal Intensity', 1, 1)
      ]
    ]
    let intensityString = this.state.timeframe
    let da = this.renderFilteredStudents(this.props.rootStore.insightsStore.getStudentsAndInvitations())
    const d = da.map(d => {
      if (d.isInvitation) {
        return [
          <Avatar user={d} key={d.id} />,
          this.renderInvitationNameCell(d),
          // <CopyCell isPhone={true} text={d.student.phone} key={d.id} />,
          <div className='si-students-table-icon red' key={d.id}><i className='fas fa-times' /></div>,
          <div key={d.id}>{d.class_ids.length}</div>,
          <div key={d.id}>{d.classes.filter(cl => cl.status.id >= 1400).length + ' of ' + d.class_ids.length}</div>,
          <span colSpan={3} key={d.id + 10000} style={{fontStyle: 'oblique', textAlign: 'center'}}>N/A</span>
        ]
      } else {
        return [
          <Avatar user={d} key={d.id} />,
          this.renderStudentAthleteCell(d),
          <WatchToggle rootStore={this.props.rootStore} showConfirm={true} user={d} key={d.id} />,
          <TeamsCell key={d.id} user={d} org={this.props.rootStore.insightsStore.org} onChange={() => this.props.rootStore.insightsStore.updateData()} />,
          // <CopyCell isPhone={true} text={d.student.phone} key={d.id} />,
          <div className='si-students-table-icon green' key={d.id}><i className='fas fa-check' /></div>,
          <div key={d.id}>{d.classes.length}</div>,
          <div key={d.id}>{d.classes.filter(cl => cl.status.id >= 1400).length + ' of ' + d.classes.length}</div>,
          <div key={d.id}>{getAssignmentCountInNextNDays(d.assignments, this.state.timeframe)}</div>,
          <div key={d.id}>{getAssignmentWeightsInNextNDays(d.assignments, this.state.timeframe)}</div>,
          <div key={d.id}>{d.intensity[intensityString]}</div>
        ]
      }
    })

    return (
      <Table className='si-students-table' headers={headers} data={d} />
    )
  }

  renderFilterModal () {
    return (
      <GentleModal show={this.state.showFilter} width={200} closeModal={() => {
        this.setState({showFilter: false})
      }}>
        <div className='si-filter-modal'>
          <div className='si-filter-modal-label'>Teams</div>
          <input autoFocus={true} className='si-filter-modal-input' placeholder='Team name includes...' value={this.state.teamsQuery} onChange={(e) => this.setState({teamsQuery: e.target.value})} />
        </div>
      </GentleModal>
    )
  }

  renderSortModal () {
    let valueOptions = ['Last name', 'First name', 'Watching', 'Assignments', 'Weights', 'Personal Intensity']
    let typeOptions = ['Ascending', 'Descending']
    return (
      <GentleModal show={this.state.showSort} width={380} closeModal={() => {
        this.setState({showSort: false})
      }}>
        <div className='si-filter-modal'>
          <div className='si-filter-modal-select-row'>
            <div className='si-filter-modal-label'>Sort by</div>
          </div>
          <div className='si-filter-modal-select-row'>
            <SkSelect className='si-filter-modal-select' selection={this.state.sort.value} optionsMap={() => valueOptions.map(o => {
              return (
                <div className='si-select-option' onClick={() => this.setState({sort: {...this.state.sort, value: o}})} key={valueOptions.indexOf(o)}>{o}</div>
              )
            })} />
            <SkSelect className='si-filter-modal-select' selection={this.state.sort.type} optionsMap={() => typeOptions.map(o => {
              return (
                <div className='si-select-option' onClick={() => this.setState({sort: {...this.state.sort, type: o}})} key={typeOptions.indexOf(o)}>{o}</div>
              )
            })} />
          </div>
        </div>
      </GentleModal>
    )
  }

  renderFilterBar () {
    return (
      <div className='si-filter-bar'>
        <div className='si-filter-bar-button si-filter-bar-filter' onClick={() => this.setState({showFilter: true})}>
          <i className='fas fa-filter' /> Filter
          <div style={{marginLeft: '-0.5rem', marginTop: '4px', position: 'absolute'}}>
            {this.renderFilterModal()}
          </div>
        </div>
        <div className='si-filter-bar-button si-filter-bar-sort' onClick={() => this.setState({showSort: true})}>
          <i className='fas fa-sort' /> Sort
          <div style={{marginLeft: '-0.5rem', marginTop: '4px', position: 'absolute'}}>
            {this.renderSortModal()}
          </div>
        </div>
        <div className='si-filter-bar-search'>
          <input
            className='si-filter-bar-search-input'
            placeholder='Search for an athlete'
            onChange={(e) => this.setState({studentsQuery: e.target.value})}
            value={this.state.studentsQuery}
          />
        </div>
      </div>
    )
  }

  renderNewStudentModal () {
    return (
      this.state.showNewStudentModal
        ? <SkModal disableOutsideClick closeModal={() => this.setState({showNewStudentModal: false})}>
          <CreateStudents showConfirm onSubmit={() => {
            this.props.rootStore.insightsStore.updateData(['invitations'])
            this.setState({showNewStudentModal: false})
          }} />
        </SkModal>
        : null
    )
  }

  renderContent () {
    return (
      <div className='si-students'>
        <div className='si-students-header'>
          <div className='si-students-header-left'>
            <h1>Athletes<LoadingIndicator /></h1>
            <p>Manage all of the athletes in {this.props.rootStore.insightsStore.org.name} from this page.</p>
          </div>
          <div className='si-students-header-right'>
            <div className='si-button'>
              <p
                onClick={() => this.setState({showNewStudentModal: true})}
              >Invite a New {toTitleCase(this.props.rootStore.insightsStore.org.studentsAlias)}</p>
            </div>
            {this.renderNewStudentModal()}
          </div>
        </div>
        <div className='si-students-content'>
          {this.renderFilterBar()}
          {this.state.loading
            ? <SkLoader />
            : this.renderTable()
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

Students.propTypes = {
  rootStore: PropTypes.object
}

export default Students
