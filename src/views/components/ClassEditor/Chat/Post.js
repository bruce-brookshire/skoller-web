import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {convertUTCDatetimeToDateString, mapTimeToDisplay} from '../../../../utilities/time'

class Post extends React.Component {
  constructor (props) {
    super(props)
    this.post = props.post
    this.student = this.post.student
    this.user = this.student && this.student.user ? this.student.user : null
  }

  renderContent () {
    if (this.post) {
      if (this.props.type === 'post') {
        return this.post.post
      } else if (this.props.type === 'comment') {
        return this.post.comment
      } else if (this.props.type === 'reply') {
        return this.post.reply
      } else {
        return '-'
      }
    } else { return '-' }
  }

  onAccountSelect () {
    let state = {user: {student: this.student, ...this.user}}
    this.props.history.push({pathname: '/hub/accounts/account/info', state: state})
  }

  render () {
    return (
      <div className={`chat-post ${this.props.type}`}>
        <div className='post-header row'>
          <div className='col-xs-6'>
            {this.user && this.user.pic_path ? (<img src={this.user.pic_path}></img>) : null}
            {this.user ? (<a onClick={this.onAccountSelect.bind(this)}>{`${this.student.name_first} ${this.student.name_last}`}</a>) : null}
          </div>
          <div className='col-xs-6 right-text'>
            {this.post.inserted_at ? (<span>{convertUTCDatetimeToDateString(this.post.inserted_at, 'America/Chicago') + ' ' + mapTimeToDisplay(this.post.inserted_at)}</span>) : null}
          </div>
        </div>
        <div className='post-content'>
          {this.renderContent()}
        </div>
        <div className='post-footer row'>
          <div className='post-likes col-xs-6'>
            {this.props.showLikes && <i className='fa fa-thumbs-up'></i>}
            {this.props.showLikes && <span>{this.post.likes ? this.post.likes.length : 0}</span>}
          </div>
          <div className='post-actions col-xs-6 right-text'>
            <i className='fa fa-trash cn-red cursor' onClick={() => this.props.onDelete()}></i>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  onDelete: PropTypes.func,
  post: PropTypes.object,
  type: PropTypes.string,
  showLikes: PropTypes.bool
}

export default withRouter(Post)
