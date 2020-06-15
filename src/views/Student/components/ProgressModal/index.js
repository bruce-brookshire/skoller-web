import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'

export default class ProgressModal extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    children: PropTypes.object,
    title: PropTypes.string
  }

  render () {
    return (
      <div className='sk-progress-modal'>
        <SkModal className='sk-pm' closeModal={() => this.props.closeModal()}>
          <div className='sk-pm-nav'>
            <h3>{this.props.title}</h3>
          </div>
          {this.props.children}
        </SkModal>
      </div>
    )
  }
}
