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
      selection: null,
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
              this.setState({selection: option, query: null})
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
    await actions.students.setStudentMajor(user.id, user.student.id, this.state.selection.id)
      .then(() => {
        this.props.onSubmit()
        showSnackbar('Successfully added your major!', 'success')
      })
      .catch(() => {
        this.setState({loading: false})
      })
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
    return (
      <div
        style={{color: '#57B9E4', cursor: 'pointer'}}
        className='sk-major-form-input'
        onClick={() => {
          this.setState({selection: null})
        }}
      >
        <div
          style={{marginTop: '4px', marginBottom: '-4px'}}
        >
          {this.state.selection.field}
        </div>
      </div>
    )
  }

  renderInput () {
    return (
      <input
        ref = {input => { this.input = input }}
        className='sk-major-form-input'
        placeholder='Find your major'
        onClick={() => this.toggleDropDown()}
        value={this.state.query}
        onChange={(e) => {
          this.onInputChange(e)
        }}
      />
    )
  }

  renderSubmit () {
    let disabled = true
    if (this.state.selection) {
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
            message='Add your major to Skoller!'
            position='left'
            emotion='happy'
          />
          {this.state.selection
            ? this.renderSelection()
            : this.renderInput()
          }
          {this.renderDropDown()}
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
