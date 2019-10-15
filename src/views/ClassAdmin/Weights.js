import React from 'react'
import AdminWeightTable from '../components/ClassEditor/Weights/AdminWeightTable'
import AdminWeightForm from '../components/ClassEditor/Weights/AdminWeightForm'
import {SliderField} from '../../components/Form'
import PropTypes from 'prop-types'
import actions from '../../actions'
import AdminWeightChangeRequest from '../components/ClassEditor/Weights/AdminWeightChangeRequest';
import { changeRequestIsComplete } from '../../utilities/changeRequests';

class Weights extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isWeightsEditable: false,
      openWeightCreateModal: false,
      currentWeight: null,
      weights: this.props.cl.weights
    }
  }

  updateClass () {
    this.props.getClass()
  }

  toggleIsPoints () {
    const {cl} = this.props
    actions.classes.updateClass({id: cl.id, is_points: !cl.is_points}).then((cl) => {
      this.updateClass()
    }).catch(() => false)
  }

  toggleWeightCreateModal () {
    this.setState({openWeightCreateModal: !this.state.openWeightCreateModal})
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
    this.setState({weights: newWeights, currentWeight: null, openWeightCreateModal: false})
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
  * Set form value equal to weight in order to be edited.
  *
  * @param [Object] weight. Weight object to be edited.
  */
  onSelectWeight (weight) {
    this.setState({currentWeight: weight, openWeightCreateModal: true})
  }

  /*
  * On create weight, push weight onto array
  *
  * @param [Object] weight. Weight.
  */
  onCreateWeight (weight) {
    const newWeights = this.state.weights
    newWeights.push(weight)
    this.setState({weights: newWeights, currentWeight: null, openWeightCreateModal: false})
  }

  renderWeights () {
    const {isWeightsEditable, weights, currentWeight} = this.state
    const cl = this.props.cl
    return (
      <div id='cn-admin-weight-table' className='class-card'>
        <div id='cn-admin-weight-table-content'>
          <div className='cn-admin-weight-table-title'>
            Weights
            <div>
              {this.state.openWeightCreateModal
                ? <i className='fa fa-times cn-blue cursor margin-right' onClick={() => this.toggleWeightCreateModal()} />
                : <i className='fa fa-plus cn-blue cursor margin-right' onClick={() => this.toggleWeightCreateModal()} />
              }
              {this.state.isWeightsEditable
                ? <i className='fas fa-pencil-alt cn-blue cursor' onClick={() => this.setState({isWeightsEditable: !isWeightsEditable})} />
                : <i className='fas fa-pencil-alt cursor' style={{color: 'rgba(0,0,0,0.3)'}} onClick={() => this.setState({isWeightsEditable: !isWeightsEditable})} />
              }
            </div>
          </div>
          {this.state.openWeightCreateModal &&
            this.renderWeightForm()
          }
          <div className='cn-space-between-row margin-bottom'>
            Points?
            <SliderField
              name='isPointSlider'
              onChange={this.toggleIsPoints.bind(this)}
              value={cl.is_points}
            />
          </div>
          <AdminWeightTable
            cl={cl}
            viewOnly={!isWeightsEditable}
            weights={weights}
            onDeleteWeight={this.onDeleteWeight.bind(this)}
            currentWeight={currentWeight}
            onSelectWeight={this.onSelectWeight.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderWeightForm () {
    const {currentWeight} = this.state
    const cl = this.props.cl
    return (
      <AdminWeightForm
        cl={cl}
        weight={currentWeight}
        onCreateWeight={this.onCreateWeight.bind(this)}
        onUpdateWeight={this.onUpdateWeight.bind(this)}
      />
    )
  }

  renderChangeRequests () {
    let crs = []
    this.props.cl.change_requests.forEach(cr => {
      if (cr.change_type.id === 200 && !changeRequestIsComplete(cr)) {
        crs.push(cr)
      }
    })
    if (crs.length > 0) {
      return (
        <div className='hub-weights-change-requests'>
          <AdminWeightChangeRequest
            cl={this.props.cl}
            crs={crs}
            onChange={() => this.props.onChange()}
          />
        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='hub-weights'>
        {this.renderWeights()}
        {this.renderChangeRequests()}
      </div>
    )
  }
}

Weights.propTypes = {
  cl: PropTypes.object,
  getClass: PropTypes.func,
  onChange: PropTypes.func
}

export default Weights
