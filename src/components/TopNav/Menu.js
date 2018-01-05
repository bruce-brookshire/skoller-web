import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'
import {inject, observer} from 'mobx-react'

const menuItems = [
  {
    admin: true,
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
    admin: false,
    path: '/logout',
    text: 'Logout'
  }
]

class Menu extends React.Component {
  constructor (props) {
    super(props)

    browserHistory.listen((location) => {
      this.state = {activePath: location.pathname}
    })
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
                  rootStore={this.props.rootStore}
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

@inject('rootStore') @observer
class MenuItem extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {menuItem: {icon}} = this.props
    const currentPath = window.location.pathname
    const adminAccessible = this.props.menuItem.admin && !this.props.rootStore.userStore.isStudent()
    if((adminAccessible || !this.props.menuItem.admin) && currentPath != this.props.menuItem.path){
      return (
        <div className={`menu-item`}>
          <a onClick={() => this.props.onClick()}>
            {this.props.menuItem.text}
          </a>
        </div>
      )
    }else{
      return null
    }
  }
}

MenuItem.propTypes = {
  menuItem: PropTypes.object,
  onClick: PropTypes.func
}
