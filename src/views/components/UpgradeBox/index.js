import React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../../../utilities/time'
import PopUp from '../../Student/Home/PopUp'

class UpgradeBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      popUp: { show: false, type: null }
    }
  }

  closePopUp () {
    console.log("I'm not closing")
    this.setState({ popUp: { show: false } })
  }

  renderTrialBox () {
    const { userStore } = this.props

    if (!userStore.user.lifetime_trial && !userStore.user.lifetime_subscription && userStore.user.trial) {
      return (
        <div className="upgradeBox">
          <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="60" />
          <div className="upgradeBox__text">
            {Math.ceil(+userStore.user.trial_days_left)} days left on<br/>Free Trial
          </div>
          <button
            onClick={() => {
              this.setState({ popUp: { type: 'PaymentPlans', show: true } })
            }}
          >Upgrade</button>
        </div>
      )
    }

    return null
  }

  renderExpiredBox () {
    const { userStore, userStore: { mySubscription } } = this.props

    if (!userStore.user.lifetime_trial && !userStore.user.lifetime_subscription && !userStore.user.trial && this.state.subscribed) {
      return (
        <div className="upgradeBox">
          <div className="upgradeBox__text">
            <img alt="Skoller" className='logo' src='/src/assets/images/sammi/Smile.png' height="60" />
            {(mySubscription && mySubscription.cancel_at_period_end) ? <h1>You cancelled your subscription</h1> : mySubscription && !mySubscription.cancel_at_period_end ? <h1>Cancel subscription</h1> : null}
          </div>
          {
            (mySubscription && mySubscription.cancel_at_period_end)
              ? <button
                onClick={() => {
                  this.setState({ popUp: { type: 'PaymentPlans', show: true } })
                }}
              >Upgrade</button>
              : mySubscription && !mySubscription.cancel_at_period_end
                ? <button
                  onClick={() => {
                    this.setState({ popUp: { type: 'CancelSubscription', show: true } })
                  }}
                >Cancel Subscription</button> : null

          }
          <span className="upgradeBox__subtext">Subscription ends {formatDate(this.getIntervalDate())}</span>
        </div>
      )
    }

    return null
  }

  renderPopup () {
    const { userStore } = this.props

    if (!this.state.popUp.show) {
      return null
    }

    return <PopUp
      closeModal={(userStore.user.trial || this.state.subscribed) ? () => this.closePopUp() : null}
      handleModalClose={() => this.closePopUp()}
      shouldAllowClose={this.state.subscribed || userStore.user.trial}
      type={this.state.popUp.type}
    />
  }

  render () {
    return (
      <React.Fragment>
        { this.renderPopup() }
        { this.renderTrialBox() }
        { this.renderExpiredBox() }
      </React.Fragment>
    )
  }
}

UpgradeBox.propTypes = {
  userStore: PropTypes.object
}

export default UpgradeBox
