import React from 'react'
import PropTypes from 'prop-types'

class WeightTable extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = this.initializeState()
  // }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  */
  getRow (item, index) {
    const {id, name, weight} = item
    const {currentWeight, viewOnly, cl, disabled} = this.props

    const activeClass = (currentWeight && currentWeight.id) === id
      ? 'active' : ''

    return (
      <div
        className={`row table-row ${activeClass}`}
        key={`weight-${index}`}
        onClick={() => {
          if (viewOnly || disabled) return
          this.props.onSelectWeight(item)
        }}
      >
        {!viewOnly &&
          <div className='col-xs-1'>
            <div
              className='button-delete-x center-content'
              onClick={(event) => {
                event.stopPropagation()
                if (disabled) return
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
  * Render the weights for a given class.
  */
  renderWeights () {
    const {weights} = this.props
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

  render () {
    const {viewOnly} = this.props

    return (
      <div className={`class-editor-table ${viewOnly ? 'view-only' : ''}`}>
        <div id='class-editor-weights-table' className='' ref={(field) => { this.sectionControl = field }}>
          {this.renderWeights()}
        </div>
      </div>
    )
  }
}

WeightTable.propTypes = {
  viewOnly: PropTypes.bool,
  weights: PropTypes.array,
  currentWeight: PropTypes.object,
  disabled: PropTypes.bool,
  cl: PropTypes.object,
  onSelectWeight: PropTypes.func,
  onDeleteWeight: PropTypes.func
}

export default WeightTable
