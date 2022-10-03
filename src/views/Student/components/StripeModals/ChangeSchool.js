import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'

@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  render () {
    return (
      <div>
        <div className="popup-wrap poup-md">
          <div className="popup-closetext">
            <div className="popup-msg">
              <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" style="max-width:34px;" />
              <h2>Your 7-day trial has expired!</h2>
              <p> Upgrade the premium</p>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="listgroup-wrap margin-bottom">
                  <h4 className="divider-title"><span>Select a Plan</span></h4>
                  <div className="group-list">
                    <ul>
                      <li className="first-item"><span>$3 per month</span></li>
                      <li><span className="stext-lgray">$30 per year</span> <span className="stext-light">Save 20%</span></li>
                      <li className="last-item"><span className="stext-lgray">$80 lifetime</span> <span className="stext-light">Save 50%</span></li>
                    </ul>
                  </div>
                </div>
                <div className="listgroup-wrap margin-bottom margin-top">
                  <h4 className="divider-title"><span>Pay with Card</span></h4>
                  <form>
                    <div className="group-field inputfield">
                      <label>Email</label>
                      <input type="text"/>
                    </div>
                    <div className="group-field">
                      <label>Card Information</label>
                      <div className="cardinfo-form">
                        <div className="cardinfo-field cardimg">
                          <span>
                            <input type="text" placeholder="Number"/>
                            <img src="https://e7.pngegg.com/pngimages/805/227/png-clipart-paypal-the-next-level-service-payment-gateway-industry-paypal-text-payment.png" alt="" />
                          </span>
                        </div>
                        <div className="cardinfo-field border-1 saround">
                          <div className="row">
                            <span className="col-xs-6" style="padding-right:0">
                              <input type="text" placeholder="MM/YY" className="border-right-1"/>
                            </span>
                            <span className="col-xs-6" style="padding-left:0">
                              <input type="text" placeholder="CVV" className="border-right-1"/>
                            </span>
                          </div>
                        </div>
                        <div className="cardinfo-field cardimg">
                          <span>
                            <input type="text" placeholder="Zip Code"/>
                          </span>
                        </div>
                      </div>
                      <br></br>
                      <button className="btn full-width sbg-dark stext-while margin-top">Pay</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
