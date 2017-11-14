import React from 'react'
import AutoComplete from '../../../components/AutoComplete'

class CreateClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      step: 0
    }
  }

  renderContent () {
    switch (this.state.step) {
      case 0:
        break
      default:
    }
  }

  renderRow (data, index, resetState) {
    return (
      <div className='cn-autocomplete-results' key={`result-${index}`}>
        <span>{data.name}</span>
      </div>
    )
  }

  getDataSource () {
    return []
  }

  onAddProfessor () {

  }

  render () {
    return (
      <div className='cn-create-class-container'>
        <div>
          <a onClick={() => this.props.onClose()} className='back'>Back to class search</a>
          <h4 className='cn-modal-header'>Create a new class</h4>
        </div>
        <div className='row margin-top'>
          <div className='col-xs-12 col-md-6 col-lg-4'>
            <h5>Who teaches this class?</h5>

            <AutoComplete
              placeholder='Search for your professor...'
              dataSource={this.getDataSource()}
              emptyMessage={<div className='cn-autocomplete-results'>{`Can't find your professor? `}<a onClick={this.onAddProfessor.bind(this)}>Add a new one.</a></div>}
              renderRow={this.renderRow.bind(this)}
            />
          </div>
        </div>

      </div>
    )
  }
}

export default CreateClass
