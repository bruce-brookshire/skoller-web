import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { CSSTransition } from 'react-transition-group'
import actions from '../../../actions'
import { observer, inject } from 'mobx-react'

const Owner = (props) => {
  const [remove, setRemove] = useState(false)

  const toggleRemove = () => {
    setRemove(!remove)
  }

  const renderX = () => {
    return (
      <div className='team-remove' onClick={() => props.popOwner(props.user)}>
        <i className='fas fa-times' />
      </div>
    )
  }

  return (
    <div className='team' onClick={() => toggleRemove()}>
      <CSSTransition
        mountOnEnter
        in={remove}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        {renderX()}
      </CSSTransition>
      {/* {props.user.user.email} */}
      {props.user.id}
    </div>
  )
}

Owner.propTypes = {
  user: PropTypes.object,
  popOwner: PropTypes.func
}

@inject('rootStore') @observer
class OwnersCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      input: '',
      add: false
    }

    this.cellRef = React.createRef()
  }

  popOwner = (user) => {
    actions.insights.removeOrgGroupOwner(this.props.org.id, this.props.group.id, this.props.group.owners.find(o => o.user_id === user.user_id).id)
      .then(() => {
        this.props.onChange && this.props.onChange()
      })

    this.setState({
      input: '',
      add: false
    })
  }

  addOwner = (user) => {
    console.log(user)
    actions.insights.createOrgGroupOwner(this.props.org.id, this.props.group.id, user.user_id)
      .then(() => {
        this.props.onChange && this.props.onChange()
      })

    this.setState({
      input: '',
      add: false
    })
  }

  renderSearch () {
    return (
      <div className='add-team-search-container' style={this.cellRef.current && {
        width: this.cellRef.current.offsetWidth + 'px',
        top: this.cellRef.current.offsetHeight + 'px'
      }}>
        <input autoFocus placeholder={'Find an owner'} className='add-team-search' value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
        {/* <div className='team-options-container'>
          {this.props.rootStore.insightsStore.groupOwners.filter(u => (u.user.email).toLowerCase().includes(this.state.input.toLowerCase())).map(u => {
            return (
              <div onClick={() => this.addOwner(u)} className='team-option' key={u.id}>{u.user.email}</div>
            )
          })}
        </div> */}
      </div>
    )
  }

  render () {
    let owners = this.props.group.owners.map(o => { return {...o, ...(this.props.rootStore.insightsStore.groupOwners.find(go => go.user_id === o.user_id))} })

    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({add: false, input: ''})
        }}
      >
        <div className='si-teams-cell' ref={this.cellRef}>
          {owners.map(u => {
            return (
              <div key={Math.floor(Math.random() * Math.floor(10000))}>
                <Owner user={u} popOwner={(team) => this.popOwner(team)} />
              </div>
            )
          })}
          <div className='add-a-team'>
            <div className='add-team-button' onClick={() => this.setState({add: true})}>+</div>
          </div>
          <CSSTransition
            mountOnEnter
            in={this.state.add}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            {this.renderSearch()}
          </CSSTransition>
        </div>
      </OutsideClickHandler>
    )
  }
}

OwnersCell.propTypes = {
  group: PropTypes.object,
  org: PropTypes.object,
  onChange: PropTypes.func,
  owner: PropTypes.bool,
  rootStore: PropTypes.object
}

export default OwnersCell
