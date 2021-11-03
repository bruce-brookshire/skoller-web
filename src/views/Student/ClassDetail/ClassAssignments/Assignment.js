import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { Link, useLocation } from 'react-router-dom'
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

  const renderEditing = () => {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          saveGrade()
          setEditing(false)
        }}
      >
        <div
          className='sk-assignment-grade-editing'
        >
          <input onKeyDown={handleKeyDown} style={{color: props.assignment.grade === null ? color : null}} autoFocus value={grade} onChange={(e) => setGrade(e.target.value)} /><div className='percent'>%</div>
        </div>
      </OutsideClickHandler>
    )
  }

  return (
    <div
      className='sk-assignment-grade'
      style={color
        ? {
          borderColor: color, color: props.assignment.grade ? 'white' : color, backgroundColor: props.assignment.grade ? color : null
        }
        : {}
      }
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
          ? (Math.round(props.assignment.grade * 10) / 10 + '%')
          : '–'
      }
    </div>
  )
}

Grade.propTypes = {
  color: PropTypes.string,
  assignment: PropTypes.object,
  editAssignment: PropTypes.func
}

export default function Assignment (props) {
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

  const hideButton = () => setTimeout(() => {
    setShowButton(false)
  }, 0)

  const enableEdit = (e) => {
    e.preventDefault()
    setShowEdit(true)
  }

  const onComplete = (e) => {
    e.preventDefault()
    props.onCompleteAssignment(props.assignment.id, !props.assignment.is_completed)
  }

  if (showEdit) {
    return (
      <EditAssignment close={() => {
        setShowEdit(false)
        setShowButton(false)
      }} {...props} />
    )
  } else {
    let location = useLocation()
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
              {/* <Link
                to={location.pathname + (location.pathname.endsWith('/') ? '' : '/') + 'assignments/' + props.assignment.assignment_id}
                onMouseEnter={() => enableButton()}
                onMouseLeave={() => hideButton()}
                className={'sk-assignment ' + (props.active ? 'active-assignment ' : '') + (props.assignment.is_completed ? 'completed-assignment ' : '')}
                style={color ? {borderColor: color} : {}}
              > */}
              <div
                onMouseEnter={() => enableButton()}
                onMouseLeave={() => hideButton()}
                className={'sk-assignment ' + (props.active ? 'active-assignment ' : '') + (props.assignment.is_completed ? 'completed-assignment ' : '') + (props.className && !outsideClick ? props.className + ' ' : '')}
                style={color ? {borderColor: color} : {}}
              >
                {props.assignment.grade !== undefined &&
                  <Grade color={color} {...props} />
                }
                <div className='sk-assignment-content'>
                  <div className='sk-assignment-name' style={color ? {color} : {}}>{props.assignment.name}</div>
                  <div className={props.assignment.due ? 'sk-assignment-due' : 'sk-assignment-missing'}>{formatDueDate(props.assignment.due)}</div>
                </div>
                <Flipper spring={'stiff'} flipKey={showButton + editExited} className='sk-assignment-controls'>
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
                      <div onClick={enableEdit} className='sk-assignment-edit-button'>
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
                      <div style={{
                        transform: (props.assignment.is_completed
                          ? showButton
                            ? 'translateY(0)'
                            : 'translateY(0)'
                          : null),
                        backgroundColor: (props.assignment.is_completed
                          ? '#57B9E4'
                          : null)
                      }} onMouseEnter={() => setShowCheck(true)} onMouseLeave={() => setShowCheck(false)} onClick={onComplete} className='sk-assignment-complete-button'>
                        <div className='sk-assignment-complete'>
                          {(showCheck && !props.assignment.is_completed) && <CheckIcon fill={'#57B9E4'} />}
                          {(props.assignment.is_completed) && <CheckIcon fill={'#FFFFFF'} />}
                        </div>
                      </div>
                    </CSSTransition>
                  </Flipped>
                </Flipper>
              </div>
              {/* </Link> */}
            </CSSTransition>
          </Flipped>
        </OutsideClickHandler>
      </VisibilitySensor>
    )
  }
}

Assignment.propTypes = {
  onCompleteAssignment: PropTypes.func,
  assignment: PropTypes.object,
  color: PropTypes.string,
  active: PropTypes.bool,
  registerVisibleAssignment: PropTypes.func
}
