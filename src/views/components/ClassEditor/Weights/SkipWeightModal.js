import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'
import Card from '../../../../components/Card'

class SkipWeightModal extends React.Component {
  render() {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
        title='Skip weights'
      >
        <div id='cn-skip-weight-modal'>

          <div className="row">
            <div className="col-sm-6 center-text confirmdiv">
              <h2>Are you sure?</h2>
              <p>Skoller can't provide information about your grades untill weights are submitted</p>
            </div>
            <div className="col-sm-6">
              <Card
                content={this.renderCardContent()}
              >
              </Card>
            </div>
          </div>

          <div className='cn-button-yes-no center-text'>
            <button className='button backbtn' onClick={() => this.props.onClose()}>Go back.</button>
            <button className='button skipbtn' onClick={() => {
              this.props.onConfirm()
              this.props.onClose()
            }}>Skip weights</button>
          </div>
        </div>
      </Modal>
    )
  }

  renderCardContent() {
    return (
      <div>
        <div className="popupfeatures">
          <h2>Features</h2>
          <ul>
            <li>Reminders</li>
            <li>To-Do's</li>
            <li>Calendar</li>
            <li>Grade Calculator</li>
            <li>Grade Impact</li>
          </ul>
        </div>
        <div className="popupskipwts">
          <h4>Skip Weights</h4>
          <ul>
            <li><i className="fa fa-check"></i></li>
            <li><i className="fa fa-check"></i></li>
            <li><i className="fa fa-check"></i></li>
            <li><i className="far fa-times-circle text-danger"></i></li>
            <li><i className="far fa-times-circle text-danger"></i></li>
          </ul>
        </div>
      </div>
    )
  }
}

SkipWeightModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func
}

export default SkipWeightModal
