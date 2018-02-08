import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../actions'
import stores from '../../stores'

const {navbarStore} = stores

@inject('rootStore') @observer
class ClassApproval extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

  /*
  * Fetch the documents for a class.
  * Lock the class.
  */
  componentWillMount () {
    this.intializeComponent()
  }

  componentWillUnmount () {
  }

  /*
  * Intialize the component
  */
  intializeComponent () {
    this.setState(this.initializeState())
    this.getClass()
    this.getProfessorClasses()
  }

  /*
  * Initialize state
  */
  initializeState () {
    const {state} = this.props.location
    navbarStore.cl = null
    return {
      approving: false,
      isAdmin: state.isAdmin || false,
      isSW: state.isSW || false,
      loadingClass: true,
      loadingProfessorClasses: true,
      locks: [],
      professorClasses: [],
    }
  }

  ////////////////////////////
  ///////// ACTIONS //////////
  ////////////////////////////

  /*
  * Approve the given class
  */
  approveClass (cl) {
    actions.classes.approveClass(cl).then((cl) => {
      this.updateClass(cl)
    })
  }

  /*
  * Fetch the class by id.
  */
  getClass () {
    const {params: {classId}} = this.props
    actions.classes.getClassById(classId).then((cl) => {
      navbarStore.cl = cl
      this.setState({loadingClass: false})
    }).catch((error) => {  this.setState({loadingClass: false}) })
  }

  /*
  * Fetch the documents for a class.
  */
  getProfessorClasses () {
    const {params: {classId}} = this.props
    actions.documents.getClassDocuments(classId).then((documents) => {
      this.setState({loadingProfessorClasses: false})
    }).catch(() => false)
  }

  ////////////////////////////
  ///////// RENDERS //////////
  ////////////////////////////

  renderActions() {
    return null
  }

  renderContent() {
    return null
  }

  renderHeader() {
    return null
  }

  render () {
    return (
      <div className='cn-class-approval-container'>
        <div className='cn-body-container'>
          <div className='cn-body-header'>
            {this.renderHeader()}
          </div>
          <div className='cn-body-control'>
            {this.renderContent()}
          </div>
          <div className='cn-body-footer'>
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }
}

export default ClassApproval
