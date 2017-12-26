import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import FlexTable from '../../../components/FlexTable'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'
import actions from '../../../actions'
import {mapProfessor} from '../../../utilities/display'

const headers = [
  {
    field: 'courseNumber',
    display: 'Class Number'
  },
  {
    field: 'name',
    display: 'Class Name'
  },
  {
    field: 'professor',
    display: 'Professor'
  },
  {
    field: 'days',
    display: 'Days'
  },
  {
    field: 'beginTime',
    display: 'Start Time'
  },
  {
    field: 'classLength',
    display: 'Term Length'
  },
  {
    field: 'enroll',
    display: ''
  }
]

const requiredFields = {
  'number': {
    type: 'required'
  },
  'name': {
    type: 'required'
  },
  'meet_days': {
    type: 'required'
  },
  'meet_start_time': {
    type: 'required'
  },
  'meet_end_time': {
    type: 'required'
  }
}

class ClassForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch all the classes for selected professor in order to see if class already
  * exists.
  */
  componentWillMount () {
    actions.classes.getProfessorClasses(this.props.professor).then(classes => {
      this.setState({classes})
    }).catch(() => false)
  }

  /*
  * Intitialize state.
  */
  initializeState () {
    return {
      classes: [],
      form: this.initializeFormData()
    }
  }

  /*
  * Intitialize form data.
  * Class form data.
  */
  initializeFormData () {
    return {
      number: '',
      name: '',
      meet_days: '',
      meet_start_time: '',
      meet_end_time: '',
      professor_id: this.props.professor.id
    }
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.classes.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, number, name, professor, meet_days, meet_start_time, length} = item

    const row = {
      id: id || '',
      courseNumber: number || '-',
      name: name || '-',
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: meet_days || 'TBA',
      beginTime: meet_start_time || 'TBA',
      classLength: length || 'TBA',
      enroll: <a onClick={() => this.onEnroll(item)}>Enroll</a>
    }

    return row
  }

  /*
  * If does not exist, create class and enroll user in class.
  */
  onSubmit () {
    if (this.props.validateForm(this.state.form, requiredFields)) {
      actions.classes.createClass(this.state.form).then((cl) => {
        this.props.onSubmit(cl)
      }).catch(() => false)
    }
  }

  /*
  * If class exists, enroll user in class.
  */
  onEnroll (cl) {
    this.props.onSubmit(cl)
  }

  render () {
    const {form} = this.state
    const {formErrors, professor, updateProperty} = this.props

    return (
      <div className='cn-add-class-container margin-top'>
        <h5>Who teaches this class?</h5>
        <span className='info margin-bottom'>{mapProfessor(professor)}</span>
        <h5>Make sure you are not creating a duplicate class!</h5>
        <span className='info margin-bottom'>{mapProfessor(professor)} has {this.state.classes.length} classes</span>
        <FlexTable
          className='cn-add-class-grid margin-top margin-bottom'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canSelect={false}
          emptyMessage={<div className='empty-message margin-top'>We currently have no courses on record for that professor.</div>}
        />
        <div className='margin-top'>
          <h5>Add new class</h5>
          <div className='row'>
            <div className='col-xs-12 col-md-2 col-lg-2'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.name}
                label='Class name'
                name='name'
                onChange={updateProperty}
                placeholder='i.e. Math 101'
                value={form.name}
              />
            </div>
            <div className='col-xs-12 col-md-2 col-lg-2'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.number}
                label='Course Number'
                name='number'
                onChange={updateProperty}
                placeholder='i.e. MTH 1002.01'
                value={form.number}
              />
            </div>
            <div className='col-xs-12 col-md-2 col-lg-2'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.meet_days}
                label='Meet days'
                name='meet_days'
                onChange={updateProperty}
                placeholder='i.e. MWF'
                value={form.meet_days}
              />
            </div>
            <div className='col-xs-12 col-md-2 col-lg-2'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.meet_start_time}
                label='Meet start time'
                name='meet_start_time'
                onChange={updateProperty}
                placeholder='i.e. 9:00am'
                value={form.meet_start_time}
              />
            </div>
            <div className='col-xs-12 col-md-2 col-lg-2'>
              <InputField
                containerClassName='margin-top'
                error={formErrors.meet_end_time}
                label='Meet end time'
                name='meet_end_time'
                onChange={updateProperty}
                placeholder='i.e. 10:00am'
                value={form.meet_end_time}
              />
            </div>
            <div className='col-xs-12 col-md-2 col-lg-2' style={{alignSelf: 'flex-end'}}>
              <button className='button full-width margin-top' style={{height: '32px', padding: 0}} onClick={this.onSubmit.bind(this)}>Add class</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ClassForm.propTypes = {
  formErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  professor: PropTypes.object,
  updateProperty: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(ClassForm, 'form'))
