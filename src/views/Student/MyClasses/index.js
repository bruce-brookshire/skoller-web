import React from 'react'
import ClassList from '../../components/ClassList'
import actions from '../../../actions'
import { browserHistory } from 'react-router'

class MyClasses extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: []
    }
  }

  componentWillMount () {
    this.updateClasses()
  }

  updateClasses () {
    actions.classes.getStudentClasses().then((classes) => {
      this.setState({classes})
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

  numberOfClassesNeedingSyllabus () {
    return this.state.classes.filter((item, index) => {
      return item.status.name === 'Needs Syllabus'
    }).length
  }

  renderNeedsSyllabusInfo () {
    let num = this.numberOfClassesNeedingSyllabus()
    if (num > 0) {
      return (
        <div className='needs-syllabus-info margin-bottom center-text cn-red'>
          {`Skoller needs a syllabus for ${num} of your classes.`}
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
        <div className='cn-table-grid-container'>
          <ClassList
            classes={this.state.classes}
            disabled={false}
            onDelete={() => this.onDeleteClass.bind(this)}
            deleteMessage={'Are you sure you want to drop this class?'}
            emptyMessage='You are not enrolled in any classes.'
            onUpdate={(cl) => this.updateClass(cl)}
          />
          <button className='button-invert full-width add-button' onClick={() => { browserHistory.push('student/find-classes') }}>
            Add a Class
          </button>
        </div>
      </div>
    )
  }

  /*
  * Method for deleting a class.
  *
  * @param [Object] cl. Class user is in.
  * @return [Object] null.
  */
  onDeleteClass (cl) {
    actions.classes.dropClass(cl.id).then(() => {
      const newClasses = this.state.classes.filter(cc => cc.id !== cl.id)
      this.setState({classes: newClasses})
    }).catch(() => false)
  }

  render () {
    return (
      <div className= 'cn-my-classes-container'>
        <div className='cn-my-classes-header margin-bottom'>
          <div className='left'>
            <h2>My classes</h2><br/>
            <span>From this page, you can enroll in your classes, upload syllabi, and check other class details.</span>
          </div>

          <div className='right'>
            <h4><a onClick={() => { browserHistory.push('student/find-classes') }}>Add Class</a></h4>
          </div>
        </div>

        {this.renderNeedsSyllabusInfo()}
        {this.renderContent()}
      </div>
    )
  }
}

export default MyClasses
