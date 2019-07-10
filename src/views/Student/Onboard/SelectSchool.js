import React from 'react'
import SkProgressBar from '../../components/SkProgressBar'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'
import CreateSchoolModal from '../FindClasses/CreateSchoolModal'
import SkModal from '../../components/SkModal/SkModal';

@inject('rootStore') @observer
class SelectSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      schools: [],
      schoolFieldWidth: null,
      loading: true,
      schoolChoice: null,
      showCreateSchoolModal: false,
      input: null
    }
  }

  componentDidMount () {
    this.setState({schoolFieldWidth: this.schoolField.offsetWidth, loading: false})
  }

  searchSchools (value) {
    this.setState({loading: true})
    if (value) {
      this.setState({loading: true, value})
      actions.schools.searchSchools(value).then((schools) => {
        this.setState({schools, loading: false})
      }).catch(() => { this.setState({loading: false}) })
    } else {
      this.setState({schools: [], loading: false})
    }
  }

  renderAutoComplete (school) {
    return (
      ((this.state.loading)
        ? null
        : <div
          style={{
            width: (this.state.schoolFieldWidth - 10).toString()
          }}
        >
          {this.state.schools.map((school) => {
            return (
              <div
                key={school.id}
                className='sk-select-school-choice'
                style={{
                  width: (this.state.schoolFieldWidth - 10).toString()
                }}
                onClick={() => {
                  this.setState({
                    schools: [],
                    schoolChoice: school.name,
                    input: null
                  })
                }}
              >
                <h3>{school.name}</h3>
                <p>{`${school.adr_locality}, ${school.adr_region}`}</p>
              </div>
            )
          }
          )}
          <a
            style={{width: (this.state.schoolFieldWidth - 10).toString()}}
            // className='sk-select-school-create-new'
            onClick={() => this.setState({showCreateSchoolModal: true})}
          >
            Create a new school called {this.state.input}
          </a>
        </div>
      )
    )
  }

  renderSchool () {
    return (
      <div className='sk-select-school'>
        <div className='sk-select-school-label'>School</div>
        {this.state.schoolChoice
          ? <div className='sk-select-school-field' onClick={() => this.setState({schoolChoice: null})}>{this.state.schoolChoice}</div>
          : <div
            className='sk-select-school-field'
            ref={schoolField => { this.schoolField = schoolField } }
            contentEditable={true}
            onInput={e => {
              this.searchSchools(e.currentTarget.textContent)
              this.setState({input: e.currentTarget.textContent})
            }}
          />
        }
        {((this.state.schools.length > 0 || this.state.input) && !this.state.loading)
          ? <div className='sk-select-school-autocomplete-container' contentEditable={false}>
            {this.renderAutoComplete()}
          </div>
          : null
        }
      </div>
    )
  }

  render () {
    return (
      <div>
        <SkProgressBar progress={0.25} width={'100%'} backgroundColor={'$cn-color-blue'}/>
        <div className='onboard-select-school'>
          <h1>Meet Sammi 👋</h1>
          <div className="onboard-select-school-sammi-container">
            <div className="sammi-message"><p>I found your school!</p></div>
            <img src='/src/assets/images/sammi/Smile@3x.png' />
          </div>
        </div>
        {this.renderSchool()}
        <div className='onboard-next' onClick={() => this.props.onSubmit()}>
          <p>Next</p>
        </div>
        {this.state.showCreateSchoolModal
          ? <SkModal closeModal={() => this.setState({showCreateSchoolModal: false})}>
            <CreateSchoolModal
              name={this.state.input}
              // onSubmit={this.onSubmitSchool.bind(this)}
            />
          </SkModal>
          : null
        }
      </div>
    )
  }
}

SelectSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object
}

export default SelectSchool
