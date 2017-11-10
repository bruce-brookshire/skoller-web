import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../../components/Grid/index'

const headers = [
  {
    field: 'select',
    display: ''
  },
  {
    field: 'firstName',
    display: 'First Name'
  },
  {
    field: 'lastName',
    display: 'Last Name'
  },
  {
    field: 'email',
    display: 'Email'
  },
  {
    field: 'phone',
    display: 'Number'
  },
  {
    field: 'edit',
    display: ''
  }
]

class SearchProfessor extends React.Component {
  componentWillMount () {
    this.onSearch()
  }
  /*
  * Search for professors matching input
  *
  * @param [String] searchText. Search string.
  */
  onSearch (searchText) {

  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    // return professorStore.professors.map((item, index) =>
    //   this.mapRow(item, index)
    // )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const { id, firstName, lastName, email, phone } = item

    const row = {
      id: id || '',
      select: <input type='checkbox' className='grid-icon' onClick={(event) => this.props.setProfessor(event, item)} />,
      firstName,
      lastName,
      email,
      phone,
      edit: <i className='fa fa-pencil grid-icon' style={{color: '#167AFF'}} onClick={() => this.props.onEditProfessor(item)}/>
    }

    return row
  }

  render () {
    return (
      <div>
        <div className='margin-top-2x'><span> Recommended Professor(s): </span></div>
        <div className='cn-table-grid-container margin-top margin-bottom'>
          <Grid
            headers={headers}
            rows={this.getRows()}
            disabled={true}
          />
        </div>
      </div>
    )
  }
}

SearchProfessor.propTypes = {
  onEditProfessor: PropTypes.func.isRequired,
  setProfessor: PropTypes.func.isRequired
}

export default SearchProfessor
