import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'
import SkSelect from '../../components/SkSelect'
import Assignment from '../ClassDetail/ClassAssignments/Assignment'
import actions from '../../../actions'
import ReactToolTip from '../../components/ToolTip/CustomToolTip'

@inject('rootStore') @observer
class TasksList extends React.Component {
  static studentClasses = {}

  today = moment()

  constructor (props) {
    super(props)
    this.state = {
      user: this.props.rootStore.insightsStore.students.find(s => s.id === parseInt(this.props.match.params.orgStudentId)),
      loading: false,
      seeMore: false,
      filterSelection: 'All assignments',
      visibleAssignments: []
    }
    this.containerRef = React.createRef()
  }

  registerVisibleAssignments (id, isVisible) {
    let visibleAssignments = this.state.visibleAssignments

    if (isVisible) {
      if (!visibleAssignments.includes(id)) {
        visibleAssignments.push(id)
      }
    } else {
      if (visibleAssignments.includes(id)) {
        visibleAssignments.splice(visibleAssignments.indexOf(id), 1)
      }
    }

    this.setState({visibleAssignments})
    this.props.visibleAssignmentsCallback && this.props.visibleAssignmentsCallback(visibleAssignments)
  }

  assignments () {
    if (this.props.insightsUserData) {
      return this.props.insightsUserData.assignments
    } else {
      return this.props.rootStore.studentAssignmentsStore.assignments
    }
  }

  classes () {
    if (this.props.insightsUserData) {
      return this.props.insightsUserData.classes
    } else {
      return this.props.rootStore.studentClassesStore.classes
    }
  }

  getClassForTask (task) {
    // let clName, clColor
    let newClass
    this.classes().forEach(cl => {
      if (cl.id === task.class_id) {
        // clName = cl.name
        // clColor = cl.color
        newClass = cl
      }
    })
    // return {clName, clColor}
    return newClass
  }

  renderNoTasks () {
    return (
      <div style={{color: 'rgba(0,0,0,0.3)', width: '100%', textAlign: 'center', padding: '2rem'}}>
        {this.assignments().length > 0
          ? "You're all caught up!"
          : "No to-do's."
        }
      </div>
    )
  }

  getSortedAssignments () {
    if (this.props.filter && this.state.filterSelection === 'Past') {
      return this.assignments()
        .slice()
        .sort((a, b) => moment(a.due).isAfter(moment(b.due)) ? -1 : 1)
    } else {
      return this.assignments()
        .slice()
        .sort((a, b) => moment(a.due).isBefore(moment(b.due)) ? -1 : 1)
    }
  }

  getTaskDisplayCount () {
    let i = 0
    this.getSortedAssignments().forEach(task => {
      if (this.taskValidity(task)) {
        i += 1
      }
    })
    return i
  }

  filterLogic (task) {
    if (this.props.filter) {
      if (this.state.filterSelection === 'All assignments') {
        return true
      } else if (this.state.filterSelection === 'Upcoming') {
        return moment(task.due).isSame(this.today, 'day') || moment(task.due).isAfter(this.today)
      } else if (this.state.filterSelection === 'Past') {
        return moment(task.due).isBefore(this.today)
      }
    } else {
      return true
    }
  }

  outlookLogic (task) {
    const { outlook } = this.props

    if (outlook) {
      if (outlook === 'Rest of the semester') {
        return true
      } else if (outlook === 'Next 10 days') {
        return moment(task.due).diff(this.today, 'day') <= 10
      } else if (outlook === 'Next 30 days') {
        return moment(task.due).diff(this.today, 'day') <= 30
      }
    } else {
      return true
    }
  }

  taskValidity (task, i = false) {
    let daysAway = moment(task.due).diff(this.today, 'days')
    let maxDays = this.props.maxDays ? this.props.maxDays - 1 : 10000
    let maxTasks = this.props.maxTasks ? this.props.maxTasks : 10000

    if (
      (daysAway <= maxDays) && // if maxDays prop is given, check to make sure that task is within maxDays
      (i === false ? !i : (i < maxTasks || this.state.seeMore)) && // if number of tasks already displayed is greater than limit given by prop maxTasks, don't display... unless user has clicked See More or unless i is not given
      (daysAway >= 0 || this.props.cl) && // make sure task is in the future, unless it's within a class detail view
      (this.props.cl ? task.class_id === this.props.cl.id : true) && // if class detail view, make sure assignment is for that class
      (this.filterLogic(task)) && // if filter is on, check to see if task should be displayed
      (this.outlookLogic(task)) // if outlook is on, check to see if task should be displayed
    ) {
      return true
    } else {
      return false
    }
  }
  onCompleteAssignment = (assignmentId, isCompleted) => {
    console.log({ assignmentId, isCompleted })
    actions.assignments.toggleCompleteAssignmentById(this.props.rootStore.userStore.user.student.id, assignmentId, isCompleted)
      .then(() => {
        this.props.rootStore.studentClassesStore.updateClasses()
      })
  }

