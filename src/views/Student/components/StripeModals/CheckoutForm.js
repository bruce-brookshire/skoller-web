import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import actions from '../../../../actions';
import { showSnackbar } from '../../../../utilities/snackbar'


export default function CheckoutForm(props) {


    const stripe = useStripe();
    const elements = useElements();

    console.log(props, 'CheckoutForm');
    console.log(props.selectedSubscription, 'CheckoutForm');
    console.log(props.myprops.closeModal, 'CheckoutForm');


    const handleSubmit = async (event) => {


        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make  sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);

        if (result.error) {
            // Show error to your customer.
            console.log(result.error.message);
        } else {
            // Send the token to your server.
            // This function does not exist yet; we will define it in the next step.
            stripeTokenHandler(result.token);
        }
    };

    function stripeTokenHandler(token) {
        const paymentData = {
            payment_method: {
                token: token.id,
                plan_id: props.selectedSubscription
            }
        };


        if (props.selectedSubscription == '') {
            alert('Please select Subscription plan.');
            return;
        }
        actions.stripe.createSubscription(paymentData)
            .then((data) => {
                if (data.status == 'ok') {
                    props.myprops.closeModal();
                    showSnackbar(data.message, 'success')
                } else {
                    showSnackbar(data.message, 'error')
                }
                props.simplifiedFunction();
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardSection />
            {/* <button disabled={!stripe}>Confirm order</button>
       */}
            <button className="btn full-width sbg-dark stext-while margin-top" disabled={!stripe}>Pay</button>
        </form>
    );
}
