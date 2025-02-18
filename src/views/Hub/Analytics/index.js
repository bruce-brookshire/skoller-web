import React from 'react'
import PropTypes from 'prop-types'
import DateRangeField from '../../../components/Form/DateRangeField'
import PillField from '../../../components/Form/PillField'
import SelectField from '../../../components/Form/SelectField'
import {inject, observer} from 'mobx-react'
import {formatDate} from '../../../utilities/time'
import actions from '../../../actions'
import AssignmentInfo from './AssignmentInfo'
import ChatAnalytics from './ChatAnalytics'
import GradeEntry from './GradeEntry'
import Notifications from './Notifications'
import SyllabiProcessing from './SyllabiProcessing'
import Updates from './Updates'

@inject('rootStore') @observer
class Analytics extends React.Component {
  constructor (props) {
    super(props)
    this.categories = ['Advertising', 'Syllabi Processing', 'Assignment Info', 'Updates', 'Chat', 'Notifications',
      'Grade Entry', 'Reviews and More']
    this.generalFields = ['Accounts (active)', 'Daily active users', 'Monthly active users', 'Sessions',
      'Time per visit (avg.)', 'Screen views']
    this.state = this.initializeState()
  }

  componentWillMount () {
    this.intializeComponent()
  }

  componentWillUnmount () {
    let {navbarStore} = this.props.rootStore
    navbarStore.title = ''
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
    let {navbarStore} = this.props.rootStore
    navbarStore.cl = null
    navbarStore.title = 'Skoller Analytics'
    return {
      audience: 'allSchools',
      category: 'Advertising',
      loading: false,
      maxDate: '',
      minDate: '',
      schools: [],
      data: null
    }
  }

  /*
  * Fetch schools
  */
  getSchools () {
    this.setState({loading: true})
    actions.schools.getAllSchools().then(schools => {
      this.setState({schools, loading: false})
    }).catch(() => false)
  }

  getAnalytics (minDate, maxDate, audience) {
    if (minDate && maxDate && minDate !== '' && maxDate !== '') {
      let queryString = `date_start=${minDate}&date_end=${maxDate}`
      if (audience !== 'allSchools') {
        queryString = queryString + `&school_id=${audience}`
      }
      actions.analytics.getAnalytics(queryString).then((data) => {
        this.setState({data: data})
      })
    }
  }

  getAudienceName () {
    let found = this.selectAudienceOptions().find((a) => a.value === this.state.audience)
    return found.name
  }

  selectAudienceOptions () {
    let arr = [{value: 'allSchools', name: 'All Schools'}]
    this.state.schools.forEach(school => {
      arr.push({value: school.id, name: school.name})
    })
    return arr
  }

  updateAudience (value) {
    const {minDate, maxDate} = this.state
    this.setState({audience: value})
    this.getAnalytics(minDate, maxDate, value)
  }

  updateDates (value) {
    const {audience} = this.state
    this.setState({maxDate: value.max, minDate: value.min})
    this.getAnalytics(value.min, value.max, audience)
  }

  renderAudienceStats () {
    return (
      <div className='audience-stats'>
        <h5 style={{marginBottom: '5px', marginTop: '10px'}}>{`# of Schools Selected: ${this.state.audience === 'allSchools' ? this.state.schools.length : 1}`}</h5>
        <h5 style={{marginBottom: '5px', marginTop: '5px'}}>{`Total Available Market: N/A`}</h5>
      </div>
    )
  }

  renderSelectAudience () {
    return (
      <div className='analytics-section select-audience-container col-xs-12 col-sm-4'>
        <h3 className='center-text cn-blue'>Select Audience</h3>
        <SelectField
          label=""
          name="select_audience"
          onChange={(name, value) => this.updateAudience(value)}
          options={this.selectAudienceOptions()}
          value={this.state.audience}
        />
        {this.state.audience ? this.renderAudienceStats() : null}
      </div>
    )
  }

  renderCategories () {
    return this.categories.map((c) => {
      return <PillField key={c} label={c} value={this.state.category} onClick={(newVal) => this.setState({category: newVal})} />
    })
  }

  renderSelectCategory () {
    return (
      <div className='analytics-section select-category-container col-xs-12 col-sm-4 row'>
        <h3 className='center-text cn-blue full-width'>Select Custom Category</h3>
        {this.renderCategories()}
      </div>
    )
  }

