import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'

class AdminWeightChangeRequest extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      currentCr: this.props.crs[0],
      deletedWeights: []
    }

    console.log('is this re-rendering or something')
  }

  componentDidMount () {
    this.setState({deletedWeights: this.getDeletedWeights()})
  }

  renderRows () {
    console.log('class', this.props.cl)
    return (
      this.state.currentCr.members.map(member => {
        return (
          <tr key={member.id}>
            <td>{member.member_name}</td>
            <td>{member.member_value}</td>
            <td>{this.getWeight(member.member_name) ? 'Updated' : 'New'}</td>
          </tr>
        )
      })
    )
  }

  getDeletedWeights () {
    let currentWeights = this.props.cl.weights
    currentWeights = currentWeights.filter(weight => {
      let deleted = true
      this.state.currentCr.members.forEach(member => {
        if (member.member_name === weight.name) {
          deleted = false
        }
      })
      return deleted
    })
    // this.setState({deleteWeights: currentWeights})
    return currentWeights
  }

  renderDeletedWeights () {
    let deletedWeights = this.getDeletedWeights()
    return (
      deletedWeights.map(weight => {
        return (
          <tr key={weight.id}>
            <td><s>{weight.name}</s></td>
            <td><s>{weight.weight}</s></td>
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

  getWeight (name) {
    let weight = this.props.cl.weights.find(weight => weight.name === name)
    if (weight) {
      return weight
    }
    return false
  }

  async onAccept () {
    let form = {
      'id': this.props.cl.id
    }
    let weights = []
    this.state.currentCr.members.forEach(member => {
      weights.push({
        name: member.member_name,
        value: member.member_value
      })
    })
    form['weights'] = weights
    await this.state.deletedWeights.forEach(weight => {
      actions.weights.deleteWeight(weight)
    })
    await this.state.currentCr.members.forEach(member => {
      let existingWeight = this.getWeight(member.member_name)
      if (existingWeight) {
        actions.weights.updateWeight(this.props.cl, {name: existingWeight.name, weight: member.member_value, id: parseInt(existingWeight.id)})
          .catch((r) => console.log(r))
      } else {
        actions.weights.createWeight(this.props.cl, {name: member.member_name, weight: member.member_value})
          .catch((r) => console.log(r))
      }
    })
    await this.state.currentCr.members.forEach(member => {
      actions.classhelp.resolveChangeRequestMember(member.id)
        .catch(e => console.log(e))
    })
    showSnackbar('Successfully adopted weights. Refresh page if changes have not yet appeared.', 'success', 5000)
    this.props.onChange()
  }

  async onDecline () {
    await this.state.currentCr.members.forEach(member => {
      actions.classhelp.resolveChangeRequestMember(member.id)
        .catch(e => {
          console.log(e)
        })
    })
    showSnackbar(`Successfully declined user change`, 'success')
    this.props.onChange()
  }

  render () {
    let total = 0
    let cr = this.state.currentCr
    let crs = this.props.crs
    cr.members.forEach(member => {
      total = total + parseFloat(member.member_value)
    })
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
            <th>Name</th>
            <th>Weight</th>
            <th>Type</th>
          </tr>
          {this.renderRows()}
          {this.renderDeletedWeights()}
          <tr className='hub-panel-change-request-total'>
            <td colSpan='3'>Weights total: {total}</td>
          </tr>
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

AdminWeightChangeRequest.propTypes = {
  cr: PropTypes.object,
  crs: PropTypes.array,
  cl: PropTypes.object,
  onChange: PropTypes.func
}

export default AdminWeightChangeRequest
