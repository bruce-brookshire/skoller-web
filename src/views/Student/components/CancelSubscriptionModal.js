import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../actions'



@inject('rootStore') @observer
class CancelSubscriptionModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showNextModal: false,
            subId: ''
        }

    }

    // componentDidMount(){
    //     actions.stripe.getMySubscription().then(res => {

    //     })
    // }

    handleCancelSubscription = () => {
        // actions.stripe.cancelSubscription()
        this.setState({showNextModal: true})
    }

    render() {

        return !this.state.showNextModal ? (

            <div className="popup-wrap poup-sm">
                <div className="popup-closetext">
                    <div className="popup-msg margin-bottom">
                        <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt=""></img>
                        <h1 style={{ margin: 0 }}>One last step...</h1>
                        <p>Will you let use know why you're cancelling?</p>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            marginLeft: '25px'
                        }}
                    >
                        <span style={{ margin: '6px' }}>
                            <input type='radio' id="too_expensive" />
                            <label htmlFor="too_expensive" style={{ marginLeft: '10px' }}>Too expensive</label>
                        </span>

                        <span style={{ margin: '6px' }}>
                            <input type='radio' id="product_issues" />
                            <label htmlFor="product_issues" style={{ marginLeft: '10px' }}>Product issues</label>
                        </span>

                        <span style={{ margin: '6px' }}>
                            <input type='radio' id="im_using_something_else" />
                            <label htmlFor="im_using_something_else" style={{ marginLeft: '10px' }}>I'm using something else</label>
                        </span>

                        <span style={{ margin: '6px' }}>
                            <input type='radio' id="not_helpful" />
                            <label htmlFor="not_helpful" style={{ marginLeft: '10px'}}>Not helpful</label>
                        </span>

                        <span style={{ margin: '6px' }}>
                            <input type='radio' id="none_of_the_above" />
                            <label htmlFor="none_of_the_above" style={{ marginLeft: '10px' }}>None of the above</label>
                        </span>
                    </div>

                    <div style={{
                        display: 'flex',
                        margin: 0,
                        width: '100%',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <button type="button" className="btn margin-top" style={{
                            border: '2px solid #212529',
                            borderRadius: '5px',
                            width: '174px',
                            cursor: 'pointer'
                        }}><strong>Go Back</strong></button>
                        <button
                        onClick={this.handleCancelSubscription}
                         type="button" className="btn margin-top" style={{
                            border: '2px solid #F24848',
                            color: '#F24848',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}><strong>Cancel Subscription</strong></button>
                    </div>
                </div>
            </div>

        ) : (
            <div className="popup-wrap poup-sm">
                <div className="popup-closetext">
                    <div className="margin-bottom">
                        <h1 style={{ margin: 0,fontSize: '23px',textAlign: 'center' }}>
                            Your premium subscription has been cancelled. Skoller premium will be available to you until November 8th, 2021.
                        </h1>
                        <p
                        style={{
                            fontSize: '24px',textAlign: 'center'
                        }}
                        >If you change your mind, just log back in and select a plan to continue with Skoller!</p>
                    </div>
                        <button type="button" className="btn margin-top"
                        style={{
                                background: '#4a5a5a',
                                color: 'white',
                                width: '100%'
                        }}
                        ><strong>Close</strong></button>
                </div>
            </div>
        )
    }
}

export default CancelSubscriptionModal
