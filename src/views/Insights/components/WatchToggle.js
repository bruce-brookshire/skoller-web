import React, {useState} from 'react'
import PropTypes from 'prop-types'

const WatchToggle = (props) => {
  const [watching, setWatching] = useState(props.user.watching)
  const toggleWatching = () => {
    setWatching(!watching)
  }

  const star = () => {
    return (
      <svg width="24px" height="24px" viewBox="0 0 24 24">
        <g stroke="none" strokeWidth="2" fill="none" fillRule="evenodd">
          <polygon id="Star" stroke="#55B9E5" fill={watching ? '#55B9E5' : 'none'} fillRule="nonzero" points="12 18.5 5.53436222 21.8991869 6.76918916 14.6995935 1.53837832 9.60081306 8.76718111 8.55040653 12 2 15.2328189 8.55040653 22.4616217 9.60081306 17.2308108 14.6995935 18.4656378 21.8991869"></polygon>
        </g>
      </svg>
    )
  }

  return (
    <div className='si-watch-toggle' onClick={() => toggleWatching()}>
      <div className={'toggle ' + (watching ? 'watching' : '')}>
        {star()}
      </div>
    </div>
  )
}

WatchToggle.propTypes = {
  user: PropTypes.object
}

export default WatchToggle
