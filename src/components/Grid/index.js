import React from 'react'
import PropTypes from 'prop-types'
import GridRow from './GridRow'

class Grid extends React.Component {
  /*
  * Renders the table headers.
  *
  * @return [Array]. Array of <th></th>
  */
  renderTableHeaders () {
    const {headers} = this.props

    return headers.map((header, index) => {
      return <th key={`tableHeader${index}`}>{header.display}</th>
    })
  }

  /*
  * Renders the table body of the grid.
  *
  * @return [Array]. Array of <GridRows/>
  */
  renderTableBody () {
    const { disabled, canSelect, canDelete, onSelect,
      onDelete, deleteMessage, emptyMessage, rows, headers } = this.props

    if (!rows || rows.length === 0) {
      return (
        <tbody>
          <tr colSpan={headers.length}>
            <td className='no-items' colSpan={headers.length}>
              {emptyMessage || 'There are no items to be displayed.'}
            </td>
          </tr>
        </tbody>
      )
    }

    return rows.map((rowData, index) => {
      return (
        <GridRow
          key={`gridRow${index}`}
          index={index}
          rowData={rowData}
          disabled={disabled}
          canSelect={canSelect}
          canDelete={canDelete}
          onSelect={onSelect}
          onDelete={onDelete}
          deleteMessage={deleteMessage}
        />
      )
    })
  }

  render () {
    const {className, disabled, canDelete} = this.props
    const classes = ['cn-table-grid']
    if (className) classes.push(className)

    return (
      <table className={classes.join(' ')}>
        <thead>
          <tr >
            {disabled ? null : <th className='th-spacer'></th>}
            {this.renderTableHeaders()}
            {canDelete ? <th className='th-spacer'></th> : null}
          </tr>
        </thead>
        {this.renderTableBody()}
      </table>
    )
  }
}

Grid.propTypes = {
  canDelete: PropTypes.bool,
  canSelect: PropTypes.bool,
  deleteMessage: PropTypes.string,
  disabled: PropTypes.bool,
  emptyMessage: PropTypes.string,
  headers: PropTypes.array,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  rows: PropTypes.array,
  className: PropTypes.string
}

export default Grid
