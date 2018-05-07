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
    const {cl, disabled, isReview} = this.props
    if (!disabled) {
      actions.weights.getClassWeights(cl).then((weights) => {
        // if in review, set
        const noWeights = (isReview && weights.length === 0)
        this.setState({weights, noWeights})
      }).then(() => false)
    }
  }

  /*
  * Disable next.
  */
  componentDidUpdate () {
    // Disable the parents submit button if weights are not secure.
    if (this.props.toggleDisabled && !this.state.viewOnly) {
      let {disableNext} = this.props
      if (!disableNext && this.state.noWeights) {
      } else if (!this.isTotalWeightSecure() && !disableNext) {
        this.props.toggleDisabled(true)
      } else if (this.isTotalWeightSecure() && disableNext) {
        this.props.toggleDisabled(false)
      }
    }
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    const {isReview, weights} = this.props
    return {
      currentWeight: null,
      noWeights: null,
      totalPoints: null,
      weights: weights || [],
      viewOnly: isReview || false,
      reset: false
    }
  }

  /*
  * Render point total input if needed.
  * Otherwise render the table
  */
  renderContent () {
    const {cl} = this.props
    const {totalPoints, viewOnly, disabled, reset, weights} = this.state

    if (((!cl.is_points && !totalPoints && weights.length === 0) || reset) && !viewOnly && !disabled) {
      // ask for weights or points
      return (
        <WeightType
          isPoints={cl.is_points}
          onSubmit={this.onTypeSelection.bind(this)}
        />
      )
    } else if (cl.is_points && !totalPoints && !viewOnly && !disabled) {
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

  /*
  * Render the weights and weight form.
  */
  renderWeightsContent () {
    const {viewOnly, weights, currentWeight, totalPoints} = this.state
    const {cl, disabled} = this.props
    return (
      <div>
        {!viewOnly &&
          <WeightForm
            cl={cl}
            onCreateWeight={this.onCreateWeight.bind(this)}
            onUpdateWeight={this.onUpdateWeight.bind(this)}
            weight={this.state.currentWeight}
          />
        }
        {weights.length !== 0 &&
          <WeightTable
            weights={weights}
            viewOnly={viewOnly}
            currentWeight={currentWeight}
            disabled={disabled}
            cl={cl}
            onSelectWeight={this.onSelectWeight.bind(this)}
            onDeleteWeight={this.onDeleteWeight.bind(this)}
            totalPoints={totalPoints}
          />
        }
        {/*
        {!viewOnly && this.renderWeightsCheckbox()} */}
      </div>
    )
  }

  /*
  * Render the checkbox for weights.
  */
  renderWeightsCheckbox () {
    if (this.state.weights.length === 0) {
      return (
        <label>
          <input
            onChange={(event) => {
              this.props.toggleDisabled(!event.target.checked)
              this.setState({noWeights: event.target.checked})
            }}
            type='checkbox'
            checked={this.state.noWeights}
          /> Weights were not provided on the syllabus.
        </label>
      )
    }
  }

  /*
  * Get the total weight value.
  *
  * @return [Number] totalWeight. The accumlated percentages.
  */
  getTotalWeight () {
    let totalWeight = 0
    this.state.weights.forEach(item => {
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
    let totalWeight = this.getTotalWeight()
    if (cl.is_points) {
      if (!this.state.totalPoints) return false
      totalWeight = (totalWeight / this.state.totalPoints) * 100
    }
    return (totalWeight <= 101 && totalWeight >= 99)
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
      this.setState({reset: false})
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
      this.setState({weights: newWeights})
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
    const {viewOnly} = this.state

    return (
      <div>
        {viewOnly && <a className='right-text' onClick={() => this.setState({viewOnly: false}) }>edit</a>}
        {this.renderContent()}
      </div>
    )
  }
}

Weights.propTypes = {
  disabled: PropTypes.bool,
  disableNext: PropTypes.bool,
  isReview: PropTypes.bool,
  toggleDisabled: PropTypes.func,
  weights: PropTypes.array,
  onUpdateClass: PropTypes.func,
  cl: PropTypes.object
}

export default Weights
