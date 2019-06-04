import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import moment from 'moment'

@inject('rootStore') @observer
class AssignmentDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      assignments: [],
      currentAssignment: {},
      currentWeight: {},
      cl: {}
    }
  }

  async componentWillMount () {
    this.getClass()
    await this.getAssignment()
    await this.getWeightInfo()
  }

  getClass () {
    const { classId } = this.props.params
    const { navbarStore } = this.props.rootStore

    this.setState({ loading: true })
    actions.classes.getClassById(classId).then(cl => {
      this.setState({ cl, loading: false })
      navbarStore.title = cl.name
      console.log(this.state.cl)
    }).catch(() => this.setState({ loading: false }))
  }

  async getAssignment () {
    const { classId } = this.props.params
    const { userStore } = this.props.rootStore
    const { user: { student } } = userStore
    const { assignmentId } = this.props.params
    const { assignments } = await actions.studentClasses.getStudentClassAssignments(classId, student).then(assignments => {
      console.log('assignments:')
      console.log(assignments)
      this.setState({ assignments: assignments })
      return assignments
    })
    const currentAssignment = assignments.find(a => parseInt(a.assignment_id) === parseInt(assignmentId))
    console.log('current assignment')
    console.log(currentAssignment)
    this.setState({currentAssignment: currentAssignment})
  }

  async getWeightInfo () {
    const { cl } = this.state
    const { weight_id } = this.state.currentAssignment
    const weights = await actions.weights.getClassWeights(cl).then(res => res)
    const currentWeight = weights.find(w => parseInt(w.id) === parseInt(weight_id))
    console.log('current weight category')
    console.log(currentWeight)
    this.setState({currentWeight: currentWeight})
  }

  renderDueDate (dd) {
    const today = moment()
    return moment(dd)
  }

  renderAssignmentDetails (assignment) {
    const { currentWeight } = this.state
    return (
      <div>
        <h1>Assignment Details</h1>
        <h2>{assignment.name}</h2>
        {assignment.weight ? <p>Worth {assignment.weight * 100}% of your final grade</p>
          : <p>No weight given.</p>}
        <p>Grading Category: {currentWeight.name}</p>
        <p>Due Date: {assignment.due}</p>
      </div>
    )
  }

  render () {
    const { loading } = this.state
    const assignment = this.state.currentAssignment
    return (
      <div>
        <div id='cn-class-detail-container'>
          {/* {loading
            ? <Loading />
            : this.renderClassDetails()} */}
          <h1></h1>
        </div>
        <div className='cn-class-assignments-container'>
          <div className='cn-class-list-container margin-top'>
            {loading
              ? <Loading />
              : this.renderAssignmentDetails(assignment)}
          </div>
        </div>
      </div>
    )
  }
}

AssignmentDetail.propTypes = {
  params: PropTypes.object,
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default AssignmentDetail
