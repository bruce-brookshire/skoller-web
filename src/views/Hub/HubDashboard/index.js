import React from 'react'
import { withRouter } from 'react-router-dom'
import ClassSearch from './ClassSearch'
import Grid from '../../../components/Grid'
import Loading from '../../../components/Loading'
import actions from '../../../actions'
import {mapProfessor} from '../../../utilities/display'
import {mapTimeToDisplay} from '../../../utilities/time'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import { action } from 'mobx'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import TH from './TH'

const headers = [
  {
    field: 'name',
    display: 'School'
  },
  {
    field: 'subject',
    display: 'Subject'
  },
  {
    field: 'code',
    display: 'Code'
  },
  {
    field: 'section',
    display: 'Section'
  },
  {
    field: 'name',
    display: 'Class Name'
  },
  {
    field: 'enrolled',
    display: 'Enrollment'
  },
  {
    field: 'professor',
    display: 'Professor'
  },
  {
    field: 'days',
    display: 'Days'
  },
  {
    field: 'beginTime',
    display: 'Start time'
  },
  {
    field: 'status',
    display: 'Status'
  },
  {
    field: 'period',
    display: 'Period'
  }
]

@inject('rootStore') @observer
class HubDashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      classes: [],
      changeClasses: [],
      loading: false,
      activeTab: 'review',
      activeSorter: null,
      sortConfig: {
        name: 'sort',
        school: 'sort',
        premium: 'sort',
        trial: 'sort',
        expired: 'sort',
        received: 'sort',
        days_left: 'sort'
      }
    }
    this.props.rootStore.navStore.setActivePage('hub/dashboard')
  }

  componentDidMount () {
    this.getClasses('')
    this.getChangeClasses()
  }
  /*

  /*
  * Get the classes for class search
  *
  * @param [String] queryString. String to query classes.
  */
  getClasses (queryString) {
    this.setState({loading: true})
    actions.classes.getInReviewClasses(queryString).then(classes => {
      this.setState({classes, loading: false})
    }).catch(() => { this.setState({loading: false}) })
  }

  getChangeClasses () {
    actions.classes.getChangeClasses().then(classes => {
      this.setState({changeClasses: classes})
    })
  }

  getCsv () {
    actions.classes.getClassesCsv().then(csv => {
      let blob = new Blob([csv], {type: 'text/csv'}) // eslint-disable-line no-undef
      let url = window.URL.createObjectURL(blob)
      var downloadLink = document.createElement('a')
      downloadLink.href = url
      var today = new Date()
      downloadLink.download = 'Classes-' + today.getFullYear() + '_' + (today.getMonth() + 1) + '_' + today.getDate() + '_' + today.getHours() + '_' + today.getMinutes() + '.csv'

      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    })
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */

  getRows () {
    console.log(this.state.classes, '----')
    return this.state.classes.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const {id, school, code, subject, section, name, enrolled, meet_start_time: startTime,
      meet_days: days, professor, status, period_name: period} = item

    const row = {
      id: id || '',
      school: (school && school.name) || 'TBA',
      subject: subject || '-',
      code: code || '-',
      section: section || '-',
      name: name || '-',
      enrollment: enrolled || 0,
      professor: professor ? mapProfessor(professor) : 'TBA',
      days: days || 'TBA',
      beginTime: days !== 'Online' ? (startTime ? mapTimeToDisplay(startTime) : 'TBA') : 'Online',
      status: status ? this.mapStatus(status) : '-',
      period: period || ''
    }

    return row
  }

  /*

  /*
  * Map the class status to ui
  *
  * @param [String] status. Class status.
  */
  mapStatus (status) {
    if (status) {
      status = status.toLowerCase()
    }
    if (status === 'needs setup') {
      return <span className='cn-red'>UPLOAD SYLLABUS</span>
    } else if (status === 'syllabus submitted') {
      return <span className = 'cn-grey'>RECEIVED</span>
    } else if (status === 'needs student input') {
      return <span className='cn-red'> NEEDS STUDENT HELP</span>
    } else if (status === 'class issue') {
      return <span className='cn-red'> CHANGE REQ</span>
    } else if (status === 'class setup') {
      return <span className='cn-green' >COMPLETED</span>
    }
    return status
  }

  onCreateClass () {

  }
  onSort (key) {
    if (this.state.sortConfig[`${key}`] === 'sort') {
      this.setState({sortConfig: {...this.state.sortConfig, [key]: 'sort-up' }}, () => {
        if (this.state.activeTab === 'review') {
          this.setState({classes: this.state.classes.sort((a, b) => {
            if (typeof a[`${key}`] === 'object') {
              if (!a[`${key}`]) return 0
              return a[`${key}`].name > b[`${key}`].name ? 1 : a[`${key}`].name < b[`${key}`].name ? -1 : 0
            } else {
              return a[`${key}`] > b[`${key}`] ? 1 : a[`${key}`] < b[`${key}`] ? -1 : 0
            }
          })})
        } else if (this.state.activeTab === 'change') {
          this.setState({changeClasses: this.state.changeClasses.sort((a, b) => {
            if (typeof a[`${key}`] === 'object') {
              if (!a[`${key}`]) return 0
              return a[`${key}`].name > b[`${key}`].name ? 1 : a[`${key}`].name < b[`${key}`].name ? -1 : 0
            } else {
              return a[`${key}`] > b[`${key}`] ? 1 : a[`${key}`] < b[`${key}`] ? -1 : 0
            }
          })})
        }
      })
    } else if (this.state.sortConfig[`${key}`] === 'sort-up') {
      this.setState({sortConfig: {...this.state.sortConfig, [key]: 'sort-down' }}, () => {
        if (this.state.activeTab === 'review') {
        //   this.setState({classes: this.state.classes.sort((a, b) => b[`${key}`] > a[`${key}`] ? 1 : -1)})
          this.setState({classes: this.state.classes.sort((a, b) => {
            if (typeof a[`${key}`] === 'object') {
              if (!a[`${key}`]) return 0
              return b[`${key}`].name > a[`${key}`].name ? 1 : b[`${key}`].name < a[`${key}`].name ? -1 : 0
            } else {
              return b[`${key}`] > a[`${key}`] ? 1 : b[`${key}`] < a[`${key}`] ? -1 : 0
            }
          })})
        } else if (this.state.activeTab === 'change') {
          this.setState({changeClasses: this.state.changeClasses.sort((a, b) => {
            if (typeof a[`${key}`] === 'object') {
              if (!a[`${key}`]) return 0
              return b[`${key}`].name > a[`${key}`].name ? 1 : b[`${key}`].name < a[`${key}`].name ? -1 : 0
            } else {
              return b[`${key}`] > a[`${key}`] ? 1 : b[`${key}`] < a[`${key}`] ? -1 : 0
            }
          })})
        //   this.setState({changeClasses: this.state.classes.sort((a, b) => b[`${key}`] > a[`${key}`] ? 1 : -1)})
        }
      })
    } else if (this.state.sortConfig[`${key}`] === 'sort-down') {
      this.setState({sortConfig: {...this.state.sortConfig, [key]: 'sort' }}, () => {
        if (this.state.activeTab === 'review') {
          this.setState({classes: this.state.classes})
        } else if (this.state.activeTab === 'change') {
          this.setState({changeClasses: this.state.changeClasses})
        }
      })
    }
    this.setState({activeSorter: key})
  }

  getClassList () {
    const data = this.state.activeTab === 'review' ? this.state.classes : this.state.changeClasses
    return (
      <tbody>
        {
          data.map((item, index) => (
            <tr
              key={item.id}
              style={{cursor: 'pointer'}}
              onClick={() => {
                this.props.history.push({
                  pathname: `/class/${item.id}/syllabus_tool/`,
                  state: {
                    isDIY: true
                    // isInsights: this.props.isInsights
                  }
                })
              }}
            >
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.school.name}</td>
              <td>{item.premium ? item.premium : 0}</td>
              <td>{item.trial ? item.premium : 0}</td>
              <td>{item.expired ? item.premium : 0}</td>
              <td>{item.received ? item.received : '-'}</td>
              <td>{item.days_left ? Math.ceil(item.days_left) : '-'}</td>
            </tr>))

        }
      </tbody>
    )
  }
  /*
  * On edit class.
  *
  * @param [Object] cl. Class to edit.
  */
  onEditClass (cl) {
    this.props.history.push({
      pathname: `/class/${cl.id}/admin`
    })
  }

  getHeaderText (state) {
    if (state.needsChange) {
      return 'Completed classes with a change request'
    } else if (state.needsMaint) {
      return 'Classes currently under maintenance'
    }
  }

  renderHeader_bkp () {
    const {state} = this.props.location
    // If the class is in any of these states, don't show the search bar
    const boole = state && (state.needsChange || state.needsMaint)
    return boole ? (
      <div className='margin-bottom'>
        <h2 className='center-text' style={{marginBottom: 0}}>{this.getHeaderText(state)}</h2>
        <ClassSearch {...this.props} loading={this.state.loading}
          onSearch={this.getClasses.bind(this)} hidden={true}/>
        <div className='margin-top'>
          <span className='total right'>Total results: {this.state.classes.length}</span>
        </div>
      </div>
    ) : (
      <div className='margin-bottom'>
        <h2 className='center-text' style={{marginBottom: 0}}>Class Search</h2>
        <ClassSearch {...this.props} loading={this.state.loading}
          onSearch={this.getClasses.bind(this)}/>
        <div className='margin-top'>
          {/* <a onClick={this.onCreateClass.bind(this)}>Create new class </a> */}
          <a className='margin-left' onClick={this.getCsv.bind(this)}>Get Class CSV</a>
          <span className='description'>Manage classes from this page</span>
          <span className='total right'>Total results: {this.state.classes.length}</span>
          <br />
          <span className='max right'>Max Results: 500</span>
        </div>
      </div>
    )
  }

  renderHeader () {
    const {state} = this.props.location
    // If the class is in any of these states, don't show the search bar
    const boole = state && (state.needsChange || state.needsMaint)
    return boole ? (
      <div>
        <ClassSearch {...this.props} loading={this.state.loading}
          onSearch={this.getClasses.bind(this)} hidden={true}/>
        <div className='margin-top'>
          <span className='total right'>Total results: {this.state.classes.length}</span>
        </div>
      </div>
    ) : (
      <div>
        <ClassSearch {...this.props} loading={this.state.loading}
          onSearch={this.getClasses.bind(this)}/>
      </div>
    )
  }

  render () {
    return (
      <div className='cn-classes-container'>
        {/* {this.renderHeader()} */}
        {/* {this.state.loading
          ? <div className='center-text'><Loading /></div>
          : <Grid
            className='cn-classes-table'
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={false}
            canSelect={true}
            emptyMessage={'Search for classes using the controls above.'}
            onSelect={this.onEditClass.bind(this)}
          />
        } */}

        <div className="table-wrap">
          <div className="table-inner">
            <div className="table-head">
              <div className="row">
                <div className="col-md-8">
                  <div className="head-left">
                    <h3><i className="fas fa-book"></i> &nbsp; Class</h3>
                    <span className={`badge ${this.state.activeTab === 'review' ? 'badge-primary' : 'badge-light'}`}
                      onClick={() => this.setState({activeTab: 'review'})}
                    >In Review ({this.state.classes.length + 1})</span>
                    <span
                      onClick={() => this.setState({activeTab: 'change'})}
                      className={`badge ${this.state.activeTab === 'change' ? 'badge-primary' : 'badge-light'}`}>Class Changes ({this.state.changeClasses.length + 1})</span>
                  </div>
                </div>
                <div className="col-md-4">
                  {this.renderHeader()}
                </div>
              </div>
            </div>
            <div className="tabledata-wrap">
              <div className="table-inner">
                <table className="table" cellPadding="0" cellSpacing="0">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">ID</th>
                      <TH title="Class Name" icon={`fa fa-${this.state.sortConfig.name}`}onClick={() => this.onSort('name')}/>
                      <TH title="School" icon={`fa fa-${this.state.sortConfig.school}`} onClick={() => this.onSort('school')}/>
                      <TH title="Premium" icon={`fa fa-${this.state.sortConfig.premium}`} onClick={() => this.onSort('premium')}/>
                      <TH title="Trial" icon={`fa fa-${this.state.sortConfig.trial}`} onClick={() => this.onSort('trial')}/>
                      <TH title="Expired" icon={`fa fa-${this.state.sortConfig.expired}`} onClick={() => this.onSort('expired')}/>
                      <TH title="Received" icon={`fa fa-${this.state.sortConfig.received}`} onClick={() => this.onSort('received')}/>
                      <TH title="Days Left" icon={`fa fa-${this.state.sortConfig.days_left}`} onClick={() => this.onSort('days_left')}/>
                    </tr>
                  </thead>
                  {
                    this.state.loading
                      ? <div className={'sk-loader'} style={{marginLeft: '717%'}}>
                        <div id='ball-1' className='circle'></div>
                        <div id='ball-2' className='circle'></div>
                        <div id='ball-3' className='circle'></div>
                      </div>
                      : this.getClassList()
                  }
                  {/* {this.getClassList()} */}

                </table>

              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

HubDashboard.propTypes = {
  rootStore: PropTypes.object,
  location: PropTypes.object
}

export default withRouter(HubDashboard)
