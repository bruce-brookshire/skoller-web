import React from 'react'
import PropTypes from 'prop-types'

function OverviewItem (props) {
  const [hovering, setHovering] = React.useState(false)
  const itemRef = React.useRef(null)

  const renderHover = () => {
    return (
      <div className='hover-container'>{props.hoverDescription}</div>
    )
  }

  return (
    <div className='overview-item-container' ref={itemRef} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {hovering && renderHover()}
      <div className='overview-item'>
        <h1>{props.title}</h1>
        <div className='subtitle'>{props.subtitle}</div>
      </div>
    </div>
  )
}

OverviewItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  hoverDescription: PropTypes.object
}

export default OverviewItem
