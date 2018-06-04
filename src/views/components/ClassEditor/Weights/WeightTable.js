import React from 'react'
import PropTypes from 'prop-types'

class WeightTable extends React.Component {
  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow (item, index) {
    const {id, name, weight} = item
    const {currentWeight, viewOnly, cl} = this.props

    const activeClass = (currentWeight && currentWeight.id) === id
      ? 'active' : ''

    return (
      <div
        className={`table-row ${activeClass}`}
        key={`weight-${index}`}
        onClick={() => {
          if (viewOnly) return
          this.props.onSelectWeight(item)
        }}
      >
        {!viewOnly &&
          <div className='col-xs-1'>
            <div
              className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                /* if (disabled) return */
                this.props.onDeleteWeight(item)
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
  * Get the total weight value.
  *
  * @return [Number] totalWeight. The accumlated percentages.
  */
  getTotalWeight () {
    const {weights} = this.props
    let totalWeight = 0
    weights.forEach(item => {
      totalWeight += Number(item.weight)
    })
    return totalWeight
  }

  /*
  * Render the weights for a given class.
  */
  renderWeights () {
    const {weights} = this.props
    // sort weights by created at
    return weights.sort((a, b) => {
      return a.inserted_at > b.inserted_at
    }).map((weight, index) =>
      this.getRow(weight, index)
    )
  }

  /*
  * Render total percentage
  *
  */
  renderTotalPercentage () {
    const total = this.getTotalWeight()
    const {viewOnly, cl} = this.props
    const totalPoints = viewOnly ? total : `${total}/${this.props.totalPoints}`

    return (
      <div className='row'>
        <div className='col-xs-9'>
          <span>Total*:</span>
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

  render () {
    const {viewOnly} = this.props

    return (
      <div id='class-editor-weight-table' className={`${viewOnly ? 'view-only' : ''}`}>
        <div ref={(field) => { this.sectionControl = field }}>
          {this.renderWeights()}
          <div id='class-weights-total'>
            {this.renderTotalPercentage()}
          </div>
        </div>
      </div>
    )
  }
}

WeightTable.propTypes = {
  viewOnly: PropTypes.bool,
  weights: PropTypes.array.isRequired,
  currentWeight: PropTypes.object,
  cl: PropTypes.object,
  onSelectWeight: PropTypes.func,
  onDeleteWeight: PropTypes.func,
  totalPoints: PropTypes.number,
  hasIssues: PropTypes.bool,
  onSelectIssue: PropTypes.func
}

export default WeightTable
