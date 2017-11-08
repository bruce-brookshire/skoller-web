import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'

class SideNav extends React.Component {
  render () {
    return (
      <div className='cn-side-nav'>
        <Menu {...this.props} />
      </div>
    )
  }
}

SideNav.propTypes = {
  rootStore: PropTypes.object
}

export default SideNav
