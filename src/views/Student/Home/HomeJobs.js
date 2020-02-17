import React from 'react'
import {inject, observer} from 'mobx-react'
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop'
import SkSelect from '../../components/SkSelect'
import actions from '../../../actions'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import PropTypes from 'prop-types'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import { withRouter } from 'react-router-dom'
import JobsLogo from '../../../assets/images/jobs/skoller-jobs-logo.png'

@inject('rootStore') @observer
class HomeJobs extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: !this.props.rootStore.studentJobsStore.hasJobsProfile,
      resume: null,
      majors: [],
      beginningMajors: [],
      gradMonthChoice: 'May',
      gradYearChoice: '2020',
      gradDegreeChoice: null,
      degreeTypes: [],
      loading: true,
      loadingFieldsOfStudy: false,
      addMajor: false,
      options: [],
      error: null,
      job_search_type: null,
      jobSearchOptions: []
    }
    this.getFormData()
  }

  async getFormData () {
    await actions.jobs.getSearchTypes().then(r => {
      this.setState({jobSearchOptions: r})
    })
    await actions.jobs.getDegreeTypes()
      .then((data) => {
        this.setState({degreeTypes: data})
      })
      .catch((e) => {
        console.log(e)
      })
    let majors = []
    let beginningMajors = []
    majors = this.props.user.student.fields_of_study.slice().sort()
    beginningMajors = this.props.user.student.fields_of_study.slice().sort()
    let gradDegreeChoice = this.state.degreeTypes[0]
    this.setState({loading: false, gradDegreeChoice, majors, beginningMajors})
  }

  async queryFieldsOfStudy (query) {
    this.setState({loadingFieldsOfStudy: true})
    actions.fieldsofstudy.getFieldsOfStudy(query).then((r) => {
      this.setState({options: r})
    })
    this.setState({loadingFieldsOfStudy: false})
  }

  renderLogo (white = false) {
    if (white) {
      return (
        <span>
          <span style={{fontWeight: '900', color: 'white'}}>skoller</span>
          <span style={{fontWeight: '300', fontStyle: 'oblique', color: 'white'}}>Jobs</span>
        </span>
      )
    } else {
      return (
        <span>
          <span style={{fontWeight: '900', color: '#55B9E5'}}>skoller</span>
          <span style={{fontWeight: '300', fontStyle: 'oblique', color: '#4ADD58'}}>Jobs</span>
        </span>
      )
    }
  }

  renderMonthsOptions () {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
      months.map(month => {
        return (
          <div
            key={months.indexOf(month)}
            onClick={() => {
              this.setState({gradMonthChoice: month})
            }}
            className='home-jobs-select-choice'
          >
            {month}
          </div>
        )
      })
    )
  }

  renderYearOptions () {
    let years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025']
    return (
      years.map(year => {
        return (
          <div
            key={years.indexOf(year)}
            onClick={() => {
              this.setState({gradYearChoice: year})
            }}
            className='home-jobs-select-choice'
          >
            {year}
          </div>
        )
      })
    )
  }

  renderDegreeOptions () {
    let degrees = this.state.degreeTypes
    return (
      degrees.map(degree => {
        return (
          <div
            key={degrees.indexOf(degree)}
            onClick={() => {
              this.setState({gradDegreeChoice: degree})
            }}
            className='home-jobs-select-choice'
          >
            {degree.name}
          </div>
        )
      })
    )
  }

  renderMajorOptions () {
    let options = this.state.options
    let i = 0
    return (
      options.map(option => {
        i += 1
        return (
          <div
            className='home-jobs-select-choice'
            key={i}
            onClick={() => {
              let majors = this.state.majors
              majors.push(option)
              this.setState({majors, majorInput: null, addMajor: false})
            }}
          >
            {option.field}
          </div>
        )
      })
    )
  }

  renderJobSearchTypeOptions () {
    let options = this.state.jobSearchOptions
    return (
      options.map(o => {
        return (
          <div
            key={options.indexOf(o)}
            className='home-jobs-select-choice'
            onClick={() => {
              this.setState({job_search_type: o})
            }}
          >
            {o.name}
          </div>
        )
      })
    )
  }

  async onSubmit () {
    this.setState({loading: true})
    let user = this.props.user
    let jobsForm = {
      job_search_type_id: this.state.job_search_type.id,
      graduation_date: new Date(this.state.gradMonthChoice + ' 1, ' + this.state.gradYearChoice + ' 00:00:00').toISOString()
    }
    let userForm = {
      grad_year: this.state.gradYearChoice,
      degree_type_id: this.state.gradDegreeChoice.id
    }

    // update student's grad year
    await actions.students.updateStudent(user.id, user.student.id, userForm)
      .catch(() => {
        this.setState({loading: false, error: 'Error saving graduation year. Try again later.'})
        throw new Error('Error saving grad year. Try again later.')
      })

    // update student's major(s)
    let majorIds = []
    this.state.majors.forEach(major => {
      majorIds.push(major.id)
    })

    await actions.students.setStudentMajors(user.id, user.student.id, majorIds)
      .catch(() => {
        this.setState({loading: false, error: 'Error saving majors. Try again later.'})
        throw new Error('Error saving majors. Try again later.')
      })

    // create jobs profile and save jobs ID
    let skollerJobsId
    await actions.jobs.createJobsProfile(jobsForm)
      .then((data) => {
        skollerJobsId = data.id
        // showSnackbar('Successfully joined SkollerJobs!', 'success')
      })
      .catch(e => {
        console.log(e)
        this.setState({loading: false, error: 'Error creating profile. Try again later.'})
        throw new Error('Error creating profile. Try again later.')
      })

    // upload resume
    await actions.jobs.uploadJobsDoc(skollerJobsId, this.state.resume[0], true)
      .then(() => {
        actions.jobs.getJobsProfile(this.props.user.id)
          .then((r) => {
            this.props.rootStore.studentJobsStore.profile = r
            this.props.rootStore.studentJobsStore.hasJobsProfile = true
            this.props.rootStore.studentJobsStore.firstOpen = true
            this.props.history.push({pathname: '/student/jobs'})
          })
      })
      .catch(e => {
        console.log(e)
        this.setState({loading: false, error: 'Error uploading résumé. Try again later.'})
      })
  }

  renderButton () {
    let disabled = this.state.majors.length === 0 ||
      this.state.resume === null ||
      !this.state.gradYearChoice ||
      !this.state.gradMonthChoice ||
      !this.state.gradDegreeChoice ||
      !this.state.job_search_type
    return (
      <div
        className={'home-jobs-button ' + (disabled ? 'disabled' : '')}
        onClick={() => {
          if (disabled) {
            return null
          } else {
            this.onSubmit()
          }
        }}
      >
        <p>Join Skoller Jobs</p>
      </div>
    )
  }

  renderError () {
    if (this.state.error) {
      return (
        <div className='error'>{this.state.error}</div>
      )
    } else {
      return null
    }
  }

  processFile (f) {
    let file = f[0]
    let fileExtension
    if (file.name.lastIndexOf('.') > 0) {
      fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
    }
    if (fileExtension.toLowerCase() !== 'pdf') {
      this.setState({error: 'Resume must be in PDF format.'})
    } else {
      this.setState({resume: f, error: null})
    }
  }

  renderContent () {
    return (
      <div className='home-jobs'>
        <p className='home-jobs-headline'>
          From the classroom to your dream career.
        </p>
        <div className='home-jobs-row'>
          <p className='home-jobs-label'>Upload your résumé</p>
          <div className='home-jobs-drag-and-drop'>
            <DragAndDrop
              handleDrop={(file) => { this.processFile(file) }}
              disabled={this.state.resume !== null}
              accept={'application/pdf'}
              textColor={'#6ED6AE'}
              backgroundColor={'#efeff4'}
            >
              {this.state.resume
                ? <div className='home-jobs-drag-and-drop-file'>
                  <i
                    className='far fa-times-circle'
                    onClick={(e) => {
                      e.stopPropagation()
                      this.setState({resume: null})
                    }}
                  />
                  <p>{this.state.resume[0].name}</p>
                </div>
                : <p>Drag and drop a PDF of your résumé here</p>
              }
            </DragAndDrop>
          </div>
        </div>
        <div className='home-jobs-row'>
          <div className='home-jobs-label'>What type of job are you seeking?</div>
          <SkSelect
            optionsMap={() => this.renderJobSearchTypeOptions()}
            selection={this.state.job_search_type ? this.state.job_search_type.name : 'Select one'}
            jobsMode={true}
          />
        </div>
        <div className='home-jobs-row'>
          <p className='home-jobs-label'>Graduation Details</p>
          <div className='home-jobs-grad-inputs'>
            <SkSelect
              optionsMap={() => this.renderMonthsOptions()}
              selection={this.state.gradMonthChoice}
              className='home-jobs-grad-month'
              jobsMode={true}
            />
            <SkSelect
              optionsMap={() => this.renderYearOptions()}
              selection={this.state.gradYearChoice}
              className='home-jobs-grad-year'
              jobsMode={true}
            />
            <p className='home-jobs-grad-text'>with a </p>
            <SkSelect
              optionsMap={() => this.renderDegreeOptions()}
              selection={this.state.gradDegreeChoice.name}
              className='home-jobs-grad-degree'
              jobsMode={true}
            />
            <p className='home-jobs-grad-text'>degree.</p>
          </div>
        </div>
        <div className='home-jobs-row'>
          <p className='home-jobs-label'>Major(s)</p>
          <div className='home-jobs-majors'>
            {this.state.majors.map(major => {
              return (
                <p
                  className='home-jobs-major-choice'
                  key={this.state.majors.indexOf(major)}
                  onClick={() => {
                    let index = this.state.majors.indexOf(major)
                    let majors = this.state.majors
                    majors.splice(index, 1)
                    this.setState({majors: majors})
                  }}
                >
                  {major.field}{this.state.majors.length > 1 && this.state.majors.indexOf(major) !== this.state.majors.length - 1 ? ',' : ''}
                </p>
              )
            })}
            {this.state.addMajor
              ? <input autoFocus={true} onChange={(e) => {
                this.setState({majorInput: e.target.value})
                this.queryFieldsOfStudy(e.target.value)
              }}
              />
              : <p className='home-jobs-major-add' onClick={() => this.setState({addMajor: true})}>Add {this.state.majors.length === 0 ? 'a major' : 'another major'}</p>
            }
          </div>
          <SkSelectDropDown
            optionsMap={() => this.renderMajorOptions()}
            show={(this.state.addMajor && this.state.options.length !== 0) && this.state.majorInput !== null}
            disableModalLogic={true}
            jobsMode={true}
          />
        </div>
        {this.renderButton()}
        {this.renderError()}
      </div>
    )
  }

  renderHomeCell () {
    return (
      <div className="home-shadow-box home-jobs-shadow-box margin-top">
        {/* <h1 className='home-heading' style={{cursor: 'default'}}>Jobs</h1> */}
        <img src={JobsLogo} style={{maxWidth: '216px', margin: '1rem 1rem 0 1rem'}} />
        <div className="home-card-content">
          {this.state.loading
            ? <SkLoader />
            : this.renderContent()
          }
        </div>
      </div>
    )
  }

  render () {
    if (this.state.show) {
      return (
        this.renderHomeCell()
      )
    } else {
      return (
        null
      )
    }
  }
}

HomeJobs.propTypes = {
  rootStore: PropTypes.object,
  updateStudent: PropTypes.func,
  user: PropTypes.object
}

export default withRouter(HomeJobs)
