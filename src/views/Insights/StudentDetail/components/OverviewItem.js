import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'

function OverviewItem (props) {
  const [hovering, setHovering] = React.useState(false)
  const [modal, setModal] = React.useState(false)
  const itemRef = React.useRef(null)

  const renderHover = () => {
    return (
      <div className='hover-container'>
        {props.hoverDescription}
        {props.modalButtonText &&
          <div onClick={() => setModal(true)} className='hover-modal-button'>{props.modalButtonText}</div>
        }
      </div>
    )
  }

  const renderModal = () => {
    return (
      <SkModal closeModal={() => {
        setModal(false)
        setHovering(false)
      }}>
        {props.modalDescription}
      </SkModal>
    )
  }

  return (
    <div className='overview-item-container' ref={itemRef} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {hovering && renderHover()}
      <div className='overview-item'>
        <h1>{props.title}</h1>
        <div className='subtitle'>{props.subtitle}</div>
      </div>
      {modal && renderModal()}
    </div>
  )
}

OverviewItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  hoverDescription: PropTypes.object,
  modalButtonText: PropTypes.string,
  modalDescription: PropTypes.object
}

export default OverviewItem
