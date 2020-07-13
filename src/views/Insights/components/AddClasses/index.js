import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'
import FindAClass from '../../../Student/Onboard/FindAClass'
import actions from '../../../../actions'
import { inject, observer } from 'mobx-react'
import SkCircleLoader from '../../../../assets/sk-icons/SkCircleLoader'

const FindSchool = (props) => {
  const [query, setQuery] = React.useState('')
  const [schools, setSchools] = React.useState([])
  const search = () => {
    actions.schools.searchSchools(query)
      .then(r => {
        setSchools(r)
      })
  }

  return (
    <div>
      <input style={{width: '100%', margin: '1rem 0', padding: '8px 4px'}} value={query} placeholder={'Search for a school'} onChange={(e) => {
        setQuery(e.target.value)
        search()
      }} />
      <div style={{height: '256px', overflow: 'auto', border: '1px solid lightgray', borderRadius: '5px'}}>{schools.length > 0 &&
        schools.map(s => {
          return (
            <div onClick={() => props.onSubmit(s)} style={{cursor: 'pointer', color: '#57B9E4', padding: '4px', borderBottom: '1px solid lightgray'}} key={s.id}>{s.name}</div>
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
  return (
    <div>
      <p>Select a period</p>
      <div style={{height: '256px', overflow: 'auto', border: '1px solid lightgray', borderRadius: '5px'}}>{periods.map(s => {
        return (
          <div onClick={() => props.onSelectPeriod(s)} style={{cursor: 'pointer', color: '#57B9E4', padding: '1rem 4px', borderBottom: '1px solid lightgray'}} key={s.id}>{s.name}</div>
        )
      })
      }</div>
    </div>
  )
}

FindPeriod.propTypes = {
  school: PropTypes.object,
  onSelectPeriod: PropTypes.func
}

@inject('rootStore') @observer
export default class AddClasses extends Component {
  constructor (props) {
    super(props)

    let form
    let loading
    if (this.props.rootStore.insightsStore.org.schools.length === 0) {
      loading = false
      form = 'school'
    } else {
      form = 'period'
      loading = true
    }

    this.state = {
      show: false,
      form,
      loading
    }

    this.getSchool()
  }

  getSchool () {
    let schools = this.props.rootStore.insightsStore.org.schools

    if (schools.length > 0) {
      actions.schools.getSchoolById(schools[0].id)
        .then(r => {
          this.setState({
            school: r,
            loading: false
          })
        })
    }
  }

  renderButton () {
    if (this.props.children) {
      return (
        <div
          onClick={() => this.setState({show: true})}
        >
          {this.props.children}
        </div>
      )
    }
    return <div className='si-add-classes-button si-button'>
      <p
        onClick={() => this.setState({show: true})}
      >Add classes</p>
    </div>
  }

  onSelectSchool (school) {
    actions.insights.settings.addSchoolToOrg(this.props.rootStore.insightsStore.org.id, school.id)
    this.setState({form: 'period', school})
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
        .then((r) => {
          this.props.rootStore.insightsStore.updateData()
          this.setState({show: false, form: 'search'})
        })
    } else {
      actions.insights.students.enrollInClass(id, this.props.user.student_id)
        .then((r) => {
          this.props.rootStore.insightsStore.updateData()
          this.setState({show: false, form: 'search'})
        })
    }
  }

  renderModal () {
    return (
      <SkModal closeModal={() => this.setState({show: false})}>
        <div className='si-add-classes'>
          {this.state.form === 'school' && <FindSchool onSubmit={(school) => this.onSelectSchool(school)} />}
          {this.state.form === 'period' && <FindPeriod school={this.state.school} onSelectPeriod={(p) => this.onSelectPeriod(p)} />}
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
    if (this.state.loading) return <SkCircleLoader />
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
  rootStore: PropTypes.object
}
