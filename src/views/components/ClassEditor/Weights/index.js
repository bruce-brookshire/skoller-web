import React from 'react'
import PropTypes from 'prop-types'
import PointTotal from './PointTotal'
import WeightConverter from '../../../../components/WeightConverter/index'
import WeightForm from './WeightForm'
import WeightType from './WeightType'
import actions from '../../../../actions'
import stores from '../../../../stores'

const {navbarStore} = stores

class Weights extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /*
  * Fetch the weights for a given class
  */
  componentWillMount () {
    const {disabled, isReview} = this.props
    const {cl} = navbarStore
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
      }
      else if (!this.isTotalWeightSecure() && !disableNext) {
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
    const {cl} = navbarStore
    const {totalPoints, viewOnly, disabled, reset, weights} = this.state

    if (((!cl.is_points && !totalPoints && weights.length === 0) || reset) && !viewOnly && !disabled) {
      // ask for weights or points
      return (
        <div style={{display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <WeightType
            isPoints={cl.is_points}
            onSubmit={this.onTypeSelection.bind(this)}
          />
        </div>
      )
    } else if (cl.is_points && !totalPoints && !viewOnly && !disabled) {
      // ask for total points
      return (
        <div style={{display: 'flex', flex: '1', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <PointTotal
            onChange={this.onChangeTotalPoints.bind(this)}
            totalPoints={this.state.totalPoints}
            reset={() => this.setState({reset: true})}
          />
        </div>
      )
    } else {
      return this.renderWeightsContent()
    }
  }

  /*
  * Render the weights and weight form.
  */
  renderWeightsContent () {
    const {viewOnly} = this.state
    return (
      <div style={{display: 'flex', flex: '1', flexDirection: 'column'}}>
        <div className={`class-editor-table ${viewOnly ? 'view-only' : ''}`}>
          <div id='class-editor-weights-table' className='' ref={(field) => { this.sectionControl = field }}>
            {this.renderWeights()}
          </div>
          <div id='class-weights-total'>
            {this.renderTotalPercentage()}
          </div>
        </div>
        {!viewOnly && this.renderWeightsCheckbox()}
        {!viewOnly && this.renderWeightForm()}
      </div>
    )
  }

  /*
  * Render the weights for a given class.
  */
  renderWeights () {
    const weights = this.state.weights
    if (weights.length === 0) {
      return <div className='center-text margin-top'>
        <span>There are currently no weights for this class.</span>
      </div>
    }
    // sort weights by created at
    return weights.sort((a, b) => {
      return a.inserted_at > b.inserted_at
    }).map((weight, index) =>
      this.getRow(weight, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow (item, index) {
    const {id, name, weight} = item
    const {currentWeight, viewOnly} = this.state
    const {disabled} = this.props
    const {cl} = navbarStore

    const activeClass = (currentWeight && currentWeight.id) === id
      ? 'active' : ''

    return (
      <div
        className={`row table-row ${activeClass}`}
        key={`weight-${index}`}
        onClick={() => {
          if (viewOnly || disabled) return
          this.onSelectWeight(item)
        }}
      >
        {!viewOnly &&
          <div className='col-xs-1'>
            <div
              className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                if (disabled) return
                this.onDeleteWeight(item)
              }}><i className='fa fa-times' />
            </div>
          </div>
        }
        <div className={viewOnly ? 'col-xs-10' : 'col-xs-9'}>
          <span>{name}</span>
        </div>
        <div className='col-xs-2 right-text'>
          <span>{weight}{!cl.is_points ? '%' : ''}</span>
        </div>
      </div>
    )
  }

  /*
  * Render weight form.
  */
  renderWeightForm () {
    const {cl} = navbarStore
    return (
      <WeightForm
        cl={cl}
        onCreateWeight={this.onCreateWeight.bind(this)}
        onUpdateWeight={this.onUpdateWeight.bind(this)}
        weight={this.state.currentWeight}
      />
    )
  }

  /*
  * Render total percentage
  *
  */
  renderTotalPercentage () {
    const total = this.getTotalWeight()
    const totalPoints = this.state.viewOnly ? total : `${total}/${this.state.totalPoints}`
    const {cl} = navbarStore

    return (
      <div id='class-editor-weights-total' className='row'>
        <div className='col-xs-9'>
          <span>{!cl.is_points ? 'Total:' : 'Total points'}</span>
        </div>
        <div className='col-xs-3 right-text'>
          <span>
            {
              !cl.is_points
                ? `${total.toFixed(2)}%`
                : totalPoints
            }</span>
        </div>
      </div>
    )
  }

  /*
  * Render the checkbox for weights.
  */
  renderWeightsCheckbox () {
    if (this.state.weights.length === 0) {
      return (
        <label style={{marginTop: '2px'}}>
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
    const {cl} = navbarStore
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
    const {cl} = navbarStore

    if (isPoints) {
      this.setState({reset: false})
    } else {
      this.setState({totalPoints: 100, reset: false})
    }
    navbarStore.cl.is_points = isPoints
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
      <div style={{display: 'flex', flex: '1', flexDirection: 'column'}}>
        {viewOnly && <a className='right-text' style={{marginBottom: '5px'}} onClick={() => this.setState({viewOnly: false}) }>edit</a>}
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
  onUpdateClass: PropTypes.func
}

export default Weights
