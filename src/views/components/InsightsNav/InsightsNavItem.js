import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

@inject('rootStore')
@observer
class NavItem extends React.Component {
  getActivePage () {
    const {
      navStore: { activePage }
    } = this.props.rootStore
    return activePage
  }

  getNavIcon () {
    if (this.props.pageName.includes('insights/dashboard')) {
      return <i className='fas fa-tachometer-alt' />
    } else if (this.props.pageName.includes('insights/students')) {
      return <i className='fas fa-user' />
    } else if (this.props.pageName.includes('insights/groups')) {
      return <i className='fas fa-users' />
    } else if (this.props.pageName.includes('insights/organization')) {
      return <i className='fas fa-globe' />
    } else if (this.props.pageName.includes('insights/settings')) {
      return <i className='fas fa-cog' />
    } else {
      return null
    }
  }

  render () {
    let jobsMode = this.props.rootStore.navStore.jobsMode
    return (
      <div
        className={
          's-nav-item ' +
          (this.getActivePage() === this.props.pageName ? (jobsMode ? 'active-jobs' : 'active') : '')
        }
        onClick={() => {
          this.props.history.push('/' + this.props.pageName)
        }}
      >
        {this.getNavIcon()}
        <a>{this.props.text}</a>
        <span />
      </div>
    )
  }
}

NavItem.propTypes = {
  rootStore: PropTypes.object,
  pageName: PropTypes.string,
  text: PropTypes.string,
  history: PropTypes.object
}

export default withRouter(NavItem)
