import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import Avatar from '../components/Avatar'
import WatchToggle from '../components/WatchToggle'
import Table from '../components/Table'
import TeamsCell from '../components/TeamsCell'
import CopyCell from '../components/CopyCell'
import GentleModal from '../components/GentleModal'
import SkSelect from '../../components/SkSelect'
import { Link } from 'react-router-dom'
import { getAssignmentCountInNextNDays, getAssignmentWeightsInNextNDays } from '../utils'
import LoadingIndicator from '../components/LoadingIndicator'

@inject('rootStore') @observer
class Students extends React.Component {
  constructor (props) {
    super(props)

    this.props.rootStore.navStore.setActivePage('insights/students')

    this.state = {
      showFilter: false,
      showSort: false,
      teamsQuery: '',
      studentsQuery: '',
      sort: {
        value: 'Last name',
        type: 'Ascending'
      },
      timeframe: 7
    }
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

    if (this.state.sort.value === 'Intensity') {
      let intensityString = days === 7 ? 'sevenDay' : 'thirtyDay'
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

  renderFilteredStudents () {
    let students = this.props.rootStore.insightsStore.students

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
    let options = ['Next 7 days', 'Next 30 days']
    return (
      <div className='si-students-timeframe'>
        <span style={{marginRight: '8px'}}>Timeframe:</span>
        <SkSelect
          className='si-select'
          selection={this.state.timeframe === 7 ? 'Next 7 days' : 'Next 30 days'}
          optionsMap={() => options.map(o => {
            return (
              <div
                className='si-select-option'
                key={options.indexOf(o)}
                onClick={() => {
                  if (o === 'Next 7 days') {
                    this.setState({timeframe: 7})
                  } else {
                    this.setState({timeframe: 30})
                  }
                }}
              >
                {o}
              </div>
            )
          })}
        />
      </div>
    )
  }

  renderTable () {
    const headers = [
      [
        this.renderHeaderItem('📷', 2, 1),
        this.renderHeaderItem('Student-Athlete', 2, 1),
        this.renderHeaderItem('My Watchlist', 2, 1),
        this.renderHeaderItem('Teams', 2, 1),
        this.renderHeaderItem('Phone (click to copy)', 2, 1),
        this.renderHeaderItem(this.renderTimeframe(), 1, 3)
      ],
      [
        this.renderHeaderItem('Assignments', 1, 1),
        this.renderHeaderItem('Weight', 1, 1),
        this.renderHeaderItem('Intensity', 1, 1)
      ]
    ]
    let intensityString = this.state.timeframe === 7 ? 'sevenDay' : 'thirtyDay'
    let da = this.renderFilteredStudents()
    const d = da.map(d => {
      return [
        <Avatar user={d} key={d.id} />,
        this.renderStudentAthleteCell(d),
        <WatchToggle rootStore={this.props.rootStore} showConfirm={true} user={d} key={d.id} />,
        <TeamsCell key={d.id} user={d} org={this.props.rootStore.insightsStore.org} onChange={() => this.props.rootStore.insightsStore.updateData(['students', 'groups'])} />,
        <CopyCell isPhone={true} text={d.student.phone} key={d.id} />,
        <div key={d.id}>{getAssignmentCountInNextNDays(d.assignments, this.state.timeframe)}</div>,
        <div key={d.id}>{getAssignmentWeightsInNextNDays(d.assignments, this.state.timeframe)}</div>,
        <div key={d.id}>{d.intensity[intensityString]}</div>
      ]
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
    let valueOptions = ['Last name', 'First name', 'Watching', 'Assignments', 'Weights', 'Intensity']
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
                <div className='si-filter-modal-option' onClick={() => this.setState({sort: {...this.state.sort, value: o}})} key={valueOptions.indexOf(o)}>{o}</div>
              )
            })} />
            <SkSelect className='si-filter-modal-select' selection={this.state.sort.type} optionsMap={() => typeOptions.map(o => {
              return (
                <div className='si-filter-modal-option' onClick={() => this.setState({sort: {...this.state.sort, type: o}})} key={typeOptions.indexOf(o)}>{o}</div>
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
            placeholder='Search for a student'
            onChange={(e) => this.setState({studentsQuery: e.target.value})}
            value={this.state.studentsQuery}
          />
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div className='si-students'>
        <div className='si-students-header'>
          <h1>Students<LoadingIndicator /></h1>
          <p>Manage all of the students in {this.props.rootStore.insightsStore.org.name} from this page.</p>
        </div>
        <div className='si-students-content'>
          {this.renderFilterBar()}
          {this.renderTable()}
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
