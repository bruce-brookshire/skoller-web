import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'

const menuItems = [
  {
    path: '/hub/landing',
    text: 'Back to homepage'
  },
  // {
  //   icon: 'fa fa-check-circle-o',
  //   path: '/student/diy'
  // },
  // {
  //   icon: 'fa fa-calendar',
  //   path: '/calendar'
  // },
  {
    path: '/logout',
    text: 'Logout'
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
            return (
              <li key={`item${subIndex}-${index}`}>
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
      <div className={`menu-item`}>
        <a onClick={() => this.props.onClick()}>
          {this.props.menuItem.text}
        </a>
      </div>
    )
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  onClick: PropTypes.func
}
