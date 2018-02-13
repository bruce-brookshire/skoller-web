import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'
import {mapTimeToDisplay} from '../../../../utilities/time'

class Post extends React.Component {
  constructor (props) {
    super(props)
    this.student = props.post.student
    this.user = this.student && this.student.users && this.student.users[0] ? this.student.users[0] : null
  }

  onDelete(){

  }

  render () {
    return (
      <div className='chat-post'>
        <div className='header row'>
          <div className='col-xs-6 left'>
            {this.user && this.user.avatar ? (<img src={this.user.avatar}></img>) : null}
            {this.user ? (<span>{`${this.student.name_first} ${this.student.name_last}`}</span>)}
          </div>
          <div className='col-xs-6 right'>
          </div>
        </div>
        <div className='content'>
          {this.props.post && this.props.post.post ? this.props.post.post : '-'}
        </div>
        <div className='footer'>
          <div className='post-likes'>
            <i className='fa fa-thumbs-up'></i>
            <span>{this.props.post.likes ? this.props.post.likes.length : 0}</span>
          </div>
          <div className='post-actions'>
            <i className='fa fa-trash cn-red' onClick={() => this.onDelete()}></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
