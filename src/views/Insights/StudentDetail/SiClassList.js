import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import moment from 'moment'

@inject('rootStore') @observer
class SiClassList extends React.Component {
  onClassSelect (cl) {
    if (this.props.onSelect) this.props.onSelect(cl)
  }

  renderGrade (cl) {
    return (
      <h1
        // style={{color: cl.getColor()}}
        className='si-class-list-row-grade-text cn-white'
      >
        {cl.assignments.length} assignments
      </h1>
    )
  }

  renderExtra (cl) {
    return (
      <div className='si-class-list-cell-extra'>
        <p>{cl.meet_days + ' ' + moment(cl.meet_start_time, 'hh:mm:ss').format('h:mma')}</p>
      </div>
    )
  }

  renderClassRows () {
    let classes = this.props.classes.sort((a, b) => a.status.id < 1400 ? -1 : 1)

    return (
      <React.Fragment>
        {classes.map(cl => {
          // let color = cl.getColor()
          let color = '#' + cl.color
          let name = cl.name
          if (name.length > 35) {
            name = name.slice(0, 35) + '...'
          }

          return (
            <div
              className='si-class-list-cell'
              key={classes.indexOf(cl)}
              style={cl.status.id >= 1400 ? {border: '1px solid ' + color} : null}
              onClick={() => this.onClassSelect(cl)}
            >
              <div className='si-class-list-cell-title' style={cl.status.id < 1400 ? {backgroundColor: null, borderBottom: '1px solid #4a4a4a'} : {backgroundColor: color}}>
                <h2 style={cl.status.id < 1400 ? {color: '#4a4a4a'} : {color: 'white'}}>{name}</h2>
              </div>
              <div className='si-class-list-cell-grade'>
                {this.renderGrade(cl)}
              </div>
              {this.renderExtra(cl)}
            </div>
          )
        })}
        <div className='si-class-list-cell empty' />
        <div className='si-class-list-cell empty' />
      </React.Fragment>
    )
  }

  render () {
    return (
      <div className={'si-class-list-container ' + this.props.containerClassName}>
        {this.renderClassRows()}
        {this.props.classes.length === 0 &&
          <div className='si-class-list-empty-message'>
            {this.props.emptyMessage || "Looks like you don't have any classes yet. Join one now!"}
          </div>
        }
      </div>
    )
  }
}

SiClassList.propTypes = {
  classes: PropTypes.array,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func,
  containerClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  rootStore: PropTypes.object
}

export default SiClassList
