import React from 'react'
import PropTypes from 'prop-types'
import {Form, ValidateForm} from 'react-form-library'
import {InputField} from '../../../../components/Form'
import Grid from '../../../../components/Grid/index'
import Loading from '../../../../components/Loading'
import actions from '../../../../actions'

const headers = [
  {
    field: 'user',
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

  onAccountSelect (user) {
    browserHistory.push({pathname: '/hub/accounts/account/info', state: {user}})
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
      user: this.userLink(item),
      content: item.post ? item.post : '',
    }

    return {}
  }

  render () {
    return (
      <div className='margin-top-2x margin-bottom-2x'>
        <Grid
          headers={headers}
          rows={this.getRows()}
        />
      </div>
    )
  }
}

Chat.propTypes = {
  cl: PropTypes.object,
}

export default Chat
