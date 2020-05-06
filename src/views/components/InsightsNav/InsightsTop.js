import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom'
import InsightsIcon from '../../../assets/sk-icons/InsightsIcon'

@inject('rootStore') @observer
class InsightsTop extends React.Component {
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
          <Link to={'/insights/dashboard'}>
            <span style={{marginBottom: '-4px'}}><InsightsIcon height='22px' fill='#57b9e4' /></span> skoller <span style={{fontWeight: '400'}}>insights</span>
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

InsightsTop.propTypes = {
  rootStore: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(InsightsTop)
