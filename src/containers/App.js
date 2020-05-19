import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import Snackbar from '../components/Snackbar'
import { withRouter } from 'react-router-dom'

@inject('rootStore') @observer
class App extends React.Component {
  renderSnackBar () {
    const {snackbarStore} = this.props.rootStore
    return <Snackbar message={snackbarStore.message} show={snackbarStore.show} type={snackbarStore.type}/>
  }

  renderBackgroundColor () {
    // console.log(this.props.location.pathname.startsWith('/insights'))
    let body = document.getElementById('body')
    if (this.props.rootStore.navStore.jobsMode || this.props.location.pathname.startsWith('/insights')) {
      body.style.backgroundColor = '#4a4a4a'
    } else {
      body.style.backgroundColor = '#EDFAFF'
    }
  }

  render () {
    this.renderBackgroundColor()

    let layout = document.getElementById('layout')

    this.props.history.listen((l) => {
      if (layout) {
        layout.scrollTop = 0
      }
      this.props.rootStore.navStore.history.push(l.pathname)
    })

    return (
      <div className='app public'>
        {this.props.children}
        {this.renderSnackBar()}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node,
  rootStore: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(App)
