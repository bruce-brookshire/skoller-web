import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import actions from '../../../../actions'
import { loadStripe } from '@stripe/stripe-js'
import AlternativePayment from './AlternativePayment'
const stripePromise = loadStripe('pk_test_51JHvLoGtOURsTxunH2YZl8bG4pvpTQUKRoTVXjqEtZUFR8SsgUIMps4qGBl9OrPYiAGEy8dlAiRATkrRnRUiHMMa00xYgr7qtu')
// const stripePromise = loadStripe('pk_live_51JHvLoGtOURsTxunmypyAUNfbRF4jOahklknp1RTBHhxpy3qEveFU7lCWdrBt4YggE5ytlblCgYYHPPzsLC0Gf8K00NC7FWyoh')

@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedSubscription: '',
      selected_price: '',
      plans: [],
      lifetimeProduct: null
    }
  }

  componentDidMount () {
    actions.stripe.getAvailablePlansAndProducts()
      .then((res) => {
        console.log(res.data.plans[0])
        const plansIntervals = res.data.plans.map(item => item.interval)
        const yearlyPlan = res.data.plans[plansIntervals.indexOf('year')]
        const monthlyPlan = res.data.plans[plansIntervals.indexOf('month')]
        // Uncomment when lifetime product worked out on backend
        // Have to create a PaymentIntent for it as it's a one-time deal, not a subscription
        // const lifetimeProduct = {
        //   active: res.data.products[0].product.active,
        //   amount: res.data.products[0].price,
        //   price: res.data.products[0].price / 100,
        //   product: res.data.products[0].product.id,
        //   id: res.data.products[0].product.default_price,
        //   type: 'one-time'
        // }

        this.setState({selectedSubscription: res.data.plans[0]})
        this.setState({ plans: [ monthlyPlan, yearlyPlan ] })
        // Uncomment when lifetime product worked out on backend
        // Have to create a PaymentIntent for it as it's a one-time deal, not a subscription
        // this.setState({ plans: [ monthlyPlan, yearlyPlan, lifetimeProduct ] })
      })
      .catch((e) => {
        console.log(e)
      })
  }

    closeModal = () => {
      this.props.closeModal()
      return null
    }

    selectPlan (id) {
      this.setState({ selectedSubscription: id })
    }
    setPrice (price) {
      this.setState({ selected_price: price })
    }

    simplifiedFunction () {

    }
    getPlans () {
      let plans = this.state.plans

      return (
        <ul>
          {plans.map((row, i) => (
            (this.state.selectedSubscription === row.id)
              ? <li className="highlight {(i == 0) ? 'first-item':((i == (plans.length -1) ? 'last-item':'stext-lgray'))}" onClick={() => {
                this.selectPlan(row.id)
                this.setPrice(row.price)
              }}>
                {
                  row.interval ? <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} Per {row.interval}
                    {row.price === 30 ? <span style={{color: '#60BBE2'}}>
                    Most popular - Save 20%

                    </span> : null}
                  </span> : <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} Lifetime <span style={{color: '#60BBE2'}}>
                    Save 50%

                  </span></span>
                }
              </li> : <li className="{(i == 0) ? 'first-item':((i == (plans.length -1) ? 'last-item':'stext-lgray'))}" onClick={() => {
                this.selectPlan(row.id)
                this.setPrice(row.price)
              }}>
                {
                  row.interval ? <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} Per {row.interval}

                    {row.price === 30 ? <span style={{color: '#60BBE2'}}>
                    Most popular - Save 20%

                    </span> : null}</span> : <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} Lifetime <span style={{color: '#60BBE2'}}>
                    Save 50%

                  </span></span>
                }
              </li>
          ))}
        </ul>
      )
    }

    render () {
      return (

        <div className="popup-wrap poup-md">
          <div className="popup-closetext">
            <div className="popup-msg">
              <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" style={{ maxWidth: '34px' }}></img>
              {
                this.props.rootStore.userStore.user.trial
                  ? <h2>Your free trial expires in {Math.ceil(+this.props.rootStore.userStore.user.trial_days_left)} days</h2>
                  : (!this.props.rootStore.userStore.user.trial && !this.props.rootStore.userStore.mySubscription)
                    ? <h2>Your 7-day trial has expired!</h2>
                    : this.props.rootStore.userStore.mySubscription.cancel_at_period_end
                      ? <h2>Your recurring subscription was cancelled</h2>
                      : <h2></h2>
              }
              <p> Upgrade to premium for Skoller&apos;s syllabus setup service and unlimited access to our platform.</p>
            </div>
            <div className="row">
              <div className="col-md-12" style={{width: '100%'}}>
                <div className="listgroup-wrap margin-bottom">
                  <h4 className="divider-title"><span>Select a Plan</span></h4>
                  <div className="group-list">

                    <ul>
                      {this.getPlans()}
                    </ul>
                  </div>
                </div>
                {
                  <div className="listgroup-wrap margin-bottom margin-top">
                    <h4 className="divider-title"><span>Pay with Card</span></h4>

                    <Elements stripe={stripePromise}>
                      <CheckoutForm selectedSubscription={this.state.selectedSubscription} price={this.state} simplifiedFunction={this.simplifiedFunction} myprops={this.props}/>
                    </Elements>

                  </div>
                }
                {
                  <div className="listgroup-wrap margin-bottom margin-top">
                    <Elements stripe={stripePromise}>
                      {/* Below are for live stripe products */}
                      {this.state.selected_price === 30 ? <AlternativePayment title="Yearly subscription" price={30} selectedSubscription={this.state.selectedSubscription} myprops={this.props}/> : null}
                      {this.state.selected_price === 3 ? <AlternativePayment title="Monthly subscription " price={3} selectedSubscription={this.state.selectedSubscription} myprops={this.props}/> : null}
                      {this.state.selected_price === 80 ? <AlternativePayment title="Life time subscritpion" price={80} selectedSubscription={this.state.selectedSubscription} myprops={this.props}/> : null}
                    </Elements>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>

      )
    }
}

ChangeSchool.propTypes = {
  onSubmit: PropTypes.func,
  rootStore: PropTypes.object,
  backData: PropTypes.object,
  closeModal: PropTypes.func
}

export default ChangeSchool
