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
    const {id, courseNumber, name, professor, professorInfo, days, beginTime, classLength} = item

    const row = {
      id: id || '',
      courseNumber: courseNumber || '-',
      name: name || '-',
      professor: professor || professorInfo ? this.mapProfessor(professor || professorInfo) : 'TBA',
      days: days || 'TBA',
      beginTime: beginTime ? beginTime : 'TBA',
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

  render () {
    return (
      <div className='cn-add-class-container'>
        <div>
          <a onClick={() => this.props.onClose()} className='submit'>Done</a>
          <h4>Add a class</h4>
        </div>
        <Search
          description=''
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
