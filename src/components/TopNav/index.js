import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'

class TopNav extends React.Component {
  render () {
    return (
      <div className='cn-top-nav'>
        <Menu {...this.props} />
      </div>
    )
  }
}

TopNav.propTypes = {
  rootStore: PropTypes.object
}

export default TopNav
