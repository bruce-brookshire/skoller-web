import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import StudentLayout from '../../components/StudentLayout'
import { browserHistory } from 'react-router'
import BackArrow from '../../../assets/sk-icons/navigation/BackArrow'
import AssignmentDetailContent from './AssignmentDetailContent'

@inject('rootStore') @observer
class AssignmentDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      assignments: [],
      currentAssignment: {},
      assignmentWeightCategory: {},
      cl: {}
    }

    this.getData()
  }

  async getData () {
    await this.getClass()
    await this.getAssignment()
    await this.getWeightInfo()
  }

  getClass () {
    const { classId } = this.props.params

    this.setState({ loading: true })
    actions.classes.getStudentClass(this.props.rootStore.userStore.user.student.id, classId).then(cl => {
      this.setState({ cl, classColor: cl.getColor() })
    }).catch(() => this.setState({ loading: false }))
  }

  async getAssignment () {
    const classId = this.props.params.classId
    const { userStore } = this.props.rootStore
    const { user: { student } } = userStore
    const { assignmentId } = this.props.params
    const { assignments } = await actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      this.setState({ assignments: assignments })
      return assignments
    })
    const currentAssignment = assignments.find(a => parseInt(a.assignment_id) === parseInt(assignmentId))
    this.setState({currentAssignment: currentAssignment})
  }

  async getWeightInfo () {
    const weightId = this.state.currentAssignment.weight_id
    const weights = await actions.weights.getClassWeightsByClassId(this.props.params.classId).then(res => res)
    await this.setState({assignmentWeightCategory: weights.find(w => parseInt(w.id) === parseInt(weightId)), loading: false})
  }

  render () {
    const { loading } = this.state
    return (
      <StudentLayout>
        <div className='sk-assignment-detail-wrapper'>
          {loading
            ? <Loading />
            : <div className='sk-assignment-detail'>
              <div className='sk-assignment-detail-outer-container'>
                {this.props.rootStore.studentNavStore.location.pathname
                  ? <div className='sk-assignment-detail-back-button' onClick={() => browserHistory.push(this.props.rootStore.studentNavStore.location.pathname)}>
                    <BackArrow width="14" height="14" />
                    <p>Back</p>
                  </div>
                  : null
                }
                <h2 style={{color: this.state.classColor}} onClick={() => browserHistory.push('/student/class/' + this.state.cl.id)}>
                  {this.state.cl.name}
                </h2>
              </div>
              <div className='sk-assignment-detail-container'>
                <AssignmentDetailContent cl={this.state.cl} assignment={this.state.currentAssignment} assignmentWeightCategory={this.state.assignmentWeightCategory} />
              </div>
            </div>
          }
        </div>
      </StudentLayout>
    )
  }
}

AssignmentDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default AssignmentDetail
