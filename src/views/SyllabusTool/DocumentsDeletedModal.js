import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../../components/Modal'
import {CheckboxField, TextAreaField} from '../../components/Form'
import actions from '../../actions'

class DocumentsDeletedModal extends React.Component {
  constructor (props) {
    super(props)
    this.options = ['Turn class status back to upload syllabus',
                    'This class has no syllabus']
    this.state = { value: null }
  }

  componentWillMount () {
  }

  /*
  * Handle checkbox change.
  */
  onCheckboxChange (name,checked,value) {
    if (checked) {
      this.setState({value: value})
    } else {
      this.setState({value: null})
    }
  }

  onSubmit(){
    console.log('submitted')
  }

  renderFormOptions(){
    let ind = 0
    return this.options.map((opt) => {
      ind++
      return (
        <CheckboxField
        checked={this.state.val === opt}
        value={this.state.val === opt}
        label={opt}
        name='deleted_documents_modal'
        onChange={(name,checked) => this.onCheckboxChange(name,checked,opt)}
        key={ind}/>
      )
    })
  }

  renderForm(){
    return (
      <div>
        <h4 className="center-text">You have deleted all the files for this class.</h4>
        {this.renderFormOptions()}
      </div>
    )
  }

  render () {
    const {cl} = this.props
    return (
      <Modal
        open={this.props.open}
        onClose={() => this.props.onClose()}>
        <div>
          {this.renderForm()}
          <button
            className={`button full-width margin-top ${this.state.value ? '' : 'disabled'}`}
            onClick={() => { this.onSubmit() }}>Submit
          </button>
        </div>
      </Modal>
    )
  }
}

DocumentsDeletedModal.propTypes = {
  cl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
}

export default DocumentsDeletedModal
