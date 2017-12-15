import React from 'react'
import PropTypes from 'prop-types'
import DeleteDialog from './DeleteDialog'

class GridRow extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: true,
      openDeleteDialog: false
    }
  }

  /*
  * Renders the caret icon.
  *
  * @return [Component]. Table data cell with caret icon.
  */
  renderCaret () {
    const {disabled} = this.props
    if (!disabled) {
      const className = this.state.collapsed ? 'fa fa-angle-right' : 'fa fa-angle-down'
      return (
        <td className='center-text'><i className={className}/></td>
      )
    }
  }

  /*
  * Renders a delete icon for deleting data.
  *
  * @param [Object] rowData. Row data to be deleted.
  * @param [Number] rowIndex. Row index to be deleted.
  * @return [Component]. Table data cell with delete icon.
  */
  renderDelete (rowData, rowIndex) {
    const {canDelete} = this.props
    if (canDelete) {
      return <td><i className='fa fa-trash delete' onClick={ event => this.toggleDeleteDialog(event)} style={{color: 'red'}}/></td>
    }
  }

  /*
  * Renders the table column data.
  *
  * @param [Object] rowData. Row data to be displayed.
  * @param [Number] rowIndex. Index of row data to be displayed.
  * @return [Component]. Table data cell with data field.
  */
  renderTableRow (rowData, rowIndex) {
    return Object.keys(rowData).map((key, cellIndex) => {
      if (key !== 'component' && key !== 'id') {
        return (
          <td key={`tableData${cellIndex}`}>
            {rowData[key]}
          </td>
        )
      }
    })
  }

  /*
  * Renders the collapsible component in the table.
  *
  * @param [Object] rowData. Row data containing component.
  * @param [Number] rowIndex. Index of row data containing the component.
  * @return [Component]. Table row with collapsible compnent.
  */
  renderComponent (rowData, rowIndex) {
    if (!this.state.collapsed && rowData['component']) {
      // substact 1 for component key. id of row accounts for caret icon col.
      let colSpan = Object.keys(rowData).length - 1
      if (this.props.canDelete) {
        colSpan++
      }
      return (
        <tr>
          <td colSpan={colSpan}>
            {rowData['component']}
          </td>
        </tr>
      )
    }
  }

  /*
  * Handle on click event for the row.
  *
  */
  onRowClick () {
    const {canSelect, onSelect, rowData} = this.props
    if (canSelect && onSelect) onSelect(rowData)
    this.toggleRow()
  }

  /*
  * Toggles the state of whether the collapsible component in the table
  * is collapsed or not.
  *
  * @return null.
  */
  toggleRow () {
    this.setState({collapsed: !this.state.collapsed})
  }

  /*
  * Toggle the state of confirm delete dialog.
  *
  * @param [Event] event. Onclick event.
  * @return null.
  */
  toggleDeleteDialog (event) {
    event.stopPropagation() // Stop from toggling the collapsible component
    this.setState({openDeleteDialog: !this.state.openDeleteDialog})
  }

  /*
  * Renders the confirm delete dialog.
  *
  * @return [Component] DeleteDialog. Delete Dialog component.
  */
  renderDeleteDialog () {
    if (this.state.openDeleteDialog) {
      return (
        <tr>
          <td className='no-items'>
            <DeleteDialog
              open={this.state.openDeleteDialog}
              onClose={this.toggleDeleteDialog.bind(this)}
              onDelete={this.onDelete.bind(this)}
              deleteMessage={this.props.deleteMessage}
            />
          </td>
        </tr>
      )
    }
  }

  /*
  * On delete handler. Executed when user confirms delete.
  *
  * @param [Event] event. Onclick event.
  * @return null.
  */
  onDelete (event) {
    this.props.onDelete(this.props.rowData)
    this.toggleDeleteDialog(event)
  }

  render () {
    const {index, rowData} = this.props
    return (
      <tbody>
        {this.renderDeleteDialog()}
        <tr className='data-row' onClick={this.onRowClick.bind(this)}>
          {this.renderCaret()}
          {this.renderTableRow(rowData, index)}
          {this.renderDelete(rowData, index)}
        </tr>
        {this.renderComponent(rowData, index)}
      </tbody>
    )
  }
}

GridRow.propTypes = {
  canDelete: PropTypes.bool,
  canSelect: PropTypes.bool,
  deleteMessage: PropTypes.string,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
  rowData: PropTypes.object
}

export default GridRow
