import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../../../components/Modal'

const gradeScales = [
  {
    id: 1,
    grade_scale: {'A': '90',
      'B': '80',
      'C': '70',
      'D': '60'}
  },
  {
    id: 2,
    grade_scale: {'A': '93',
      'A-': '90',
      'B+': '87',
      'B': '83',
      'B-': '80',
      'C+': '77',
      'C': '73',
      'C-': '70',
      'D': '60'}
  },
  {
    id: 3,
    grade_scale: {'A': '93',
      'A-': '90',
      'B+': '87',
      'B': '83',
      'B-': '80',
      'C+': '77',
      'C': '73',
      'C-': '70',
      'D+': '67',
      'D': '63',
      'D-': '60'}
  }
]

const moreGradeScales = [
  {
    id: 4,
    grade_scale: {'A': '92.5',
      'A-': '89.5',
      'B+': '86.5',
      'B': '82.5',
      'B-': '79.5',
      'C+': '76.5',
      'C': '72.5',
      'C-': '69.5',
      'D+': '66.5',
      'D': '62.5',
      'D-': '59.5'}
  },
  {
    id: 5,
    grade_scale: {'Pass': '50'}
  },
  {
    id: 6,
    grade_scale: {'A': '92',
      'A-': '90',
      'B+': '88',
      'B': '82',
      'B-': '80',
      'C+': '78',
      'C': '72',
      'C-': '70',
      'D+': '68',
      'D': '62',
      'D-': '60'}
  }
]

class CommonScaleModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      gradeScales,
      showAllGradeScales: false
    }
  }

  /*
  * Toggle the gradescales shown.
  *
  */
  toggleGradeScales () {
    const {showAllGradeScales} = this.state
    const gs = showAllGradeScales ? gradeScales : gradeScales.concat(moreGradeScales)

    this.setState({ showAllGradeScales: !showAllGradeScales, gradeScales: gs })
  }

  onSubmit (gradeScale) {
    this.props.onSubmit(gradeScale)
    this.props.onClose()
  }

  renderGradeScale (gradeScale, index) {
    return <ul className="grade-scale-list" key={index}>
      {Object.keys(gradeScale).sort((a, b) => {
        return parseFloat(gradeScale[a]) < parseFloat(gradeScale[b]) ? 1 : -1
      }).map((key, idx) =>
        <li key={idx} className="grade-row">
          <div className="grade-key">{key}</div><div className="grade-min">{gradeScale[key]}</div>
        </li>
      )}
      <li className="adopt-button">
        <button
          className='button full-width margin-top'
          disabled={this.state.loading}
          onClick={() => { this.onSubmit(gradeScale) }}
        >
          Adopt
        </button>
      </li>
    </ul>
  }

  renderContent () {
    const gradeScalesText = this.state.showAllGradeScales ? 'Show Less Grade Scales' : 'Show More Grade Scales'
    return (
      <div id="cn-common-scales-container">
        <h2>Other common scales</h2>
        <div id="cn-common-scales-content">
          {this.state.gradeScales.map((item) =>
            this.renderGradeScale(item.grade_scale, item.id)
          )}
        </div>
        <a className='margin-top' onClick={() => this.toggleGradeScales()}> {gradeScalesText} </a>
      </div>
    )
  }

  render () {
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}>
        {this.renderContent()}
      </Modal>
    )
  }
}

CommonScaleModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
}

export default CommonScaleModal
