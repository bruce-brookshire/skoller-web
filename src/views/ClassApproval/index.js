import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../components/Loading'
import FlexTable from '../../components/FlexTable'
import ProfessorInfo from '../components/ClassEditor/Professor/ProfessorInfo'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import {mapProfessor} from '../../utilities/display'
import {mapTimeToDisplay} from '../../utilities/time'
import actions from '../../actions'
import stores from '../../stores'

const {navbarStore} = stores
const headers = [
  {
    field: 'field',
    display: 'Field'
  },
  {
    field: 'value',
    display: 'Value'
  },
]
const professorClassesHeaders = [
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
]

@inject('rootStore') @observer
class ClassApproval extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

  /*
  * Fetch the documents for a class.
  * Lock the class.
  */
  componentWillMount () {
    this.intializeComponent()
  }

  componentWillUnmount () {
  }

  /*
  * Intialize the component
  */
  intializeComponent () {
    this.setState(this.initializeState())
    this.getClasses()
  }

  /*
  * Initialize state
  */
  initializeState () {
    const {state} = this.props.location
    navbarStore.cl = null
    return {
      approving: false,
      isAdmin: state.isAdmin || false,
      isSW: state.isSW || false,
      loadingClass: true,
      loadingProfessorClasses: true,
      locks: [],
      professorClasses: [],
    }
  }

  ////////////////////////////
  ///////// ACTIONS //////////
  ////////////////////////////

  /*
  * Fetch the class by id.
  */
  getClasses () {
    const {params: {classId}} = this.props
    actions.classes.getClassById(classId).then((cl) => {
      navbarStore.cl = cl
      this.setState({loadingClass: false})
      // // Get this professor's other classes (if professor exists)
      cl.professor && cl.school ? this.getProfessorClasses(cl.professor,cl.school) : null
    }).catch((error) => {  this.setState({loadingClass: false}) })
  }

  /*
  * Fetch the rest of the classes for this professor
  */
  getProfessorClasses (professor,school) {
    actions.documents.getProfessorClasses(professor,school).then((classes) => {
      let filteredClasses = classes.filter((c) => c.id != navbarStore.cl.id)
      this.setState({loadingProfessorClasses: false,professorClasses:filteredClasses})
    }).catch(() => { this.setState({loadingClass: false}) })
  }

  /*
  * Approve the given class
  */
  onApprove (cl) {
    actions.classes.approveClass(cl).then((cl) => {
      navbarStore.cl = cl
      this.navigateToNeedsApproval()
    })
  }

  /*
  * Reject the given class
  */
  onDeny() {
    actions.classes.deleteClass(cl).then((cl) => {
      navbarStore.cl = null
      this.navigateToNeedsApproval()
    })
  }

  ////////////////////////////
  ///////// METHODS //////////
  ////////////////////////////

  /*
  * Fields to be shown in class info table
  *
  * @return [Array]. Array of class fielda data.
  */
  classFields() {
    return ['number','name','meet_start_time','meet_end_time','meet_days','length'].map((field) => {
      let formattedField = field.replace(/_/g,' ')
      let fieldName = formattedField.charAt(0).toUpperCase() + formattedField.slice(1)
      let val = field == 'meet_start_time' || field == 'meet_end_time' ? (
        mapTimeToDisplay(navbarStore.cl[field])) : navbarStore.cl[field]
      return {field: fieldName, value: val}
    })
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    if(navbarStore.cl){
      let fields = this.classFields()
      console.log(fields)
      return fields.map((item,index) => {
        return this.mapRow(item, index)
      })
    }else{
      return null
    }
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {field, value} = item

    const row = {
      field: field || '-',
      value: value || '-',
    }

    return row
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getProfessorClassesRows () {
    return this.state.professorClasses.map((item, index) =>
      this.mapProfessorClassesRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapProfessorClassesRow (item, index) {
    const {id, number, name, professor, meet_days, meet_start_time, length} = item

    const row = {
      id: id || '',
      courseNumber: number || '-',
      name: name || '-',
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: meet_days || 'TBA',
      beginTime: meet_start_time ? mapTimeToDisplay(meet_start_time) : 'TBA',
      classLength: length || 'TBA',
    }

    return row
  }

  navigateToNeedsApproval() {
    browserHistory.push({
      pathname: '/hub/classes',
      state: {
        needsApproval: true
      }
    })
  }

  ////////////////////////////
  ///////// RENDERS //////////
  ////////////////////////////

  renderActions() {
    return null
  }

  renderClassInfo() {
    return navbarStore.cl ? (
      <div style={{background:'#e8f3fd',border:'2px solid rgb(160, 160, 160)',borderRadius:'5px',padding: '25px'}}>
        <FlexTable
          className='cn-add-class-grid margin-top margin-bottom'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canSelect={false}
          emptyMessage={<div className='empty-message margin-top'>Could not get class info.</div>}
        />
      </div>
    ) : null
  }

  renderContent() {
    return  (
      <div className='cn-body-content row' style={{paddingLeft: '25px', paddingRight: '25px'}}>
        <div className='col-xs-12 col-sm-6'>
          <h6>Class Info</h6>
          {this.renderClassInfo()}
          <button
            className='button full-width margin-top'
            onClick={() => this.onApprove(navbarStore.cl)}>
            Approve
          </button>
          <button
            className='button-invert full-width margin-top'
            onClick={() => this.onDeny(navbarStore.cl)}>
            Deny
          </button>
        </div>
        <div className='col-xs-12 col-sm-6'>
          {this.renderProfessorInfo()}
          {this.renderProfessorClassesTable()}
        </div>
      </div>
    )
  }

  renderHeader() {
    return (<h3 className='center-text' style={{marginBottom: 0,marginTop: '5px'}}>Approve Class</h3>)
  }

  renderProfessorClassesTable() {
    return this.state.professorClasses.length > 0 ? (
      <FlexTable
        className='cn-add-class-grid margin-top margin-bottom'
        headers={headers}
        rows={this.getProfessorClassesRows()}
        disabled={true}
        canSelect={false}
        emptyMessage={<div className='empty-message margin-top'>We currently have no courses on record for that professor.</div>}
      />
    ) : (<h5>No other classes in the system for this professor</h5>)
  }

  renderProfessorInfo() {
    return navbarStore.cl && navbarStore.cl.professor ? (
      <div>
        <h6>Professor Info</h6>
        <ProfessorInfo disableEdit={true}
                       professor={navbarStore.cl.professor}
                       onEditProfessor={() => console.log('edit')}
                       onRemoveProfessor={() => console.log('remove')} />
      </div>
    ) : (<h5>Could not get professor info</h5>)
  }

  render () {
    return (
      <div className='cn-class-approval-container'>
        <div className='cn-body-container'>
          <div className='cn-body-header'>
            {this.renderHeader()}
          </div>
          <div className='cn-body-control'>
            {this.renderContent()}
          </div>
          <div className='cn-body-footer'>
            {this.renderActions()}
          </div>
        </div>
      </div>
    )
  }
}

export default ClassApproval
