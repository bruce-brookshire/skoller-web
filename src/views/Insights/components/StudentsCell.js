import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { CSSTransition } from 'react-transition-group'
import actions from '../../../actions'
import { observer, inject } from 'mobx-react'

const Student = (props) => {
  const [remove, setRemove] = useState(false)

  const toggleRemove = () => {
    setRemove(!remove)
  }

  const renderX = () => {
    return (
      <div className='team-remove' onClick={() => props.popStudent(props.user)}>
        <i className='fas fa-times' />
      </div>
    )
  }

  return (
    <div className='team' onClick={() => toggleRemove()}>
      <CSSTransition
        mountOnEnter
        in={remove}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        {renderX()}
      </CSSTransition>
      {props.user.student.name_first + ' ' + props.user.student.name_last}
    </div>
  )
}

Student.propTypes = {
  user: PropTypes.object,
  popStudent: PropTypes.func
}

@inject('rootStore') @observer
class StudentsCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      add: false
    }

    this.cellRef = React.createRef()
  }

  popStudent = (user) => {
    actions.insights.getStudentsByGroupId(this.props.org.id, this.props.group.id)
      .then(r => {
        actions.insights.removeStudentFromGroup(this.props.org.id, this.props.group.id, r.find(s => s.org_student_id === user.id).id)
          .then(() => {
            this.props.onChange && this.props.onChange()
            this.setState({add: false, input: ''})
          })
      })

    this.setState({
      input: '',
      add: false
    })
  }

  addStudent = (user) => {
    actions.insights.addStudentToGroup(this.props.org.id, this.props.group.id, user.id)
      .then(() => {
        this.props.onChange && this.props.onChange()
      })

    this.setState({
      input: '',
      add: false
    })
  }

  renderSearch () {
    return (
      <div className='add-team-search-container' style={this.cellRef.current && {
        width: this.cellRef.current.offsetWidth + 'px',
        top: this.cellRef.current.offsetHeight + 'px'
      }}>
        <input autoFocus placeholder={'Find a student'} className='add-team-search' value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
        <div className='team-options-container'>
          {this.props.rootStore.insightsStore.students.filter(u => (u.student.name_first + ' ' + u.student.name_last).toLowerCase().includes(this.state.input.toLowerCase())).map(u => {
            return (
              <div onClick={() => this.addStudent(u)} className='team-option' key={u.id}>{u.student.name_first + ' ' + u.student.name_last}</div>
            )
          })}
        </div>
      </div>
    )
  }

  renderContent () {
    let students = this.props.rootStore.insightsStore.students.slice().filter(u => {
      return u.org_groups.map(g => g.id).includes(this.props.group.id)
    })

    return (
      <Fragment>
        {students.map(u => {
          return (
            <div key={Math.floor(Math.random() * Math.floor(10000))}>
              <Student user={u} popStudent={(u) => this.popStudent(u)} />
            </div>
          )
        })}
        <div className='add-a-team'>
          <div className='add-team-button' onClick={() => this.setState({add: true})}>+</div>
        </div>
        <CSSTransition
          mountOnEnter
          in={this.state.add}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          {this.renderSearch()}
        </CSSTransition>
      </Fragment>
    )
  }

  render () {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({add: false, input: ''})
        }}
      >
        <div className='si-teams-cell' ref={this.cellRef}>
          {this.renderContent()}
        </div>
      </OutsideClickHandler>
    )
  }
}

StudentsCell.propTypes = {
  group: PropTypes.object,
  org: PropTypes.object,
  onChange: PropTypes.func,
  owner: PropTypes.bool,
  rootStore: PropTypes.object
}

export default StudentsCell
