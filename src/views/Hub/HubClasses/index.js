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
    field: 'subject',
    display: 'Subject'
  },
  {
    field: 'code',
    display: 'Code'
  },
  {
    field: 'section',
    display: 'Section'
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
    const {id, school, code, subject, section, name, enrolled, meet_start_time: startTime,
      meet_days: days, professor, status, period_name: period} = item

    const row = {
      id: id || '',
      school: (school && school.name) || 'TBA',
      subject: subject || '-',
      code: code || '-',
      section: section || '-',
      name: name || '-',
      enrollment: enrolled || 0,
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: days || 'TBA',
      beginTime: days !== 'Online' ? (startTime ? mapTimeToDisplay(startTime) : 'TBA') : 'Online',
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
    if (status === 'needs setup') {
      return <span className='cn-red'>UPLOAD SYLLABUS</span>
    } else if (status === 'syllabus submitted') {
      return <span className = 'cn-grey'>RECEIVED</span>
    } else if (status === 'needs student input') {
      return <span className='cn-red'> NEEDS STUDENT HELP</span>
    } else if (status === 'class issue') {
      return <span className='cn-red'> CHANGE REQ</span>
    } else if (status === 'class setup') {
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
      pathname: `/class/${cl.id}/admin`
    })
  }

  getHeaderText (state) {
    if (state.needsChange) {
      return 'Completed classes with a change request'
    } else if (state.needsMaint) {
      return 'Classes currently under maintenance'
    }
  }

  renderHeader () {
    const {state} = this.props.location
    // If the class is in any of these states, don't show the search bar
    const boole = state && (state.needsChange || state.needsMaint)
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
