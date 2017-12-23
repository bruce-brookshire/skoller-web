import React from 'react'
import PropTypes from 'prop-types'
import PointTotal from './PointTotal'
import WeightConverter from '../../../../components/WeightConverter/index'
import WeightForm from './WeightForm'
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
    const {cl, isReview} = this.props
    return {
      currentWeight: null,
      isPoints: cl.is_points,
      totalPoints: null,
      weights: [],
      viewOnly: isReview
    }
  }

  /*
  * Render point total input if needed.
  * Otherwise render the table
  */
  renderContent () {
    const {cl} = this.props
    const {isPoints, totalPoints, viewOnly} = this.state
    if (isPoints && !totalPoints && !viewOnly) {
      return (
        <PointTotal
          cl={cl}
          onChange={this.onChangeTotalPoints.bind(this)}
          totalPoints={this.state.totalPoints}
        />
      )
    }

    return this.renderWeightsContent()
  }

  /*
  * Render the weights and weight form.
  */
  renderWeightsContent () {
    const {viewOnly} = this.state
    return (
      <div className='space-between-vertical'>
        <div className={`class-editor-table ${viewOnly ? 'view-only' : ''}`}>
          <div id='class-editor-weights-table' className=''>
            {this.renderWeights()}
          </div>
          <div id='class-weights-total'>
            {this.renderTotalPercentage()}
          </div>
        </div>
        {!viewOnly && this.renderWeightForm()}
      </div>
    )
  }

  /*
  * Render the weights for a given class.
  */
  renderWeights () {
    if (this.state.weights.length === 0) {
      return <div className='center-text margin-top'>
        <span>There are currently no weights for this class.</span>
      </div>
    }
    return this.state.weights.map((weight, index) =>
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

    const activeClass = (currentWeight && currentWeight.id) === id
      ? 'active' : ''

    return (
      <div
        className={`row table-row ${activeClass}`}
        key={`weight-${index}`}
        onClick={() => {
          if (viewOnly) return
          this.onSelectWeight(item)
        }}
      >
        {!viewOnly &&
          <div className='col-xs-1'>
            <div
              className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                this.onDeleteWeight(item)
              }}><i className='fa fa-times' />
            </div>
          </div>
        }
        <div className={viewOnly ? 'col-xs-10' : 'col-xs-9'}>
          <span>{name}</span>
        </div>
        <div className='col-xs-2 right-text'>
          <span>{weight}{!this.state.isPoints ? '%' : ''}</span>
        </div>
      </div>
    )
  }


  /*
  * Render weight form.
  */
  renderWeightForm () {
    return (
      <WeightForm
        cl={this.props.cl}
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
    const totalPoints = this.state.viewOnly ?
      total / total * 100 : `${this.getTotalWeight()}/${this.state.totalPoints}`

    return (
      <div className='row'>
        <div className='col-xs-9'>
          <span>{!this.state.isPoints ? 'Total:' : 'Total points'}</span>
        </div>
        <div className='col-xs-3 right-text'>
          <span>
            {
              !this.state.isPoints
                ? `${total.toFixed(2)}%`
                : totalPoints
            }</span>
        </div>
      </div>
    )
  }

  /*
  * Render the slider
  */
  renderWeightSlider () {
    if (this.state.weights.length === 0) {
      return (
        <div className='full-width'>
          <WeightConverter id='class-editor-weight-converter' onChange={this.onToggleConverter.bind(this)} value={this.state.isPoints}/>
        </div>
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
    let totalWeight = this.getTotalWeight()
    if (this.state.isPoints) {
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
  onToggleConverter () {
    const {cl} = this.props
    const isPoints = !this.state.isPoints
    actions.classes.updateClass({id: cl.id, is_points: isPoints}).then((cl) => {
      this.setState({isPoints})
    }).catch(() => false)
  }

  /*
  * On create weight, push weight onto array
  *
  * @param [Object] weight. Weight.
  */
  onCreateWeight (weight) {
    const newWeights = this.state.weights
    newWeights.push(weight)
    this.setState({weights: newWeights, currentWeight: null})
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
    // Disable the parents submit button if weights are not secure.
    // let {disableNext} = this.props
    // if (!this.isTotalWeightSecure() && !disableNext) {
    //   this.props.toggleDisabled(true)
    // } else if (this.isTotalWeightSecure() && disableNext) {
    //   this.props.toggleDisabled(false)
    // }

    const {viewOnly} = this.state

    return (
      <div className='space-between-vertical'>
        {viewOnly && <h2>Weights for {this.props.cl.name}</h2>}
        {viewOnly && <a className='right-text' style={{marginBottom: '5px'}} onClick={() => this.setState({viewOnly: false}) }>edit</a>}
        {this.renderContent()}
        {!viewOnly && this.renderWeightSlider()}
      </div>
    )
  }
}

Weights.propTypes = {
  cl: PropTypes.object,
  disableNext: PropTypes.bool,
  isReview: PropTypes.bool,
  toggleDisabled: PropTypes.func
}

export default Weights
