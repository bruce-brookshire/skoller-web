import React from 'react'
import PropTypes from 'prop-types'
import WeightForm from './WeightForm'
import WeightTable from './WeightTable'
import actions from '../../../../actions'
import ToolTip from '../../../../views/components/ToolTip'
import SkipWeightModal from './SkipWeightModal'
import { ProgressBar, Step } from "react-step-progress-bar";
import ProgressModal from '../progressModel'

class Weights extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount() {
    const { cl } = this.props
    actions.assignments.getClassAssignments(cl).then((assignments) => {
      this.setState({ assignments })
    }).then(() => false)

    actions.weights.getClassWeights(cl).then((weights) => {
      this.setState({ weights })
    }).then(() => false)
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState() {
    return {
      currentWeight: null,
      noWeights: false,
      totalPoints: null,
      weights: [],
      assignments: [],
      reset: false,
      openSkipWeightModal: false,
      boolPoints: this.props.cl.is_points,
      openProgressModal: false,
      openGradeModal: false
    }
  }

  onNext() {
    // const { currentWeightIndex } = this.state
    // this.setState({ currentWeightIndex: currentWeightIndex + 1 })
    this.props.onSubmit()
  }

  onUpdateCurrentIndex(form) {
    this.props.onUpdateCurrentIndex(form)
  }

  toggleSkipWeightModal() {
    this.setState({ openSkipWeightModal: !this.state.openSkipWeightModal })
  }

  toggleProgressModal() {
    this.setState({ openProgressModal: !this.state.openProgressModal })
  }

  toggleGradeModal() {
    this.setState({ openGradeModal: !this.state.openGradeModal })
  }

  renderSkipWeightModal() {
    const { openSkipWeightModal } = this.state
    return (
      <SkipWeightModal open={openSkipWeightModal}
        onClose={this.toggleSkipWeightModal.bind(this)}
        onConfirm={this.onNext.bind(this)}
      />
    )
  }


  renderProgressModal() {
    const { openProgressModal, assignments, weights } = this.state
    return (
      <ProgressModal open={openProgressModal}
        onClose={this.toggleProgressModal.bind(this)}
        onConfirm={this.onUpdateCurrentIndex.bind(this)}
        currentIndex={0}
        assignments={assignments}
        weights={weights}
      />
    )
  }

  renderGradeModal() {
    const { cl } = this.props
    const { openGradeModal, totalPoints } = this.state
    return (
      <WeightGradeModal open={openGradeModal}
        onClose={this.toggleGradeModal.bind(this)}
        isPoints={cl.is_points}
        pointTotal={totalPoints || 100}
        onChange={this.onChangeTotalPoints.bind(this)}
        onSubmit={this.onTypeSelection.bind(this)}
      />
    )
  }

  renderExtraCredit() {
    return (
      <div className='cn-info-container cn-blue'>Extra Credit?
        <div className='message-bubble triangle-bottom'>
          <b><u>Do not</u></b> worry about adding extra credit, as this is the grade calculator&apos;s
          foundations for everyone in the class. You can add extra credit to assignments in the app as you enter grades throughout the semester.
          <div className='triangle-inner' />
        </div>
      </div>
    )
  }

  renderWeightTotalWarning() {
    return (
      <div>
        <div className='cn-info-container cn-blue'>Weights &ne; 100%?
          <div className='message-bubble triangle-bottom'>
            There are two options here.<br /><br />
            1. <b><u>Politely</u></b> approach the professor to reconcile the situation.<br /><br />
            2. Add a weight named &quot;Additional x&#37;&quot; with the value needed to reach 100%
            <div className='triangle-inner' />
          </div>
        </div>
      </div>
    )
  }


  renderProgressBar() {
    return <div className='cn-section-progress-outer'>
      <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="40" />
      <span className="cn-section-progress-title">Add Weights & Values
        <div className="infodiv">
          <ToolTip
            tip={
              <div>
                Weights need to sum to 100% before submitting! Click here to swap grade style
              </div>
            }>
            <i class="far fa-question-circle"></i>
          </ToolTip>
        </div>
      </span>
      <div className="cn-pull-right">
        <span>1/3</span>
        <span className='cn-section-progressbar' ><a onClick={() => this.toggleProgressModal()}><ProgressBar percent={(1 / 3) * 100} /></a></span>
      </div>
    </div>
  }

