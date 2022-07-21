import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import CardSection from './CardSection'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'

export default function CheckoutForm (props) {
  const stripe = useStripe()
  const elements = useElements()
  const [payButtonDisabled, setPayButtonDisabled] = useState(false);

  console.log(props, 'CheckoutForm')
  console.log(props.selectedSubscription, 'CheckoutForm')
  console.log(props.myprops.closeModal, 'CheckoutForm')

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message)
      setPayButtonDisabled(false);
    } else {
      // Send the token to your server.
      // This function does not exist yet; we will define it in the next step.
      stripeTokenHandler(result.token)
      setPayButtonDisabled(false);
    }
  }

  function stripeTokenHandler (token) {
    let paymentData = {}
    if (props.selectedSubscription === 'life_time') {
      paymentData = {
        payment_method: {
          token: token.id
        }
      }
    } else {
      paymentData = {
        payment_method: {
          token: token.id,
          plan_id: props.selectedSubscription
        }
      }
    }

    if (props.selectedSubscription == '') {
      alert('Please select Subscription plan.')
      return
    }
    actions.stripe.createSubscription(paymentData)
      .then((data) => {
        if (data.status == 'ok') {
          showSnackbar(data.message, 'success')
          console.log(props)
          props.myprops.handleModalClose()
          window.location.reload(true)
        } else {
          showSnackbar(data.message, 'error')
        }
        props.simplifiedFunction()
      })
      .catch((e) => {
        setPayButtonDisabled(false)
        console.log(e)
      })
  }

  function buttonDisabled () {
    return !stripe || payButtonDisabled;
  }

  const payButtonDisabledClass = payButtonDisabled ? 'disabled' : '';

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      {/* <button disabled={!stripe}>Confirm order</button>
       */}
      <button onClick={() => setPayButtonDisabled(true)} className={`btn-primary padding full-width text-white margin-top ${payButtonDisabledClass}`} style={{color: 'white'}}>Pay</button>
    </form>
  )
}
