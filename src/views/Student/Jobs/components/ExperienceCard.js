import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

class ExperienceCard extends React.Component {
  render () {
    let description = this.props.description.split('|')
    return (
      <div className='jobs-experience'>
        <h3>
          {this.props.title}
        </h3>
        <p className='jobs-experience-org'>
          {this.props.organization}
        </p>
        <p className='jobs-experience-date'>
          {moment(this.props.startDate).format('M/YYYY')} - {moment(this.props.endDate).format('M/YYYY')}
        </p>
        {this.props.description &&
          <div className='jobs-experience-description'>
            {description.map(d => {
              return (
                <div key={description.indexOf(d)} className='jobs-experience-description-row'>
                  <p style={{fontSize: '20px', margin: '-2px 8px 0 0'}}>•</p>
                  <p>{d}</p>
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
}

ExperienceCard.propTypes = {
  title: PropTypes.string,
  organization: PropTypes.string,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  description: PropTypes.string
}

export default ExperienceCard
