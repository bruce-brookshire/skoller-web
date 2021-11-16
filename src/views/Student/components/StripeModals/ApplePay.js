import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'
export default function ApplePay (props) {
  console.log(props)
  const [paymentRequest, setPaymentRequest] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (!stripe || !elements || !props.selectedSubscription) {
      return
    }
    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Subscription',
        amount: props.price * 100
      },
      requestPayerName: true,
      requestPayerEmail: true
    })
    pr.canMakePayment().then(result => {
      console.log('result', result)
      if (result) {
        setPaymentRequest(pr)
      }
    }).catch(e => console.log(e))
    pr.on('paymentmethod', async (e) => {
      actions.stripe.createSubscription({
        payment_method: {
          token: e.paymentMethod.id,
          plan_id: props.selectedSubscription
        }
      })
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
      // create a payment intent on the server

      // confirm the payment intent on the client
    })
  }, [stripe, elements, props.selectedSubscription])

  return paymentRequest && (
    <PaymentRequestButtonElement
      options={{
        paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'default',
            // One of 'default', 'book', 'buy', or 'donate'
            // Defaults to 'default'

            theme: 'dark',
            // One of 'dark', 'light', or 'light-outline'
            // Defaults to 'dark'

            height: '64px'
            // Defaults to '40px'. The width is always '100%'.
          }
        }
      }}
    //   key={Math.random()}
    />
  )
}
