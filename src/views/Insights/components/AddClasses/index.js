import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'

export default class AddClasses extends Component {
  render () {
    return (
      <SkModal closeModal={this.props.closeModal ? () => this.props.closeModal() : null}>
        <div>
          add ur damn classes
        </div>
      </SkModal>
    )
  }
}

AddClasses.propTypes = {
  closeModal: PropTypes.func
}
