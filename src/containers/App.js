import PropTypes from 'prop-types'
import React from 'react'
import {inject, observer} from 'mobx-react'
import Snackbar from '../components/Snackbar'

@inject('rootStore') @observer
class App extends React.Component {
  renderSnackBar () {
    const {snackbarStore} = this.props.rootStore
    return <Snackbar message={snackbarStore.message} show={snackbarStore.show} type={snackbarStore.type}/>
  }

  render () {
    const {userStore} = this.props.rootStore
    if (userStore.fetchingUser) return <div />

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
  location: PropTypes.object
}

export default App
