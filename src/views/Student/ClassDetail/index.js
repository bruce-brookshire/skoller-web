import React from 'react'
import PropTypes from 'prop-types'
import UploadDocuments from './UploadDocuments'
import actions from '../../../actions'
import Loading from '../../../components/Loading'

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

  getClass () {
    const {classId} = this.props.params
    this.setState({loading: true})
    actions.classes.getClassById(classId).then(cl => {
      this.setState({cl, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  renderContent () {
    const {cl} = this.state
    return (
      <UploadDocuments cl={cl}/>
    )
  }

  render () {
    const {loading} = this.state
    return (
      <div className='cn-my-classes-container'>
        {loading ? <Loading /> : this.renderContent()}
      </div>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object
}

export default ClassDetail
