import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import StudentLayout from '../../components/StudentLayout'
import { withRouter } from 'react-router-dom'
import AssignmentDetailContent from './AssignmentDetailContent'
import NestedNav from '../../components/NestedNav'
import SkLoader from '../../../assets/sk-icons/SkLoader'

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
  }

  componentDidMount () {
    this.getData()
  }

  async getData () {
    await this.getClass()
    await this.getAssignment()
    await this.getWeightInfo()
  }

  getClass () {
    const { classId } = this.props.match.params

    this.setState({ loading: true })
    actions.classes.getStudentClass(this.props.rootStore.userStore.user.student.id, classId).then(cl => {
      this.setState({ cl, classColor: cl.getColor() })
    }).catch(() => this.setState({ loading: false }))
  }

  async getAssignment () {
    const classId = this.props.match.params.classId
    const { userStore } = this.props.rootStore
    const { user: { student } } = userStore
    const { assignmentId } = this.props.match.params
    const { assignments } = await actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      this.setState({ assignments: assignments })
      return assignments
    })
    const currentAssignment = assignments.find(a => parseInt(a.assignment_id) === parseInt(assignmentId))
    this.setState({currentAssignment: currentAssignment})
  }

  async getWeightInfo () {
    const weightId = this.state.currentAssignment.weight_id
    const weights = await actions.weights.getClassWeightsByClassId(this.props.match.params.classId).then(res => res)
    await this.setState({assignmentWeightCategory: weights.find(w => parseInt(w.id) === parseInt(weightId)), loading: false})
  }

  render () {
    const { loading } = this.state
    return (
      <StudentLayout>
        <NestedNav back=
          {
            this.props.rootStore.navStore.location.pathname
              ? this.props.rootStore.navStore.location.pathname.match(/class/) ? false : true
              : false
          }
        />
        <div className='sk-assignment-detail-wrapper'>
          {loading
            ? <SkLoader />
            : <div className='sk-assignment-detail'>
              <div className='sk-assignment-detail-outer-container'>
                <h2 style={{color: this.state.classColor}} onClick={() => this.props.history.push('/student/class/' + this.state.cl.id)}>
                  {this.state.cl.name}
                </h2>
              </div>
              <div className='sk-assignment-detail-container'>
                <AssignmentDetailContent cl={this.state.cl} assignment={this.state.currentAssignment} updateAssignment={(r) => this.setState({currentAssignment: r})} assignmentWeightCategory={this.state.assignmentWeightCategory} />
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
  location: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(AssignmentDetail)
