import React from 'react'
import PropTypes from 'prop-types'
import Arrow from '../../../assets/hub-icons/Arrow'
import OutsideClickHandler from 'react-outside-click-handler'
import actions from '../../../actions'
import { showSnackbar } from '../../../utilities/snackbar'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import moment from 'moment'

class ChangeRequest extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      focus: false,
      loading: false
    }
  }

  renderArrow () {
    return (
      <div className='hub-change-request-arrow'>
        <Arrow width='120' height='30' fill='FFF4CE' />
      </div>
    )
  }

  async onAccept () {
    let key = this.props.member.member_name
    let form = {
      'id': this.props.cr.change_type.id === 300 ? this.props.cl.professor.id : this.props.cl.id
    }
    if (this.props.cr.change_type.id === 100) {
      form['grade_scale'] = this.props.cl.grade_scale
      form['grade_scale'][this.props.member.member_name] = this.props.member.member_value
    } else {
      form[key] = this.props.member.member_value
    }
    if (this.props.cr.change_type.id === 300) {
      await actions.professors.updateProfessor(form)
        .catch(e => {
          console.log(e)
        })
    } else {
      await actions.classes.updateClass(form)
        .catch(e => {
          console.log(e)
        })
    }
    await actions.classhelp.resolveChangeRequestMember(this.props.member.id)
      .then((res) => {
        this.props.onChange()
        showSnackbar(`Successfully adopted user change: ${this.props.member.member_name} ${this.props.member.member_value}`, 'success')
      })
      .catch(e => {
        console.log(e)
      })
  }

  async onDecline () {
    console.log(this.props.member)
    await actions.classhelp.resolveChangeRequestMember(this.props.member.id)
      .then((res) => {
        this.props.onChange()
        showSnackbar(`Successfully declined user change`, 'success')
      })
      .catch(e => {
        console.log(e)
      })
  }

  renderInfo () {
    const cr = this.props.cr
    const member = this.props.member
    return (
      <div
        className='hub-change-request-content'
      >
        <div style={{color: '#4a4a4a75'}}>
          NEW {(member.member_name).replace('_', ' ')}
        </div>
        {this.props.multipleCrs.count > 1 &&
          <div style={{float: 'right', marginTop: '-16px'}}>{this.props.multipleCrs.position.toString()} of {this.props.multipleCrs.count.toString()}</div>
        }
        <div style={{fontSize: '26px', fontWeight: '600'}}>
          {member.member_value}
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
          <div className='hub-change-request-accept' onClick={() => this.onAccept()}>
            <p>Accept</p>
          </div>
          <div className='hub-change-request-decline' onClick={() => this.onDecline()}>
            <p>Decline</p>
          </div>
        </div>
        <div style={{marginTop: '1rem'}}>
          <span style={{color: '#4a4a4a75'}}>By: </span> {cr.user.email}
        </div>
        <div>
          <span style={{color: '#4a4a4a75'}}>Received: </span> {moment(moment.utc(cr.inserted_at).toDate()).local().format('MM/DD/YY h:mma')}
        </div>
      </div>
    )
  }

  renderContent () {
    let multipleCrsAdjustmentX = 0
    let multipleCrsAdjustmentY = 0
    if (this.props.multipleCrs.position) {
      if (this.props.multipleCrs.position > 1) {
        multipleCrsAdjustmentX = ((this.props.multipleCrs.position - 1) * 16)
        multipleCrsAdjustmentY = ((this.props.multipleCrs.position - 1) * -16) + 38
      }
    }
    return (
      <div
        onClick={() => this.setState({focus: true})}
        className='hub-change-request'
        style={{
          position: 'absolute',
          top: '0',
          transform: `translateY(${(this.props.offsetTop + multipleCrsAdjustmentY - 18).toString() + 'px'})`,
          width: this.props.width.toString() + 'px',
          zIndex: this.state.focus ? 2 : 1,
          marginLeft: (multipleCrsAdjustmentX + 16).toString() + 'px'
        }}
      >
        {this.props.multipleCrs.position <= 1 &&
          this.renderArrow()
        }
        {this.renderInfo()}
      </div>
    )
  }

  render () {
    return (
      <OutsideClickHandler
        onOutsideClick={() => this.setState({focus: false})}
      >
        {this.state.loading
          ? <SkLoader />
          : this.renderContent()
        }
      </OutsideClickHandler>
    )
  }
}

ChangeRequest.propTypes = {
  cl: PropTypes.object,
  cr: PropTypes.object,
  member: PropTypes.object,
  width: PropTypes.number,
  onChange: PropTypes.func,
  multipleCrs: PropTypes.object,
  offsetTop: PropTypes.number,
  gradeScaleCr: PropTypes.object
}

export default ChangeRequest
