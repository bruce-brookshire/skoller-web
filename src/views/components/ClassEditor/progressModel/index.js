import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'
import ToolTip from '../../../../views/components/ToolTip'

class ProgressModal extends React.Component {
  render () {
    let disableButton =
      !(this.props.assignments.length && this.props.weights.length)
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}
        title="Setup Progress"
      >
        <div id="cn-progress-modal">
          <div className="row">
            <div className="col-sm-12 fullwidth ">
              <span className="cn-progress-step">Step 1</span>
              <div className="cn-progress-name-btn">
                {this.props.currentIndex === 0 && (
                  <span className="current-step-dot">
                    <i className="fa fa-circle"></i>
                  </span>
                )}
                <span className="cn-progress-name">Add Weights & Values</span>
                {this.props.currentIndex !== 0 && (
                  <button
                    className="cn-progress-btn"
                    onClick={() => {
                      this.props.onConfirm({ currentIndex: 0 })
                    }}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
            <div className="col-sm-12 fullwidth ">
              <span className="cn-progress-step">Step 2</span>
              <div className="cn-progress-name-btn">
                {this.props.currentIndex === 1 && (
                  <span className="current-step-dot">
                    <i className="fa fa-circle"></i>
                  </span>
                )}
                <span className="cn-progress-name">
                  Add Assignments & Dates
                </span>
                {this.props.currentIndex !== 1 && (
                  <button
                    className="cn-progress-btn"
                    onClick={() => {
                      this.props.onConfirm({ currentIndex: 1 })
                    }}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>

            <div className="col-sm-12 fullwidth ">
              <span className="cn-progress-step">Step 3</span>
              <div className="cn-progress-name-btn">
                {this.props.currentIndex === 2 && (
                  <span className="current-step-dot">
                    <i className="fa fa-circle"></i>
                  </span>
                )}
                <span
                  className={`cn-progress-name ${
                    disableButton ? 'disabled' : ''
                  }`}
                >
                  Tag Assignments
                </span>
                {this.props.currentIndex !== 2 && disableButton && (
                  <ToolTip
                    tip={
                      <div>
                        Submit weights and assignments before tagging
                        assignments
                      </div>
                    }
                  >
                    <button
                      className={`cn-progress-btn ${
                        disableButton ? 'disabled' : ''
                      }`}
                      disabled={disableButton}
                      onClick={() => {
                        this.props.onConfirm({ currentIndex: 2 })
                      }}
                    >
                      Select
                    </button>
                  </ToolTip>
                )}
                {this.props.currentIndex !== 2 && !disableButton && (
                  <button
                    className={`cn-progress-btn`}
                    onClick={() => {
                      this.props.onConfirm({ currentIndex: 2 })
                    }}
                  >
                    Select
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

ProgressModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  currentIndex: PropTypes.number,
  assignments: PropTypes.array,
  weights: PropTypes.object
}

export default ProgressModal
