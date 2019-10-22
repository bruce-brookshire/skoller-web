import React from 'react'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import StudentLayout from '../../components/StudentLayout'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import CopyBox from '../../components/CopyBox'

@inject('rootStore') @observer
class Share extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.rootStore.userStore.user,
      showClassDropDown: false,
      classes: [],
      classSelection: null,
      loading: true
    }

    this.getClasses()
    this.props.rootStore.studentNavStore.setActivePage('share')
  }

  getClasses () {
    this.setState({loading: true})
    actions.classes
      .getStudentClassesById(this.state.user.student.id)
      .then(classes => {
        this.setState({loading: false, classes, classSelection: classes[0]})
      })
  }

  renderHeader () {
    return (
      <div className='sk-share-header'>
        <h1>Share with Your Community</h1>
        <p>Inviting classmates to Skoller helps you keep up with classes and earn points!</p>
        <div className='sk-share-points'>
          <p>Your points: {this.state.user.student.points}</p>
        </div>
      </div>
    )
  }

  selectClassHandler (studentClass) {
    this.setState({classSelection: studentClass, showClassDropDown: false})
  }

  renderClassOptions = () => {
    let classes = this.state.classes
    classes = classes.filter(c => c.status.id >= 1400)
    return (
      <div>
        {classes.map(studentClass => {
          return (
            <div
              className='sk-share-autocomplete-option'
              key={studentClass.id}
              onClick={() => {
                this.selectClassHandler(studentClass)
              }}
              style={{color: studentClass.getColor()}}
            >
              {studentClass.name}
            </div>
          )
        })}
      </div>
    )
  }

  renderSelect () {
    return (
      <div>
        <div className='sk-share-form-select' onClick={() => this.setState({showClassDropDown: !this.state.showClassDropDown})}>
          {this.state.classSelection
            ? <div className='sk-share-form-selection' style={{color: this.state.classSelection.getColor()}}>{this.state.classSelection.name}</div>
            : <div>Select a class</div>
          }
        </div>
        <SkSelectDropDown
          optionsMap={() => this.renderClassOptions()}
          show={this.state.showClassDropDown}
          toggle={() => this.setState({showClassDropDown: !this.state.showClassDropDown})}
        />
      </div>
    )
  }

  renderShareMessage () {
    const name = this.state.classSelection.name
    return (
      'Ditch your paper planner. Skoller unlocks academic organization and keeps you on track all year long. Our class ' +
      name + " is already set up. Sign up through the link you'll automatically be enrolled in our class.\n" +
      '\n' + this.state.classSelection.enrollment_link
    )
  }

  renderShareForm () {
    return (
      <div className='sk-share-form'>
        <h2>Send Link to Classmates</h2>
        <div className='sk-share-form-section'>
          <h4>1. Select a class</h4>
          {this.renderSelect()}
        </div>
        <div className='sk-share-form-section'>
          <h4>2. Click the box to copy the message</h4>
          <CopyBox
            longMessage={true}
            linkValue={this.renderShareMessage()}
          />
        </div>
        <div className='sk-share-form-section'>
          <h4>3. Paste and share with classmates!</h4>
          <p>The best ways to share are in a class group text, Blackboard, GroupMe, Facebook, etc.</p>
        </div>
      </div>
    )
  }

  renderContent () {
    return (
      <div className='sk-share-container'>
        {this.renderHeader()}
        {this.renderShareForm()}
      </div>
    )
  }

  render () {
    return (
      <StudentLayout>
        {this.state.loading
          ? <SkLoader />
          : this.renderContent()
        }
      </StudentLayout>
    )
  }
}

Share.propTypes = {
  rootStore: PropTypes.object
}

export default Share
