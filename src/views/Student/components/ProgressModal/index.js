import React, { Component } from 'react'
import PropTypes, { array, object } from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import AnimateHeight from 'react-animate-height'
import ReactResizeDetector from 'react-resize-detector'

function ProgressOption (props) {
  const renderIconClassName = () => {
    switch (props.status) {
      case 'complete':
        return 'fas fa-check'
      case 'active':
        return 'circle'
      case 'incomplete':
        return 'empty'
    }
  }

  return (
    <div key={props.index} className={'sk-progress-modal-po ' + props.status}>
      <div className='sk-progress-modal-po-icon'><i className={renderIconClassName()} /></div>
      <p>{props.name}</p>
    </div>
  )
}

ProgressOption.propTypes = {
  name: PropTypes.string,
  status: PropTypes.string,
  index: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default class ProgressModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contentHeight: 'auto',
      contentWidth: 'auto'
    }
  }

  static propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.object,
    title: PropTypes.string,
    status: PropTypes.object
  }

  handleResize = (w, h) => {
    this.setState({contentHeight: h, contentWidth: w})
  }

  renderProgressStatus () {
    if (!this.props.status) return null
    let options = this.props.status.options
    let state = this.props.status.state
    let activeOptionIndex
    if (state) {
      activeOptionIndex = options.indexOf(this.props.status.state)
    } else {
      activeOptionIndex = 100000
    }

    if (options) {
      return (
        <div className='sk-pm-status'>
          {options.map(o => {
            let status = 'incomplete'
            let index = options.indexOf(o)
            if (index < activeOptionIndex) {
              status = 'complete'
            } else if (index === activeOptionIndex) {
              status = 'active'
            }

            if (this.props.status.state === false) status = 'incomplete'
            if (this.props.status.state === true) status = 'complete'

            return <ProgressOption key={index} status={status} name={o} />
          })}
        </div>
      )
    }
  }

  render () {
    return (
      <div className='sk-progress-modal'>
        <SkModal
          className='sk-pm'
          closeModal={this.props.closeModal ? () => this.props.closeModal() : null}
          style={{
            maxWidth: '600px',
            width: '100%'
          }}
        >
          <div className='sk-pm-nav' style={this.props.closeModal ? {} : {transform: 'translate(-16px, -42px)', paddingLeft: '16px'}}>
            <h3>{this.props.title}</h3>
            {this.renderProgressStatus()}
          </div>
          <AnimateHeight
            duration={ 200 }
            height={ this.state.contentHeight }
          >
            <ReactResizeDetector handleWidth handleHeight onResize={(w, h) => this.handleResize(w, h)}>
              <div className='sk-pm-content-container'>
                {this.props.children}
              </div>
            </ReactResizeDetector>
          </AnimateHeight>
        </SkModal>
      </div>
    )
  }
}
