import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import Search from '../../../components/Search'
import actions from '../../../actions'

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

class AddClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  onSearch (searchText) {
    actions.classes.searchClasses(searchText).then(classes => {
      this.setState({classes})
    }).catch(() => false)
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
    const {id, number, name, meet_start_time, meet_days, length, professor} = item

    const row = {
      id: id || '',
      courseNumber: number || '-',
      name: name || '-',
      professor: (professor && professor.name !== 'None') || 'TBA',
      days: meet_days || 'TBA',
      beginTime: meet_start_time || 'TBA',
      classLength: length || 'TBA'
    }

    return row
  }

  /*
  * If class doesn't exist, handle on create class.
  */
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
          onSearch={(searchText) => this.onSearch(searchText)}
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
  onClose: PropTypes.func,
  onCreateClass: PropTypes.func,
  onSubmit: PropTypes.func
}

export default AddClass
