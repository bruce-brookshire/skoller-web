import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

import Post from './Post'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  componentWillMount () {
    this.initPosts()
  }

  /*
  * Method for intializing the state.
  *
  * @return [Object]. State object.
  */
  initializeState () {
    return {
      loading: false,
      posts: [],
    }
  }

  /*
  * Get all posts for the class and populate state with them
  */
  initPosts() {
    actions.chat.getClassPosts(this.props.cl).then((posts) => {
      this.setState({posts})
    })
  }

  /*
  * Navigate to the account info page on clicking a user's account
  */
  onAccountSelect(user) {
    browserHistory.push({pathname: '/hub/accounts/account/info', state: {user}})
  }

  /*
  * Deletes the given comment from the class and updates the posts on success
  */
  onDeleteComment(comment) {
    actions.chat.deleteClassComment(this.props.cl,comment).then((cl) => {
      this.initPosts()
    })
  }

  /*
  * Deletes the given post from the class and updates the posts on success
  */
  onDeletePost(post) {
    actions.chat.deleteClassPost(this.props.cl,post).then((cl) => {
      this.initPosts()
    })
  }

  /*
  * Deletes the given comment from the class and updates the posts on success
  */
  onDeleteReply(reply) {
    actions.chat.deleteClassReply(this.props.cl,reply).then((cl) => {
      this.initPosts()
    })
  }

  /*
  * Renders comments for the given post
  */
  renderComments(post) {
    if(post && post.comments && post.comments.length > 0){
      return post.comments.sort((a, b) => {
        return a.inserted_at > b.inserted_at
      }).map((c) => {
        return (
          <div className='post-comment' key={`comment${c.id}`}>
            <Post post={c} type={'comment'} onDelete={() => this.onDeleteComment(c)}/>
            <div className='post-replies'>
              {this.renderReplies(c)}
            </div>
          </div>
        )
      })
    }else{ return null }
  }

  /*
  * Renders posts from the array held in state
  */
  renderPosts() {
    return this.state.posts.sort((a, b) => {
      return a.inserted_at > b.inserted_at
    }).map((p) => {
      return (
        <div className='posts-container' key={`post${p.id}`}>
          <Post post={p} type={'post'} onDelete={() => this.onDeletePost(p)}/>
          <div className='post-comments'>
            {this.renderComments(p)}
          </div>
        </div>
      )
    })
  }

  /*
  * Renders replies for the given comment
  */
  renderReplies(comment) {
    if(comment && comment.replies && comment.replies.length > 0){
      return comment.replies.sort((a, b) => {
        return a.inserted_at > b.inserted_at
      }).map((r) => {
        return (
          <div className='post-reply' key={`reply${r.id}`}>
            <Post post={r} type={'reply'} onDelete={() => this.onDeleteReply(r)}/>
            {this.renderReplies(r)}
          </div>
        )
      })
    }else{ return null }
  }

  render () {
    return (
      <div className='chat margin-top-2x margin-bottom-2x'>
        {this.renderPosts()}
      </div>
    )
  }
}

Chat.propTypes = {
  cl: PropTypes.object,
}

export default Chat
