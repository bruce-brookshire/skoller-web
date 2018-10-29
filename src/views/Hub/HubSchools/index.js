import React from 'react'
import {browserHistory} from 'react-router'
import Grid from '../../../components/Grid'
import actions from '../../../actions'
import SchoolSearch from './SchoolSearch'

const headers = [
  {
    field: 'name',
    display: 'Schools'
  },
  {
    field: 'numberOfStudents',
    display: '# of students'
  },
  {
    field: 'in_setup',
    display: 'In Setup'
  },
  {
    field: 'needs_students',
    display: 'Needs Student Help'
  },
  {
    field: 'complete',
    display: 'Complete'
  }
]

class HubSchools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: [],
      loading: false
    }
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.schools.map((item, index) =>
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
    const {id, name, enrollment, classes} = item

    const row = {
      id: id || '',
      name: name ? <div onClick={() => this.onSchoolSelect(item)}><span style={{display: 'block'}}><strong>{name}</strong></span><span style={{fontSize: '10px'}}>Period</span></div> : 'TBA',
      numberOfStudents: enrollment || 0,
      in_setup: this.getCounts(classes, 'Syllabus Submitted') || this.renderCheck(),
      needs_students: this.getCounts(classes, 'Needs Student Input') || this.renderCheck(),
      complete: this.getCounts(classes, 'Class Setup') || this.renderCheck()
    }

    return row
  }

  /*
  * Get the sections counts for a given school.
  *
  * @param [Array] classes. The status array.
  * @param [String] status. The status to look for.
  */
  getCounts (classes, status) {
    const cl = classes.find(cl => cl.status === status)
    return cl && cl.count
  }

  getTotal (schools, type) {
    if (type === 'Students') {
      return schools.map(s => s.enrollment).reduce((a, b) => a + b, 0)
    } else {
      return schools.map(s => this.getCounts(s.classes, type) || 0).reduce((a, b) => a + b, 0)
    }
  }

  /*
  * Check mark if no status count
  *
  */
  renderCheck () {
    return <i className='fa fa-check' style={{color: '#a9a9a9'}}/>
  }

  onSearchSchool (queryString) {
    this.setState({loading: true})
    actions.schools.getHubSchools(queryString).then(schools => {
      headers[0].display = `Schools (${schools.length})`
      headers[1].display = `# of students (${this.getTotal(schools, 'Students')})`
      headers[2].display = `In Setup (${this.getTotal(schools, 'Syllabus Submitted')})`
      headers[3].display = `Needs Student Help (${this.getTotal(schools, 'Needs Student Input')})`
      headers[4].display = `Complete (${this.getTotal(schools, 'Class Setup')})`
      this.setState({schools, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  /*
  * On create school.
  */
  onCreateSchool () {
    browserHistory.push('/hub/schools/school/info')
  }

  /*
  * On school select.
  */
  onSchoolSelect (school) {
    browserHistory.push({pathname: '/hub/schools/school/info', state: {school}})
  }

  render () {
    return (
      <div className='cn-schools-container'>
        <div className='margin-bottom'>
          <h2 className='center-text'>Schools</h2>
          <div id='cn-school-search-container'>
            <SchoolSearch
              onSearch={this.onSearchSchool.bind(this)}
              loading={this.state.loading}
            />
          </div>
          <div>
            <a onClick={this.onCreateSchool.bind(this)}>Create new school </a>
            <span className='description'>Manage school details from this page</span>
          </div>
        </div>
        {this.state.schools && <Grid
          className='cn-schools-table'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canDelete={false}
        />}
      </div>
    )
  }
}

export default HubSchools
