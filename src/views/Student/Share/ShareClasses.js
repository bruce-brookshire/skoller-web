import React from 'react'
import PropTypes from 'prop-types'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import CopyBox from '../../components/CopyBox'

class ShareClasses extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      classSelection: this.props.classes[0],
      showClassDropDown: false
    }
  }

  selectClassHandler (studentClass) {
    this.setState({classSelection: studentClass, showClassDropDown: false})
  }

  renderClassOptions = () => {
    let classes = this.props.classes
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
    const cl = this.state.classSelection
    if (cl.id % 2 === 0) {
      return (
        'Ditch your paper planner. Skoller unlocks academic organization and keeps you on track all year long. Our class ' +
        name + " is already set up. Sign up through the link you'll automatically be enrolled in our class.\n" +
        '\n' + this.state.classSelection.enrollment_link
      )
    } else {
      return (
        'This new app takes our syllabus and sends reminders about upcoming due dates, organizes assignments into a calendar, and much more. Our class ' +
        name + " is already set up. Sign up through the link you'll automatically be enrolled in our class.\n" +
        '\n' + this.state.classSelection.enrollment_link
      )
    }
  }

  renderShareForm () {
    return (
      <div className='sk-share-form'>
        <h2>Send Link to Classmates</h2>
        {this.props.partner &&
          <p
            style={{color: '#' + this.props.partner.primaryColor, margin: '0'}}
          >
            Money is donated every time a student signs up with these links!
          </p>
        }
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

  render () {
    return (
      this.renderShareForm()
    )
  }
}

ShareClasses.propTypes = {
  classes: PropTypes.array,
  user: PropTypes.object,
  partner: PropTypes.object
}

export default ShareClasses
