import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'

import CardSection from './CardSection'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'
import { PropTypes } from 'mobx-react'

export default function CheckoutForm (props) {
  const stripe = useStripe()
  const elements = useElements()
  const [payButtonDisabled, setPayButtonDisabled] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    setPayButtonDisabled(true)
    const card = elements.getElement(CardElement)
    stripe.createToken(card).then(result => {
      if (result.error) {
        // Show error to your customer.
        showSnackbar(result.error.message, 'error')
        setPayButtonDisabled(false)
      } else {
        // Send the token to your server.
        // This function does not exist yet; we will define it in the next step.
        stripeTokenHandler(result.token)
      }
    })
  }

  function updateEmail (email) {
    setEmail(email)

    if (!validateEmail(email)) {
      setPayButtonDisabled(true)
    } else {
      setPayButtonDisabled(false)
    }
  }

  function validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  function stripeTokenHandler (token) {
    setPayButtonDisabled(true)
    let paymentData = {}
    if (props.selectedSubscription === 'life_time') {
      paymentData = {
        payment_method: {
          token: token.id
        },
        email: email
      }
    } else {
      paymentData = {
        payment_method: {
          token: token.id,
          plan_id: props.selectedSubscription
        },
        email: email
      }
    }

    if (props.selectedSubscription === '') {
      setPayButtonDisabled(false)
      window.alert('Please select Subscription plan.')
      return
    }
    actions.stripe.createSubscription(paymentData)
      .then((data) => {
        if (data.status === 'ok') {
          showSnackbar(data.message, 'success')
          props.myprops.handleModalClose()
          window.location.reload(true)
        } else {
          showSnackbar(data.message, 'error')
          setPayButtonDisabled(false)
        }
        props.simplifiedFunction()
      })
      .catch((e) => {
        setPayButtonDisabled(false)
        console.log(e)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection updateEmail={updateEmail}/>
      <button className={`btn-primary padding full-width text-white margin-top ${payButtonDisabled ? 'disabled' : ''}`} disabled={payButtonDisabled} style={{color: 'white'}}>Pay</button>
    </form>
  )
}

CheckoutForm.propTypes = {
  selectedSubscription: PropTypes.string,
  simplifiedFunction: PropTypes.func,
  myprops: PropTypes.object
}
