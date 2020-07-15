import React from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

const GentleModal = (props) => {
  const closeModal = () => {
    if (props.show) {
      props.closeModal()
    }
  }

  return (
    <div className='si-gm-wrapper'>
      <OutsideClickHandler
        onOutsideClick={() => closeModal()}
      >
        <CSSTransition
          mountOnEnter
          in={props.show}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <div className='si-gm' style={{width: props.width + 'px'}}>
            {props.children}
          </div>
        </CSSTransition>
      </OutsideClickHandler>
    </div>
  )
}

GentleModal.propTypes = {
  children: PropTypes.object,
  closeModal: PropTypes.func,
  width: PropTypes.number,
  show: PropTypes.bool
}

export default GentleModal
