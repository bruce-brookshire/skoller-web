import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom'
import InsightsIcon from '../../../assets/sk-icons/InsightsIcon'
import logo from '../../../assets/images/insights/skoller-insights-logo.png'

@inject('rootStore') @observer
class AdminTop extends React.Component {
  getActivePage () {
    const {
      navStore: { activePage }
    } = this.props.rootStore
    return activePage
  }

  render () {
    return (
      <div className="si-top">
        <div className='si-top-left'>
          <Link to={'/hub/classes'}>
            <img src={logo} style={{width: '160px', marginTop: '8px'}} />
          </Link>
        </div>
        <div className='si-top-right'>
          <div className='si-top-user'>
            <p className='si-top-user-name'>{this.props.rootStore.userStore.user.email}</p>
            <p className='si-top-user-org'>{this.props.rootStore.insightsStore.org.name}</p>
          </div>
        </div>
      </div>
    )
  }
}

AdminTop.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(AdminTop)
