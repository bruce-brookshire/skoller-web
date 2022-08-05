import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { formatDueDate } from '../../../../utilities/display'
import PropTypes from 'prop-types'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { CSSTransition } from 'react-transition-group'
import EditAssignment from './EditAssignment'
import CheckIcon from '../../../../assets/sk-icons/CheckIcon'
import OutsideClickHandler from 'react-outside-click-handler'

export function Grade (props) {
  const [editing, setEditing] = React.useState(false)
  const [grade, setGrade] = React.useState(props.assignment.grade)
  const color = '#' + props.color

  const saveGrade = () => {
    let form = {
      grade: parseInt(grade)
    }

    props.editAssignment(form, props.assignment.id)
    setEditing(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      saveGrade()
    }
  }

  const changeGrade = (grade) => {
    let newGrade = grade.replace(/[^0-9]/, '').substring(0, 2)
    setGrade(newGrade)
  }

  const renderEditing = () => {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          saveGrade()
          setEditing(false)
        }}
      >
        <div className="homeAssignment__grade-editing">
          <input
            className="homeAssignment__input"
            onKeyDown={handleKeyDown}
            autoFocus
            value={grade}
            onChange={(e) => changeGrade(e.target.value)}
          />
          <div className="homeAssignment__percent">%</div>
        </div>
      </OutsideClickHandler>
    )
  }

  if (props.assignment.grade === undefined) {
    return null
  }

  return (
    <div
      className="homeAssignment__grade"
      onClick={(e) => {
        e.preventDefault()
        if (!editing) {
          setEditing(true)
        }
      }}
    >
      {editing
        ? renderEditing()
        : props.assignment.grade
          ? Math.round(props.assignment.grade * 10) / 10 + '%'
          : '-'}
    </div>
  )
}

Grade.propTypes = {
  assignment: PropTypes.object,
  editAssignment: PropTypes.func
}

export default function HomeAssignment (props) {
  let isTask = false
  if (props.isTask) {
    isTask = props.isTask
  }
  const [showEdit, setShowEdit] = React.useState(false)
  const [showButton, setShowButton] = React.useState(false)
  const [showCheck, setShowCheck] = React.useState(false)
  const [editExited, setEditExited] = React.useState(false)
  const [outsideClick, setOutsideClick] = React.useState(false)
  const color = props.color ? '#' + props.color : null

  const onChange = (isVisible) => {
    props.registerVisibleAssignment(props.assignment.assignment_id, isVisible)
  }

  const enableButton = () => {
    setShowButton(true)
  }

  const hideButton = () =>
    setTimeout(() => {
      setShowButton(false)
    }, 0)

  const enableEdit = (e) => {
    e.preventDefault()
    setShowEdit(true)
  }

  const onComplete = (e) => {
    e.preventDefault()
    props.onCompleteAssignment(
      props.assignment.id,
      !props.assignment.is_completed
    )
  }

  if (showEdit) {
    return (
      <EditAssignment
        close={() => {
          setShowEdit(false)
          setShowButton(false)
        }}
        {...props}
      />
    )
  } else {
    return (
      <VisibilitySensor onChange={onChange}>
        <OutsideClickHandler onOutsideClick={() => setOutsideClick(true)}>
          <Flipped flipId={props.assignment.assignment_id}>
            <CSSTransition
              key={props.assignment.assignment_id}
              in={!showEdit}
              timeout={90}
              mountOnEnter
              unmountOnExit
              classNames="fade"
            >
              <div
                onMouseEnter={() => enableButton()}
                onMouseLeave={() => hideButton()}
                className={
                  'homeAssignment ' +
                  (props.active ? 'isActive ' : '') +
                  (props.assignment.is_completed
                    ? 'completed-assignment '
                    : '') +
                  (props.className && !outsideClick
                    ? props.className + ' '
                    : '')
                }
              >
                <Grade {...props} />
                <div className="homeAssignment__content">
                  <div className="homeAssignment__border" style={{ borderColor: color }}/>
                  <div className="homeAssignment__name">
                    {props.assignment.name}
                  </div>
                  <div className="homeAssignment__subtext">
                    <div
                      className={
                        props.assignment.due
                          ? 'homeAssignment__due'
                          : 'homeAssignment__missing'
                      }
                    >
                      {formatDueDate(props.assignment.due)}
                    </div>
                    <div className="homeAssignment__className">{props.assignment.class_name}</div>
                  </div>
                </div>
                {!isTask && (
                  <Flipper
                    spring={'stiff'}
                    flipKey={showButton + editExited}
                    className="homeAssignment__controls"
                  >
                    <Flipped flipId={1}>
                      <CSSTransition
                        key={1}
                        in={showButton}
                        timeout={90}
                        mountOnEnter
                        unmountOnExit
                        onExited={() => setEditExited(true)}
                        onEnter={() => setEditExited(false)}
                        classNames="fade"
                      >
                        <div
                          onClick={enableEdit}
                          className="homeAssignment__editBtn"
                        >
                          <div>•••</div>
                        </div>
                      </CSSTransition>
                    </Flipped>
                    <Flipped flipId={2}>
                      <CSSTransition
                        key={2}
                        in={showButton || props.assignment.is_completed}
                        timeout={90}
                        mountOnEnter
                        unmountOnExit
                        classNames="fade"
                      >
                        <div
                          style={{
                            transform: props.assignment.is_completed
                              ? showButton
                                ? 'translateY(0)'
                                : 'translateY(0)'
                              : null,
                            backgroundColor: props.assignment.is_completed
                              ? '#57B9E4'
                              : null
                          }}
                          onMouseEnter={() => setShowCheck(true)}
                          onMouseLeave={() => setShowCheck(false)}
                          onClick={onComplete}
                          className="homeAssignment__completeBtn"
                        >
                          <div className="homeAssignment__complete">
                            {showCheck && !props.assignment.is_completed && (
                              <CheckIcon fill={'#57B9E4'} />
                            )}
                            {props.assignment.is_completed && (
                              <CheckIcon fill={'#FFFFFF'} />
                            )}
                          </div>
                        </div>
                      </CSSTransition>
                    </Flipped>
                  </Flipper>
                )}
              </div>
              {/* </Link> */}
            </CSSTransition>
          </Flipped>
        </OutsideClickHandler>
      </VisibilitySensor>
    )
  }
}

HomeAssignment.propTypes = {
  onCompleteAssignment: PropTypes.func,
  assignment: PropTypes.object,
  color: PropTypes.string,
  active: PropTypes.bool,
  registerVisibleAssignment: PropTypes.func,
  isTask: PropTypes.boolean,
  className: PropTypes.string
}
