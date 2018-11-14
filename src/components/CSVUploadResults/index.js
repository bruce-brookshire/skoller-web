import React from 'react'
import PropTypes from 'prop-types'

class CSVUploadResults extends React.Component {
  renderErroredItems () {
    const {erroredItem} = this.props
    if (erroredItem.length > 0) {
      return (
        <div className='cn-flex-table'>
          <div className='cn-flex-table-row'>
            <div className='cn-flex-table-heading'>CSV Upload Errors</div>
          </div>
          <div className='cn-flex-table-body'>
            {erroredItem.map((item, index) => {
              return item.error ? this.renderCSVError(item, index) : this.renderItemError(item, index)
            })}
          </div>
        </div>
      )
    }
  }

  renderCSVError (item, index) {
    return (
      <div className='cn-flex-table-row' key={index}>
        <div className='cn-flex-table-cell'>{item.error}</div>
      </div>
    )
  }

  renderItemError (item, index) {
    return (
      <div className='cn-flex-table-row' key={index}>
        <div className='cn-flex-table-cell'>{item.name}</div>
        <div className='cn-flex-table-cell'>{Object.keys(item.errors).map((k, index) => {
          return <div key={index}>{k}: {item.errors[k].join(', ')} </div>
        })}</div>
      </div>
    )
  }

  render () {
    const {completedItemCount, erroredItem} = this.props
    return (
      <div>
        <h5>CSV Upload Results</h5>
        <p className='cn-green'>Completed: {completedItemCount}</p>
        <p className='cn-red'>Errored: {erroredItem.length}</p>
        {this.renderErroredItems()}
      </div>
    )
  }
}

CSVUploadResults.propTypes = {
  completedItemCount: PropTypes.number,
  erroredItem: PropTypes.array
}

export default CSVUploadResults
