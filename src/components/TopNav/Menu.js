import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {inject, observer} from 'mobx-react'

const menuItems = [
  {
    admin: true,
    path: '/hub/landing',
    text: 'Back to homepage'
  },
  {
    admin: false,
    path: '/logout',
    text: 'Log out'
  }
]

class Menu extends React.Component {
  constructor (props) {
    super(props)

    this.state = {activePath: window.location.pathname}
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
                  currentPath={this.state.activePath}
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
      this.props.history.push(menuItem.path)
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

export default withRouter(Menu)

@inject('rootStore') @observer
class MenuItem extends React.Component {
  render () {
    const currentPath = window.location.pathname
    const adminAccessible = this.props.menuItem.admin && !this.props.rootStore.userStore.isStudent()
    if ((adminAccessible || !this.props.menuItem.admin) && currentPath !== this.props.menuItem.path) {
      return (
        <div className={`menu-item`}>
          <a className='link-style' onClick={() => this.props.onClick()}>
            {this.props.menuItem.text}
          </a>
        </div>
      )
    } else {
      return null
    }
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  onClick: PropTypes.func,
  rootStore: PropTypes.object
}
