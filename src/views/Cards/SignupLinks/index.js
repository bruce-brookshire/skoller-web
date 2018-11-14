import React from 'react'
import Card from '../../../components/Card'
import actions from '../../../actions'
import Loading from '../../../components/Loading'
import SignupLinkForm from './SignupLinkForm'
import Grid from '../../../components/Grid'
import Modal from '../../../components/Modal'
import LinkDetail from './LinkDetail'
import {convertUTCDatetimeToDateString} from '../../../utilities/time'

const headers = [
  {
    field: 'name',
    display: 'Name'
  },
  {
    field: 'link',
    display: 'Link'
  },
  {
    field: 'start',
    display: 'Start'
  },
  {
    field: 'end',
    display: 'End'
  },
  {
    field: 'count',
    display: 'Count'
  }
]

class SignupLinks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      links: [],
      currentLink: null,
      openLinkModal: false
    }
  }

  componentWillMount () {
    this.getCustomLinks()
  }

  getCustomLinks () {
    this.setState({loading: true})
    actions.signupLinks.getCustomLinks().then((links) => {
      this.setState({links, loading: false})
    }).catch(() => this.setState({loading: false}))
  }

  getRows () {
    const {links} = this.state
    return links.map((item, index) =>
      this.mapRow(item, index)
    )
  }

  mapRow (item) {
    const {name, link, start_date: start, end_date: end, signup_count: count, id} = item

    const row = {
      id: id,
      name: name,
      link: link,
      start: start ? convertUTCDatetimeToDateString(start, 'America/Chicago') : '',
      end: end ? convertUTCDatetimeToDateString(end, 'America/Chicago') : '',
      count: count
    }
    return row
  }

  onSelect (item) {
    this.setState({currentLink: item, openLinkModal: true})
  }

  renderLinkModal () {
    const {openLinkModal, currentLink} = this.state
    return (
      <Modal
        open={openLinkModal}
        onClose={() => this.setState({openLinkModal: false, currentLink: null})}
      >
        <div>
          <LinkDetail
            link={currentLink}
          />
          <div className='row'>
            <button
              className='button-invert full-width margin-top margin-bottom'
              onClick={() => this.setState({openLinkModal: false, currentLink: null})}
            > Close </button>
          </div>
        </div>
      </Modal>
    )
  }

  renderSignupLinksContent () {
    return (
      <div>
        <div className='cn-log-table'>
          <Grid
            className='striped'
            headers={headers}
            rows={this.getRows()}
            disabled={true}
            canDelete={false}
            canSelect={true}
            emptyMessage={'No links exist yet.'}
            deleteMessage={''}
            onSelect={this.onSelect.bind(this)}
          />
        </div>
        <SignupLinkForm
          onSubmit={this.getCustomLinks.bind(this)}
        />
      </div>
    )
  }

  render () {
    return (
      <div>
        <Card
          title='Signup Links'
          content={this.state.loading ? <Loading /> : this.renderSignupLinksContent()}
        />
        {this.state.currentLink && this.renderLinkModal()}
      </div>
    )
  }
}

export default SignupLinks
