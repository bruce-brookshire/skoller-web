import React from 'react'
import PropTypes from 'prop-types'
import Loading from '../../../components/Loading'
import {inject, observer} from 'mobx-react'
import {browserHistory} from 'react-router'
import actions from '../../../actions'

@inject('rootStore') @observer
class GradeEntry extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  /////////////////////////
  ///////// INIT //////////
  /////////////////////////

  componentWillMount () {
    this.getData()
  }

  componentWillUnmount () {
  }

  /*
  * Initialize state
  */
  initializeState () {
    return {
      loading: false,
    }
  }

  ////////////////////////////
  ///////// ACTIONS //////////
  ////////////////////////////

  /*
  * Get analytics data
  */
  getData () {
    console.log('get data')
    // this.setState({loading:true})
    // actions.schools.getAllSchools().then(schools => {
      // this.setState({schools,loading:false})
    // }).catch(() => false)
  }

  ///////////////////////////
  ///////// RENDER //////////
  ///////////////////////////

  render () {
    return (
      null
    )
  }
}

GradeEntry.propTypes = {
  audience: PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
            ]).isRequired,
  max: PropTypes.string,
  min: PropTypes.string,
}

export default GradeEntry
