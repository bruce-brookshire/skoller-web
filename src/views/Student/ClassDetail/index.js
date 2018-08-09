import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import UploadDocuments from './UploadDocuments'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import ClassCard from '../../../components/ClassCard'
import ClassInviteLink from './ClassInviteLink'

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

  renderClassCard () {
    const {cl} = this.state
    let professorName = cl.professor.name_first + ' ' + cl.professor.name_last
    return (
      <ClassCard
        cl={cl}
        schoolName={cl.school.name}
        professorName={professorName}
        semesterName={cl.class_period.name}/>
    )
  }

  renderClassLink () {
    const {cl} = this.state
    const {enrollmentLink} = this.props.location.state
    return (
      <ClassInviteLink
        cl={cl}
        enrollmentLink={enrollmentLink}
      />
    )
  }

  renderClassDetails () {
    const {cl} = this.state
    return (
      <div>
        <div id='cn-class-detail-header'>
          <div className='cn-class-detail-header-item'>
            {this.renderClassCard()}
          </div>
          <div className='cn-class-detail-header-item'>
            {this.renderClassLink()}
          </div>
        </div>
        {<UploadDocuments cl={cl} onUpload={this.getClass.bind(this)} />}
      </div>
    )
  }

  render () {
    const {loading} = this.state
    return (
      <div id='cn-class-detail-container'>
        {loading
          ? <Loading />
          : this.renderClassDetails()}
      </div>
    )
  }
}

ClassDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default ClassDetail
