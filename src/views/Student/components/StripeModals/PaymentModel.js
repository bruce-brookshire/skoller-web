import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import actions from '../../../../actions'
import { Cookies } from 'react-cookie'
import { loadStripe } from '@stripe/stripe-js'
import AlternativePayment from './AlternativePayment'
const vm = this
// const stripePromise = loadStripe('pk_test_51JHvLoGtOURsTxunH2YZl8bG4pvpTQUKRoTVXjqEtZUFR8SsgUIMps4qGBl9OrPYiAGEy8dlAiRATkrRnRUiHMMa00xYgr7qtu')
const stripePromise = loadStripe('pk_live_51JHvLoGtOURsTxunmypyAUNfbRF4jOahklknp1RTBHhxpy3qEveFU7lCWdrBt4YggE5ytlblCgYYHPPzsLC0Gf8K00NC7FWyoh')

@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected_subscription: '',
      selected_price: '',
      plans: [],
      payment_method: {
        type: 'card',
        plan_id: 'price_1JYF3sSGLvMTa3qVrsx7uADn',
        card: {
          number: '4242424242424242',
          exp_month: '12',
          exp_year: '23',
          cvc: '123'
        },
        billing_details: {
          email: 'bijay@gmial.com',
          name: 'bijay',
          phone: '9800186999',
          address: {
            city: 'Nairobi',
            line1: 'line 1 example'
          }
        }
      }

    }
    //  console.log(stripePromise.createToken(), 'stripe js');

    this.cookie = new Cookies()
    console.log(this.cookie, 'my cookie')
  }

  componentDidMount () {
    actions.stripe.getAllSubscription().catch((r) => console.log(r, 66))
    actions.stripe.getMySubscription().catch((r) => console.log(r, 66))
    actions.stripe.lastUpcomingPayment().catch((r) => console.log(r, 66))
    actions.stripe.billingHistory().catch((r) => console.log(r, 66))
    actions.stripe.allProducts().catch((r) => console.log(r, 66))
    actions.stripe.allPlans().then(res => {
    //   console.log('all plans')
    //   console.log(res)
      const defaultPlan = res.data[0]
      this.setState({selected_subscription: defaultPlan.id})
    }).catch((r) => console.log(r, 66))
    actions.stripe.allPlans()
      .then((data) => {
        const plansIntervals = data.data.map(item => item.interval)
        const yearlyPlan = data.data[plansIntervals.indexOf('year')]
        const monthlyPlan = data.data[plansIntervals.indexOf('month')]
        console.log({monthlyPlan})
        const lifeTimePlan = {
          active: true,
          amount: 800,
          amount_decimal: '800',
          // created: 1631300816,
          currency: 'usd',
          id: 'life_time',
          // interval: "month",
          // interval_count: 1,
          name: null,
          price: 80,
          //   product: 'prod_K9UWGXZKuZSloY'
          product: 'prod_KbbJe8E1FTsHSM'
        }
        //this.setState({ plans: [monthlyPlan, yearlyPlan, lifeTimePlan ] })
        this.setState({ plans: [monthlyPlan, yearlyPlan ] })
      })
      .catch((e) => {
        console.log(e)
      })
  }

    closeModal = () => {
      this.props.closeModal()
      return null
    }

    selectPlan (plan_id) {
      this.setState({ selected_subscription: plan_id })
    }
    setPrice (price) {
      this.setState({selected_price: price })
    }

    simplifiedFunction () {

    }
    getPlans () {
      let plans = this.state.plans

      return (
        <ul>
          {plans.map((row, i) => (
            (this.state.selected_subscription == row.id)
              ? <li className="highlight {(i == 0) ? 'first-item':((i == (plans.length -1) ? 'last-item':'stext-lgray'))}" onClick={() => {
                this.selectPlan(row.id)
                this.setPrice(row.price)
              }}>
                {
                  row.interval ? <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} per {row.interval}
                    {row.price === 30 ? <span style={{color: '#60BBE2'}}>
                    Most popular - Save 20%

                    </span> : null}
                  </span> : <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} life time <span style={{color: '#60BBE2'}}>
                    Save 50%

                  </span></span>
                }
              </li> : <li className="{(i == 0) ? 'first-item':((i == (plans.length -1) ? 'last-item':'stext-lgray'))}" onClick={() => {
                this.selectPlan(row.id)
                this.setPrice(row.price)
              }}>
                {
                  row.interval ? <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} per {row.interval}

                    {row.price === 30 ? <span style={{color: '#60BBE2'}}>
                    Most popular - Save 20%

                    </span> : null}</span> : <span style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>${row.price} life time <span style={{color: '#60BBE2'}}>
                    Save 50%

                  </span></span>
                }
              </li>
          ))}
        </ul>
      )
    }

    render () {
      console.log(this.state)
      let disableNext = false
      if ((!this.state.termChoice || !this.state.activeTerm) && (!this.state.schoolChoice)) {
        disableNext = true
      }

      // const [paymentCompleted, setPaymentCompleted] = useState(false);
      // const [paymentCompleted, setPaymentCompleted] = useState(false);

      //  const stripe = useStripe();
      // const elements = useElements();

      return (

        <div className="popup-wrap poup-md">
          <div className="popup-closetext">
            <div className="popup-msg">
              <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" style={{ maxWidth: '34px' }}></img>
              {
                this.props.rootStore.userStore.user.trial
                  ? <h2>Your free trial expires in {Math.ceil(+this.props.rootStore.userStore.user.trial_days_left)} days</h2>
                  : (!this.props.rootStore.userStore.user.trial && !this.props.rootStore.userStore.mySubscription)
                    ? <h2>Your 30-day trial has expired!</h2>
                    : this.props.rootStore.userStore.mySubscription.cancel_at_period_end
                      ? <h2>Your recurring subscription was cancelled</h2>
                      : <h2></h2>
              }
              <p> Upgrade to premium</p>
            </div>
            <div className="row">
              <div className="col-md-12">
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
                      <CheckoutForm selectedSubscription={this.state.selected_subscription} price={this.state} simplifiedFunction={this.simplifiedFunction} myprops={this.props}/>
                    </Elements>

                  </div>
                }
                {/* <StripeCheckout
                    stripeKey="pk_test_51JV9OSSGLvMTa3qVnwhFxc03IiK5JOGO94YQufQumo21gTgUAdpvMtEGYH9dgH1BPFrrirHuNbiVbE49gPNHHxIU00WpzV3KLP"
                    token=""
                  /> */}
                {/* <Checkout selectedSubscription={this.state.selected_subscription} simplifiedFunction={this.simplifiedFunction} myprops={this.props}/> */}
                {/* <form>
                       <div className="group-field inputfield">
                          <label>Email</label>
                          <input type="text"/>
                       </div>
                       <div className="group-field">
                          <label>Card Information</label>
                          <div className="cardinfo-form">
                             <div className="cardinfo-field cardimg">
                                <span>
                                <input type="text" placeholder="Number"

                                 />
         <img src="https://e7.pngegg.com/pngimages/805/227/png-clipart-paypal-the-next-level-service-payment-gateway-industry-paypal-text-payment.png" alt=""></img>
                                </span>
                             </div>
                             <div className="cardinfo-field border-1 saround">
                                <div className="row">
                                   <span  className="col-xs-6" style={{paddingRight: 0}}>
                                   <input type="text" placeholder="MM/YY" className="border-right-1"
                                   format="##/##"
                                   mask=""

                                   />
                                   </span>
                                   <span className="col-xs-6" style={{paddingLeft: 0}}>
                                   <input type="text" placeholder="CVV" className="border-right-1"/>
                                   </span>
                                </div>
                             </div>
                             <div className="cardinfo-field cardimg">
                                <span>
                                <input type="text" placeholder="Zip Code"/>
                                </span>
                             </div>
                          </div>
                          <br></br>
                          <button className="btn full-width sbg-dark stext-while margin-top">Pay</button>
                       </div>
                    </form> */}
                {
                  <div className="listgroup-wrap margin-bottom margin-top">
                    <Elements stripe={stripePromise}>
                      {/* Below are for live stripe products */}
                      {this.state.selected_price === 30 ? <AlternativePayment title="Yearly subscription" price={30} selectedSubscription={this.state.selected_subscription} myprops={this.props}/> : null}
                      {this.state.selected_price === 3 ? <AlternativePayment title="Monthly subscription " price={3} selectedSubscription={this.state.selected_subscription} myprops={this.props}/> : null}
                      {this.state.selected_price === 80 ? <AlternativePayment title="Life time subscritpion" price={80} selectedSubscription={this.state.selected_subscription} myprops={this.props}/> : null}
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
  backData: PropTypes.object
}

export default ChangeSchool
