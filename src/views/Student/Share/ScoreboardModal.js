import React from 'react'
import SkModal from '../../components/SkModal/SkModal'
import PropTypes from 'prop-types'
import SkProgressBar from '../../components/SkProgressBar'

class ScoreboardModal extends React.Component {
  render () {
    return (
      <SkModal title='Full Scoreboard' closeModal={() => this.props.closeModal()}>
        <div className='share-scoreboard-modal'>
          <p>$1 is donated to {this.props.partner.philanthropy} every time a classmate signs up through your class links!</p>
          <table>
            <tr>
              <td className='left'>Your Raise</td>
              <td style={{color: '#' + this.props.partner.primaryColor}} className='right'>${this.props.user.student.raise_effort.personal_signups + 1}</td>
            </tr>
            <tr>
              <td className='nationwide'></td>
            </tr>
            <tr>
              <td className='left'>Your Chapter</td>
              <td style={{color: '#' + this.props.partner.primaryColor}} className='right'>${this.props.user.student.raise_effort.chapter_signups}</td>
            </tr>
            <tr>
              <td className='nationwide'>{this.props.user.student.primary_school.name}</td>
            </tr>
            <tr>
              <td className='left'>Total</td>
              <td style={{color: '#' + this.props.partner.primaryColor}} className='right'>${this.props.user.student.raise_effort.org_signups}</td>
            </tr>
            <tr>
              <td className='nationwide'>Nationwide</td>
            </tr>
          </table>
          <p style={{fontWeight: '600', color: '#' + this.props.partner.primaryColor}}>${this.props.user.student.raise_effort.org_signups} raised of $10,000</p>
          <div style={{marginTop: '-16px', width: 'calc(100% - 2rem)'}}>
            <SkProgressBar width={'348'} backgroundColor={'#' + this.props.partner.primaryColor} progress={this.props.user.student.raise_effort.org_signups / 10000} />
          </div>
        </div>
      </SkModal>
    )
  }
}

ScoreboardModal.propTypes = {
  closeModal: PropTypes.func,
  user: PropTypes.object,
  partner: PropTypes.object
}

export default ScoreboardModal
