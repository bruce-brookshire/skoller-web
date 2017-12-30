import React from 'react'
import PropTypes from 'prop-types'

class FOSUploadInfo extends React.Component {
  renderErroredFOS () {
    const {erroredFOS} = this.props
    if (erroredFOS.length > 0) {
      return (
        <div className='cn-flex-table'>
          <div className='cn-flex-table-row'>
            <div className='cn-flex-table-heading'>Field of study</div>
          </div>
          <div className='cn-flex-table-body'>
            {erroredFOS.map((fos, index) => {
              return (
                <div className='cn-flex-table-row' key={index}>
                  <div className='cn-flex-table-cell'>{fos.field}</div>
                  <div className='cn-flex-table-cell'>{Object.keys(fos.errors).map((k, index) => {
                    return <div key={index}>{k}: {fos.errors[k].join(', ')} </div>
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
    const {completedFOSCount, erroredFOS} = this.props
    return (
      <div>
        <h5>Fields of Study Upload</h5>
        <p className='cn-green'>Completed: {completedFOSCount}</p>
        <p className='cn-red'>Errored: {erroredFOS.length}</p>
        {this.renderErroredFOS()}
      </div>
    )
  }
}

FOSUploadInfo.propTypes = {
  completedFOSCount: PropTypes.number,
  erroredFOS: PropTypes.array
}

export default FOSUploadInfo
