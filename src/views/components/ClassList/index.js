import React from 'react'
import PropTypes from 'prop-types'
import sExclamation from '../../../assets/images/class_status/s-exclamation.png'
import sInReview from '../../../assets/images/class_status/s-in-review.png'
import uploadS from '../../../assets/images/class_status/upload-s.png'
import {inject, observer} from 'mobx-react'
import ReactToolTip from '../ToolTip/CustomToolTip'

@inject('rootStore') @observer
class ClassList extends React.Component {
  onClassSelect (cl) {
    if (this.props.onSelect) this.props.onSelect(cl)
  }

  renderGrade (cl) {
    let status = cl.status.id
    let syllabusOverload = false
    if (!this.props.rootStore.userStore.isAdmin()) {
      try {
        syllabusOverload = this.props.rootStore.userStore.user.student.schools.find(s => s.id === cl.class_period.school_id).is_syllabus_overload
      } catch (e) {
        console.log(e)
      } finally {
        syllabusOverload = false
      }
    }

    if (status >= 1400) {
      return (
        <h1 className='classList__item__gradeBox__text cn-white'>{cl.grade > 0 ? Math.round(cl.grade) + '%' : '–'}</h1>
      )
    } else if (status === 1100) {
      return (
        <img className='classList__item__gradeBox__img' src={uploadS} />
      )
    } else if (syllabusOverload) {
      return (
        <img className='classList__item__gradeBox__img' src={sExclamation} />
      )
    } else if (status === 1200) {
      return (
        <img className='classList__item__gradeBox__img' src={sInReview} />
      )
    } else if (status === 1300) {
      return (
        <img className='classList__item__gradeBox__img' src={sExclamation} />
      )
    } else {
      return (
        <i className='fas fa-exclamation cn-class-list-row-icon cn-grey' />
      )
    }
  }

  renderExtra (cl) {
    let status = cl.status.id
    let syllabusOverload = false
    if (!this.props.rootStore.userStore.isAdmin()) {
      try {
        syllabusOverload = this.props.rootStore.userStore.user.student.schools.find(s => s.id === cl.class_period.school_id).is_syllabus_overload
      } catch (e) {
        console.log(e)
      } finally {
        syllabusOverload = false
      }
    }

    if (status >= 1400) {
      return (
        <div>
          <span><i className="fas fa-users" /></span>
          &nbsp; {cl.enrollment}
        </div>
      )
    } else if (status === 1100) {
      return (
        <div style={{color: '#ef183d'}}>Send syllabus</div>
      )
    } else if (syllabusOverload) {
      return (
        <div style={{color: '#ef4b0a'}}>Set up this class</div>
      )
    } else if (status === 1200) {
      return (
        <div style={{color: '#4a4a4a'}}>Syllabus in review</div>
      )
    } else if (status === 1300) {
      return (
        <div style={{color: '#ef4b0a'}}>Set up this class</div>
      )
    } else {
      return null
    }
  }

  renderClassRows () {
    let classes = this.props.classes.slice().sort((a, b) => a.status.id < 1400 ? -1 : 1)

    return classes.map(cl => {
      let color = cl.getColor()
      let name = cl.name
      if (name.length > 35) {
        name = name.slice(0, 35) + '...'
      }

      return (
        <div className="classList__item"
          key={classes.indexOf(cl)}
          onClick={() => this.onClassSelect(cl)}
        >
          <span className="classList__item__gradeBox" style={{backgroundColor: cl.status.id < 1400 ? null : color}}>
            {this.renderGrade(cl)}
            {/* {cl.status.id} */}
          </span>
          <div className="classList__item__info">
            <h3 className="classList__item__title" style={{color: cl.status.id === 1100 || cl.status.id === 1200 || cl.status.id === 1300 ? '#4a4a4a' : color}}>{name}</h3>
            <div className="card-subtitle stext-normal">
              {this.renderExtra(cl)}
            </div>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div className={'classList cn-class-list-container ' + this.props.containerClassName}>
        {this.renderClassRows()}
        {this.props.classes.length === 0 &&
          <div className='cn-class-list-empty-message'>
            {this.props.emptyMessage || "Looks like you don't have any classes yet. Join one now!"}
          </div>
        }
      </div>
    )
  }
}

ClassList.propTypes = {
  classes: PropTypes.array,
  emptyMessage: PropTypes.string,
  onSelect: PropTypes.func,
  containerClassName: PropTypes.string,
  rowClassName: PropTypes.string,
  rootStore: PropTypes.object
}

export default ClassList
