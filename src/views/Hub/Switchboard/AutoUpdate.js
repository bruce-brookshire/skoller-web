import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../components/Form'
import actions from '../../../actions'
import Grid from '../../../components/Grid'
import {roundToTwo} from '../../../utilities/display'

const requiredFields = {
  'auto_upd_enroll_thresh': {
    type: 'required'
  },
  'auto_upd_response_thresh': {
    type: 'required'
  },
  'auto_upd_approval_thresh': {
    type: 'required'
  }
}

const headers = [
  {
    field: 'creators',
    display: 'Creators'
  },
  {
    field: 'followers',
    display: 'Followers'
  },
  {
    field: 'pending',
    display: 'Pending'
  },
  {
    field: 'joyriders',
    display: 'Joyriders'
  }
]

class AutoUpdate extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }
  
  initializeState () {
    return {
      form: this.initializeFormData(),
      loading: false,
      people: this.props.data.people,
      metrics: this.props.data.metrics
    }
  }

  initializeFormData() {
    return {
      auto_upd_enroll_thresh: this.findSetting("auto_upd_enroll_thresh"),
      auto_upd_response_thresh: this.findSetting("auto_upd_response_thresh") * 100,
      auto_upd_approval_thresh: this.findSetting("auto_upd_approval_thresh") * 100
    }
  }

  forecast () {
    const {form} = this.state
    let queryString =`auto_upd_approval_thresh=${form.auto_upd_approval_thresh / 100}` + 
    `&auto_upd_response_thresh=${form.auto_upd_response_thresh / 100}` + 
    `&auto_upd_enroll_thresh=${form.auto_upd_enroll_thresh}` 

    this.setState({loading: true})
    actions.settings.forecastAutoUpdateInfo(queryString).then((data) => {
      this.setState({people: data.people, metrics: data.metrics, loading: false})
    }).catch(() => false)
  }

  findSetting (key) {
    return this.props.data.settings.find(x => x.name == key).value
  }

  getRows () {
    const {people} = this.state

    const row = [{
      creators: people.creators,
      followers: people.followers,
      pending: people.pending,
      joyriders: people.joyriders
    }]

    return row
  }

  mapFormData() {
    const {form} = this.state;

    let array = []

    Object.keys(form).forEach((k) => {
      let obj = {
        name: k,
        value: k == "auto_upd_response_thresh" || k == "auto_upd_approval_thresh" ? (form[k] / 100).toString() : form[k]
      }
      array.push(obj)
    })

    return array;
  }

  /*
  * On submit post notification
  */
  onSubmit (event) {
    event.preventDefault()

    if (this.props.validateForm(this.state.form, requiredFields)) {

      const data = this.mapFormData()
      
      actions.settings.updateAutoUpdateInfo(data).then(() => {
        this.props.onSubmit()
        this.initializeFormData()
      }).catch(() => false)
    }
  }

  maskPercentage (oldNum, newNum) {
    if (newNum > 100 || newNum <= 0) return oldNum

    if (newNum.indexOf('.') != -1) return oldNum

    return newNum
  }

  renderPercentage(item1, item2) {
    return (
      <div>
        {roundToTwo((item1 / item2) * 100)}% ({item1} out of {item2})
      </div>
    )
  }

  render () {
    const {form} = this.state
    const {formErrors, updateProperty} = this.props
    const {metrics} = this.state

    return (
      <div>
        <h1 className='cn-auto-update-header'>Auto Update Dashboard</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='cn-auto-update-row'>
                <div className='cn-auto-update-row-title'><strong><u>Level 1: Enrollment</u></strong></div>
                <div className='cn-auto-update-row-input'>
                  <InputField
                    containerClassName='cn-auto-update-input'
                    error={formErrors.auto_upd_enroll_thresh}
                    name="auto_upd_enroll_thresh"
                    onChange={updateProperty}
                    value={form.auto_upd_enroll_thresh} />
                </div>
                {this.renderPercentage(metrics.actual_metrics.eligible_communities, metrics.max_metrics.eligible_communities)}&nbsp;
                <span>
                  of <u><i>eligible communities</i></u> have enrollment that qualifies for auto-updates.
                </span>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='cn-auto-update-row'>
                <div className='cn-auto-update-row-title'><strong><u>Level 2: Response</u></strong></div>
                <div className='cn-auto-update-row-input'>
                <InputField
                  containerClassName='cn-auto-update-input'
                  error={formErrors.auto_upd_response_thresh}
                  name="auto_upd_response_thresh"
                  onChange={(name, value) => {
                    updateProperty(name, this.maskPercentage(form.auto_upd_response_thresh, value))
                  }}
                  value={form.auto_upd_response_thresh} />%
                </div>
                {this.renderPercentage(metrics.actual_metrics.shared_mods, metrics.max_metrics.shared_mods)}&nbsp;
                <span>
                  of <u><i>shared mods</i></u> pass the response threshold.
                </span>
              </div>
            </div>
            <div className='col-xs-12'>
              <div className='cn-auto-update-row'>
                <div className='cn-auto-update-row-title'><strong><u>Level 3: Copies</u></strong></div>
                <div className='cn-auto-update-row-input'>
                  <InputField
                    containerClassName='cn-auto-update-input'
                    error={formErrors.auto_upd_approval_thresh}
                    name="auto_upd_approval_thresh"
                    onChange={(name, value) => {
                      updateProperty(name, this.maskPercentage(form.auto_upd_approval_thresh, value))
                    }}
                    value={form.auto_upd_approval_thresh} />%
                </div>
                {this.renderPercentage(metrics.actual_metrics.responded_mods, metrics.max_metrics.responded_mods)}&nbsp;
                <span>
                  of <u><i>responded mods</i></u> pass the copies threshold.
                </span>
              </div>
            </div>
            <div className='col-xs-12'>
              <h3 className="center-text">Summary</h3>
              <div className="cn-auto-update-summary">
                {this.renderPercentage(metrics.summary, metrics.max_metrics.responded_mods)}&nbsp;
                  <span>
                    of responded mods in eligible communities reach auto update.
                  </span>
              </div>
            </div>
            <div className='col-xs-12'>
              <Grid
                className='cn-auto-update-table'
                headers={headers}
                rows={this.getRows()}
                disabled={true}
                canDelete={false}
              />
            </div>
            <div className='col-xs-12'>
              <div className='cn-auto-update-summary'>
                <button
                  className={`button margin-right`}
                  disabled={this.state.loading}
                  onClick={() => this.forecast()}
                  type="button"
                >Forecast</button>
                <button
                  className={`button`}
                  disabled={this.state.loading}
                  type="submit"
                >Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

AutoUpdate.propTypes = {
  data: PropTypes.object,
  formErrors: PropTypes.object,
  updateProperty: PropTypes.func,
  onSubmit: PropTypes.func,
  validateForm: PropTypes.func
}

export default ValidateForm(Form(AutoUpdate, 'form'))