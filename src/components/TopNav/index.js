import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'

class TopNav extends React.Component {
  render () {
    if (this.props.onboard) {
      return (
        <div className='cn-top-nav' />
      )
    } else {
      return (
        <div className='cn-top-nav'>
          <Menu {...this.props} />
        </div>
      )
    }
  }
}

TopNav.propTypes = {
  rootStore: PropTypes.object,
  onboard: PropTypes.bool
}

export default TopNav
