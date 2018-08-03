import React from 'react'
import PropTypes from 'prop-types'
import PointTotal from './PointTotal'
import WeightForm from './WeightForm'
import WeightTable from './WeightTable'
import WeightType from './WeightType'
import actions from '../../../../actions'

class Weights extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount () {
    const {cl} = this.props
    actions.weights.getClassWeights(cl).then((weights) => {
      this.setState({weights})
    }).then(() => false)
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      currentWeight: null,
      noWeights: null,
      totalPoints: null,
      weights: [],
      reset: false
    }
  }

  /*
  * Render point total input if needed.
  * Otherwise render the table
  */
  renderContent () {
    const {cl, isReview} = this.props
    const {totalPoints, reset, weights} = this.state

    if (((!cl.is_points && !totalPoints && weights.length === 0) || reset) && !isReview) {
      // ask for weights or points
      return (
        <WeightType
          isPoints={cl.is_points}
          onSubmit={this.onTypeSelection.bind(this)}
        />
      )
    } else if (cl.is_points && !totalPoints && !isReview) {
      // ask for total points
      return (
        <PointTotal
          onChange={this.onChangeTotalPoints.bind(this)}
          totalPoints={totalPoints}
          reset={() => this.setState({reset: true})}
        />
      )
    } else {
      return this.renderWeightsContent()
    }
  }

  renderExtraCredit () {
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

  renderWeightTotalWarning () {
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

  /*
  * Render the weights and weight form.
  */
  renderWeightsContent () {
    const {weights, currentWeight, totalPoints, noWeights} = this.state
    const {cl, isReview} = this.props

    let disableButton = !this.isTotalWeightSecure() && !noWeights
    return (
      <div>
        {!isReview &&
          <WeightForm
            cl={cl}
            onCreateWeight={this.onCreateWeight.bind(this)}
            onUpdateWeight={this.onUpdateWeight.bind(this)}
            weight={currentWeight}
            noWeights={noWeights}
            numWeights={weights.length}
            onNoWeightChecked={(checked) => {
              this.setState({noWeights: checked})
            }}
            reset={() => this.setState({reset: true})}
          />
        }
        {weights.length !== 0 &&
          <div id='cn-weight-table'>
            <div id='cn-weight-table-label'>
              {isReview ? 'Weights' : 'Saved weights'}
              {isReview && <a onClick={() => this.props.onEdit()}>Edit</a>}
            </div>
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
          </div>
        }
        <div id='cn-weights-info'>
          {weights.length !== 0 && <div>
            {this.renderExtraCredit()}
            {!cl.is_points && this.renderWeightTotalWarning()}
          </div>}
          {(weights.length !== 0 && !cl.is_points) && <div>*The total should be 100%</div>}
        </div>
        {(weights.length !== 0 || noWeights) && !isReview &&
          <button
            onClick={() => this.props.onSubmit()}
            disabled={disableButton}
            className={disableButton ? 'button full-width disabled margin-top margin-bottom' : 'button full-width margin-top margin-bottom'}
          >
            Save and continue
          </button>
        }
      </div>
    )
  }

  /*
  * Get the total weight value.
  *
  * @return [Number] totalWeight. The accumlated percentages.
  */
  getTotalWeight () {
    const {weights} = this.state
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
  isTotalWeightSecure () {
    const {cl} = this.props
    const {totalPoints} = this.state
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
  onSelectWeight (weight) {
    this.setState({currentWeight: weight})
  }

  /*
  * Toggle the weights from percentages to points or vice versa.
  */
  onTypeSelection (isPoints) {
    const {cl} = this.props

    if (isPoints) {
      this.setState({totalPoints: 0, reset: false})
    } else {
      this.setState({totalPoints: 100, reset: false})
    }
    this.props.onUpdateClass({id: cl.id, is_points: isPoints})
  }

  /*
  * On create weight, push weight onto array
  *
  * @param [Object] weight. Weight.
  */
  onCreateWeight (weight) {
    const newWeights = this.state.weights
    newWeights.push(weight)
    this.setState({weights: newWeights, currentWeight: null, noWeights: false})
    this.sectionControl.scrollTop = this.sectionControl.scrollHeight
  }

  /*
  * On update weight, replace existing weight with the new weight.
  *
  * @param [Object] weight. Weight.
  */
  onUpdateWeight (weight) {
    const newWeights = this.state.weights
    const index = this.state.weights.findIndex(w => w.id === weight.id)
    newWeights[index] = weight
    this.setState({weights: newWeights, currentWeight: null})
  }

  /*
  * Delete weight.
  *
  * @param [Object] weight. The weight to be deleted.
  */
  onDeleteWeight (weight) {
    actions.weights.deleteWeight(weight).then(() => {
      const newWeights = this.state.weights.filter(w => w.id !== weight.id)
      this.setState({weights: newWeights, currentWeight: null})
    }).catch(() => false)
  }

  /*
  * If weights are in points, update the total points.
  * Call back from PointTotal.
  */
  onChangeTotalPoints (totalPoints) {
    this.setState({totalPoints})
  }

  render () {
    return (
      <div id='cn-weights'>
        {this.renderContent()}
      </div>
    )
  }
}

Weights.propTypes = {
  isReview: PropTypes.bool,
  onUpdateClass: PropTypes.func,
  cl: PropTypes.object,
  onSubmit: PropTypes.func,
  onEdit: PropTypes.func
}

export default Weights
