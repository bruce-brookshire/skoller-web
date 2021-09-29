import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'


@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
     
    }

  }


  componentDidMount () {
   
  }



  render () {
    let disableNext = false
    if ((!this.state.termChoice || !this.state.activeTerm) && (!this.state.schoolChoice)) {
      disableNext = true
    }
    return (
      
    <div className="popup-wrap poup-sm">
        <div className="popup-closetext"> 
            <div className="popup-msg margin-bottom"> 
                <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt=""></img>
                <p> You have the premium account with no recurring charges. This has been setup by skiller administrator! </p>
            </div>
            <button type="button" class="btn btn-primary full-width margin-top"><strong>Close</strong></button>
        </div>
     </div>

    )
  }
}

ChangeSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  backData: PropTypes.object
}

export default ChangeSchool
