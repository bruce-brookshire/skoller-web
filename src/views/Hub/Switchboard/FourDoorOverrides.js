import React from 'react'
import PropTypes from 'prop-types'
import Grid from '../../../components/Grid'

const headers = [
  {
    field: 'name',
    display: 'Name'
  }
]

class FourDoorOverrides extends React.Component {
  mapRow (item, index) {
    const {name, id} = item

    const row = {
      id: id,
      name: name
    }
    return row
  }

  getRows () {
    const {schools} = this.props
    return schools.map((item, index) =>
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
          canDelete={true}
          canSelect={true}
          emptyMessage={'No overrides exist yet.'}
          deleteMessage={''}
          onDelete={this.props.onDelete ? this.props.onDelete() : null}
          onSelect={this.props.onSelect ? this.props.onSelect() : null}
        />
      </div>
    )
  }
}
FourDoorOverrides.propTypes = {
  schools: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func
}

export default FourDoorOverrides
