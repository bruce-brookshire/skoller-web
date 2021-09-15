import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import actions from '../../../../actions'
import {Cookies} from 'react-cookie'

const stripePromise = loadStripe('pk_test_51JV9OSSGLvMTa3qVnwhFxc03IiK5JOGO94YQufQumo21gTgUAdpvMtEGYH9dgH1BPFrrirHuNbiVbE49gPNHHxIU00WpzV3KLP');
@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
     
    }
    this.cookie = new Cookies()
    console.log(this.cookie, 'my cookie');
  }

  

  componentDidMount () {
        actions.stripe.getAllSubscription().catch((r) => console.log(r, 66));
        actions.stripe.getMySubscription().catch((r) => console.log(r, 66));
        actions.stripe.lastUpcomingPayment().catch((r) => console.log(r, 66));
        actions.stripe.billingHistory().catch((r) => console.log(r, 66));
  }

  render () {
    let disableNext = false
    if ((!this.state.termChoice || !this.state.activeTerm) && (!this.state.schoolChoice)) {
      disableNext = true
    }
    // const [paymentCompleted, setPaymentCompleted] = useState(false);
    // const [paymentCompleted, setPaymentCompleted] = useState(false);

    
  

    console.log(stripePromise, '00');
    return (
        
      
        <div className="popup-wrap poup-md">
        <div className="popup-closetext">
           <div className="popup-msg">
              <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" style={{maxWidth:'34px'}}></img>
              <h2>Your 30-day trial has expired!</h2>
              <p> Upgrade the premium</p>
           </div>
           <div className="row">
              <div className="col-md-12">
                 <div className="listgroup-wrap margin-bottom">
                    <h4 className="divider-title"><span>Select a Plan</span></h4>
                    <div className="group-list">
                       <ul>
                          <li className="first-item"><span>$3 per month</span></li>
                          <li><span className="stext-lgray">$30 per year</span> <span className="stext-light">Save 20%</span></li>
                          <li className="last-item"><span className="stext-lgray">$80 lifetime</span> <span className="stext-light">Save 50%</span></li>
                       </ul>
                    </div>
                 </div>
                 <div className="listgroup-wrap margin-bottom margin-top">
                    <h4 className="divider-title"><span>Pay with Card</span></h4>

                    <Elements stripe={stripePromise}>
              {/* <CheckoutForm amount={2000}  /> */}
            </Elements>
                    
                    <form>
                       <div className="group-field inputfield">								
                          <label>Email</label>
                          <input type="text"/>
                       </div>
                       <div className="group-field">
                          <label>Card Information</label>
                          <div className="cardinfo-form">
                             <div className="cardinfo-field cardimg">
                                <span>
                                <input type="text" placeholder="Number"/>
         <img src="https://e7.pngegg.com/pngimages/805/227/png-clipart-paypal-the-next-level-service-payment-gateway-industry-paypal-text-payment.png" alt=""></img>
                                </span>												
                             </div>
                             <div className="cardinfo-field border-1 saround">
                                <div className="row">
                                   <span  className="col-xs-6" style={{paddingRight: 0}}>
                                   <input type="text" placeholder="MM/YY" className="border-right-1"/>													
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
                    </form>
                 </div>
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
