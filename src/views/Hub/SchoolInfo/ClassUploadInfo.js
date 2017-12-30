import React from 'react'
import PropTypes from 'prop-types'

class ClassUploadInfo extends React.Component {
  renderErroredClasses () {
    const {erroredClasses} = this.props
    if (erroredClasses.length > 0) {
      return (
        <div className='cn-flex-table'>
          <div className='cn-flex-table-row'>
            <div className='cn-flex-table-heading'>Class Number</div>
            <div className='cn-flex-table-heading'>Class Name</div>
            <div className='cn-flex-table-heading'>Errors</div>
          </div>
          <div className='cn-flex-table-body'>
            {erroredClasses.map((cl, index) => {
              return (
                <div className='cn-flex-table-row' key={index}>
                  <div className='cn-flex-table-cell'>{cl.number}</div>
                  <div className='cn-flex-table-cell'>{cl.name}</div>
                  <div className='cn-flex-table-cell'>{Object.keys(cl.errors).map((k, index) => {
                    return <div key={index}>{k}: {cl.errors[k].join(', ')} </div>
                  })}</div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
  }

  render () {
    const {completedClassCount, erroredClasses} = this.props
    return (
      <div>
        <h5>Class Upload</h5>
        <p className='cn-green'>Completed: {completedClassCount}</p>
        <p className='cn-red'>Errored: {erroredClasses.length}</p>
        {this.renderErroredClasses()}
      </div>
    )
  }
}

ClassUploadInfo.propTypes = {
  completedClassCount: PropTypes.number,
  erroredClasses: PropTypes.array
}

export default ClassUploadInfo
