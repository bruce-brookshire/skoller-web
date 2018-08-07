import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import UploadDocuments from './UploadDocuments'
import actions from '../../../actions'
import Loading from '../../../components/Loading'

@inject('rootStore') @observer
class ClassDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      cl: {}
    }
  }

  componentWillMount () {
    this.getClass()
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
  }

  getClass () {
    const {classId} = this.props.params
    let {navbarStore} = this.props.rootStore

    this.setState({loading: true})
    actions.classes.getClassById(classId).then(cl => {
      this.setState({cl, loading: false})
      navbarStore.title = cl.name
    }).catch(() => this.setState({loading: false}))
  }

  render () {
    const {loading, cl} = this.state
    return (
      <div className='cn-my-classes-container'>
        {loading
          ? <Loading />
          : <UploadDocuments cl={cl}/>}
      </div>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object
}

export default ClassDetail
