import React from 'react'
import PropTypes from 'prop-types'
import OutsideClickHandler from 'react-outside-click-handler'
import { CSSTransition } from 'react-transition-group'

class TeamsCell extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      teams: this.props.user.teams,
      input: '',
      add: false,
      teamOptions: this.props.user.teams
    }

    this.cellRef = React.createRef()
  }

  popTeam = (id) => {
    this.setState({teams: this.state.teams.filter(t => t.id !== id)})
  }

  addTeam = (id) => {
    let teams = this.state.teams
    teams.push(this.state.teamOptions.find(t => t.id === id))
    this.setState({teams, add: false, input: ''})
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
        onOutsideClick={() => this.setState({add: false, input: ''})}
      >
        <div className='si-teams-cell' ref={this.cellRef}>
          {teams.map(t => {
            return (
              <div className='team' key={Math.floor(Math.random() * Math.floor(10000))} onClick={() => this.popTeam(t.id)}>
                {t.name}
              </div>
            )
          })}
          <div className='add-a-team'>
            <div className='add-team-button' onClick={() => this.setState({add: true})}>+</div>
          </div>
          {/* {this.state.add && this.renderSearch()} */}
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
  user: PropTypes.object
}

export default TeamsCell
