import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'

const WatchToggle = (props) => {
  const [watching, setWatching] = useState(props.user.watching)
  const [changed, setChanged] = useState(false)

  const timer = () => setTimeout(() => setChanged(false), 2000)

  const toggleWatching = () => {
    setWatching(!watching)
    setChanged(true)
    timer()
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
    <div className='si-watch-toggle' style={props.showConfirm ? {position: 'relative'} : {display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <div onClick={() => toggleWatching()} className={'toggle ' + (watching ? 'watching' : '')}>
        {star()}
      </div>
      <CSSTransition
        in={changed}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <p className={watching ? 'added' : 'removed'} style={props.showConfirm ? {width: '112px', padding: '2px 2px 0 2px', position: 'absolute', bottom: '-6px'} : {margin: '-4px 4px 4px 8px', padding: '4px 4px 0 4px'}}>
          {watching ? 'Added to ' : 'Removed from '} watchlist
        </p>
      </CSSTransition>
    </div>
  )
}

WatchToggle.propTypes = {
  user: PropTypes.object,
  showConfirm: PropTypes.bool
}

export default WatchToggle
