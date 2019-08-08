import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'
import { browserHistory } from 'react-router'
import StudentLayout from '../../components/StudentLayout'
import AddClassModal from './AddClassModal'
import SkLoader from '../../../assets/sk-icons/SkLoader';

@inject('rootStore') @observer
class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      showAddClassModal: false,
      loading: true
    }
  }

  componentWillMount () {
    this.props.rootStore.studentNavStore.setActivePage('classes')
    this.updateClasses()
  }

  findFullClass (classId) {
    const {classes} = this.state

    return classes.find((cl) => cl.id === classId)
  }

  updateClasses () {
    const {user: {student}} = this.props.rootStore.userStore
    actions.classes.getStudentClassesById(student.id).then((classes) => {
      this.setState({classes, loading: false})
    }).catch(() => false)
  }

  updateClass (cl) {
    actions.classes.getClassById(cl.id).then(cl => {
      const index = this.state.classes.findIndex(c => c.id === cl.id)
      const newClasses = this.state.classes
      newClasses[index] = cl
      this.setState({classes: newClasses})
    }).catch(() => false)
  }

  assignColors () {
    const { classes } = this.state
    if (classes) {
      const colorsInUse = []
      const colors = [
        '#9b55e5ff', // purple
        '#ff71a8ff', // pink
        '#57b9e4ff', // blue
        '#4cd8bdff', // mint
        '#4add58ff', // green
        '#f7d300ff', // yellow
        '#ffae42ff', // orange
        '#dd4a63ff' // red
      ]
      classes.forEach(cl => {
        if (!cl.color) {
          colors.forEach(async color => {
            if (colorsInUse.indexOf(color) !== -1) {
              cl.color = color
              await actions.studentclasses.updateClassColor(cl).then((res) => {
                console.log(res)
              }).catch(() => false)
              colorsInUse.push(color)
            }
          })
        }
      })
    }
  }

  numberOfClassesNeedingSyllabus () {
    return this.state.classes.filter((item, index) => {
      var nameL = item.status.name.toLowerCase()
      return ['new class', 'needs setup', 'needs student input', 'class setup', 'class issue'].includes(nameL) && !item.status.is_complete
    }).length
  }

  renderNeedsSyllabusInfo () {
    let num = this.numberOfClassesNeedingSyllabus()
    if (num > 0) {
      return (
        <div className='cn-needs-syllabus-info margin-bottom center-text cn-blue'>
          <i className='fas fa-user-edit' />
          <br/>
          {`${num} class${num > 1 ? 'es' : ''} still need${num > 1 ? '' : 's'} to be set up.`}
        </div>
      )
    } else {
      return null
    }
  }

  /*
  * Renders the class table for the user
  *
  * @return [Array]. Array of formatted row data.
  */
  renderContent () {
    return (
      <div>
        {this.renderNeedsSyllabusInfo()}
        <div className='cn-table-grid-container'>
          <ClassList
            classes={this.state.classes}
            emptyMessage='You are not enrolled in any classes.'
            onSelect={this.onClassSelect.bind(this)}
          />
          <button className='button add-button' onClick={() => this.setState({showAddClassModal: true})}>
            Join a Class
          </button>
        </div>
      </div>
    )
  }

  onClassSelect (cl) {
    // Need to get enrollment link from classes
    // because ClassList will not return it

    let fullClass = this.findFullClass(cl.id)
    browserHistory.push({
      pathname: `/student/class/${cl.id}/`,
      state: {
        enrollmentLink: fullClass.enrollment_link,
        enrollmentCount: fullClass.enrollment
      }
    })
  }

  closeAddClassModal () {
    this.setState({showAddClassModal: false})
    this.updateClasses()
  }

  renderView () {
    return (
      <div className='cn-my-classes-wrapper'>
        <div className='cn-my-classes-container'>
          <h1>My Classes</h1>
          <i className='fas fa-plus cn-my-classes-add-new' onClick={() => this.setState({showAddClassModal: true})} />
          <div className='cn-my-classes-content'>
            {this.renderContent()}
          </div>
        </div>
        {this.state.showAddClassModal &&
          <AddClassModal closeModal={() => this.closeAddClassModal()} />
        }
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.state.loading
          ? <SkLoader />
          : this.renderView()}
      </StudentLayout>
    )
  }
}

MyClasses.propTypes = {
  rootStore: PropTypes.object
}

export default MyClasses
