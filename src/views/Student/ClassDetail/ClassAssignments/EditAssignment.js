import React from 'react'
import PropTypes from 'prop-types'
import { Flipped } from 'react-flip-toolkit'
import { CSSTransition } from 'react-transition-group'
// import Exit from '../../../../assets/sk-icons/navigation/Exit'
import SkSelect from '../../../components/SkSelect'
import DatePicker from '../../../components/DatePicker'
import moment from 'moment'
import SiToggle from '../../../Insights/components/forms/SiToggle'
import OutsideClickHandler from 'react-outside-click-handler'

export default function EditAssignment (props) {
  const [show, setShow] = React.useState(false)
  const [showDatePicker, setShowDatePicker] = React.useState(false)
  const [name, setName] = React.useState(props.assignment.name)
  const [due, setDue] = React.useState(props.assignment.due)
  const [weightId, setWeightId] = React.useState(props.assignment.weight_id)
  const [isPrivate, setIsPrivate] = React.useState(false)

  React.useEffect(() => {
    setShow(true)
  }, [])

  const onDelete = () => {
    props.onDeleteAssignment(props.assignment.id)
    props.close()
  }

  const onSave = () => {
    let form = {
      due,
      weight_id: weightId,
      name,
      grade: false
    }
    props.editAssignment(form, props.assignment.id, isPrivate)
    props.close()
  }

  const renderWeights = () => {
    const weights = props.cl.weights
    const selectedWeight = weights.find(w => w.id === weightId)

    return <SkSelect
      hideCarrot
      selection={selectedWeight ? selectedWeight.name : 'Not graded'}
      optionsMap={() => weights.map(w => {
        return (
          <div
            className='sk-select-option'
            key={w.id}
            onClick={() => setWeightId(w.id)}
          >
            {w.name}
          </div>
        )
      })}
    />
  }

  return (
    <Flipped flipId={props.assignment.assignment_id} animateEnteringElements >
      <CSSTransition
        key={1}
        in={show}
        timeout={500}
        mountOnEnter
        unmountOnExit
        classNames="fade"
      >
        <OutsideClickHandler onOutsideClick={() => props.close()}>
          <div className='sk-assignment-edit-container'>
            <div className='sk-assignment-edit'>
              {/* <div className='sk-assignment-edit-row close'>
                <div onClick={() => props.close()} className='sk-assignment-edit-close'>
                  <div><Exit fill={'$cn-color-blue'} /></div>
                </div>
              </div> */}
              <div className='sk-assignment-edit-row'>
                <div className='sk-assignment-edit-form-item name'>
                  <label>Name</label>
                  <input className='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='sk-assignment-edit-form-item due'>
                  <label>Due date</label>
                  <input className='date' readOnly onClick={() => setShowDatePicker(true)} value={due ? moment(due).format('MM/DD/YY') : 'Add due date'} />
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
                  {renderWeights()}
                </div>
                <div className='sk-assignment-edit-save si-button'>
                  <p onClick={() => onSave()}>Save</p>
                </div>
              </div>
              <div className='sk-assignment-edit-row bottom'>
                <div className='delete-assignment' onClick={() => onDelete()}>Delete assignment</div>
                <div className='is-private-toggle'>
                  <p>Share changes with classmates</p>
                  <SiToggle checked={!isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
                </div>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
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
  scrollTop: PropTypes.number,
  cl: PropTypes.object,
  onDeleteAssignment: PropTypes.func
}
