import React from 'react'
import PropTypes from 'prop-types'
import Post from '../../views/components/ClassEditor/Chat/Post'
import actions from '../../actions'

class AssignmentPosts extends React.Component {
  /*
  * Deletes the given post from the class and updates the posts on success
  */
  onDeletePost (post) {
    const {assignment} = this.props
    actions.assignments.deleteAssignmentPost(assignment.id, post.id).then(() => {
      this.props.onDelete(post)
    })
  }

  renderPosts () {
    const {posts} = this.props

    return posts.sort((a, b) => {
      return a.inserted_at > b.inserted_at
    }).map((p) => {
      return (
        <div className='posts-container' key={`post${p.id}`}>
          <Post
            post={p}
            type={'post'}
            showLikes={false}
            onDelete={() => this.onDeletePost(p)}/>
        </div>
      )
    })
  }

  /*
  * Renders content if there are no comments
  */
  renderNoPosts () {
    return (
      <h5 className='center-text'>Currently, there are no comments for this assignment.</h5>
    )
  }

  render () {
    const {posts} = this.props

    return (
      <div className='cn-shadow-box'>
        <div className='cn-shadow-box-content'>
          <div className='cn-card-title'>
            Comments
          </div>
          <div className='chat'>
            {posts.length > 0 ? (
              this.renderPosts()
            ) : this.renderNoPosts()}
          </div>
        </div>
      </div>
    )
  }
}

AssignmentPosts.propTypes = {
  assignment: PropTypes.object,
  posts: PropTypes.array,
  onDelete: PropTypes.func
}

export default AssignmentPosts
