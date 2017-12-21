import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../Loading'

class FlexTable extends React.Component {
  /*
  * Renders the table headers.
  *
  * @return [Array]. Array of <th></th>
  */
  renderTableHeaders () {
    const {headers} = this.props

    return headers.map((header, index) => {
      return <div key={`tableHeader${index}`} className='cn-flex-table-head'>{header.display}</div>
    })
  }

  /*
  * Renders the table body of the grid.
  *
  * @return [Array]. Array of <GridRows/>
  */
  renderTableBody () {
    const {disableEmptyMessage, emptyMessage, rows} = this.props

    if ((!rows || rows.length === 0) && !disableEmptyMessage) {
      return (
        emptyMessage ||
        <div className='cn-table-cell'>There are no items to be displayed.</div>
      )
    }

    return rows.map((rowData, index) => {
      return (
        <div key={`row-${index}`} className='cn-flex-table-row' onClick={() => this.onRowClick(rowData)}>
          {
            Object.keys(rowData).map((key, cellIndex) => {
              if (key !== 'component' && key !== 'id') {
                return <div key={`row-${index}-${cellIndex}`} className='cn-flex-table-cell'>{rowData[key]}</div>
              }
            })
          }
        </div>
      )
    })
  }

  /*
  * Handle on click event for the row.
  *
  */
  onRowClick (rowData) {
    const {canSelect, onSelect} = this.props
    if (canSelect && onSelect) onSelect(rowData)
  }

  render () {
    const {className, disabled, canDelete, loading} = this.props
    const classes = ['cn-table-grid']
    if (className) classes.push(className)

    return (

      <div className='cn-flex-table'>
        <div className='cn-flex-table-row'>
          {disabled ? null : <div className='cn-flex-table-head'>&amps;</div>}
          {this.renderTableHeaders()}
          {canDelete ? <div className='cn-flex-table-head'>&amps;</div> : null}
        </div>
        <div className='cn-flex-table-body'>
          {loading
            ? <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}
            > <Loading /> </div> : this.renderTableBody()}
        </div>
      </div>
    )
  }
}

FlexTable.propTypes = {
  canDelete: PropTypes.bool,
  canSelect: PropTypes.bool,
  className: PropTypes.string,
  deleteMessage: PropTypes.string,
  disableEmptyMessage: PropTypes.bool,
  disabled: PropTypes.bool,
  emptyMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  headers: PropTypes.array,
  loading: PropTypes.bool,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  rows: PropTypes.array
}

export default FlexTable
