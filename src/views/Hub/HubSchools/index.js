import React from 'react'
import {browserHistory} from 'react-router'
import Grid from '../../../components/Grid'
import actions from '../../../actions'

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
    field: 'fourDoor',
    display: '4Door'
  },
  {
    field: 'weights',
    display: 'Weights'
  },
  {
    field: 'assignments',
    display: 'Assignments'
  },
  {
    field: 'review',
    display: 'Review'
  },
  {
    field: 'help',
    display: 'Help'
  }
]

class HubSchools extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      schools: []
    }
  }

  componentWillMount () {
    actions.schools.getHubSchools().then(schools => {
      headers[0].display = `Schools (${schools.length})`
      this.setState({schools})
    }).catch(() => false)
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
    const {id, name, enrollment, is_diy_enabled, is_diy_preferred, is_auto_syllabus, classes} = item

    const row = {
      id: id || '',
      name: name ? <div onClick={() => this.onSchoolSelect(item)}><span style={{display: 'block'}}><strong>{name}</strong></span><span style={{fontSize: '10px'}}>Period</span></div> : 'TBA',
      numberOfStudents: enrollment || 0,
      fourDoor: this.mapFourDoor(is_diy_enabled, is_diy_preferred, is_auto_syllabus),
      weights: this.renderCheck(),
      assignments: this.renderCheck(),
      review: this.renderCheck(),
      help: this.renderCheck(),
    }

    return row
  }

  mapFourDoor (is_diy_enabled, is_diy_preferred, is_auto_syllabus) {
    if (is_diy_enabled && !is_diy_preferred && is_auto_syllabus) {
      return 'Normal'
    } else if (is_diy_enabled && is_diy_preferred && is_auto_syllabus) {
      return 'Inverted'
    } else if (!is_diy_enabled && !is_diy_preferred && is_auto_syllabus) {
      return 'Compass'
    } else if (is_diy_enabled && is_diy_preferred && !is_auto_syllabus) {
      return 'DIY'
    } else {
      return 'Normal'
    }
  }

  renderCheck () {
    return <i className='fa fa-check' style={{color: '#a9a9a9'}}/>
  }

  onCreateSchool () {
    browserHistory.push('/hub/schools/school/info')
  }
  
  onSchoolSelect (school) {
    browserHistory.push({pathname: '/hub/schools/school/info', state: {school}})
  }

  render () {
    return (
      <div className='cn-schools-container'>
        <div className='margin-bottom'>
          <h2 className='center-text'>Schools</h2>
          <div>
            <a onClick={this.onCreateSchool.bind(this)}>Create new school </a>
            <span className='description'>Manage school details from this page</span>
          </div>
        </div>
        <Grid
          className='cn-schools-table'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canDelete={false}
        />
      </div>
    )
  }
}

export default HubSchools
