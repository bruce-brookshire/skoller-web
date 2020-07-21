import React from 'react'
import PropTypes from 'prop-types'
import { Flipped } from 'react-flip-toolkit'
import { CSSTransition } from 'react-transition-group'
import Exit from '../../../../assets/sk-icons/navigation/Exit'
import SkSelect from '../../../components/SkSelect'
import DatePicker from '../../../components/DatePicker'
import moment from 'moment'

export default function EditAssignment (props) {
  const [show, setShow] = React.useState(false)
  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [name, setName] = React.useState(props.assignment.name)
  const [due, setDue] = React.useState(props.assignment.due)
  const [weightId, setWeightId] = React.useState(props.assignment.weight_id)
  const color = props.color ? '#' + props.color : null

  React.useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Flipped flipId={props.assignment.assignment_id + 'edit'} animateEnteringElements >
      <CSSTransition
        key={1}
        in={show}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames="fade"
      >
        <div className='sk-assignment-edit-container'>
          <div className='sk-assignment-edit'>
            <div onClick={() => props.close()} className='sk-assignment-edit-close'>
              <div><Exit /></div>
            </div>
            <div className='sk-assignment-edit-form-item'>
              <label>Name</label>
              <input className='name' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='sk-assignment-edit-form-item'>
              <label>Due date</label>
              <input className='date' readOnly onClick={() => setShowDatePicker(true)} value={moment(due).format('MMMM DD, YYYY')} />
              {showDatePicker && <DatePicker
                givenDate={due}
                close={() => setShowDatePicker(false)}
                returnSelectedDay={(d) => {
                  setShowDatePicker(false)
                  setDue(d)
                }}
              />}
            </div>
            <div className='sk-assignment-edit-form-item'>
              <label>Weight</label>
              <SkSelect selection={'ok'} optionsMap={() => ['weight'].map(w => <div className='sk-select-option' key={1}>{w}</div>)} />
            </div>
            <div className='sk-assignment-edit-save si-button'>
              <p onClick={() => props.close()}>Save</p>
            </div>
          </div>
        </div>
      </CSSTransition>
    </Flipped>
  )
}

EditAssignment.propTypes = {
  createAssignment: PropTypes.func,
  editAssignment: PropTypes.func,
  assignment: PropTypes.object,
  color: PropTypes.string,
  close: PropTypes.func,
  scrollTop: PropTypes.number
}
