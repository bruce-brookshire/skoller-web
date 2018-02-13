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
  * Deletes the given post from the class and updates the posts on success
  */
  onDeletePost(post) {
    actions.chat.deleteClassPost(this.props.cl,post).then((cl) => {
      this.initPosts()
    })
  }

  /*
  * Renders comments for the given post
  */
  renderComments(post) {
    if(post && post.comments && post.comments.length > 0){
      return post.comments.map((c) => {
        return (
          <div className='post-comment'>
            <Post post={c} type={'comment'} key={c.id}/>
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
    return this.state.posts.map((p) => {
      return (
        <div className='posts-container'>
          <Post post={p} type={'post'} key={p.id}/>
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
      return comment.replies.map((r) => {
        return (
          <div className='post-reply'>
            <Post post={r} type={'reply'} key={r.id}/>
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
