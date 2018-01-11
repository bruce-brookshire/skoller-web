import React from 'react'
import PropTypes from 'prop-types'
import {browserHistory} from 'react-router'

class PrivacyPolicy extends React.Component {

  render () {
    return (
      <div className='cn-privacy-policy-container'>
        <div className='content-landing'>
          <div className="center-text">
            <h2>
              <img
              className='privacy-policy-logo'
              onClick={()=>{ browserHistory.push('/landing') }}
              src='../../../src/assets/images/logo-wide-blue@1x.png'/>
              <span style={{display: 'block'}}>Skoller Mobile App Privacy Policy</span>
            </h2>
            <em>Last modified: January 2018</em>
          </div>
          <div className='privacy-policy-content'>

            <div className='privacy-policy-section'>
              <h3>Introduction</h3>
              <p>Skoller, LLC, a Tennessee limited liability company,
              ("Company" or "We") respects your privacy and are committed to protecting it
              through our compliance with this policy.
              This policy describes:</p>
              <ul>
                <li>The types of information we may collect or that you may provide
                when you download, install, register with, access or use the
                Skoller Mobile Application (the "App").</li>
                <li>Our practices for collecting, using, maintaining, protecting and disclosing that information.</li>
              </ul>
              <p>This policy applies only to information we collect in this App and, in e-mail,
              text and other electronic communications sent through or in connection with this App.</p>
              <p>This policy DOES NOT apply to information that:</p>
              <ul>
                <li>We collect offline or on any other Company apps or websites,
                including websites you may access through this App. </li>
                <li>You provide to or is collected by any third party.</li>
                <li>You provide that is not maintained by Company. </li>
              </ul>
              <p>Our websites and apps and these third parties may have their own privacy policies,
              which we encourage you to read before providing information on or through them.</p>
              <p>Please read this policy carefully to understand our policies and practices regarding
              your information and how we will treat it.
              If you do not agree with our policies and practices, do not download,
              register with or use this App. By downloading, registering with or using this App,
              you agree to this privacy policy. This policy may change from time to time.
              Your continued use of this App after we make changes is deemed to be acceptance of those changes,
              so please check the policy periodically for updates.</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Children under the Age of 13</h3>
              <p>The App is not intended for children under 13 years of age,
              and we do not knowingly collect personal information from children under 13.
              If we learn we have collected or received personal information from a child under 13
              without verification of parental consent, we will delete that information.
              If you believe we might have any information from or about a child under 13,
              please contact us at support@skoller.co</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Information We Collect and How We Collect It</h3>
              <p>We collect information from and about users of our App:</p>
              <ul>
                <li>Directly from you when you provide it to us.</li>
                <li>Automatically when you use the App. </li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Information You Provide to Us</h3>
              <p>When you download, register with or use this App, we may ask you provide information:</p>
              <ul>
                <li>By which you may be personally identified, such as name, school issued e-mail address, and phone number ("personal information").</li>
                <li>That is about you and does identify you relating to assignments and
                changes to assignments such as adding, deleting or adjusting due dates and
                relating to interactions on communication platforms within the App.
                The information will be displayed to other users of the App in the
                connective features of the App.</li>
              </ul>
              <p>This information includes:</p>
              <ul>
                <li>Information that you provide by filling in forms in the App.
                This includes information provided at the time of registering to use the App,
                posting material, and requesting further services.
                We may also ask you for information when you report a problem with the App.</li>
                <li>Records and copies of your correspondence (including e-mail addresses), if you contact us.</li>
                <li>Your search queries on the App.</li>
                <li>Historical copies of course information, including course syllabi.</li>
              </ul>
              <p>You may provide information to be published or displayed ("Posted")
              on public areas of the App (collectively, "User Contributions").
              Your User Contributions are Posted and transmitted to others at your own risk.
              Additionally, we cannot control the actions of third parties with whom
              you may choose to share your User Contributions.
              Therefore, we cannot and do not guarantee that your User Contributions will not be
              viewed by unauthorized persons.</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Automatic Information Collection And Tracking.  </h3>
              <p>When you download, access and use the App, it may use technology to automatically collect:</p>
              <ul>
                <li><strong>Usage Details.</strong> When you access and use the App,
                we may automatically collect certain details of your access to and use of the App,
                including traffic data, location data, logs and other communication data
                and the resources that you access and use on or through the App. </li>
                <li><strong>Device Information.</strong> We may collect information about your mobile device
                and internet connection, including the device's unique device identifier,
                IP address, operating system, browser type, mobile network information and the
                device's telephone number.</li>
                <li><strong>Stored Information and Files.</strong> The App also may access metadata and
                other information associated with other files stored on your device.
                This may include, for example, photographs, audio and video clips,
                personal contacts and address book information.</li>
                <li><strong>Location Information.</strong> This App does not collect real-time information
                about the location of your device.</li>
              </ul>
              <p>If you do not want us to collect this information do not download the App or delete it from your device.</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Information Collection Technologies</h3>
              <p>The technologies we use for automatic information collection may include:</p>
              <ul>
                <li><strong>Cookies (or mobile cookies).</strong> A cookie is a small file placed on your smartphone.
                It may be possible to refuse to accept mobile cookies by activating the appropriate setting on your smartphone.
                However, if you select this setting you may be unable to access certain parts of our App. </li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Third-party Information Collection</h3>
              <p>When you use the App or its content, certain third parties may use automatic information collection
              technologies to collect information about you or your device. These third parties may include:</p>
              <ul>
                <li>Your mobile device manufacturer.</li>
                <li>Your mobile service provider.</li>
                <li>Advertisers, ad networks and ad servers.</li>
              </ul>
              <p>These third parties may use tracking technologies to collect information
              about you when you use this app. The information they collect may be associated with your
              personal information or they may collect information, including personal information,
              about your online activities over time and across different websites,
              apps and other online services websites.
              They may use this information to provide you with interest-based (behavioral) advertising or
              other targeted content.</p>
              <p>We do not control these third parties' tracking technologies or how they may be used.
              If you have any questions about an advertisement or other targeted content,
              you should contact the responsible provider directly.</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>How We Use Your Information</h3>
              <p>We use information that we collect about you or that you provide to us, including any personal information, to:</p>
              <ul>
                <li>Provide you with the App and its contents, and any other services that you request from us.</li>
                <li>Fulfill any other purpose for which you provide it.</li>
                <li>Provide you with notices and a schedule of the due dates for
                assignments for a particular course that you enrolled in.</li>
                <li>Notify you when App updates are available,
                and of changes to any products or services we offer or provide though it.</li>
              </ul>
              <p>The usage information we collect helps us to improve our App and to deliver a better
              and more personalized experience by enabling us to:</p>
              <ul>
                <li>Estimate our audience size and usage patterns.</li>
                <li>Store information about your preferences,
                allowing us to customize our App according to your individual interests.</li>
                <li>Speed up your searches.</li>
                <li>Recognize you when you use the App.</li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Disclosure of Your Information</h3>
              <p>We may disclose aggregated information about our users,
              and information that does not identify any individual or device, without restriction.</p>
              <p>In addition, we may disclose personal information that we collect or you provide:</p>
              <ul>
                <li>To our subsidiaries and affiliates.</li>
                <li>To contractors, service providers and other third parties we use to support our business
                and who are bound by contractual obligations to keep personal information confidential
                and use it only for the purposes for which we disclose it to them.</li>
                <li>To a buyer or other successor in the event of a merger, divestiture, restructuring,
                reorganization, dissolution or other sale or transfer of some or all of Company's assets,
                whether as a going concern or as part of bankruptcy, liquidation or similar proceeding,
                in which personal information held by Company about our App users is among the assets transferred.</li>
                <li>To fulfill the purpose for which you provide it.</li>
                <li>For any other purpose disclosed by us when you provide the information.</li>
                <li>With your consent.</li>
                <li>To comply with any court order, law or legal process,
                including to respond to any government or regulatory request.</li>
                <li>If we believe disclosure is necessary or appropriate to protect the rights,
                property, or safety of Company, our customers or others.</li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Your Choices about Our Collection, Use and Disclosure of Your Information</h3>
              <p>We strive to provide you with choices regarding the personal information you provide to us.
              This section describes mechanisms we provide for you to control certain uses and
              disclosures of over your information.</p>
              <ul>
                <li><strong>Tracking Technologies.</strong> You can set your browser to refuse
                all or some browser cookies, or to alert you when cookies are being sent.
                If you disable or refuse cookies or block the use of other tracking technologies,
                some parts of the App may then be inaccessible or not function properly.</li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Your California Privacy Rights</h3>
              <p>California Civil Code Section 1798.83 permits users of our App that are
              California residents to request certain information regarding our disclosure of
              personal information to third parties for their direct marketing purposes.
              To make such a request, please send an e-mail to support@skoller.co.</p>
              <ul>
                <li><strong>Tracking Technologies.</strong> You can set your browser to refuse
                all or some browser cookies, or to alert you when cookies are being sent.
                If you disable or refuse cookies or block the use of other tracking technologies,
                some parts of the App may then be inaccessible or not function properly.</li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Data Security</h3>
              <p>We have implemented measures designed to secure your personal information
              from accidental loss and from unauthorized access, use, alteration and disclosure.</p>
              <p>The safety and security of your information also depends on you.
              Where we have given you (or where you have chosen) a password for
              access to certain parts of our App, you are responsible for
              keeping this password confidential. We ask you not to share your password with anyone.
              We urge you to be careful about giving out information in public areas of the App
              like message boards. The information you share in public areas may be
              viewed by any user of the App.</p>
              <p>Unfortunately, the transmission of information via the internet and mobile platforms
              is not completely secure. Although we do our best to protect your personal information,
              we cannot guarantee the security of your personal information transmitted through our App.
              Any transmission of personal information is at your own risk.
              We are not responsible for circumvention of any privacy
              settings or security measures we provide.</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Changes to Our Privacy Policy</h3>
              <p>We may update our privacy policy from time to time.
              If we make material changes to how we treat our users' personal information,
              we will post the new privacy policy on this page.
              The date the privacy policy was last revised is identified at the top of the page.
              You are responsible for periodically visiting this privacy policy to check for any changes.</p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Contact Information</h3>
              <p>To ask questions or comment about this privacy policy and our privacy practices,
              contact us at: support@skoller.co. </p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default PrivacyPolicy
