import React from 'react'
import PropTypes from 'prop-types'
import Menu from './Menu'

class TopNav extends React.Component {
  render () {
    return (
      <div className='cn-top-nav'>
        {this.props.onboard
          ? <div className={`onboard-top-nav-menu-item`} style={{alignItems: 'right'}}>
            <a>
              Log out
            </a>
          </div>
          : <Menu {...this.props} />
        }
      </div>
    )
  }
}

TopNav.propTypes = {
  rootStore: PropTypes.object,
  onboard: PropTypes.bool
}

export default TopNav
