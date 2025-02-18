import React from 'react'
import { withRouter } from 'react-router-dom'

class UserAgreement extends React.Component {
  render () {
    return (
      <div className='cn-user-agreement-container'>
        <div className='content-landing'>
          <div className="center-text">
            <h2>
              <img
                className='user-agreement-logo'
                onClick={() => { this.props.history.push('/landing') }}
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

              <span><strong>5.</strong></span><span className='ol-major-section-label'><strong><u>Third-Party Links &amp; Ads; Other Users</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  <span><strong>5.1.</strong></span><span className='ol-major-section-label'><strong>Third-Party Links &amp; Ads. </strong></span>
                  <span>
                    The App may contain links to third-party websites and services, and/or display advertisements for third parties
                    (collectively, <strong>&quot;Third-Party Links &amp; Ads&quot;</strong>). Such Third-Party Links &amp; Ads are not under our control, and we are
                    not responsible for any Third-Party Links &amp; Ads. We provide access to these Third-Party Links &amp; Ads only as a
                    convenience to you, and does not review, approve, monitor, endorse, warrant, or make any representations with
                    respect to Third-Party Links &amp; Ads. You use all Third-Party Links &amp; Ads at your own risk, and should apply a
                    suitable level of caution and discretion in doing so. When you click on any of the Third-Party Links &amp; Ads,
                    the applicable third party’s terms and policies apply, including the third party’s privacy and data gathering
                    practices. You should make whatever investigation you feel necessary or appropriate before proceeding with any
                    transaction in connection with such Third-Party Links &amp; Ads.
                  </span>
                </p>
                <p>
                  <span><strong>5.2.</strong></span><span className='ol-major-section-label'><strong>Other Users. </strong></span>
                  <span>
                    Each App user is solely responsible for any and all of its own User Content. Because we do not control User Content,
                    you acknowledge and agree that we are not responsible for any User Content, whether provided by you or by others.
                    We make no guarantees regarding the accuracy, currency, suitability, or quality of any User Content. Your interactions
                    with other App users are solely between you and such users. You agree that we will not be responsible for any loss
                    or damage incurred as the result of any such interactions. If there is a dispute between you and any App user, we
                    are under no obligation to become involved.
                  </span>
                </p>
                <p>
                  <span><strong>5.3.</strong></span><span className='ol-major-section-label'><strong>Release. </strong></span>
                  <span>
                    You hereby release and forever discharge us (and our officers, employees, agents, successors, and assigns)
                    from, and hereby waive and relinquish, each and every past, present, and future dispute, claim, controversy,
                    demand, right, obligation, liability, action, and cause of action of every kind and nature (including personal
                    injuries, death, and property damage), that has arisen or arises directly or indirectly out of, or that relates
                    directly or indirectly to, the App (including any interactions with, or act or omission of, other App users or
                    any Third-Party Links &amp; Ads). IF YOU ARE A CALIFORNIA RESIDENT, YOU HEREBY WAIVE CALIFORNIA CIVIL CODE
                    SECTION 1542 IN CONNECTION WITH THE FOREGOING, WHICH STATES: “A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS
                    WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS OR HER FAVOR AT THE TIME OF EXECUTING THE RELEASE,
                    WHICH IF KNOWN BY HIM OR HER MUST HAVE MATERIALLY AFFECTED HIS OR HER SETTLEMENT WITH THE DEBTOR.”
                  </span>
                </p>
              </div>

              <span><strong>6.</strong></span><span className='ol-major-section-label'><strong><u>Disclaimers</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  THE APP IS PROVIDED ON AN “AS-IS” AND “AS AVAILABLE” BASIS, AND WE (AND OUR SUPPLIERS) EXPRESSLY DISCLAIM ANY
                  AND ALL WARRANTIES AND CONDITIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING ALL WARRANTIES
                  OR CONDITIONS OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, ACCURACY, OR
                  NON-INFRINGEMENT. WE (AND OUR SUPPLIERS) MAKE NO WARRANTY THAT THE APP WILL MEET YOUR REQUIREMENTS, WILL BE
                  AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE BASIS, OR WILL BE ACCURATE, RELIABLE, FREE OF
                  VIRUSES OR OTHER HARMFUL CODE, COMPLETE, LEGAL, OR SAFE. IF APPLICABLE LAW REQUIRES ANY WARRANTIES WITH RESPECT
                  TO THE SITE, ALL SUCH WARRANTIES ARE LIMITED IN DURATION TO NINETY (90) DAYS FROM THE DATE OF FIRST USE.
                </p>
                <p>
                  THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </p>
              </div>

              <span><strong>7.</strong></span><span className='ol-major-section-label'><strong><u>Limitation on Liability</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL COMPANY (OR OUR SUPPLIERS) BE LIABLE TO YOU OR ANY
                  THIRD PARTY FOR ANY LOST PROFITS, LOST DATA, COSTS OF PROCUREMENT OF SUBSTITUTE PRODUCTS, OR ANY INDIRECT,
                  CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES ARISING FROM OR RELATING TO THESE TERMS OR
                  YOUR USE OF, OR INABILITY TO USE, THE SITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                  ACCESS TO, AND USE OF, THE APP IS AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
                  DAMAGE TO YOUR DEVICE OR COMPUTER SYSTEM, OR LOSS OF DATA RESULTING THEREFROM.
                </p>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR
                  LIABILITY TO YOU FOR ANY DAMAGES ARISING FROM OR RELATED TO THIS AGREEMENT (FOR ANY CAUSE WHATSOEVER AND REGARDLESS
                  OF THE FORM OF THE ACTION), WILL AT ALL TIMES BE LIMITED TO A MAXIMUM OF FIFTY US DOLLARS (U.S. $50). THE EXISTENCE
                  OF MORE THAN ONE CLAIM WILL NOT ENLARGE THIS LIMIT. YOU AGREE THAT OUR SUPPLIERS WILL HAVE NO LIABILITY OF ANY KIND
                  ARISING FROM OR RELATING TO THIS AGREEMENT.
                </p>
                <p>
                  THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </p>
              </div>

              <span><strong>8.</strong></span><span className='ol-major-section-label'><strong><u>Term and Termination</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  Subject to this Section, these Terms will remain in full force and effect while you use the App. We may suspend
                  or terminate your rights to use the App (including your Account) at any time for any reason at our sole discretion,
                  including for any use of the App in violation of these Terms. Upon termination of your rights under these Terms,
                  your Account and right to access and use the App will terminate immediately. You understand that any termination
                  of your Account may involve deletion of your User Content associated with your Account from our live databases.
                  We will not have any liability whatsoever to you for any termination of your rights under these Terms, including
                  for termination of your Account or deletion of your User Content. Even after your rights under these Terms are
                  terminated, the following provisions of these Terms will remain in effect: Sections 2.3 through 2.8, Section 3,
                  and Sections 4 through 10.
                </p>
              </div>

              <span><strong>9.</strong></span><span className='ol-major-section-label'><strong><u>Copyright Policy</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  We respect the intellectual property of others and ask that users of our App do the same. In connection with our
                  App, we have adopted and implemented a policy respecting copyright law that provides for the removal of any
                  infringing materials and for the termination, in appropriate circumstances, of users of our App who are repeat
                  infringers of intellectual property rights, including copyrights. If you believe that one of our users is, through
                  the use of our App, unlawfully infringing the copyright(s) in a work, and wish to have the allegedly infringing
                  material removed, the following information in the form of a written notification (pursuant to 17 U.S.C. § 512(c))
                  must be provided to support@skoller.co:
                </p>
                <ol>
                  <li>
                    your physical or electronic signature;
                  </li>
                  <li>
                    identification of the copyrighted work(s) that you claim to have been infringed;
                  </li>
                  <li>
                    identification of the material on our App that you claim is infringing and that you request us to remove;
                  </li>
                  <li>
                    sufficient information to permit us to locate such material;
                  </li>
                  <li>
                    your address, telephone number, and e-mail address;
                  </li>
                  <li>
                    a statement that the information in the notification is accurate, and under penalty of perjury, that you
                    are either the owner of the copyright that has allegedly been infringed or that you are authorized to act
                    on behalf of the copyright owner.
                  </li>
                </ol>
                <p>
                  Please note that, pursuant to 17 U.S.C. § 512(f), any misrepresentation of material fact (falsities) in a
                  written notification automatically subjects the complaining party to liability for any damages, costs and
                  attorney’s fees incurred by us in connection with the written notification and allegation of
                  copyright infringement.
                </p>
              </div>

              <span><strong>10.</strong></span><span className='ol-major-section-label'><strong><u>General</u></strong></span>
              <div className='ol-major-section'>
                <p>
                  <span><strong>10.1.</strong></span><span className='ol-major-section-label'><strong>Changes. </strong></span>
                  <span>
                    These Terms are subject to occasional revision, and if we make any substantial changes, we may notify
                    you by sending you an e-mail to the last e-mail address you provided to us (if any). You are responsible
                    for providing us with your most current e-mail address. In the event that the last e-mail address that
                    you have provided us is not valid, or for any reason is not capable of delivering to you the notice
                    described above, our dispatch of the e-mail containing such notice or posting such notice on our App
                    will nonetheless constitute effective notice of the changes described in the notice. All changes are
                    effective immediately when we post them, and apply to all access to and use of the App thereafter.
                    However, any changes to the dispute resolution provisions set forth in Section 10.2 will not apply to any
                    disputes for which the parties have actual notice on or prior to the date the change is posted on the App.
                    Continued use of our App following notice of such changes shall indicate your acknowledgement of such
                    changes and agreement to be bound by the terms and conditions of such changes. You are expected to check
                    this page from time to time so you are aware of any changes, as they are binding on you.
                  </span>
                </p>
                <p>
                  <span><strong>10.2.</strong></span><span className='ol-major-section-label'><strong>Dispute Resolution. </strong></span>
                  <span><strong><u><i>
                    Please read this Section 10.2 (also referred to as this &quot;Arbitration Agreement&quot;) carefully.
                    It is part of your contract with us and affects your rights. It contains procedures for MANDATORY
                    BINDING ARBITRATION AND A CLASS ACTION WAIVER.
                  </i></u></strong></span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(a)</span>
                  <span><i>Applicability of Arbitration Agreement. </i></span>
                  <span>
                    All claims and disputes (excluding claims for injunctive or other equitable relief as set forth below)
                    in connection with the Terms or the use of any product or service provided by us that cannot be
                    resolved informally or in small claims court shall be resolved by binding arbitration on an individual
                    basis under the terms of this Arbitration Agreement. Unless otherwise agreed to, all arbitration
                    proceedings shall be held in Tennessee. This Arbitration Agreement applies to you and us, and to
                    any subsidiaries, affiliates, agents, employees, predecessors in interest, successors, and assigns,
                    as well as all authorized or unauthorized users or beneficiaries of services or products provided under
                    the Terms.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(b)</span>
                  <span><i>Notice Requirement and Informal Dispute Resolution. </i></span>
                  <span>
                    Before either party may seek arbitration, the party must first send to the other party a written
                    Notice of Dispute (<strong>&quot;Notice&quot;</strong>) describing the nature and basis of the claim or dispute, and the
                    requested relief. A Notice to us should be sent to: 530 Church Street, Suite 301, Nashville, TN 37219.
                    After the Notice is received, you and the Company may attempt to resolve the claim or dispute informally.
                    If you and the Company do not resolve the claim or dispute within thirty (30) days after the Notice is
                    received, either party may begin an arbitration proceeding. The amount of any settlement offer made by
                    any party may not be disclosed to the arbitrator until after the arbitrator has determined the amount of
                    the award, if any, to which either party is entitled.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(c)</span>
                  <span><i>Arbitration Rules. </i></span>
                  <span>
                    Arbitration shall be initiated through the American Arbitration Association (<strong>&quot;AAA&quot;</strong>), an established
                    alternative dispute resolution provider (<strong>&quot;ADR Provider&quot;</strong>) that offers arbitration as set forth in this
                    section. If AAA is not available to arbitrate, the parties shall agree to select an alternative ADR Provider.
                    The rules of the ADR Provider shall govern all aspects of the arbitration, including but not limited to the
                    method of initiating and/or demanding arbitration, except to the extent such rules are in conflict with the
                    Terms. The AAA Consumer Arbitration Rules (<strong>&quot;Arbitration Rules&quot;</strong>) governing the arbitration are available
                    online at www.adr.org or by calling the AAA at 1-800-778-7879. The arbitration shall be conducted by a single,
                    neutral arbitrator. Any claims or disputes where the total amount of the award sought is less than Ten
                    Thousand U.S. Dollars (US $10,000.00) may be resolved through binding non-appearance-based arbitration,
                    at the option of the party seeking relief. For claims or disputes where the total amount of the award sought
                    is Ten Thousand U.S. Dollars (US $10,000.00) or more, the right to a hearing will be determined by the
                    Arbitration Rules. Any hearing will be held in a location within 100 miles of your residence, unless you
                    reside outside of the United States, and unless the parties agree otherwise. If you reside outside of the U.S.,
                    the arbitrator shall give the parties reasonable notice of the date, time and place of any oral hearings.
                    Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
                    If the arbitrator grants you an award that is greater than the last settlement offer that the Company made
                    to you prior to the initiation of arbitration, the Company will pay you the greater of the award or $2,500.00.
                    Each party shall bear its own costs (including attorney’s fees) and disbursements arising out of the arbitration
                    and shall pay an equal share of the fees and costs of the ADR Provider.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(d)</span>
                  <span><i>Additional Rules for Non-Appearance Based Arbitration. </i></span>
                  <span>
                    If non-appearance based arbitration is elected, the arbitration shall be conducted by telephone, online
                    and/or based solely on written submissions; the specific manner shall be chosen by the party initiating
                    the arbitration. The arbitration shall not involve any personal appearance by the parties or witnesses unless
                    otherwise agreed by the parties.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(e)</span>
                  <span><i>Time Limits. </i></span>
                  <span>
                    If you or the Company pursue arbitration, the arbitration action must be initiated and/or demanded within
                    the statute of limitations (i.e., the legal deadline for filing a claim) and within any deadline imposed
                    under the AAA Rules for the pertinent claim.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(f)</span>
                  <span><i>Authority of Arbitrator. </i></span>
                  <span>
                    If arbitration is initiated, the arbitrator will decide the rights and liabilities, if any, of you and
                    the Company, and the dispute will not be consolidated with any other matters or joined with any other
                    cases or parties. The arbitrator shall have the authority to grant motions dispositive of all or part of
                    any claim. The arbitrator shall have the authority to award monetary damages, and to grant any non-monetary
                    remedy or relief available to an individual under applicable law, the AAA Rules, and the Terms. The
                    arbitrator shall issue a written award and statement of decision describing the essential findings and
                    conclusions on which the award is based, including the calculation of any damages awarded. The arbitrator
                    has the same authority to award relief on an individual basis that a judge in a court of law would have.
                    The award of the arbitrator is final and binding upon you and the Company.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(g)</span>
                  <span><i>Waiver of Jury Trial. </i></span>
                  <span>
                    THE PARTIES HEREBY WAIVE THEIR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT
                    OF A JUDGE OR A JURY, instead electing that all claims and disputes shall be resolved by arbitration under
                    this Arbitration Agreement. Arbitration procedures are typically more limited, more efficient and less costly
                    than rules applicable in a court and are subject to very limited review by a court. In the event any litigation
                    should arise between you and the Company in any state or federal court in a suit to vacate or enforce an
                    arbitration award or otherwise, YOU AND THE COMPANY WAIVE ALL RIGHTS TO A JURY TRIAL, instead electing that
                    the dispute be resolved by a judge.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(h)</span>
                  <span><i>Waiver of Class or Consolidated Actions. </i></span>
                  <span>
                    ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE ARBITRATED OR LITIGATED ON AN
                    INDIVIDUAL BASIS AND NOT ON A CLASS BASIS, AND CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED
                    OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(i)</span>
                  <span><i>Confidentiality. </i></span>
                  <span>
                    All aspects of the arbitration proceeding, including but not limited to the award of the arbitrator and
                    compliance therewith, shall be strictly confidential. The parties agree to maintain confidentiality unless
                    otherwise required by law. This paragraph shall not prevent a party from submitting to a court of law any
                    information necessary to enforce this Agreement, to enforce an arbitration award, or to seek injunctive or
                    equitable relief.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(j)</span>
                  <span><i>Severability. </i></span>
                  <span>
                    If any part or parts of this Arbitration Agreement are found under the law to be invalid or unenforceable
                    by a court of competent jurisdiction, then such specific part or parts shall be of no force and effect
                    and shall be severed and the remainder of the Agreement shall continue in full force and effect.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(k)</span>
                  <span><i>Right to Waive. </i></span>
                  <span>
                    Any or all of the rights and limitations set forth in this Arbitration Agreement may be waived by the
                    party against whom the claim is asserted. Such waiver shall not waive or affect any other portion of
                    this Arbitration Agreement.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(l)</span>
                  <span><i>Survival of Agreement. </i></span>
                  <span>
                    This Arbitration Agreement will survive the termination of your relationship with Company.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(m)</span>
                  <span><i>Small Claims Court. </i></span>
                  <span>
                    Notwithstanding the foregoing, either you or the Company may bring an individual action
                    in small claims court.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(n)</span>
                  <span><i>Emergency Equitable Relief. </i></span>
                  <span>
                    Notwithstanding the foregoing, either party may seek emergency equitable relief before a
                    state or federal court in order to maintain the status quo pending arbitration. A request
                    for interim measures shall not be deemed a waiver of any other rights or obligations under
                    this Arbitration Agreement.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(o)</span>
                  <span><i>Claims Not Subject to Arbitration. </i></span>
                  <span>
                    Notwithstanding the foregoing, claims of defamation, violation of the Computer Fraud and
                    Abuse Act, and infringement or misappropriation of the other party’s patent, copyright,
                    trademark or trade secrets shall not be subject to this Arbitration Agreement.
                  </span>
                </p>
                <p>
                  <span className='ol-minor-section-label'>(p)</span>
                  <span><i>Courts. </i></span>
                  <span>
                    In any circumstances where the foregoing Arbitration Agreement permits the parties to
                    litigate in court, the parties hereby agree to submit to the personal jurisdiction of
                    the courts located within Davidson County, Tennessee, for such purpose.
                  </span>
                </p>
                <p>
                  <span><strong>10.3.</strong></span><span className='ol-major-section-label'><strong>Governing Law. </strong></span>
                  <span>
                    All matters relating to the App and these Terms and any dispute or claim arising
                    therefrom or related thereto (in each case, including non-contractual disputes or claims),
                    shall be governed by and construed in accordance with the internal laws of the State of
                    Tennessee without giving effect to any choice or conflict of law provision or rule (whether
                    of the State of Tennessee or any other jurisdiction). Notwithstanding the foregoing,
                    the enforceability and interpretation of Section 10.2 shall be both substantively and
                    procedurally governed by and construed and enforced in accordance with the Federal
                    Arbitration Act, 9 U.S.C. § 1 et seq., to the maximum extent permitted by applicable law.
                  </span>
                </p>
                <p>
                  <span><strong>10.4.</strong></span><span className='ol-major-section-label'><strong>Export. </strong></span>
                  <span>
                    The App may be subject to U.S. export control laws and may be subject to export or
                    import regulations in other countries. You agree not to export, reexport, or transfer,
                    directly or indirectly, any U.S. technical data acquired from us, or any products utilizing
                    such data, in violation of the United States export laws or regulations.
                  </span>
                </p>
                <p>
                  <span><strong>10.5.</strong></span><span className='ol-major-section-label'><strong>Disclosures. </strong></span>
                  <span>
                    We are located at the address in Section 10.9. If you are a California resident, you may
                    report complaints to the Complaint Assistance Unit of the Division of Consumer Product of
                    the California Department of Consumer Affairs by contacting them in writing at 400 R
                    Street, Sacramento, CA 95814, or by telephone at (800) 952-5210.
                  </span>
                </p>
                <p>
                  <span><strong>10.6.</strong></span><span className='ol-major-section-label'><strong>Electronic Communications. </strong></span>
                  <span>
                    The communications between you and Company use electronic means, whether you use the
                    App or send us emails, or whether Company posts notices on the App or communicates with
                    you via email. For contractual purposes, you (a) consent to receive communications from
                    Company in an electronic form, and (b) agree that all terms and conditions, agreements,
                    notices, disclosures, and other communications that Company provides to you electronically
                    satisfy any legal requirement that such communications would satisfy if it were be in a
                    hardcopy writing. The foregoing does not affect your non-waivable rights.
                  </span>
                </p>
                <p>
                  <span><strong>10.7.</strong></span><span className='ol-major-section-label'><strong>Entire Terms. </strong></span>
                  <span>
                    These Terms constitute the entire agreement between you and us regarding the use of the
                    App. Our failure to exercise or enforce any right or provision of these Terms shall not
                    operate as a waiver of such right or provision. The section titles in these Terms are
                    for convenience only and have no legal or contractual effect. The word “including” means
                    “including without limitation”. If any provision of these Terms is, for any reason, held
                    to be invalid or unenforceable, the other provisions of these Terms will be unimpaired
                    and the invalid or unenforceable provision will be deemed modified so that it is valid
                    and enforceable to the maximum extent permitted by law. Your relationship to Company is
                    that of an independent contractor, and neither party is an agent or partner of the other.
                    These Terms, and your rights and obligations herein, may not be assigned, subcontracted,
                    delegated, or otherwise transferred by you without Company’s prior written consent, and
                    any attempted assignment, subcontract, delegation, or transfer in violation of the foregoing
                    will be null and void. Company may freely assign these Terms. The terms and conditions set
                    forth in these Terms shall be binding upon assignees.
                  </span>
                </p>
                <p>
                  <span><strong>10.8.</strong></span><span className='ol-major-section-label'><strong>Copyright/Trademark Information. </strong></span>
                  <span>
                    Copyright © 2018 Skoller, Inc. All rights reserved. All trademarks, logos, and service marks
                    (<strong>&quot;Marks&quot;</strong>) displayed on the App are our property or the property of other third parties.
                    You are not permitted to use these Marks without our prior written consent or the consent of
                    such third party which may own the Marks.
                  </span>
                </p>
                <p>
                  <span><strong>10.9.</strong></span><span className='ol-major-section-label'><strong>Contact Information: </strong></span>
                  <p>
                    To ask questions or comment about these Terms, contact us at: <a href='mailto:support@skoller.co'>support@skoller.co</a>.
                  </p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(UserAgreement)
