import React from 'react'
import Loading from '../../../components/Loading'
import Search from '../../../components/Search'

const searchResultHeaders = [
  {
    field: 'courseNumber',
    display: 'Class Number'
  },
  {
    field: 'name',
    display: 'Class Name'
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
    display: 'Start Time'
  },
  {
    field: 'classLength',
    display: 'Term Length'
  }
]

const class1 = {
  courseNumber: 'ECO 230',
  name: 'Economy of China',
  professor: 'Sasser',
  days: 'MWF',
  beginTime: '10:00am',
  classLength: 'Full semester'
}

const class2 = {
  courseNumber: 'ECO 2019',
  name: 'Economies of Scale',
  professor: 'Ruben',
  days: 'MWF',
  beginTime: '10:00am',
  classLength: 'Full semester'
}

const class3 = {
  courseNumber: 'ECO 1100',
  name: 'Economic Nativism',
  professor: 'Twondliedo',
  days: 'MWF',
  beginTime: '10:00am',
  classLength: 'Full semester'
}

// const classes = [class1, class2, class3,class1, class2, class3,class1, class2, class3, class1, class2, class3]
const classes = []

class AddClass extends React.Component {
  onSearch (searchText) {
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return classes.map((item, index) =>
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
    const {id, courseNumber, name, professor, days, beginTime, classLength} = item

    const row = {
      id: id || '',
      courseNumber: courseNumber || '-',
      name: name || '-',
      professor: professor || 'TBA', //this.mapProfessor(professor) : 'TBA',
      days: days || 'TBA',
      beginTime: beginTime || 'TBA',
      classLength: classLength || 'TBA'
    }

    return row
  }

  /*
  * Map the professors name to the professor.
  *
  * @param [Object] professor. Professor object.
  * @param [String] name. Name of professor.
  */
  mapProfessor (professor) {
    const {firstName, lastName} = professor
    let name = ''

    if (firstName) {
      name = firstName
    }
    if (lastName) {
      name = name ? `${name} ${lastName}` : lastName
    }

    return name || 'TBA'
  }

  onCreateClass () {
    this.props.onClose()
    this.props.onCreateClass()
  }

  render () {
    return (
      <div className='cn-add-class-container'>
        <div>
          <a onClick={() => this.props.onClose()} className='submit'>Done</a>
          <h4 className='cn-modal-header'>Add a class</h4>
        </div>
        <Search
          description=''
          emptyMessage={<div className='empty-message margin-top'>{`Can't find your class? `}<a onClick={this.onCreateClass.bind(this)}>Create a new one.</a></div>}
          placeholder='Search by class name, professor last name, or class number...'
          onSearch={this.onSearch}
          searching={false}
          searchResults={this.getRows()}
          searchResultHeaders = {searchResultHeaders}
          searchResultSelect = {this.props.onSubmit}
        />
      </div>
    )
  }
}

AddClass.propTypes = {

}

export default AddClass
