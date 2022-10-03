import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../../actions'
@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selected_subscription: '',
      plans: []
    }
  }

  componentDidMount () {
    actions.stripe.getAllSubscription().catch((r) => console.log(r, 66))
    actions.stripe.getMySubscription().catch((r) => console.log(r, 66))
    actions.stripe.lastUpcomingPayment().catch((r) => console.log(r, 66))
    actions.stripe.billingHistory().catch((r) => console.log(r, 66))
    actions.stripe.allProducts().catch((r) => console.log(r, 66))
    actions.stripe.allPlans().catch((r) => console.log(r, 66))
    actions.stripe.allPlans()
      .then((data) => {
        this.setState({plans: data.data})
      })
      .catch((e) => {
        console.log(e)
      })
  }
  render () {
    return (

      <div className="popup-wrap poup-md">
        <div className="popup-closetext">
          <div className="popup-msg">
            <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" style={{maxWidth: '34px'}}></img>
            <h2>You are a premium user</h2>
            <p> Manage your account details</p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="listgroup-wrap">
                <h4>Premium Plan</h4>
                <div className="group-list">
                  <ul>
                    <li className="first-item highlight"><span>$3 per month</span></li>
                    <li><span className="stext-lgray highlight">$30 per year</span> <span className="stext-light">Save 20%</span></li>
                    <li className="last-item "><span className="stext-lgray">$80 lifetime</span> <span className="stext-light">Save 50%</span></li>
                  </ul>
                </div>
              </div>
              <div className="listgroup-wrap">
                <h4>Payment Mathod</h4>
                <div className="group-list">
                  <ul>
                    <li className="first-item">
                      <span className="stext-lgray">Last Payment</span>
                      <span className="stext-dark">May 21, 2021</span>
                    </li>
                    <li>
                      <span className="stext-lgray">Next Payment</span>
                      <span className="stext-dark">Jun 21, 2021</span>
                    </li>
                    <li className="last-item">
                      <span className="stext-lgray">Payment Mathod</span>
                      <span className="stext-dark">
                        <span className="cardimg">
                          <img src="https://images.vectorhq.com/images/previews/60b/mastercard-psd-437246.png" alt="" style={{maxWidth: '22px'}}></img></span>
                        <span className="cardnumber">****1252</span>
                        <a href="#" className="stext-light"><i className="far fa-times-circle"></i></a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="listgroup-wrap">
                <h4>Billing History</h4>
                <div className="group-list mheight">
                  <ul>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                    <li><span className="stext-dark">May 21, 2021</span>
                      <span><a href="#" className="stext-primary">View PDF</a></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="button" className="btn sbg-dark stext-white "><strong>Save Changes</strong></button>
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
