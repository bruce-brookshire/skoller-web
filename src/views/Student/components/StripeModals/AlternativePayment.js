import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'
export default function AlternativePayment (props) {
  const [paymentRequest, setPaymentRequest] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (!stripe || !elements) {
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

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      console.log('result', result)
      if (result) {
        setPaymentRequest(pr)
      }
    }).catch(e => console.log(e))
    pr.on('paymentmethod', async (e) => {
      if (!props.selectedSubscription) {
        alert('Please select a plan')
        return
      }
      //   const result = await stripe.createToken()
      const card = elements.getElement(CardElement)
      const result = await stripe.createToken(card)
      actions.stripe.createSubscription({
        payment_method: {
          token: result.token,
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
    })
  }, [stripe, elements, props.selectedSubscription])

  return paymentRequest && (
    <PaymentRequestButtonElement
      options={{
        paymentRequest
      }}
    />
  )
}
