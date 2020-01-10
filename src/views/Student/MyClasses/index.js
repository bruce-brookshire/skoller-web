import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'
import StudentLayout from '../../components/StudentLayout'
import AddClassModal from './AddClassModal'
import ClassStatusModal from '../../components/ClassStatusModal'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import {browserHistory} from 'react-router'
import SecondClassPrompt from '../../components/Sammi/Prompts/SecondClassPrompt'
import JoinFirstClassPrompt from '../../components/Sammi/Prompts/JoinFirstClassPrompt'

@inject('rootStore') @observer
class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      showAddClassModal: false,
      classStatusModal: {show: false, cl: null},
      loading: true
    }
    this.props.rootStore.studentNavStore.location = this.props.location
  }

  componentWillMount () {
    this.props.rootStore.studentNavStore.setActivePage('classes')
    // this.updateClasses()
  }

  findFullClass (classId) {
    return this.props.rootStore.studentClassesStore.classes.find((cl) => cl.id === classId)
  }

  updateClasses () {
    // const {user: {student}} = this.props.rootStore.userStore
    // actions.classes.getStudentClassesById(student.id).then((classes) => {
    //   this.setState({classes, loading: false})
    // }).catch(() => false)
    this.props.rootStore.studentClassesStore.updateClasses()
  }

  // updateClass (cl) {
  //   actions.classes.getClassById(cl.id).then(cl => {
  //     const index = this.props.rootStore.studentClassesStore.classes.findIndex(c => c.id === cl.id)
  //     const newClasses = this.props.rootStore.studentClassesStore.classes
  //     newClasses[index] = cl
  //     this.setState({classes: newClasses})
  //   }).catch(() => false)
  // }

  numberOfClassesNeedingSyllabus () {
    return this.props.rootStore.studentClassesStore.classes.filter((item, index) => {
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
            classes={this.props.rootStore.studentClassesStore.classes}
            emptyMessage='You are not enrolled in any classes.'
            onSelect={this.onClassSelect.bind(this)}
          />
          {this.props.rootStore.studentClassesStore.classes.length > 1 &&
            <button className='button add-button' onClick={() => this.setState({showAddClassModal: true})}>
              Join a Class
            </button>
          }
          <JoinFirstClassPrompt onAddClass={() => this.updateClasses()} show={this.props.rootStore.studentClassesStore.classes.length === 0} />
          <SecondClassPrompt onAddClass={() => this.updateClasses()} show={this.props.rootStore.studentClassesStore.classes.length === 1} />
        </div>
      </div>
    )
  }

  onClassSelect (cl) {
    // Need to get enrollment link from classes
    // because ClassList will not return it

    let fullClass = this.findFullClass(cl.id)
    if (fullClass.status.id < 1400) {
      this.setState({classStatusModal: {show: true, cl: fullClass}})
    } else {
      browserHistory.push({
        pathname: `/student/class/${cl.id}/`,
        state: {
          enrollmentLink: fullClass.enrollment_link,
          enrollmentCount: fullClass.enrollment
        }
      })
    }
  }

  closeAddClassModal () {
    console.log('closeAddClassModal')
    this.setState({showAddClassModal: false})
    this.updateClasses()
  }

  closeClassStatusModal () {
    console.log('closing modal')
    this.setState({classStatusModal: {show: false, cl: null}})
    this.updateClasses()
  }

  launchClassStatusModal = (cl) => {
    this.setState({classStatusModal: {show: true, cl: cl}})
  }

  renderView () {
    return (
      <div className='cn-my-classes-wrapper'>
        <div className='cn-my-classes-container'>
          <h1>Classes</h1>
          <i className='fas fa-plus cn-my-classes-add-new' onClick={() => this.setState({showAddClassModal: true})} />
          <div className='cn-my-classes-content'>
            {this.renderContent()}
          </div>
        </div>
        {this.state.showAddClassModal &&
          <AddClassModal closeModal={() => this.closeAddClassModal()} launchClassStatusModal={cl => this.launchClassStatusModal(cl)} />
        }
        {this.state.classStatusModal.show &&
          <ClassStatusModal closeModal={() => this.closeClassStatusModal()} onSubmit={() => this.closeClassStatusModal()} cl={this.state.classStatusModal.cl} />
        }
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.props.rootStore.studentClassesStore.loading
          ? <SkLoader />
          : this.renderView()}
      </StudentLayout>
    )
  }
}

MyClasses.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default MyClasses
