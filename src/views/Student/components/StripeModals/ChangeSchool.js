import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../../actions'
import CreateSchoolModal from '../../FindClasses/CreateSchoolModal'
import SkModal from '../../../components/SkModal/SkModal'
import moment from 'moment'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

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
      <div>
        Payment Plan Modal
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
