import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import Grid from '../../../components/Grid'
import {browserHistory} from 'react-router'

const headers = [
  {
    field: 'name',
    display: 'Name'
  }
]

class FourDoorOverrides extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      schools: []
    }
  }

  componentWillMount () {
    this.getOverrides()
  }

  getOverrides () {
    this.setState({loading: true})
    actions.fourdoor.getFourDoorOverrides().then((schools) => {
      this.setState({schools, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  getRows () {
    const {schools} = this.state
    return schools.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {name, id} = item

    const row = {
      id: id,
      name: name
    }
    return row
  }

  onDeleteOverride (item) {
    actions.fourdoor.deleteOverride(item.id).then(() => {
      this.getOverrides()
    }).catch(() => false)
  }

  /*
  * On school select.
  */
  onSchoolSelect (school) {
    browserHistory.push({pathname: '/hub/schools/school/info', state: {school}})
  }

  renderContent () {
    return (
      <div className='cn-log-table'>
        <Grid
          className='striped'
          headers={headers}
          rows={this.getRows()}
          disabled={true}
          canDelete={true}
          canSelect={true}
          emptyMessage={'No overrides exist yet.'}
          deleteMessage={''}
          onDelete={this.onDeleteOverride.bind(this)}
          onSelect={this.onSchoolSelect.bind(this)}
        />
      </div>
    )
  }

  render () {
    return (
      <Card
        title='Four Door Overrides'
        content={this.state.loading
          ? <Loading />
          : this.renderContent()
        }
      />
    )
  }
}

export default FourDoorOverrides
