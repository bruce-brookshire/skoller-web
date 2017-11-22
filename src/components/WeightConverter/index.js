import React from 'react'
import PropTypes from 'prop-types'

class WeightConverter extends React.Component {


  render () {
    // return (
    //   <div id={this.props.id}>
    //     <span>
    //       <div className='converter-titles-container'>
    //         <span className='converter-titles'>
    //           Percentages
    //         </span>
    //         <span className='converter-titles'>
    //           Points
    //         </span>
    //       </div>
    //       <div>
    //           <input className='weight-converter-bar' type='range' min='1' max='2'/>
    //       </div>
    //     </span>
    //   </div>
    // )
    const classes = ['ball']
    if (this.props.value) classes.push('active')

    return (
      <div className='cn-weight-converter' onClick={() => this.props.onChange()}>
        <div className='slider full-width round'>
          <div className={classes.join(' ')}/>
        </div>
      </div>
    )
  }
}



export default WeightConverter
