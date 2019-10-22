import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import actions from '../../../actions'
import { showSnackbar } from '../../../utilities/snackbar'

class AdminGradeScaleChangeRequest extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentCr: this.props.crs[0],
      deletedGrades: []
    }
  }

  componentDidMount () {
    this.setState({deletedGrades: this.getDeletedGrades()})
  }

  renderRows () {
    let changeRequestMembers = this.state.currentCr.members
    changeRequestMembers.sort((a, b) => a.member_value < b.member_value ? 1 : -1)
    return (
      this.state.currentCr.members.map(member => {
        return (
          <tr key={member.id}>
            <td>{member.member_name}</td>
            <td>{member.member_value}</td>
            <td>{this.getGrade(member.member_name) ? 'Updated' : 'New'}</td>
          </tr>
        )
      })
    )
  }

  getDeletedGrades () {
    let currentGrades = this.props.cl.grade_scale
    let deletedGradesArray = []
    let deletedGradeKeys = Object.keys(currentGrades).filter(weightKey => {
      let deleted = true
      this.state.currentCr.members.forEach(member => {
        if (member.member_name === weightKey) {
          deleted = false
        }
      })
      return deleted
    })
    deletedGradeKeys.forEach(gradeKey => {
      deletedGradesArray.push({grade: gradeKey, min: currentGrades[gradeKey]})
    })
    return deletedGradesArray
  }

  renderDeletedGrades () {
    let deletedGrades = this.getDeletedGrades()
    let i = 0
    return (
      deletedGrades.map(grade => {
        i += 1
        return (
          <tr key={i}>
            <td><s>{grade.grade}</s></td>
            <td><s>{grade.min}</s></td>
            <td>Deleted</td>
          </tr>
        )
      })
    )
  }

  renderCrOptions () {
    let i = 0
    return (
      this.props.crs.map(cr => {
        i += 1
        return (
          <option key={i} value={cr.id} title={moment(moment.utc(cr.inserted_at).toDate()).local().format('MM/DD h:mma')}>
            {cr.user.email}
          </option>
        )
      })
    )
  }

  getCr (id) {
    let cr = this.props.crs.find(cr => cr.id === parseInt(id))
    return cr
  }

  getGrade (g) {
    let gradesArray = []
    Object.keys(this.props.cl.grade_scale).forEach(gradeKey => {
      gradesArray.push({grade: gradeKey, min: this.props.cl.grade_scale[gradeKey]})
    })
    let grade = this.props.cl.grade_scale[g]
    if (grade) {
      return grade
    }
    return false
  }

  async onAccept () {
    let form = {}
    let gradeScale = {}
    this.state.currentCr.members.forEach(member => {
      gradeScale[member.member_name] = member.member_value
    })
    form['grade_scale'] = gradeScale
    await actions.gradescales.updateGradeScale(this.props.cl, form).then(() => {
      showSnackbar('Successfully adopted grade scale. Refresh page if changes have not yet appeared.', 'success', 5000)
    }).catch((r) => {
      showSnackbar('Error adopting grade scale.')
      throw new Error('error adopting grade scale.')
    })
    await this.state.currentCr.members.forEach(member => {
      actions.classhelp.resolveChangeRequestMember(member.id)
        .catch(e => {
          console.log(e)
        })
    })
    this.props.onChange()
  }

  async onDecline () {
    await this.state.currentCr.members.forEach(member => {
      actions.classhelp.resolveChangeRequestMember(member.id)
        .catch(e => {
          console.log(e)
        })
    })
    showSnackbar(`Successfully declined user change. Refresh page if changes have not yet appeared.`, 'success', 5000)
    this.props.onChange()
  }

  render () {
    let cr = this.state.currentCr
    let crs = this.props.crs
    return (
      <div className='hub-panel-change-request'>
        <h2>Change request</h2>
        {crs.length > 1 &&
          <div>
            <select value={cr.id} onChange={(e) => {
              this.setState({currentCr: this.getCr(e.target.value)})
            }}>
              {this.renderCrOptions()}
            </select>
            <p>{crs.indexOf(crs.find(c => c.id === parseInt(cr.id))) + 1} of {crs.length}</p>
          </div>
        }
        <p><b>Submitted: </b>{moment(moment.utc(cr.updated_at).toDate()).local().format('MM/DD h:mma')}</p>
        <p><b>By: </b>{cr.user.email}</p>
        <p>Proposed weights:</p>
        <table>
          <tr>
            <th>Grade</th>
            <th>Min</th>
            <th>Type</th>
          </tr>
          {this.renderRows()}
          {this.renderDeletedGrades()}
        </table>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <div className='hub-change-request-accept' onClick={() => this.onAccept()}>
            <p>Accept</p>
          </div>
          <div className='hub-change-request-decline' onClick={() => this.onDecline()}>
            <p>Decline</p>
          </div>
        </div>
      </div>
    )
  }
}

AdminGradeScaleChangeRequest.propTypes = {
  crs: PropTypes.array,
  cl: PropTypes.object,
  onChange: PropTypes.func
}

export default AdminGradeScaleChangeRequest
