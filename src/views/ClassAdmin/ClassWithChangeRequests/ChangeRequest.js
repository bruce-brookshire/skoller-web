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
    let key = Object.keys(this.props.cr.data)[0]
    let form = {
      'id': this.props.cl.id
    }
    form[key] = this.props.cr.data[key]
    await actions.classes.updateClass(form)
      .catch(e => {
        console.log(e)
      })
    await actions.classhelp.resolveChangeRequest(this.props.cr.id)
      .then((res) => {
        this.props.onChange()
        showSnackbar(`Successfully adopted user change: ${this.props.cr.data[key]}`, 'success')
      })
      .catch(e => {
        console.log(e)
      })
  }

  async onDecline () {
    await actions.classhelp.resolveChangeRequest(this.props.cr.id)
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
    return (
      <div className='hub-change-request-content'>
        <div style={{color: '#4a4a4a75'}}>
          NEW {(Object.keys(cr.data)[0]).replace('_', ' ')}
        </div>
        {this.props.multipleCrs.count > 1 &&
          <div style={{float: 'right', marginTop: '-16px'}}>{this.props.multipleCrs.position.toString()} of {this.props.multipleCrs.count.toString()}</div>
        }
        <div style={{fontSize: '26px', fontWeight: '600'}}>
          {cr.data[Object.keys(cr.data)[0]]}
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
    console.log(this.props.offsetTop)
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
  yPosition: PropTypes.number,
  width: PropTypes.number,
  onChange: PropTypes.func,
  multipleCrs: PropTypes.object,
  offsetTop: PropTypes.number
}

export default ChangeRequest
