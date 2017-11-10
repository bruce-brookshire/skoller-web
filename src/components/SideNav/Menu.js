import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'

const menuItems = [
  {
    icon: 'fa fa-book',
    path: '/'
  },
  {
    icon: 'fa fa-check-circle-o',
    path: '/diy'
  },
  {
    icon: 'fa fa-calendar',
    path: '/calendar'
  },
  {
    icon: 'fa fa-sign-out',
    path: '/logout'
  }
]

class Menu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {activePath: '/'}
  }

  renderMenuItems (menuItems, subIndex = 0) {
    return (
      <ul>
        {
          menuItems.map((menuItem, index) => {
            const activeClass = this.state.activePath === menuItem.path ? 'active' : ''
            return (
              <li key={`item${subIndex}-${index}`} className={`${activeClass}`}>
                <MenuItem
                  menuItem={menuItem}
                  onClick={() => this.onMenuItemClick(menuItem)}
                />
              </li>
            )
          })
        }
      </ul>
    )
  }

  onMenuItemClick (menuItem) {
    if (menuItem.path) {
      browserHistory.push(menuItem.path)
      this.setState({activePath: menuItem.path})
    }
  }

  render () {
    return this.renderMenuItems(menuItems)
  }
}

Menu.propTypes = {
  rootStore: PropTypes.object
}

export default Menu

class MenuItem extends React.Component {
  render () {
    const {menuItem: {icon}} = this.props
    return (
      <div className='menu-item'>
        <a
          onClick={() => this.props.onClick()}
        >
          <i className={`${icon}`}/>
        </a>
      </div>
    )
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  onClick: PropTypes.func
}
