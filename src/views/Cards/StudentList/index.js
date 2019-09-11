import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import {browserHistory} from 'react-router'
import Card from '../../../components/Card'

const headers = [
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
    field: 'status',
    display: 'Status'
  },
  {
    field: 'is_dropped',
    display: 'Dropped'
  }
]

class StudentList extends React.Component {
  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    const {students} = this.props
    return students.map((item, index) =>
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
    const {id, email, is_active: isActive} = item.user
    const student = item
    const style = {maxWidth: '60px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}

    const row = {
      id: id || '',
      firstName: student ? (<div style={style} onClick={() => { this.onAccountSelect(item) }}><span>{student.name_first}</span></div>) : (<div><span>-</span></div>),
      lastName: student ? (<div style={style} onClick={() => { this.onAccountSelect(item) }}><span>{student.name_last}</span></div>) : (<div><span>-</span></div>),
      email: email ? <div style={style} onClick={() => { this.onAccountSelect(item) }}><span>{email}</span></div> : '',
      status: isActive ? (<a onClick={() => { this.onAccountSelect(item) }}>Active</a>) : (<a className='cn-red'>Suspended</a>),
      is_dropped: !student.is_dropped ? (<a onClick={() => { this.onAccountSelect(item) }}>Active</a>) : (<a className='cn-red'>Dropped</a>)
    }

    return row
  }

  onAccountSelect (student) {
    let state = {user: {student: student, ...student.user}}
    browserHistory.push({pathname: '/hub/accounts/account/info', state: state})
  }

  render () {
    return (
      <Card
        title='Students'
        content={
          <Grid
            smallSpacer={true}
            emptyMessage={'No enrolled students'}
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={false}
          />
        }
        boxClassName={this.props.boxClassName}
        contentClassName={this.props.contentClassName}
      />
    )
  }
}

StudentList.propTypes = {
  students: PropTypes.array,
  boxClassName: PropTypes.string,
  contentClassName: PropTypes.string
}

export default StudentList