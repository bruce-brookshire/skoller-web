import React from 'react'
import PropTypes from 'prop-types'
import AutoComplete from '../../../components/AutoComplete'

class SearchProfessor extends React.Component {
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
    this.props.onAddProfessor()
  }

  render () {
    return (
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
    )
  }
}

SearchProfessor.propTypes = {
  onAddProfessor: PropTypes.func
}

export default SearchProfessor