  onDeleteAssignment = (assignmentId) => {
    actions.assignments.deleteStudentAssignment(assignmentId)
      .then(() => {
        // this.props.rootStore.studentClassesStore.updateClasses()
        this.props.rootStore.studentAssignmentsStore.updateAssignments()
      })
  }
  editAssignment = async (form, assignmentId, isPrivate = true) => {
    const { removeGradeFromAssignment, gradeAssignment, updateStudentAssignment } = actions.assignments

    if (form.grade || isNaN(form.grade)) {
      if (isNaN(form.grade)) {
        await removeGradeFromAssignment(assignmentId)
      } else {
        await gradeAssignment(assignmentId, form.grade)
      }
    } else {
      form.id = assignmentId
      await updateStudentAssignment(form, isPrivate)
    }

    this.props.rootStore.studentAssignmentsStore.updateAssignments()
  }

  renderTasks () {
    if (this.state.loading) {
      return (<SkLoader />)
    }

    let i = 0
    if (this.assignments().length === 0 || this.getTaskDisplayCount().length <= 0) {
      return (
        this.renderNoTasks()
      )
    } else {
      let taskCount = 0
      this.getSortedAssignments().forEach(task => {
        if (this.taskValidity(task)) {
          taskCount += 1
        }
      })
      if (taskCount === 0) {
        return this.renderNoTasks()
      } else {
        return (
          this.getSortedAssignments().map(task => {
            let cl = this.getClassForTask(task)
            if (this.taskValidity(task, i)) {
              i += 1
              return (
                <ReactToolTip theme="dark" position="top" ttype="assifnment" grade={task.grade} title={task.name}>
                  <Assignment
                    key={task.id}
                    isTask={true}
                    onDeleteAssignment={this.onDeleteAssignment}
                    onCompleteAssignment={this.onCompleteAssignment}
                    editAssignment={this.editAssignment}
                    registerVisibleAssignment={(id, isVisible) => this.registerVisibleAssignments(id, isVisible)}
                    // registerVisibleAssignment={() => {}}
                    active={true}
                    // scrollTop={this.state.containerScrollTop}
                    // key={a.id}
                    assignment={task}
                    color={cl.color}
                    cl={cl}
                    className={' focused-assignment'}
                  />
                </ReactToolTip>
              )
            }
          })
        )
      }
    }
  }

  renderFilter () {
    if (!this.props.filter) {
      return null
    }

    let filterOptions = ['All assignments', 'Upcoming', 'Past']
    return (
      <div className='sk-tasks-list-filter'>
        <SkSelect
          selection={this.state.filterSelection}
          optionsMap={() => filterOptions.map(o =>
            <div
              className='sk-select-option'
              key={filterOptions.indexOf(o)}
              onClick={() => {
                this.setState({filterSelection: o})
              }}
            >{o}</div>
          )}
        />
      </div>
    )
  }

  renderContent () {
    return (
      <div className='sk-tasks-list'>
        {this.renderFilter()}
        {this.renderTasks()}
        {/* {this.renderTasks()} */}
        {
          !this.state.seeMore &&
          this.props.maxTasks &&
          this.props.maxTasks < this.getTaskDisplayCount() &&
          <div
            style={{color: '#57B9E4', cursor: 'pointer', textAlign: 'center', marginBottom: '8px'}}
            onClick={() => this.setState({seeMore: true})}
          >
            See all {this.getTaskDisplayCount()} {this.props.cl ? 'assignments' : "to-do's"}
          </div>
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        {(this.props.rootStore.studentAssignmentsStore.loading || this.props.rootStore.studentClassesStore.loading) && <SkLoader />}
        {!(this.props.rootStore.studentAssignmentsStore.loading || this.props.rootStore.studentClassesStore.loading) && this.renderContent()}
      </div>
    )
  }
}

TasksList.propTypes = {
  rootStore: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object,
  maxTasks: PropTypes.number,
  maxDays: PropTypes.number,
  seeMore: PropTypes.bool,
  cl: PropTypes.object,
  filter: PropTypes.bool,
  outlook: PropTypes.string,
  displayCountCallback: PropTypes.func,
  insightsUserData: PropTypes.object,
  visibleAssignmentsCallback: PropTypes.func
}

export default TasksList
