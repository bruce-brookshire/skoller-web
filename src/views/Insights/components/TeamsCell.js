import React, { useState } from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { CSSTransition } from 'react-transition-group'
import actions from '../../../actions'

const Team = (props) => {
  const [remove, setRemove] = useState(false)

  const toggleRemove = () => {
    setRemove(!remove)
  }

  const renderX = () => {
    return (
      <div className='team-remove' onClick={() => props.popTeam(props.team.id)}>
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
      {props.team.name}
    </div>
  )
}

Team.propTypes = {
  team: PropTypes.object,
  popTeam: PropTypes.func
}

class TeamsCell extends React.Component {
  constructor (props) {
    super(props)

    console.log(this.props)

    this.state = {
      teams: this.props.user.org_groups,
      input: '',
      add: false,
      teamOptions: this.props.org.groups
    }

    this.cellRef = React.createRef()
  }

  popTeam = (id) => {
    this.setState({teams: this.state.teams.filter(t => t.id !== id)})
  }

  addTeam = (id) => {
    actions.insights.addStudentToGroup(this.props.org.id, id, this.props.user.orgStudentId)
      .then(() => {
        this.props.onChange && this.props.onChange()
        this.setState({add: false, input: ''})
      })
  }

  renderSearch () {
    return (
      <div className='add-team-search-container' style={this.cellRef.current && {
        width: this.cellRef.current.offsetWidth + 'px',
        top: this.cellRef.current.offsetHeight + 'px'
      }}>
        <input autoFocus placeholder={'Find a team'} className='add-team-search' value={this.state.input} onChange={(e) => this.setState({input: e.target.value})} />
        <div className='team-options-container'>
          {this.state.teamOptions.filter(t => t.name.toLowerCase().includes(this.state.input.toLowerCase())).map(t => {
            return (
              <div onClick={() => this.addTeam(t.id)} className='team-option' key={t.id}>{t.name}</div>
            )
          })}
        </div>
      </div>
    )
  }

  render () {
    let {teams} = this.state
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({add: false, input: ''})
        }}
      >
        <div className='si-teams-cell' ref={this.cellRef}>
          {teams.map(t => {
            return (
              <div key={Math.floor(Math.random() * Math.floor(10000))}>
                <Team team={t} popTeam={(id) => this.popTeam(id)} />
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

TeamsCell.propTypes = {
  user: PropTypes.object,
  org: PropTypes.object,
  onChange: PropTypes.func
}

export default TeamsCell
