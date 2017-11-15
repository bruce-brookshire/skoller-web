import React from 'react'
import Loading from '../../../components/Loading'
import FlexTable from '../../../components/FlexTable'
import {Form, ValidateForm} from 'react-form-library'
import {InputField, SelectField} from '../../../components/Form'

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

const class1 = {
  courseNumber: 'ECO 230',
  name: 'Economy of China',
  professor: 'Sasser',
  days: 'MWF',
  beginTime: '10:00am',
  classLength: 'Full semester'
}

const class2 = {
  courseNumber: 'ECO 2019',
  name: 'Economies of Scale',
  professor: 'Ruben',
  days: 'MWF',
  beginTime: '10:00am',
  classLength: 'Full semester'
}

const class3 = {
  courseNumber: 'ECO 1100',
  name: 'Economic Nativism',
  professor: 'Twondliedo',
  days: 'MWF',
  beginTime: '10:00am',
  classLength: 'Full semester'
}

// const classes = [class1, class2, class3,class1, class2, class3,class1, class2, class3, class1, class2, class3]
const classes = []

class ClassForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      form: this.initializeFormData()
    }
  }

  initializeFormData () {
    return {
      class_number: '',
      class_name: '',
      days: '',
      meet_time: '',
      term_length: ''
    }
  }

  onSubmit () {
    this.props.onSubmit()
  }

  onSearch (searchText) {
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return classes.map((item, index) =>
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
    const {id, courseNumber, name, professor, days, beginTime, classLength} = item

    const row = {
      id: id || '',
      courseNumber: courseNumber || '-',
      name: name || '-',
      professor: professor || 'TBA', //this.mapProfessor(professor) : 'TBA',
      days: days || 'TBA',
      beginTime: beginTime || 'TBA',
      classLength: classLength || 'TBA',
      enroll: <a onClick={() => this.onEnroll(item)}>Enroll</a>
    }

    return row
  }

  /*
  * Map the professors name to the professor.
  *
  * @param [Object] professor. Professor object.
  * @param [String] name. Name of professor.
  */
  mapProfessor (professor) {
    const {firstName, lastName} = professor
    let name = ''

    if (firstName) {
      name = firstName
    }
    if (lastName) {
      name = name ? `${name} ${lastName}` : lastName
    }

    return name || 'TBA'
  }

  onEnroll (course) {

  }

  mapProfessorName () {
    if (this.props.professor) {
      const {first_name, last_name} = this.props.professor
      let name = first_name ? `${first_name} ` : ''
      if (last_name) {
        name=`${name}${last_name}`
      }
      if (!name) name = 'TBA'
      return name
    }
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props

    return (
      <div className='cn-add-class-container margin-top'>
        <h5>Who teaches this class?</h5>
        <span className='info margin-bottom'>{this.mapProfessorName()}</span>
        <h5>Make sure you are not creating a duplicate class!</h5>
        <span className='info margin-bottom'>{this.mapProfessorName()} has {classes.length} classes</span>
        <FlexTable
          className='cn-add-class-grid margin-top margin-bottom'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canSelect={false}
          emptyMessage={<div className='empty-message margin-top'>We currently have no courses on record for that professor.</div>}
        />
        <div className='margin-top'>
          <form>
            <h5>Add new class</h5>
            <div className='row'>
              <div className='col-xs-12 col-md-2 col-lg-2'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.class_name}
                  label='Class name'
                  name='class_name'
                  onBlur={() => console.log('onBlur')}
                  onChange={updateProperty}
                  onFocus={() => console.log('onFocus')}
                  placeholder='Class name'
                  value={form.class_name}
                />
              </div>
              <div className='col-xs-12 col-md-2 col-lg-2'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.class_number}
                  label='Course Number'
                  name='class_number'
                  onBlur={() => console.log('onBlur')}
                  onChange={updateProperty}
                  onFocus={() => console.log('onFocus')}
                  placeholder='Course number'
                  value={form.class_number}
                />
              </div>
              <div className='col-xs-12 col-md-2 col-lg-2'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.meet_days}
                  label='Meet days'
                  name='meet_days'
                  onBlur={() => console.log('onBlur')}
                  onChange={updateProperty}
                  onFocus={() => console.log('onFocus')}
                  placeholder='Meet days'
                  value={form.meet_days}
                />
              </div>
              <div className='col-xs-12 col-md-2 col-lg-2'>
                <InputField
                  containerClassName='margin-top'
                  error={formErrors.meet_time}
                  label='Meet time'
                  name='meet_time'
                  onBlur={() => console.log('onBlur')}
                  onChange={updateProperty}
                  onFocus={() => console.log('onFocus')}
                  placeholder='Meet time'
                  value={form.meet_time}
                />
              </div>
              <div className='col-xs-12 col-md-2 col-lg-2'>
                <SelectField
                  containerClassName='margin-top'
                  error={formErrors.term_length}
                  label='Term length'
                  name='term_length'
                  onChange={updateProperty}
                  options={[{id: 0, name: 'Full semester'}, {id:1, name: 'Part semester'}]}
                  placeholder='Term length'
                  value={form.term_length}
                />
              </div>
              <div className='col-xs-12 col-md-2 col-lg-2' style={{alignSelf: 'flex-end'}}>
                <button className='button full-width margin-top' style={{height: '32px', padding: 0}} onClick={this.onSubmit.bind(this)}>Add class</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

ClassForm.propTypes = {

}

export default ValidateForm(Form(ClassForm, 'form'))
