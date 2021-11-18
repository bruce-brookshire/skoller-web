import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js'
import actions from '../../../../actions'
import { showSnackbar } from '../../../../utilities/snackbar'
export default function AlternativePayment (props) {
  console.log('alternative props', props)
  const {price, selectedSubscription} = props
  const [paymentRequest, setPaymentRequest] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (!stripe || !elements) {
      return
    }

    const paymentRequestOption = {
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Subscription',
        amount: price * 100
      },
      requestPayerName: true,
      requestPayerEmail: true
    }
    const pr = stripe.paymentRequest(paymentRequestOption)

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      console.log('result', result)
      if (result) {
        setPaymentRequest(pr)
      }
    }).catch(e => console.log(e))
    pr.on('paymentmethod', async (e) => {
      if (selectedSubscription == '') {
        alert('Please select Subscription plan.')
        return
      }
      actions.stripe.createSubscription({
        payment_method: {
          payment_method_id: e.paymentMethod.id,
          plan_id: selectedSubscription
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
  }, [stripe, elements, price, selectedSubscription])

  return paymentRequest && (
    <PaymentRequestButtonElement
      options={{
        paymentRequest
      }}
    />
  )
}
