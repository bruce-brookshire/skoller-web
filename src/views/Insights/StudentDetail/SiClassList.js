import React from 'react'
import PropTypes from 'prop-types'
import {inject, observer} from 'mobx-react'
import sExclamation from '../../../assets/images/class_status/s-exclamation.png'
import sInReview from '../../../assets/images/class_status/s-in-review.png'
import uploadS from '../../../assets/images/class_status/upload-s.png'
import moment from 'moment'

@inject('rootStore') @observer
class SiClassList extends React.Component {
  onClassSelect (cl) {
    if (this.props.onSelect) this.props.onSelect(cl)
  }

  renderGrade (cl) {
    let status = cl.status.id
    let syllabusOverload = false
    if (!this.props.rootStore.userStore.isAdmin()) syllabusOverload = this.props.rootStore.userStore.user.student.schools.find(s => s.id === cl.class_period.school_id).is_syllabus_overload

    if (status >= 1400) {
      return (
        <h1 className='si-class-list-row-grade-text'>{cl.assignments.length} assignments</h1>
      )
    } else if (status === 1100) {
      return (
        <img className='si-class-list-row-icon-img' src={uploadS} />
      )
    } else if (syllabusOverload) {
      return (
        <img className='si-class-list-row-icon-img' src={sExclamation} />
      )
    } else if (status === 1200) {
      return (
        <img className='si-class-list-row-icon-img' src={sInReview} />
      )
    } else if (status === 1300) {
      return (
        <img className='si-class-list-row-icon-img' src={sExclamation} />
      )
    } else {
      return (
        <i className='fas fa-exclamation si-class-list-row-icon cn-grey' />
      )
    }
  }

  // renderGrade (cl) {
  //   return (
  //     <h1
  //       className='si-class-list-row-grade-text cn-white'
  //     >
  //       {cl.assignments.length} assignments
  //     </h1>
  //   )
  // }

  renderExtra (cl) {
    // return (
    //   <div className='si-class-list-cell-extra'>
    //     <p>{cl.meet_days + ' ' + (cl.meet_start_time ? moment(cl.meet_start_time, 'hh:mm:ss').format('h:mma') : '')}</p>
    //   </div>
    // )

    let status = cl.status.id
    let syllabusOverload = false
    if (!this.props.rootStore.userStore.isAdmin()) syllabusOverload = this.props.rootStore.userStore.user.student.schools.find(s => s.id === cl.class_period.school_id).is_syllabus_overload

    if (status >= 1400) {
      return (
        <div className='si-class-list-cell-extra'>
          <p>{cl.meet_days + ' ' + (cl.meet_start_time ? moment(cl.meet_start_time, 'hh:mm:ss').format('h:mma') : '')}</p>
        </div>
      )
    } else if (status === 1100) {
      return (
        <div className='si-class-list-cell-extra'>
          <p style={{color: '#ef183d', fontWeight: '600'}}>Send syllabus</p>
        </div>
      )
    } else if (syllabusOverload) {
      return (
        <div className='si-class-list-cell-extra'>
          <p style={{color: '#ef4b0a', fontWeight: '600'}}>Set up this class</p>
        </div>
      )
    } else if (status === 1200) {
      return (
        <div className='si-class-list-cell-extra'>
          <p style={{fontWeight: '600'}}>Syllabus in review</p>
        </div>
      )
    } else if (status === 1300) {
      return (
        <div className='si-class-list-cell-extra'>
          <p style={{color: '#ef4b0a', fontWeight: '600'}}>Set up this class</p>
        </div>
      )
    } else {
      return null
    }
  }

  renderClassRows () {
    let classes = this.props.classes.sort((a, b) => a.status.id < 1400 ? -1 : 1)

    return (
      <React.Fragment>
        {classes.map(cl => {
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
              <div className='si-class-list-cell-title' style={cl.status.id < 1400 ? null : {backgroundColor: color}}>
                <h2 style={cl.status.id < 1400 ? null : {color: 'white'}}>{name}</h2>
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
