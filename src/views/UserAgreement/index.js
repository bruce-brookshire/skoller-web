import React from 'react'
import {browserHistory} from 'react-router'

class UserAgreement extends React.Component {
  render () {
    return (
      <div className='cn-user-agreement-container'>
        <div className='content-landing'>
          <div className="center-text">
            <h2>
              <img
                className='user-agreement-logo'
                onClick={() => { browserHistory.push('/landing') }}
                src='../../../src/assets/images/logo-wide-blue@1x.png'/>
              <span style={{display: 'block'}}>Skoller Terms of Use</span>
            </h2>
            <em>Last modified: August 14, 2018</em>
          </div>
          <div className='user-agreement-content'>

            <div className='user-agreement-section'>
              <p>
                The website located at www.skoller.co and the Skoller mobile application (the <strong>&quot;App&quot;</strong>)
                is a copyrighted work belonging to Skoller, Inc. (<strong>&quot;Company&quot;</strong>, <strong>&quot;us&quot;</strong>,
                <strong>&quot;our&quot;</strong>, and <strong>&quot;we&quot;</strong>). Certain features of the App may be subject to
                additional guidelines, terms, or rules, which will be posted on the App in connection with such features. All such
                additional terms, guidelines, and rules are incorporated by reference into these Terms.
              </p>
              <p><strong>
                These Terms of Use (these &quot;Terms&quot;) set forth the legally binding terms and conditions that govern your use
                of the App. By downloading, registering, accessing, or using the App, you are accepting these Terms (on behalf of
                yourself or the entity that you represent), and you represent and warrant that you have the right, authority, and
                capacity to enter into these Terms (on behalf of yourself or the entity that you represent). You may not access or
                use the App or accept the Terms if you are not at least 13 years old. If you do not agree with all of the provisions
                of these Terms, do not access or use the App.
              </strong></p>
              <p><strong>
                These Terms require the use of arbitration (Section 10.2) on an individual basis to resolve disputes, rather than
                jury trials or class actions, and also limit the remedies available to you in the event of a dispute.
              </strong></p>

              <span><strong>1.</strong></span><span className='ol-major-section-label'><strong><u>Accounts</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  <span><strong>1.1.</strong></span><span className='ol-major-section-label'><strong>Account Creation. </strong></span>
                  <span>
                    In order to use certain features of the App, you must register for an account
                    (<strong>&quot;Account&quot;</strong>) and provide certain information about yourself as requested by the account registration form.
                    You represent and warrant that: (a) all required registration information you submit is truthful and accurate and
                    (b) you will maintain the accuracy of such information. You may delete your Account at any time, for any reason,
                    by following the instructions on the App. We may suspend or terminate your Account in accordance with Section 8.
                  </span>
                </p>
                <p>
                  <span><strong>1.2.</strong></span><span className='ol-major-section-label'><strong>Account Responsibilities. </strong></span>
                  <span>
                    You are responsible for maintaining the confidentiality of your Account login information and are fully responsible
                    for all activities that occur under your Account. You agree to immediately notify us of any unauthorized use, or
                    suspected unauthorized use of your Account, or any other breach of security. We cannot and will not be liable for any
                    loss or damage arising from your failure to comply with the above requirements.
                  </span>
                </p>
              </div>

              <span><strong>2.</strong></span><span className='ol-major-section-label'><strong><u>Access to the App</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  <span><strong>2.1.</strong></span><span className='ol-major-section-label'><strong>Eligibility. </strong></span>
                  <span>
                    The App is not targeted toward or intended for use by anyone under the age of 13. By using the App, you represent
                    and warrant that you (a) are 13 years of age or older, (b) are a legal resident of the United States, (c) have not
                    been previously suspended or removed from the App, or engaged in any activity that could result in suspension or
                    removal from the App, (d) do not have more than one Account, and (e) have full power and authority to enter into these
                    Terms and in so doing will not violate any other agreement to which you are a party.
                  </span>
                </p>
                <p>
                  <span><strong>2.2.</strong></span><span className='ol-major-section-label'><strong>License. </strong></span>
                  <span>
                    Subject to these Terms, We grant you a non-transferable, non-exclusive, revocable, limited license to use and
                    access the App solely for your own non-exclusive, non-transferable, personal, and noncommercial use.
                  </span>
                </p>
                <p>
                  <span><strong>2.3.</strong></span><span className='ol-major-section-label'><strong>Certain Restrictions. </strong></span>
                  <span>
                    The rights granted to you in these Terms are subject to the following restrictions: (a) you shall not license, sell, rent,
                    lease, transfer, assign, distribute, host, or otherwise commercially exploit the App, whether in whole or in part, or any
                    content displayed on the App; (b) you shall not modify, make derivative works of, disassemble, reverse compile, or reverse
                    engineer any part of the App; (c) you shall not access the App to build a similar or competitive application, website, product,
                    or service; and (d) except as expressly stated herein, no part of the App may be copied, reproduced, distributed, republished,
                    downloaded, displayed, posted, or transmitted in any form or by any means. Unless otherwise indicated, any future release, update,
                    or other addition to functionality of the App shall be subject to these Terms. All copyright and other proprietary notices on the
                    App (or on any content displayed on the App) must be retained on all copies thereof.
                  </span>
                </p>
                <p>
                  <span><strong>2.4.</strong></span><span className='ol-major-section-label'><strong>Modification. </strong></span>
                  <span>
                    We reserve the right, at any time, to modify, suspend, or discontinue the App (in whole or in part) with or
                    without notice to you. You agree that we will not be liable to you or to any third party for any modification,
                    suspension, or discontinuation of the App or any part thereof.
                  </span>
                </p>
                <p>
                  <span><strong>2.5.</strong></span><span className='ol-major-section-label'><strong>No Support or Maintenance. </strong></span>
                  <span>
                    You acknowledge and agree that we will have no obligation to provide you with any support or maintenance in
                    connection with the App.
                  </span>
                </p>
                <p>
                  <span><strong>2.6.</strong></span><span className='ol-major-section-label'><strong>Ownership. </strong></span>
                  <span>
                    Excluding any User Content that you may provide (defined below), you acknowledge that all the intellectual
                    property rights, including copyrights, patents, trademarks, and trade secrets, in the App and its content
                    are owned by Company or Company’s suppliers. Neither these Terms (nor your access to the App) transfers to
                    you or any third party any rights, title or interest in or to such intellectual property rights, except for
                    the limited access rights expressly set forth in Section 2.2. Company and its suppliers reserve all rights
                    not granted in these Terms. There are no implied licenses granted under these Terms.
                  </span>
                </p>
                <p>
                  <span><strong>2.7.</strong></span><span className='ol-major-section-label'><strong>Privacy. </strong></span>
                  <span>
                    All information we collect on the App is subject to our <a className='non-styled-link' href='https://skoller.co/privacypolicy'>Privacy Policy</a>.
                    By using the App, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy.
                  </span>
                </p>
                <p>
                  <span><strong>2.8.</strong></span><span className='ol-major-section-label'><strong>Geographic Restrictions. </strong></span>
                  <span>
                    The owner of the App is based in the state of Tennessee in the United States. We provide the App for use only by
                    persons located in the United States. We make no claims that the App or any of its content is accessible or
                    appropriate outside of the United States. Access to the App may not be legal by certain persons or in certain
                    countries. If you access the App from outside the United States, you do so on your own initiative and are
                    responsible for compliance with local laws.
                  </span>
                </p>
              </div>

              <span><strong>3.</strong></span><span className='ol-major-section-label'><strong><u>User Content</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  <span><strong>3.1.</strong></span><span className='ol-major-section-label'><strong>User Content. </strong></span>
                  <span>
                    <strong>&quot;User Content&quot;</strong> means any and all information and content that a user submits to,
                    or uses with, the App (e.g., the user’s name, school-issued e-mail, phone number,  or other content in the
                    user’s profile or postings). You are solely responsible for your User Content. You assume all risks associated
                    with use of your User Content, including any reliance on its accuracy, completeness, or usefulness by others,
                    or any disclosure of your User Content that personally identifies you or any third party. You hereby represent
                    and warrant that your User Content does not violate our Acceptable Use Policy (defined in Section 3.3). You may
                    not represent or imply to others that your User Content is in any way provided, sponsored or endorsed by us.
                    Because you alone are responsible for your User Content, you may expose yourself to liability if, for example,
                    your User Content violates the Acceptable Use Policy. We are not obligated to backup any User Content, and your
                    User Content may be deleted at any time without prior notice. You are solely responsible for creating and
                    maintaining your own backup copies of your User Content if you desire.
                  </span>
                </p>
                <p>
                  <span><strong>3.2.</strong></span><span className='ol-major-section-label'><strong>License. </strong></span>
                  <span>
                    You hereby grant (and you represent and warrant that you have the right to grant) to us an irrevocable, nonexclusive,
                    royalty-free, and fully paid, worldwide license to reproduce, distribute, publicly display and perform, prepare
                    derivative works of, incorporate into other works, and otherwise use and exploit your User Content, and to grant
                    sublicenses of the foregoing rights, solely for the purposes of including your User Content in the App. You hereby
                    irrevocably waive (and agree to cause to be waived) any claims and assertions of moral rights or attribution with
                    respect to your User Content.
                  </span>
                </p>
                <p>
                  <span><strong>3.3.</strong></span><span className='ol-major-section-label'><strong>Acceptable Use Policy. </strong></span>
                  <span>
                    The following terms constitute our <strong>&quot;Acceptable Use Policy&quot;</strong>:
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'><strong>(a)</strong></span>
                  <span>
                    You agree not to use the App to collect, upload, transmit, display, or distribute any User Content (i) that violates
                    any third-party right, including any copyright, trademark, patent, trade secret, moral right, privacy right, right of
                    publicity, or any other intellectual property or proprietary right; (ii) that is unlawful, harassing, abusive,
                    tortious, threatening, harmful, invasive of another’s privacy, vulgar, defamatory, false, intentionally misleading,
                    trade libelous, pornographic, obscene, patently offensive, promotes racism, bigotry, hatred, or physical harm of
                    any kind against any group or individual, or is otherwise objectionable or inappropriate (including any files,
                    comments, and profile pictures or other photos); (iii) that is harmful to minors in any way; (iv) that is deemed to
                    be cheating in our sole discretion; (v) that is in violation of your school’s code of conduct (as determined in our
                    sole discretion); or (vi) that is in violation of any law, regulation, or obligations or restrictions imposed by any
                    third party.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'><strong>(b)</strong></span>
                  <span>
                    In addition, you agree not to: (i) upload, transmit, or distribute to or through the App any computer viruses, worms,
                    or any software intended to damage or alter a computer system or data; (ii) send through the App unsolicited or unauthorized
                    advertising, promotional materials, junk mail, spam, chain letters, pyramid schemes, or any other form of duplicative or
                    unsolicited messages, whether commercial or otherwise; (iii) use the App to harvest, collect, gather, or assemble information
                    or data regarding other users, including e-mail addresses, without their consent; (iv) interfere with, disrupt, or create an
                    undue burden on servers or networks connected to the App, or violate the regulations, policies, or procedures of such
                    networks; (v) attempt to gain unauthorized access to the App (or to other computer systems or networks connected to or
                    used together with the App), whether through password mining or any other means; (vi) harass, bully, or interfere with
                    any other user’s use and enjoyment of the App; (vii) use software or automated agents or scripts to produce multiple Accounts
                    on the App, or to generate automated searches, requests, or queries to (or to strip, scrape, or mine data from) the App
                    (provided, however, that we conditionally grant to the operators of public search engines revocable permission to use spiders
                    to copy materials from the App for the sole purpose of and solely to the extent necessary for creating publicly available
                    searchable indices of the materials, but not caches or archives of such materials, subject to the parameters set forth in
                    our robots.txt file); or (vii) share test or quiz materials, portions of such test or quiz materials, answers to such test
                    or quiz materials, or any other unauthorized materials or inaccurate information with other users.
                  </span>
                </p>
                <p>
                  <span><strong>3.4.</strong></span><span className='ol-major-section-label'><strong>Enforcement. </strong></span>
                  <span>
                    We reserve the right (but have no obligation) to review any User Content, and to investigate and/or take appropriate action
                    against you in our sole discretion if you violate the Acceptable Use Policy or any other provision of these Terms or
                    otherwise create liability for us or any other person. Such action may include removing or modifying your User Content,
                    terminating or suspending your Account in accordance with Section 8, and/or reporting you to law enforcement authorities.
                  </span>
                </p>
                <p>
                  <span><strong>3.5.</strong></span><span className='ol-major-section-label'><strong>Feedback. </strong></span>
                  <span>
                    If you provide us with any feedback or suggestions regarding the App (<strong>&quot;Feedback&quot;</strong>), you hereby
                    assign to us all rights in such Feedback and agree that we shall have the right to use and fully exploit such Feedback
                    and related information in any manner we deem appropriate. We will treat any Feedback you provide to us as non-confidential
                    and non-proprietary. You agree that you will not submit to us any information or ideas that you consider to be confidential
                    or proprietary.
                  </span>
                </p>
              </div>

              <span><strong>4.</strong></span><span className='ol-major-section-label'><strong><u>Indemnification</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  You agree to indemnify and hold Company (and its officers, employees, and agents) harmless, including costs and attorneys’
                  fees, from any claim or demand made by any third party due to, arising out of, or in connection with (a) your use of the App,
                  (b) your violation of these Terms, (c) your violation of applicable laws or regulations, or (d) your User Content. We reserve
                  the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify
                  us, and you agree to cooperate with our defense of these claims. You agree not to settle any matter without the prior written
                  consent of Company. We will use reasonable efforts to notify you of any such claim, action, or proceeding upon becoming aware
                  of it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserAgreement
