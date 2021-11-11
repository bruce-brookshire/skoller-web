import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'

export default function Checkout (props) {
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
        console.log(e)
      })
  }

  return props.selectedSubscription && (
    <StripeCheckout
      stripeKey="pk_test_51JV9OSSGLvMTa3qVnwhFxc03IiK5JOGO94YQufQumo21gTgUAdpvMtEGYH9dgH1BPFrrirHuNbiVbE49gPNHHxIU00WpzV3KLP"
      token={ stripeTokenHandler}
    />

  )
}
