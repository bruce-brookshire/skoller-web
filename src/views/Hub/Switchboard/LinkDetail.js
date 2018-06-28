import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../actions'
import Grid from '../../../components/Grid'

const headers = [
  {
    field: 'email',
    display: 'Email'
  },
  {
    field: 'nameFirst',
    display: 'Fisrt Name'
  },
  {
    field: 'nameLast',
    display: 'Last Name'
  }
]

class LinkDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.initializeState()
  }

  initializeState () {
    return {
      link: null
    }
  }

  componentWillMount () {
    const {link} = this.props
    actions.signupLinks.getCustomLinkById(link.id).then((newLink) => {
      this.setState({link: newLink})
    }).catch(() => false)
  }

  getRows () {
    const {students} = this.state.link
    return students.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item, index) {
    const {name_first: nameFirst, name_last: nameLast, user, id} = item
    const {email} = user

    const row = {
      id: id,
      nameFirst: nameFirst,
      nameLast: nameLast,
      email: email
    }
    return row
  }

  render () {
    return <div>
      {this.state.link && <Grid
        className='striped'
        headers={headers}
        rows={this.getRows()}
        disabled={true}
        canDelete={false}
        canSelect={false}
        emptyMessage={'No students have used this yet.'}
      />}
    </div>
  }
}

LinkDetail.propTypes = {
  link: PropTypes.object.isRequired
}

export default LinkDetail
