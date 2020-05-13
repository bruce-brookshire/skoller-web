import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkCircleLoader from '../../../assets/sk-icons/SkCircleLoader'
import { inject, observer } from 'mobx-react'
import { CSSTransition } from 'react-transition-group'

@inject('rootStore') @observer
export default class LoadingIndicator extends Component {
  render () {
    return (
      <CSSTransition
        mountOnEnter
        in={this.props.rootStore.insightsStore.loadingUpdate}
        timeout={300}
        classNames="pop"
        unmountOnExit
      >
        <div style={{
          display: 'inline-block',
          backgroundColor: 'white',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.08)',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          padding: '4px',
          margin: '-4px 1rem -4px 1rem'
        }}>
          <SkCircleLoader />
        </div>
      </CSSTransition>

    )
  }
}

LoadingIndicator.propTypes = {
  rootStore: PropTypes.object
}
