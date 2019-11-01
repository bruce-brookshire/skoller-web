import React from 'react'
import PropTypes from 'prop-types'
import SkSelectDropDown from '../../components/SkSelectDropDown'
import actions from '../../../actions'
import Sammi from '../../components/Sammi'
import {inject, observer} from 'mobx-react'
import SkLoader from '../../../assets/sk-icons/SkLoader'
import {showSnackbar} from '../../../utilities/snackbar'

@inject('rootStore') @observer
class MajorForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loadingFieldsOfStudy: false,
      options: [],
      selections: [],
      showDropDown: false,
      query: null
    }
  }

  async queryFieldsOfStudy (query) {
    this.setState({loadingFieldsOfStudy: true})
    actions.fieldsofstudy.getFieldsOfStudy(query).then((r) => {
      this.setState({options: r})
    })
    this.setState({loadingFieldsOfStudy: false})
  }

  renderOptionsMap () {
    let options = this.state.options
    let i = 0
    return (
      options.map(option => {
        i += 1
        return (
          <div
            className='sk-major-form-option'
            key={i}
            onClick={() => {
              let selections = this.state.selections
              selections.push(option)
              this.setState({selections: selections, query: null})
              this.toggleDropDown()
            }}
          >
            {option.field}
          </div>
        )
      })
    )
  }

  toggleDropDown () {
    this.setState({showDropDown: !this.state.showDropDown})
  }

  onInputChange = (e) => {
    this.queryFieldsOfStudy(e.target.value)
    this.setState({query: e.target.value})
  }

  async onSubmit () {
    this.setState({loading: true})
    const user = this.props.rootStore.userStore.user
    await this.state.selections.forEach(major => {
      actions.students.setStudentMajor(user.id, user.student.id, major.id)
        .catch(() => {
          this.setState({loading: false})
        })
    })
    this.props.onSubmit()
    showSnackbar('Successfully added your major!', 'success')
  }

  renderDropDown () {
    return (
      <SkSelectDropDown
        optionsMap={() => this.renderOptionsMap()}
        show={(this.state.showDropDown && this.state.options.length !== 0)}
        toggle={() => this.toggleDropDown()}
      />
    )
  }

  renderSelection () {
    let i = 0
    return (
      <div
        className='sk-major-form-selections'
      >
        <p>
          {this.state.selections.map(major => {
            i += 1
            return (
              <span
                key={i}
                className='sk-major-form-selection'
                onClick={() => {
                  let selections = this.state.selections
                  selections.splice(selections.indexOf(major), 1)
                  this.setState({selections: selections})
                }}
              >
                {major.field}{this.state.selections.length > 1 && i !== this.state.selections.length ? ', ' : ''}
              </span>
            )
          })}
        </p>
      </div>
    )
  }

  renderInput () {
    return (
      <div className='sk-major-form-search'>
        <i className='fas fa-search' />
        <input
          ref = {input => { this.input = input }}
          className='sk-major-form-input'
          placeholder='Search for your major'
          onClick={() => this.toggleDropDown()}
          value={this.state.query}
          onChange={(e) => {
            this.onInputChange(e)
          }}
        />
      </div>
    )
  }

  renderSubmit () {
    let disabled = true
    if (this.state.selections.length > 0) {
      disabled = false
    }
    return (
      <div
        className={'sk-major-form-submit' + (disabled ? ' disabled' : '')}
        onClick={() => {
          if (!disabled) {
            this.onSubmit()
          }
        }}
      >
        <p>
          Submit
        </p>
      </div>
    )
  }

  render () {
    if (this.state.loading) {
      return (
        <SkLoader />
      )
    } else {
      return (
        <div className='sk-major-form'>
          <Sammi
            message='Add your major(s) to Skoller!'
            position='left'
            emotion='happy'
          />
          {this.renderInput()}
          {this.renderDropDown()}
          {this.state.selections.length > 0 &&
            this.renderSelection()
          }
          {this.renderSubmit()}
        </div>
      )
    }
  }
}

MajorForm.propTypes = {
  rootStore: PropTypes.object,
  onSubmit: PropTypes.function
}

export default MajorForm
