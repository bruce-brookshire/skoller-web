import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import PropTypes from 'prop-types'

class SyllabusOverload extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: this.props.school ? false : true,
      status: this.props.school ? this.props.school.admin_syllabus_overload : null
    }

    this.getSettings()
  }

  getSettings () {
    if (this.props.school) {
      console.log(this.props.school.admin_syllabus_overload)
      this.setState({loading: false, status: this.props.school.admin_syllabus_overload})
    } else {
      actions.settings.getAdminSettings()
        .then(r => {
          this.setState({loading: false, status: r.value === 'true'})
        })
        .catch(r => {
          console.log(r)
        })
    }
  }

  changeStatus (bool) {
    this.setState({loading: true})
    actions.settings.setSyllabusOverloadSettings(bool)
      .then(r => {
        this.setState({status: r.value === 'true', loading: false})
      })
  }

  changeSchoolStatus (bool) {
    this.setState({loading: true})
    let form = {
      id: this.props.school.id,
      admin_syllabus_overload: bool
    }
    console.log(form)
    actions.schools.updateSchool(form)
      .then(r => {
        console.log(r.admin_syllabus_overload)
        this.setState({status: r.admin_syllabus_overload, loading: false})
      })
  }

  renderCardContent () {
    return (
      <div>
        <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <label>On</label>
            <input type='radio' value='on' checked={this.state.status} onChange={() => this.changeStatus(true)} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <label>Off</label>
            <input type='radio' value='off' checked={!this.state.status} onChange={() => this.changeStatus(false)} />
          </div>
        </form>
      </div>
    )
  }

  renderSchoolContent () {
    return (
      <div>
        <form style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <label>On</label>
            <input type='radio' value='on' checked={this.state.status} onChange={() => this.changeSchoolStatus(true)} />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <label>Off</label>
            <input type='radio' value='off' checked={!this.state.status} onChange={() => this.changeSchoolStatus(false)} />
          </div>
        </form>
      </div>
    )
  }

  render () {
    const {loading} = this.state
    if (this.props.school) {
      return loading ? <p>loading...</p> : this.renderSchoolContent()
    } else {
      return (
        <Card
          title='Syllabus Overload'
          content={loading ? <p>loading...</p> : this.renderCardContent()}
        />
      )
    }
  }
}

SyllabusOverload.propTypes = {
  rootStore: PropTypes.bool,
  school: PropTypes.object
}

export default SyllabusOverload
