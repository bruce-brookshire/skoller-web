import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

const headers = [
  {
    field: 'userLink',
    display: 'User'
  },
  {
    field: 'content',
    display: 'Content'
  },
  {
    field: 'actions',
    display: 'Actions'
  },
]

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
  onAccountSelect(data) {
    browserHistory.push({pathname: '/hub/accounts/account/info', state: {data.user}})
  }


  /*
  * Deletes the given post from the class and updates the posts on success
  */
  onDeletePost(data) {
    actions.chat.deleteClassPost(this.props.cl,data.post).then((cl) => {
      this.initPosts()
    })
  }

  /*
  * Row data to be passed to the grid
  *
  * @return [Array]. Array of formatted row data.
  */
  getRows () {
    return this.state.posts.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  /*
  * Contructs <a> link to user account page
  * @return [Object]. user content
  */
  userLink(post) {
    return post.user ? (
      <a onClick={() => { this.onAccountSelect(post.user) }}>{`${item.user.name_first} ${item.user.name_last}`}</a>
    ) : '-'
  }

  /*
  * Formats row data to be passed to the grid for display
  *
  * @param [Object] item. Row data to be formatted.
  * @param [Number] index. Index of row data.
  * @return [Object] row. Object of formatted row data for display in grid.
  */
  mapRow (item, index) {
    const { id } = item

    const row = {
      id: id || '',
      actions: <a onClick={() => { this.onDeletePost(item) }}><i className='fa fa-trash cn-red'/></a>,
      userLink: this.userLink(item),
      content: item.post ? item.post : '',
      user: item.user,
      post: item,
    }

    return row
  }

  render () {
    return (
      <div className='margin-top-2x margin-bottom-2x'>
        <Grid
          headers={headers}
          rows={this.getRows()}
          canDelete={true}
          canSelect={true}
          onDelete={this.onDeletePost.bind(this)}
          onSelect={this.onAccountSelect.bind(this)}
        />
      </div>
    )
  }
}

Chat.propTypes = {
  cl: PropTypes.object,
}

export default Chat
