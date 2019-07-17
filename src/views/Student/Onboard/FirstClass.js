import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import { inject, observer } from 'mobx-react'
import { browserHistory } from 'react-router'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import DragAndDrop from './DragAndDrop'

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      firstClass: null,
      uploadingDoc: false,
      syllabus: null
    }

    this.getFirstClass()
  }

  getFirstClass () {
    this.setState({loading: true})
    actions.classes.getStudentClassesById(this.props.rootStore.userStore.user.student.id).then((classes) => {
      if (classes.length > 1) {
        browserHistory.push('/student')
      } else if (classes.length === 0) {
        browserHistory.push('/onboard/select-school')
      } else {
        this.setState({
          firstClass: classes[0],
          loading: false
        })
      }
    })
  }

  renderFirstClass () {
    return (
      <div className='sk-onboard-first-class-container'>
        <div className='sk-onboard-first-class-row'>
          <div className='sk-onboard-first-class-checklist-container'>
            <div className='sk-onboard-first-class-checklist'>
              <div className='sk-onboard-first-class-checklist-item'>
                <i className='far fa-check-circle checked' />
                <p>Join class</p>
              </div>
              <div className='sk-onboard-first-class-checklist-item'>
                <i className='far fa-check-circle checked' />
                <p>Send syllabus</p>
              </div>
              <div className='sk-onboard-first-class-checklist-item'>
                <i className='far fa-circle' />
                <p>Unlock community features<br /><small>get 3 classmates to join!</small></p>
              </div>
            </div>
          </div>
          <div className='sk-onboard-first-class-file-drop-container'>
            <DragAndDrop
              handleDrop={(file) => { this.setState({syllabus: file}) }}
            >
              <div>Drop your syllabus here!</div>
            </DragAndDrop>
            <DragAndDrop
              handleDrop={(file) => { this.setState({syllabus: file}) }}
            >
              <div>Drop any separate assignment/lab schedules here.</div>
            </DragAndDrop>
          </div>
        </div>
      </div>
    )
  }

  renderModalContent () {
    return (
      <div>
        <SkProgressBar progress={0.75} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-first-class'>
          <h1>{this.state.firstClass.name}</h1>
          <div className="onboard-first-class-sammi-container">
            <div className="sammi-message"><p>Yay! You're in your first class!</p></div>
            <img src='/src/assets/images/sammi/Smile@3x.png' />
          </div>
        </div>
        {this.renderFirstClass()}
        <div className='onboard-next' onClick={() => this.props.onSubmit()}>
          <p>Next</p>
        </div>
      </div>
    )
  }

  render () {
    return (
      <div>
        {this.state.loading
          ? <SkLoader />
          : this.renderModalContent()
        }
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default SelectSchool
