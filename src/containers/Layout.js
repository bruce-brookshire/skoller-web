import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import NavBar from '../components/NavBar'
import TopNav from '../components/TopNav'

@inject('rootStore') @observer
class Layout extends React.Component {

  render () {
    return (
      <div>
        <NavBar />
        <TopNav />
        <div className='layout'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default Layout
