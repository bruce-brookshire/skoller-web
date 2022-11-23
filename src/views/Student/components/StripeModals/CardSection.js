/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'
import { PropTypes } from 'mobx-react'
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

function CardSection (props) {

  return (
    <div className='sk-onboard-sign-up-form-container'>
      <label>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <div className='sk-onboard-sign-up-row' style={{marginTop: '10px'}}>
        <label>Email</label>
        <input type='email' onChange={(e) => props.updateEmail(e.target.value)}/>
      </div>
    </div>

  )
};
export default CardSection

CardSection.propTypes = {
  updateEmail: PropTypes.func
}
