import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import Snackbar from '../components/Snackbar'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

@inject('rootStore') @observer
class App extends React.Component {
  renderSnackBar () {
    const {snackbarStore} = this.props.rootStore
    return <Snackbar message={snackbarStore.message} show={snackbarStore.show} type={snackbarStore.type}/>
  }

  render () {
    // GOOGLE ANALYTICS PAGE VIEW LOGIC USING REACT-ROUTER-DOM'S HISTORY OBJECT
    this.props.history.listen(l => {
      console.log('GOOGLE ANALYTICS PAGEVIEW', l.pathname)
      ReactGA.set({ page: l.pathname })
      ReactGA.pageview(l.pathname)
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