  renderDaysInRange () {
    let days = (Date.parse(this.state.maxDate) - Date.parse(this.state.minDate)) / (1000 * 60 * 60 * 24)
    let weeks = (days / 7).toFixed(1)
    return (
      <h5 className='daysInRange center-text'>
        {`${days} days (${weeks} weeks)`}
      </h5>
    )
  }

  renderSelectDates () {
    return (
      <div className='analytics-section select-date-container col-xs-12 col-sm-4'>
        <h3 className='center-text cn-blue full-width'>Select Date Range</h3>
        <DateRangeField
          label=""
          onChange={(name, value) => {
            this.updateDates(value)
          }}
          value={{max: this.state.maxDate, min: this.state.minDate}}
          name="dates"
        />
        {this.state.maxDate && this.state.minDate ? this.renderDaysInRange() : null}
      </div>
    )
  }

  renderGeneralResultFields () {
    return this.generalFields.map((f, idx) => {
      return (
        <li key={idx}>
          <i className='fa fa-info general-field-info-icon'></i>
          <strong>{`${f}: `}</strong>
          <span>NA</span>
        </li>
      )
    })
  }

  renderGeneralResults () {
    return (
      <div className='col-xs-12 col-sm-5'>
        <h3 className='center-text cn-blue full-width'>General</h3>
        <ul style={{listStyle: 'none'}}>
          {this.state.audience ? this.renderGeneralResultFields() : (
            <h5 className='center-text'>Please select an audience to view its stats</h5>
          )}
        </ul>
      </div>
    )
  }

  renderCustomResultsContent () {
    switch (this.state.category) {
      case 'Advertising':
        return null
      case 'Syllabi Processing':
        // return <SyllabiProcessing audience={this.state.audience} max={this.state.maxDate} min={this.state.minDate}/>
        return <SyllabiProcessing data={this.state.data}/>
      case 'Assignment Info':
        // return <AssignmentInfo audience={this.state.audience} max={this.state.maxDate} min={this.state.minDate}/>
        return <AssignmentInfo data={this.state.data}/>
      case 'Updates':
        // return <Updates audience={this.state.audience} max={this.state.maxDate} min={this.state.minDate}/>
        return <Updates data={this.state.data}/>
      case 'Chat':
        // return <ChatAnalytics audience={this.state.audience} max={this.state.maxDate} min={this.state.minDate}/>
        return <ChatAnalytics data={this.state.data}/>
      case 'Notifications':
        // return <Notifications audience={this.state.audience} max={this.state.maxDate} min={this.state.minDate}/>
        return <Notifications data={this.state.data}/>
      case 'Grade Entry':
        // return <GradeEntry audience={this.state.audience} max={this.state.maxDate} min={this.state.minDate}/>
        return <GradeEntry data={this.state.data}/>
      case 'Reviews and More':
        return null
      default:
    }
  }

  renderCustomResults () {
    return (
      <div className='col-xs-12 col-sm-7'>
        {this.state.category ? this.renderSearchCategory() : null}
        {this.state.data && this.renderCustomResultsContent()}
      </div>
    )
  }

  renderSearchCategory () {
    return (
      <h3 className='center-text cn-blue full-width'>
        {this.state.category}
      </h3>
    )
  }

  renderSearchAudience () {
    return (
      <h5 className='center-text' style={{marginBottom: '1px', marginTop: '1px'}}>
        {this.getAudienceName()}
        {this.state.minDate && this.state.maxDate ? (
          <span>{` (${formatDate(this.state.minDate)} through ${formatDate(this.state.maxDate)})`}</span>
        ) : null}
      </h5>
    )
  }

  render () {
    return (
      <div className='cn-analytics-container'>
        <div className='analytics-filters row'>
          {this.renderSelectAudience()}
          {this.renderSelectDates()}
          {this.renderSelectCategory()}
        </div>
        <hr/>
        <div>
          {this.state.audience ? this.renderSearchAudience() : null}
        </div>
        <div className='analytics-results row'>
          {this.renderGeneralResults()}
          {this.renderCustomResults()}
        </div>
      </div>
    )
  }
}

Analytics.propTypes = {
  rootStore: PropTypes.object
}

export default Analytics
