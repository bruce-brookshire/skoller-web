import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import actions from '../../../../actions'
import CreateSchoolModal from '../../FindClasses/CreateSchoolModal'
import SkModal from '../../../components/SkModal/SkModal'
import moment from 'moment'
import SkLoader from '../../../../assets/sk-icons/SkLoader'

@inject('rootStore') @observer
class ChangeSchool extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
     
    }

  }


  componentDidMount () {
   
  }



  render () {
    let disableNext = false
    if ((!this.state.termChoice || !this.state.activeTerm) && (!this.state.schoolChoice)) {
      disableNext = true
    }
    return (
      <div>


   
<div class="popup-wrap poup-md">
   <div class="popup-closetext">
      <div class="popup-msg">
         <img src="/src/assets/images/sammi/Wow2.png" class="opup-icon" alt="" style="max-width:34px;" />
         <h2>Your 30-day trial has expired!</h2>
         <p> Upgrade the premium</p>
      </div>
      <div class="row">
         <div class="col-md-12">
            <div class="listgroup-wrap margin-bottom">
               <h4 class="divider-title"><span>Select a Plan</span></h4>
               <div class="group-list">
                  <ul>
                     <li class="first-item"><span>$3 per month</span></li>
                     <li><span class="stext-lgray">$30 per year</span> <span class="stext-light">Save 20%</span></li>
                     <li class="last-item"><span class="stext-lgray">$80 lifetime</span> <span class="stext-light">Save 50%</span></li>
                  </ul>
               </div>
            </div>
            <div class="listgroup-wrap margin-bottom margin-top">
               <h4 class="divider-title"><span>Pay with Card</span></h4>
               <form>
                  <div class="group-field inputfield">								
                     <label>Email</label>
                     <input type="text"/>
                  </div>
                  <div class="group-field">
                     <label>Card Information</label>
                     <div class="cardinfo-form">
                        <div class="cardinfo-field cardimg">
                           <span>
                           <input type="text" placeholder="Number"/>
    <img src="https://e7.pngegg.com/pngimages/805/227/png-clipart-paypal-the-next-level-service-payment-gateway-industry-paypal-text-payment.png" alt="" />
                           </span>												
                        </div>
                        <div class="cardinfo-field border-1 saround">
                           <div class="row">
                              <span  class="col-xs-6" style="padding-right:0">
                              <input type="text" placeholder="MM/YY" class="border-right-1"/>													
                              </span>
                              <span class="col-xs-6" style="padding-left:0">
                              <input type="text" placeholder="CVV" class="border-right-1"/>													
                              </span>
                           </div>
                        </div>
                        <div class="cardinfo-field cardimg">
                           <span>												
                           <input type="text" placeholder="Zip Code"/>										
                           </span>												
                        </div>
                     </div>
                     <br></br>
                     <button class="btn full-width sbg-dark stext-while margin-top">Pay</button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</div>





         {/* <div className="popup-wrap poup-sm">
            <div className="popup-closetext"> 
                <div className="popup-msg margin-bottom"> 
                    <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" />
                    <p> You have the premium account with no recurring charges. This has been setup by skiller administrator! </p>
                </div>
                <button type="button" class="btn btn-primary full-width margin-top"><strong>Close</strong></button>
            </div>
</div>*/}



         {/*<div className="popup-wrap poup-sm">
            <div className="popup-closetext"> 
                <div className="popup-msg margin-bottom"> 
                    <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt=""></img>
                    <p> You have the premium account with no recurring charges. This has been setup by skiller administrator! </p>
                </div>
                <button type="button" class="btn btn-primary full-width margin-top"><strong>Close</strong></button>
            </div>
        </div>*/}


        
{/*
<div className="popup-wrap poup-md">
   <div className="popup-closetext">
      <div className="popup-msg">
         <img src="/src/assets/images/sammi/Wow2.png" className="opup-icon" alt="" style="max-width:34px;" />
         <h2>You are a premium user</h2>
         <p> Manage your account details</p>
      </div>
        <div className="row">
         <div className="col-md-6">
            <div className="listgroup-wrap">
               <h4>Premium Plan</h4>
               <div className="group-list">
                  <ul>
                     <li  className="first-item highlight"><span>$3 per month</span></li>
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
                           <img src="https://images.vectorhq.com/images/previews/60b/mastercard-psd-437246.png" alt=""  style="width: 22px" /></span>
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
</div> */}




        
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
