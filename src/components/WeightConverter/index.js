import React from 'react'
import PropTypes from 'prop-types'

class WeightConverter extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      val_converter: '0'
    }
  }


  toggleConverter (e) {
    let obj = {};
    if(e.target.value > .5){
      obj[e.target.name] = 1;
    }
    else{
      obj[e.target.name] = 0;
    }
    this.setState(obj);
  }

  render () {
    return (
      <div id={this.props.id}>
        <span>
          <div className='converter-titles-container'>
            <span className='converter-titles'>
              Percentages
            </span>
            <span className='converter-titles'>
              Points
            </span>
          </div>
          <div>
              <input type="range" min="0" max="1" step=".01" name="val_converter" className='weight-converter-bar' value={this.state.val_converter} onChange={(e) => {this.toggleConverter(e)}} />
          </div>
        </span>
      </div>
    )
  }
}



export default WeightConverter
