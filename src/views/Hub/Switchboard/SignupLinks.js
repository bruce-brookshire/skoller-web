import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'
import {convertUTCDatetimeToDateString} from '../../../utilities/time'

const headers = [
  {
    field: 'name',
    display: 'Name'
  },
  {
    field: 'link',
    display: 'Link'
  },
  {
    field: 'start',
    display: 'Start'
  },
  {
    field: 'end',
    display: 'End'
  },
  {
    field: 'count',
    display: 'Count'
  }
]

class SignupLinks extends React.Component {
  mapRow (item, index) {
    const {name, link, start_date: start, end_date: end, signup_count: count, id} = item

    const row = {
      id: id,
      name: name,
      link: link,
      start: start ? convertUTCDatetimeToDateString(start, 'CST') : '',
      end: end ? convertUTCDatetimeToDateString(end, 'CST') : '',
      count: count
    }
    return row
  }

  getRows () {
    const {links} = this.props
    return links.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  render () {
    return (
      <div className='cn-log-table'>
        <Grid
          className='striped'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canDelete={false}
          canSelect={false}
          emptyMessage={'No links exist yet.'}
          deleteMessage={''}
        />
      </div>
    )
  }
}
SignupLinks.propTypes = {
  links: PropTypes.array.isRequired
}

export default SignupLinks
