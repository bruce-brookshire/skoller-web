import React from 'react'
import { withRouter } from 'react-router-dom'

class PrivacyPolicy extends React.Component {
  render () {
    return (
      <div className='cn-privacy-policy-container'>
        <div className='content-landing'>
          <div className="center-text">
            <h2>
              <img
                className='privacy-policy-logo'
                onClick={() => { this.props.history.push('/landing') }}
                src='../../../src/assets/images/logo-wide-blue@1x.png'/>
              <span style={{display: 'block'}}>Skoller Mobile App Privacy Policy</span>
            </h2>
            <em>Last modified: August 15, 2018</em>
          </div>
          <div className='privacy-policy-content'>

            <div className='privacy-policy-section'>
              <h3>Introduction</h3>
              <p>
                Skoller, Inc., and our subsidiaries and other affiliates (<strong>&quot;Company&quot;</strong>,
                <strong>&quot;we&quot;</strong>, <strong>&quot;us&quot;</strong>, or <strong>&quot;our&quot;</strong>)
                respects your privacy and are committed to protecting it through our compliance with this policy.
                This policy describes:
              </p>
              <ul>
                <li>
                  The types of information we may collect or that you may provide when you download, install,
                  register with, access or use the Skoller Mobile Application (the &quot;App&quot;).
                </li>
                <li>
                  Our practices for collecting, using, maintaining, protecting and disclosing that information.
                </li>
              </ul>
              <p>
                This policy applies only to information we collect in this App and, in e-mail,
                text and other electronic communications sent through or in connection with this App.
              </p>
              <p>
                This policy DOES NOT apply to information that:
              </p>
              <ul>
                <li>
                  We collect offline or on any other Company apps or websites, including websites you may
                  access through this App.
                </li>
                <li>
                  You provide to or is collected by any third party.
                </li>
                <li>
                  You provide that is not maintained by us.
                </li>
              </ul>
              <p>
                Our websites and apps and these third parties may have their own privacy policies,
                which we encourage you to read before providing information on or through them.
              </p>
              <p>
                Please read this policy carefully to understand our policies and practices regarding
                your information and how we will treat it. If you do not agree with our policies and
                practices, do not download, register with or use this App. By downloading, registering
                with or using this App, you agree to this privacy policy. This policy may change from
                time to time (see <strong>Changes to Our Privacy Policy</strong>). Your continued use
                of this App after we make changes is deemed to be acceptance of those changes, so
                please check the policy periodically for updates.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Children under the Age of 13</h3>
              <p>
                The App is not intended for children under 13 years of age. No one under age 13 may
                provide any Personal Information to or on the App. We do not knowingly collect
                Personal Information from children under 13. If you are under 13, do not use or
                provide any information on the App or on or through any of its features, register
                an account on the App, or otherwise provide any information about yourself to us.
                If we learn we have collected or received Personal Information from a child under
                13 without verification of parental consent, we will delete that information. If you
                believe we might have any information from or about a child under 13, please contact
                us at <a href='mailto:support@skoller.co'>support@skoller.co</a>.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Information We Collect and How We Collect It</h3>
              <p>
                When you download, register with, or use this App, we may ask you provide, or
                otherwise collect, information:
              </p>
              <ul>
                <li>
                  by which you may be personally identified, such as school issued e-mail address,
                  phone number, and name (<strong>&quot;Personal Information&quot;</strong>); and
                </li>
                <li>
                  that is about you and does identify you relating to assignments and changes to
                  assignments such as adding, deleting or adjusting due dates and relating to
                  interactions on communication platforms within the App. This information will
                  be displayed to other users of the App in the connective features of the App.
                </li>
              </ul>
              <p>
                We collect this information:
              </p>
              <ul>
                <li>
                  Directly from you when you provide it to us.
                </li>
                <li>
                  Automatically as you navigate through the App. Information collected automatically
                  may include usage details, IP addresses, and information collected through cookies
                  and other tracking technologies.
                </li>
                <li>
                  From third parties, for example, our business partners.
                </li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Information You Provide to Us</h3>
              <p>
                The information we collect on or through the App includes:
              </p>
              <ul>
                <li>
                  Information that you provide by filling in forms on the App. This includes
                  information provided at the time of registering a user account, profile
                  information, posting material, or requesting further services. We may
                  also ask you for information when you report a problem with the App.
                </li>
                <li>
                  Records and copies of your correspondence (including email addresses),
                  if you contact us.
                </li>
                <li>
                  Historical copies of course information, including course syllabi.
                </li>
                <li>
                  Your search queries on the App.
                </li>
              </ul>
              <p>
                You also may provide information to us that may be published or displayed
                (<strong>&quot;Posted&quot;</strong>) on public areas of the App, or
                transmitted to other users of the App, including your name, email, profile
                picture, bio or personal background information, organizational information,
                and/or your activity on the App, such as schedule changes and chat conversations
                with other users (collectively, <strong>&quot;User Content&quot;</strong>). Your
                User Content is posted on and transmitted to others at your own risk. If you do
                not wish to have your User Content Posted on public areas of the App, please do
                not provide such information or otherwise Post it within the App. Additionally,
                we cannot control the actions of other users of the App with whom you may choose
                to share your User Content. Therefore, we cannot and do not guarantee that your
                User Content will not be viewed by unauthorized persons.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Automatic Information Collection And Tracking Technologies.</h3>
              <p>
                When you download, access and use the App, it may use technology to
                automatically collect:
              </p>
              <ul>
                <li>
                  <strong>Usage Details. </strong>
                  When you access and use the App, we may automatically collect certain details
                  of your access to and use of the App, including traffic data, location data,
                  logs and other communication data and the resources that you access and use on
                  or through the App.
                </li>
                <li>
                  <strong>Device Information. </strong>
                  We may collect information about your mobile device and internet connection,
                  including the device&apos;s unique device identifier, IP address, operating
                  system, browser type, mobile network information and the device&apos;s telephone
                  number.
                </li>
                <li>
                  <strong>Stored Information and Files. </strong>
                  The App also may access metadata and other information associated with other
                  files stored on your device. This may include, for example, photographs, audio
                  and video clips, personal contacts and address book information.
                </li>
                <li>
                  <strong>Location Information. </strong>
                  This App does not collect real-time information about the location of your device.
                </li>
              </ul>
              <p>
                If you do not want us to collect this information do not download the App or delete
                it from your device.
              </p>
              <p>
                The technologies we use for this automatic data collection may include:
              </p>
              <ul>
                <li>
                  <strong>Cookies (or browser cookies). </strong>
                  A cookie is a small file placed on the hard drive of your computer or smartphone.
                  You may refuse to accept browser cookies by activating the appropriate setting on
                  your browser. However, if you select this setting you may be unable to access
                  certain parts of the App.
                </li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Third-party Information Collection</h3>
              <p>
                When you use the App or its content, certain third parties may use automatic
                information collection technologies to collect information about you or your
                device. These third parties may include:
              </p>
              <ul>
                <li>Your mobile device manufacturer.</li>
                <li>Your mobile service provider.</li>
                <li>Advertisers, ad networks and ad servers.</li>
              </ul>
              <p>
                These third parties may use tracking technologies to collect information
                about you when you use this app. The information they collect may be associated
                with your Personal Information or they may collect information, including Personal
                Information, about your online activities over time and across different websites,
                apps and other online services websites. They may use this information to provide
                you with interest-based (behavioral) advertising or other targeted content.
              </p>
              <p>
                We do not control these third parties&apos; tracking technologies or how they may be used.
                If you have any questions about an advertisement or other targeted content,
                you should contact the responsible provider directly.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>How We Use Your Information</h3>
              <p>
                We use information that we collect about you or that you provide to us, including
                any Personal Information or User Content:
              </p>
              <ul>
                <li>
                  To present the App and its contents to you.
                </li>
                <li>
                  To provide you with information or services that you request from us.
                </li>
                <li>
                  To fulfill any other purpose for which you provide it.
                </li>
                <li>
                  To provide you with notices about your account and a schedule of the
                  due dates for assignments for a particular course that you enrolled in.
                </li>
                <li>
                  To notify you about changes or updates to the App or any products or
                  services we offer or provide though it.
                </li>
                <li>
                  To allow you to participate in interactive and social features on the App.
                </li>
                <li>
                  In any other way we may describe when you provide the information.
                </li>
                <li>
                  For any other purpose with your consent.
                </li>
              </ul>
              <p>
                We may also use your information to contact you about products or services that
                may be of interest to you. If you do not want us to use your information in this
                way, please do not download the App or delete it from your device. For more
                information, see <strong>Choices About How We Use and Disclose Your
                Information.</strong>
              </p>
              <p>
                The usage information we collect helps us to improve our App and to deliver a better
                and more personalized experience by enabling us to:
              </p>
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
              <p>
                We may disclose aggregated information about our users, and information that does
                not identify any individual or device, without restriction.
              </p>
              <p>
                In addition, we may disclose personal information that we collect or you provide:
              </p>
              <ul>
                <li>To our subsidiaries and affiliates.</li>
                <li>
                  To contractors, service providers and other third parties we use to support our business
                  and who are bound by contractual obligations to keep personal information confidential
                  and use it only for the purposes for which we disclose it to them.
                </li>
                <li>
                  To a buyer or other successor in the event of a merger, divestiture, restructuring,
                  reorganization, dissolution, or other sale or transfer of some or all of Company&apos;s assets,
                  whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding,
                  in which Personal Information held by Company about the App users is among the assets transferred.
                </li>
                <li>To fulfill the purpose for which you provide it.</li>
                <li>For any other purpose disclosed by us when you provide the information.</li>
                <li>With your consent.</li>
                <li>
                  To comply with any court order, law, or legal process,
                  including to respond to any government or regulatory request.
                </li>
                <li>
                  If we believe disclosure is necessary or appropriate to protect the rights,
                  property, or safety of Company, our customers, or others.
                </li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3>Your Choices About How We Use and Disclose Your Information</h3>
              <p>
                We strive to provide you with choices regarding the Personal Information you provide to us.
                We have created mechanisms to provide for you with the following control over your
                information:
              </p>
              <ul>
                <li>
                  <strong>Tracking Technologies and Advertising. </strong>
                  Tracking Technologies and Advertising. You can set your browser to refuse all or
                  some browser cookies, or to alert you when cookies are being sent. To learn how
                  you can manage your Flash cookie settings, visit the Flash player settings page
                  on Adobe’s <a href='www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html'>website</a>.
                  If you disable or refuse cookies, please note that some parts
                  of the App may then be inaccessible or not function properly.
                </li>
                <li>
                  <strong>Promotional Offers from the Company. </strong>
                  If you do not wish to have your contact information used by the Company to
                  promote our own products or services, please do not download the App or
                  delete it from your device.
                </li>
              </ul>
            </div>

            <div className='privacy-policy-section'>
              <h3><u>Correcting Your Account Information</u></h3>
              <p>
                You may update, correct, or modify information about you at any time by logging
                into your online account or by emailing us at <a href='mailto:support@skoller.co'>
                support@skoller.co</a>. If you wish to deactivate your account, please email us
                at <a href='mailto:support@skoller.co'>support@skoller.co</a>, but note we may
                continue to store information about you as required by law or for legitimate
                business purposes.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Your California Privacy Rights and &quot;Do Not Track&quot;</h3>
              <p>
                California Civil Code Section § 1798.83 permits users of the App that are
                California residents to request certain information regarding our disclosure
                of Personal Information to third parties for their direct marketing purposes.
                To make such a request, please send an email
                to <a href='mailto:support@skoller.co'>support@skoller.co</a>.
              </p>
              <p>
                California Business &amp; Professions Code Section 22575(b) provides that
                California residents are entitled to know how we respond to “Do Not Track”
                browser settings. Like many other websites and online services, we do not
                currently alter our practices when we receive Do Not Track signals as there
                is no consensus among industry participants as to what “Do Not Track” means
                in this context. To find out more about “Do Not Track,” you may wish to
                visit <a href='http://www.allaboutdnt.com'>http://www.allaboutdnt.com</a>.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Data Security</h3>
              <p>
                We take reasonable measures to help protect information about you from
                loss, theft, misuse and unauthorized access, disclosure, alteration and
                destruction.
              </p>
              <p>
                The safety and security of your information also depends on you. Where we
                have given you (or where you have chosen) a password for access to certain
                parts of the App, you are responsible for keeping this password confidential.
                We ask you not to share your password with anyone. We urge you to be careful
                about giving out information in public areas of the App. The information you
                share in public areas may be viewed by any user of the App.
              </p>
              <p>
                Unfortunately, the transmission of information via the internet and mobile
                platforms is not completely secure. Although we do our best to protect your
                Personal Information, we cannot guarantee the security of your Personal
                Information transmitted through our App. Any transmission of Personal
                Information is at your own risk. We are not responsible for circumvention of
                any privacy settings or security measures we provide.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Applicable Law and International Issues</h3>
              <p>
                The App is designed and maintained for residents of the United States (“US”).
                Information that you submit to, in, or through the App will be collected,
                processed, stored, disclosed and disposed of in accordance with applicable US
                law. If you are a non-US-resident user, you acknowledge and agree that we may
                collect and use your Personal Information, as discussed in this policy, outside
                your resident jurisdiction. In addition, such Information may be stored on
                servers located outside your resident jurisdiction. US law may not provide the
                degree of protection for Personal Information that is available in other
                countries. By providing us with your Personal Information, you acknowledge that
                your have read this policy, understand it, agree to its terms and consent to the
                transfer of such Personal Information outside your resident jurisdiction. If you
                do not consent to the terms of this policy, please do not use the App. However,
                if you have already provided us with Personal Information, please contact us
                at <a href='mailto:support@skoller.co'>support@skoller.co</a> and let us know
                how you would like us to handle or dispose of such information.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3>Changes to Our Privacy Policy</h3>
              <p>
                We will continue to evaluate this policy against new technologies, business
                practices, legal requirements, and our users’ needs, and may make changes to
                the policy accordingly. Please check this page periodically for updates. If
                we make any material changes to this policy, we will post the updated terms
                of the policy on the App, and provide you notice of such chances, which may
                include notice by email through a message sent to the email address specified
                in your account, or by posting a message on the App. The date the privacy policy
                was last revised is identified at the top of the page. You are responsible for
                periodically visiting this privacy policy to check for any changes.
              </p>
            </div>

            <div className='privacy-policy-section'>
              <h3><u>Contact Information</u></h3>
              <p>
                To ask questions or comment about this privacy policy and our privacy practices,
                contact us at: <a href='mailto:support@skoller.co'>support@skoller.co</a>.
              </p>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PrivacyPolicy)
