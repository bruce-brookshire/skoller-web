import React from 'react'
import {browserHistory} from 'react-router'
import ClassSearch from './ClassSearch'
import Grid from '../../../components/Grid'
import Loading from '../../../components/Loading'
import actions from '../../../actions'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'

const headers = [
  {
    field: 'name',
    display: 'School'
  },
  {
    field: 'courseNumber',
    display: 'Class Number'
  },
  {
    field: 'name',
    display: 'Class Name'
  },
  {
    field: 'enrolled',
    display: 'Enrollment'
  },
  {
    field: 'professor',
    display: 'Professor'
  },
  {
    field: 'days',
    display: 'Days'
  },
  {
    field: 'beginTime',
    display: 'Start time'
  },
  {
    field: 'length',
    display: 'Length'
  },
  {
    field: 'campus',
    display: 'Campus'
  },
  {
    field: 'status',
    display: 'Status'
  },
  {
    field: 'period',
    display: 'Period'
  }
]

@inject('rootStore') @observer
class HubClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      loading: false
    }
  }

  /*

  /*
  * Get the classes for class search
  *
  * @param [String] queryString. String to query classes.
  */
  getClasses (queryString) {
    this.setState({loading: true})
    actions.classes.searchClasses(queryString).then(classes => {
      this.setState({classes, loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.classes.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, school, number, name, enrolled, meet_start_time: startTime,
      meet_days: days, length, campus, professor, status, period_name: period} = item

    const row = {
      id: id || '',
      school: (school && school.name) || 'TBA',
      courseNumber: number || '-',
      name: name || '-',
      enrollment: enrolled || 0,
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: days || 'TBA',
      beginTime: startTime ? mapTimeToDisplay(startTime) : 'TBA',
      length: length || 'TBA',
      campus: campus || '',
      status: status ? this.mapStatus(status) : '-',
      period: period || ''
    }

    return row
  }

  /*

  /*
  * Map the class status to ui
  *
  * @param [String] status. Class status.
  */
  mapStatus (status) {
    if (status) {
      status = status.toLowerCase()
    }
    if (status === 'new class') {
      return <span className='cn-red'>NEEDS APPROVAL</span>
    } else if (status === 'needs syllabus') {
      return <span className='cn-red'>UPLOAD SYLLABUS</span>
    } else if (status === 'weights' || status === 'assignments' || status === 'review') {
      return <span className = 'cn-grey'>RECEIVED</span>
    } else if (status === 'help') {
      return <span className='cn-red'> NEEDS HELP</span>
    } else if (status === 'change') {
      return <span className='cn-red'> CHANGE REQ</span>
    } else if (status === 'complete' || status === 'change') {
      return <span className='cn-green' >COMPLETED</span>
    }
    return status
  }

  onCreateClass () {

  }

  /*
  * On edit class.
  *
  * @param [Object] cl. Class to edit.
  */
  onEditClass (cl) {
    browserHistory.push({
      pathname: `/class/${cl.id}/admin`,
      state: {
        isAdmin: this.isAdminUser(),
        isSW: this.isSW(),
        isChangeReq: this.isChangeReq(),
        isHelpReq: this.isHelpReq()
      }
    })
  }

  isAdminUser () {
    const {userStore} = this.props.rootStore
    return userStore.isAdmin()
  }

  isSW () {
    const {userStore} = this.props.rootStore
    return userStore.isSW()
  }

  isHelpReq () {
    const {userStore} = this.props.rootStore
    return userStore.isHelpReq()
  }

  isChangeReq () {
    const {userStore} = this.props.rootStore
    return userStore.isChangeReq()
  }

  getHeaderText (state) {
    if (state.needsHelp) {
      return 'Classes in review that need help'
    } else if (state.needsChange) {
      return 'Completed classes with a change request'
    } else if (state.needsMaint) {
      return 'Classes currently under maintenance'
    } else if (state.needsApproval) {
      return 'Classes that need to be approved'
    }
  }

  renderHeader () {
    const {state} = this.props.location
    // If the class is in any of these states, don't show the search bar
    const boole = state && (state.needsHelp || state.needsChange || state.needsMaint || state.needsApproval)
    return boole ? (
      <div className='margin-bottom'>
        <h2 className='center-text' style={{marginBottom: 0}}>{this.getHeaderText(state)}</h2>
        <ClassSearch {...this.props} loading={this.state.loading}
          onSearch={this.getClasses.bind(this)} hidden={true}/>
        <div className='margin-top'>
          <span className='total right'>Total results: {this.state.classes.length}</span>
        </div>
      </div>
    ) : (
      <div className='margin-bottom'>
        <h2 className='center-text' style={{marginBottom: 0}}>Class Search</h2>
        <ClassSearch {...this.props} loading={this.state.loading}
          onSearch={this.getClasses.bind(this)}/>
        <div className='margin-top'>
          <a onClick={this.onCreateClass.bind(this)}>Create new class </a>
          <span className='description'>Manage classes from this page</span>
          <span className='total right'>Total results: {this.state.classes.length}</span>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='cn-classes-container'>
        {this.renderHeader()}
        {this.state.loading
          ? <div className='center-text'><Loading /></div>
          : <Grid
            className='cn-classes-table'
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={false}
            canSelect={true}
            emptyMessage={'Search for classes using the controls above.'}
            onSelect={this.onEditClass.bind(this)}
          />
        }
      </div>
    )
  }
}

HubClasses.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default HubClasses
