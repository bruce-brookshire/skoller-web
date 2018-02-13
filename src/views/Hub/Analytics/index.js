import React from 'react'
import PropTypes from 'prop-types'
import SelectField from '../../../components/Form/SelectField'
import Loading from '../../../components/Loading'
import FlexTable from '../../../components/FlexTable'
import ProfessorInfo from '../../components/ClassEditor/Professor/ProfessorInfo'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'
import actions from '../../../actions'
import stores from '../../../stores'

const {navbarStore} = stores

@inject('rootStore') @observer
class Analytics extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

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
    this.getSchools()
  }

  /*
  * Initialize state
  */
  initializeState () {
    const {state} = this.props.location
    navbarStore.cl = null
    return {
      audience: null,
      loading: false,
      queryString: '',
      schools: [],
    }
  }

  ////////////////////////////
  ///////// ACTIONS //////////
  ////////////////////////////

  /*
  * Fetch schools
  */
  getSchools () {
    this.setState({loading:true})
    actions.schools.getAllSchools().then(schools => {
      this.setState({schools,loading:false})
    }).catch(() => false)
  }

  ////////////////////////////
  ///////// METHODS //////////
  ////////////////////////////

  selectAudienceOptions() {
    let arr = [{value:'allSchools',name:'All Schools'}]
    this.state.schools.forEach(school => {
      arr.push({value: school.id, name: school.name})
    })
    return arr
  }

  ////////////////////////////
  ///////// RENDER ///////////
  ////////////////////////////

  renderSelectAudience() {
    return (
      <div className='select-audience-container col-xs-4'>
        <h3 className='center-text cn-blue'>Select Audience</h3>
        <SelectField
          label=""
          name="select_audience"
          onChange={(name,value) => this.setState({audience: value})}
          options={this.selectAudienceOptions()}
          value={this.state.audience}
        />
      </div>
    )
  }

  renderSelectCategory() {
    return null
  }

  renderSelectDates() {
    return null
  }

  renderGeneralResults() {
    return null
  }

  renderCustomResults() {
    return null
  }

  render () {
    return (
      <div className='cn-analytics-container'>
        <h2 className='center-text'>Skoller Analytics</h2>
        <div classname='analytics-filters row'>
          {this.renderSelectAudience()}
          {this.renderSelectDates()}
          {this.renderSelectCategory()}
        </div>
        <div classname='analytics-results row'>
          {this.renderGeneralResults()}
          {this.renderCustomResults()}
        </div>
      </div>
    )
  }
}

export default Analytics
