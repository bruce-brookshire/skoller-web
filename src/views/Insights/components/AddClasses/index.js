import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import FindAClass from '../../../Student/Onboard/FindAClass'
import actions from '../../../../actions'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import { showSnackbar } from '../../../../utilities/snackbar'

const FindSchool = (props) => {
  const [query, setQuery] = React.useState('')
  const [schools, setSchools] = React.useState([])
  const [queryId, setQueryId] = React.useState(0)
  const search = (id) => {
    actions.schools.searchSchools(query)
      .then(r => {
        if (id === queryId) {
          setSchools(r)
        }
      })
  }

  return (
    <div className='si-add-classes-school'>
      <h1>Search for a school</h1>
      <input style={{width: '100%'}} value={query} placeholder={'Search for a school'} onChange={(e) => {
        setQuery(e.target.value)
        setQueryId(queryId + 1)
        search(queryId)
      }} />
      <div style={{height: '256px', overflow: 'auto', border: '1px solid lightgray', borderRadius: '5px'}}>{schools.length > 0 &&
        schools.map(s => {
          return (
            <div onClick={() => props.onSubmit(s)} style={{cursor: 'pointer', color: '#57B9E4', padding: '4px', borderBottom: '1px solid lightgray'}} key={s.id}>
              <div style={{color: s.color}} className='school-name'>{s.name}</div>
              <div className='school-loc'>{s.adr_locality}, {s.adr_region}</div>
            </div>
          )
        })
      }</div>
    </div>
  )
}

FindSchool.propTypes = {
  onSubmit: PropTypes.func
}

const FindPeriod = (props) => {
  let periods = props.school.periods || props.school.class_periods
  if (!periods) return null

  periods = periods.sort((a, b) => moment(a.start_date).isBefore(moment(b.start_date)) ? 1 : -1).filter(p => moment(p.end_date).isAfter(moment()))
  return (
    <div className='si-add-classes-period'>
      <div className='row'>
        <h1 style={{color: props.school.color}}>{props.school.name}</h1>
        <p className='edit' onClick={() => props.editSchool()}>Change school</p>
      </div>
      <h2>Select a period</h2>
      <div style={{height: '256px', overflow: 'auto', border: '1px solid lightgray', borderRadius: '5px'}}>{periods.map(s => {
        return (
          <div onClick={() => props.onSelectPeriod(s)} className='period' style={{borderBottom: '1px solid lightgray'}} key={s.id}>
            <div className='period-name'>{s.name}</div>
            <div className='period-dates'>{moment(s.start_date).format('MMMM YYYY')} - {moment(s.end_date).format('MMMM YYYY')}</div>
          </div>
        )
      })
      }</div>
    </div>
  )
}

FindPeriod.propTypes = {
  school: PropTypes.object,
  onSelectPeriod: PropTypes.func,
  editSchool: PropTypes.func
}

@inject('rootStore') @observer
class AddClasses extends Component {
  constructor (props) {
    super(props)

    let period = null
    let form
    if (this.props.rootStore.insightsStore.org.school) {
      let school = this.props.rootStore.insightsStore.org.school
      let periods = (school.class_periods || school.periods).map(p => {
        return {...p, endDaysAway: moment().diff(moment(p.end_date), 'days')}
      })
      if (!periods || periods.length === 0) {
        form = 'period'
      }
      let viablePeriods = periods.filter(p => p.endDaysAway < 0)
      if (viablePeriods.length > 0) {
        let periodEndDaysAway = viablePeriods.reduce((max, p) => p.endDaysAway > max ? p.endDaysAway : max, viablePeriods[0].endDaysAway)
        period = viablePeriods.find(p => p.endDaysAway === periodEndDaysAway)
        form = 'search'
      } else {
        form = 'period'
      }
    } else {
      form = 'school'
    }

    this.state = {
      show: this.props.autoShow,
      school: this.props.rootStore.insightsStore.org.school,
      form,
      period
    }
  }

