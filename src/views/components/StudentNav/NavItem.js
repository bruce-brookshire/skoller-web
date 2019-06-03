import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'

@inject('rootStore') @observer
class NavItem extends React.Component {
  getActivePage () {
    const {studentNavStore: {activePage}} = this.props.rootStore
    return activePage
  }

  render () {
    return (
      <div className={'s-nav-item ' + (this.getActivePage() === this.props.pageName ? 'active' : '')}>
        {/* <a onClick={() => this.props.rootStore.studentNavStore.setActivePage(this.props.pageName)}>{this.props.text}</a> */}
        <a onClick={() => { browserHistory.push('/student/' + this.props.pageName) }}>{this.props.text}</a>
      </div>
    )
  }
}

NavItem.propTypes = {
  rootStore: PropTypes.object,
  pageName: PropTypes.string,
  text: PropTypes.string
}

export default NavItem
