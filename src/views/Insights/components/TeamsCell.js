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
      <div className='team-remove' onClick={() => props.popTeam(props.team)}>
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

    this.state = {
      input: '',
      add: false,
      teamOptions: this.props.org.groups
    }

    this.cellRef = React.createRef()
  }

  popTeam = (team) => {
    if (this.props.owner) {
      actions.insights.removeOrgGroupOwner(this.props.org.id, team.id, team.owners.find(o => o.user_id === this.props.user.user_id).id)
        .then(() => {
          this.props.onChange && this.props.onChange()
          this.setState({add: false, input: ''})
        })
    } else {
      actions.insights.getStudentsByGroupId(this.props.org.id, team.id)
        .then(r => {
          actions.insights.removeStudentFromGroup(this.props.org.id, team.id, r.find(s => s.org_student_id === this.props.user.orgStudentId).id)
            .then(() => {
              this.props.onChange && this.props.onChange()
              this.setState({add: false, input: ''})
            })
        })
    }
  }

  addTeam = (id) => {
    if (this.props.owner) {
      // let groupOwner = this.props.org.groupOwners.find(go => go.user_id === this.props.user.user_id)
      // console.log(groupOwner)
      // if (groupOwner) {
      //   actions.insights.addOrgGroupOwner(this.props.org.id, id, groupOwner.id)
      //     .then(() => {
      //       this.props.onChange && this.props.onChange()
      //       this.setState({add: false, input: ''})
      //     })
      //     .catch(() => {
      //       this.setState({error: 'Error tagging user to org. Try again later.'})
      //     })
      // } else {
      //   actions.insights.createOrgGroupOwner(this.props.org.id, id, this.props.user.user_id)
      //     .then(() => {
      //       this.props.onChange && this.props.onChange()
      //       this.setState({add: false, input: ''})
      //     })
      //     .catch(() => {
      //       this.setState({error: 'Error tagging user to org. Try again later.'})
      //     })
      // }
      actions.insights.createOrgGroupOwner(this.props.org.id, id, this.props.user.user_id)
        .then(() => {
          this.props.onChange && this.props.onChange()
          this.setState({add: false, input: ''})
        })
        .catch(() => {
          this.setState({error: 'Error tagging user to org. Try again later.'})
        })
    } else {
      actions.insights.addStudentToGroup(this.props.org.id, id, this.props.user.orgStudentId)
        .then(() => {
          this.props.onChange && this.props.onChange()
          this.setState({add: false, input: ''})
        })
    }
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
    let teams
    if (this.props.owner) {
      teams = this.props.org.groups.filter(g => g.owners.map(os => os.user_id).includes(this.props.user.user_id))
    } else {
      teams = this.props.user.org_groups
    }
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
                <Team team={t} popTeam={(team) => this.popTeam(team)} />
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
  onChange: PropTypes.func,
  owner: PropTypes.bool
}

export default TeamsCell