  onClickButton () {
    let location = this.props.location.pathname
    let state = {
      autoShowAddClasses: true
    }
    let lastItem = location.split('/')[location.split('/').length - 1]
    if (parseInt(lastItem)) {
      this.setState({show: true})
    } else {
      if (this.props.user.isInvitation) {
        this.props.history.push({
          pathname: ('/insights/invitations/' + this.props.user.id),
          state
        })
      } else {
        this.props.history.push({pathname: ('/insights/students/' + this.props.user.id), state})
      }
    }
  }

  renderButton () {
    if (this.props.children) {
      return (
        <div
          onClick={() => this.onClickButton()}
        >
          {this.props.children}
        </div>
      )
    }
    return <div className='si-group-student-add-classes' onClick={() => this.onClickButton()}>Add classes</div>
  }

  onSelectSchool (school) {
    actions.insights.settings.addSchoolToOrg(this.props.rootStore.insightsStore.org.id, school.id)
      .then(r => {
        console.log(r)
        showSnackbar('Set ' + r.schools[0].name + ' as primary school', 'success')
      })
    let period
    let form
    if (school) {
      let periods = this.props.rootStore.insightsStore.org.school.class_periods.map(p => {
        return {...p, endDaysAway: moment().diff(moment(p.end_date), 'days')}
      })
      if (!periods || periods.length === 0) {
        form = 'period'
      }
      let viablePeriods = periods.filter(p => p.endDaysAway < 0)
      if (viablePeriods.length > 0) {
        let periodEndDaysAway = viablePeriods.reduce((max, p) => p.endDaysAway > max ? p.endDaysAway : max, viablePeriods[0].endDaysAway)
        period = viablePeriods.find(p => p.endDaysAway === periodEndDaysAway)
        form = 'search'
      } else {
        form = 'period'
      }
    } else {
      form = 'school'
    }
    this.setState({form, school, period})
  }

  onSelectPeriod (p) {
    this.setState({form: 'search', period: p})
  }

  onEnroll (id) {
    const user = this.props.user

    if (user.isInvitation) {
      let form = {
        class_ids: [...user.class_ids, id]
      }
      actions.insights.invitations.editInvitation(this.props.rootStore.insightsStore.org.id, user.id, form)
        .then(async (invitation) => {
          await this.props.rootStore.insightsStore.refreshInvitation(invitation)
          this.setState({show: false, form: 'search'})
        })
    } else {
      actions.insights.students.enrollInClass(id, this.props.user.student_id)
        .then(async (r) => {
          await this.props.rootStore.insightsStore.updateStudent(this.props.user.id)
          this.setState({show: false, form: 'search'})
        })
    }
  }

  renderModal () {
    return (
      <SkModal disableOutsideClick closeModal={() => this.setState({show: false})}>
        <div className='si-add-classes'>
          {this.state.form === 'school' && <FindSchool onSubmit={(school) => this.onSelectSchool(school)} />}
          {this.state.form === 'period' && <FindPeriod editSchool={() => this.setState({form: 'school'})} school={this.state.school} onSelectPeriod={(p) => this.onSelectPeriod(p)} />}
          {this.state.form === 'search' && this.state.period && <FindAClass
            hideOnboard={true}
            onBack={() => this.setState({form: 'period'})}
            params={{
              termChoice: this.state.period,
              schoolChoice: this.state.school
            }}
            onSubmit={() => null}
            launchClassStatusModal={(cl) => null}
            altEnroll={(id) => this.onEnroll(id)}
          />}
          {this.state.form === 'confirm' && this.renderConfirm()}
        </div>
      </SkModal>
    )
  }

  render () {
    return (
      <React.Fragment>
        {this.renderButton()}
        {this.state.show && this.renderModal()}
      </React.Fragment>
    )
  }
}

AddClasses.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object,
  rootStore: PropTypes.object,
  autoShow: PropTypes.bool,
  history: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(AddClasses)
