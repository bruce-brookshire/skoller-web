import React from 'react'
import PropTypes from 'prop-types'

function Indicator (props) {
  if (!props.show) return null

  const [hover, setHover] = React.useState(false)
  const ref = React.useRef()

  const renderHover = () => {
    let width = 196
    return (
      <div className='si-si-hover-container' style={{left: ref ? -(width / 2) + (ref.current.offsetWidth / 2) + 16 + 12 : null}}>
        <div className='si-si-hover-content'>
          {props.hoverContent}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{position: 'relative', padding: '8px 0px'}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className='dot-container'
    >
      <div
        style={{position: 'relative'}}
        className={'dot ' + props.className}
        ref={ref}
      >
        {props.number}
      </div>
      {hover && renderHover()}
    </div>
  )
}

Indicator.propTypes = {
  hoverContent: PropTypes.object,
  className: PropTypes.string,
  number: PropTypes.number,
  show: PropTypes.object
}

export default Indicator