  /*
  * Render the weights and weight form.
  */
  renderWeightsContent() {
    const { weights, currentWeight, totalPoints, noWeights } = this.state
    const { cl, isReview } = this.props

    let disableButton = !this.isTotalWeightSecure() && !noWeights
    return (
      <div className='cn-weights-subcontainer'>
        <div id='cn-weight-form' >
          {this.renderProgressBar()}
          {!isReview &&
            <WeightForm
              cl={cl}
              onCreateWeight={this.onCreateWeight.bind(this)}
              onUpdateWeight={this.onUpdateWeight.bind(this)}
              onDeleteWeight={this.onDeleteWeight.bind(this)}
              onConfirm={this.onNext.bind(this)}
              weight={currentWeight}
              noWeights={noWeights}
              numWeights={weights.length}
              onNoWeightChecked={(checked) => {
                this.setState({ noWeights: checked })
              }}
              boolPoints={this.state.boolPoints}
              onClick={this.onChangeType.bind(this)}
              reset={() => this.setState({ reset: true })}
              onTypeSelection={this.onTypeSelection.bind(this)}
              totalPoints={this.state.totalPoints}
            />
          }
        </div>
        <div id='cn-weight-table'>
          {weights.length === 0 &&
            <div className="cn-weights-notadded">
              <div className="center-text ">
                <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="80" />
                <h2>Weights are how much a group of assignments contribute to your overall grade.</h2>
                <h4>i.e Exams=60%</h4>
              </div>
            </div>
          }
          {weights.length !== 0 &&
            <WeightTable
              weights={weights}
              viewOnly={isReview}
              currentWeight={currentWeight}
              cl={cl}
              onSelectWeight={this.onSelectWeight.bind(this)}
              onDeleteWeight={this.onDeleteWeight.bind(this)}
              totalPoints={totalPoints}
              onEdit={() => this.props.onEdit()}
            />
          }
          {(weights.length !== 0 || noWeights) && !isReview &&

            <div className='submit-container'>
              {disableButton &&
                <ToolTip
                  tip={
                    <div>
                      Weights need to sum to 100% before submitting! Click here to swap grade style
                    </div>
                  }>
                  <button
                    onClick={() => this.props.onSubmit()}
                    disabled={disableButton}
                    className={`submit-weights button ${disableButton ? 'disabled' : ''}`}
                  >
                    Save weights
                  </button>
                </ToolTip>
              }
              {!disableButton &&
                <button
                  onClick={() => this.props.onSubmit()}
                  disabled={disableButton}
                  className={`submit-weights button ${disableButton ? 'disabled' : ''}`}
                >
                  Save weights
                </button>
              }
            </div>
          }
        </div>
        {weights.length === 0 &&
          <div className='margin-top margin-bottom center-text cn-weights-skip'>
            <div>
              <a onClick={() => this.toggleSkipWeightModal()}>
                Skip Weights
              </a>
            </div>
          </div>
        }
        {this.renderSkipWeightModal()}
        {this.renderProgressModal()}

      </div >

    )
  }

  /*
  * Get the total weight value.
  *
  * @return [Number] totalWeight. The accumlated percentages.
  */
  getTotalWeight() {
    const { weights } = this.state
    let totalWeight = 0

    weights.forEach(item => {
      totalWeight += Number(item.weight)
    })
    return totalWeight
  }

  /*
  * Get whether the total weight is completed.
  *
  * @param [String] weight. Optional param to check weight
  * @return [Boolean]. Truth value if the total weight percentage is within range.
  */
  isTotalWeightSecure() {
    const { cl } = this.props
    const { totalPoints } = this.state
    let totalWeight = this.getTotalWeight()

    if (cl.is_points) {
      if (!totalPoints) return false
      totalWeight = (totalWeight / totalPoints) * 100
    }
    return (totalWeight < 101 && totalWeight > 99.9)
  }

  /*
  * Set form value equal to weight in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  onSelectWeight(weight) {
    this.setState({ currentWeight: weight })
  }

  /*
  * Toggle the weights from percentages to points or vice versa.
  */
  onTypeSelection(isPoints, points) {
    const { cl } = this.props
    if (typeof (points) === 'string') {
      points = parseInt(points, 10)
    }
    if (isPoints) {
      this.setState({ totalPoints: points, reset: false, boolPoints: true })
    } else {
      this.setState({ totalPoints: 100, reset: false, boolPoints: false })
    }
    this.props.onUpdateClass({ id: cl.id, is_points: isPoints })
  }

  onChangeType(isPoints) {
    const { cl } = this.props
    if (isPoints) {
      this.setState({ boolPoints: true })
    } else {
      this.setState({ boolPoints: false })
    }
    this.props.onUpdateClass({ id: cl.id, is_points: isPoints })
  }

  /*
  * On create weight, push weight onto array
  *
  * @param [Object] weight. Weight.
  */
  onCreateWeight(weight) {
    const newWeights = this.state.weights
    newWeights.push(weight)
    this.setState({ weights: newWeights, currentWeight: null, noWeights: false })
    this.sectionControl.scrollTop = this.sectionControl.scrollHeight
  }

  /*
  * On update weight, replace existing weight with the new weight.
  *
  * @param [Object] weight. Weight.
  */
  onUpdateWeight(weight) {
    const newWeights = this.state.weights
    const index = this.state.weights.findIndex(w => w.id === weight.id)
    newWeights[index] = weight
    this.setState({ weights: newWeights, currentWeight: null })
  }

  /*
  * Delete weight.
  *
  * @param [Object] weight. The weight to be deleted.
  */
  onDeleteWeight(weight) {
    actions.weights.deleteWeight(weight).then(() => {
      const newWeights = this.state.weights.filter(w => w.id !== weight.id)
      this.setState({ weights: newWeights, currentWeight: null })
    }).catch(() => false)
  }

  /*
  * If weights are in points, update the total points.
  * Call back from WeightType.
  */
  onChangeTotalPoints(totalPoints) {
    this.setState({ totalPoints })
  } // unused

  goBack() {
    this.setState({ reset: true })
  }

  render() {
    return (
      <div id='cn-weights'>
        {this.renderWeightsContent()}
      </div>
    )
  }
}

Weights.propTypes = {
  isReview: PropTypes.bool,
  onUpdateClass: PropTypes.func,
  onUpdateCurrentIndex: PropTypes.func,
  cl: PropTypes.object,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func
}

export default Weights
