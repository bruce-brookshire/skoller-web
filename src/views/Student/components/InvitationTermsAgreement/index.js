import React from 'react'
import PropTypes from 'prop-types'
import actions from '../../../../actions'

function InvitationTermsAgreement (props) {
  const invitation = props.invitation
  const termsRef = React.useRef()
  const [bottom, setBottom] = React.useState(false)

  const renderTerms = () => {
    return (
      <React.Fragment>
        <p className="c26">
          <span className="c0">SKOLLER, </span>
          <span className="c27">INC</span>
          <span className="c0">&nbsp;PRIVACY POLICY</span>
        </p>
        <p className="c1">
          <span className="c4">At Skoller, </span>
          <span className="c7">Inc.</span>
          <span className="c4">
            &nbsp;(referred to as &ldquo;Company,&rdquo; &ldquo;us&rdquo; or
            &ldquo;we&rdquo;), we recognize that your{' '}
          </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">&nbsp;is important. This </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">&nbsp;discloses the </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">
            &nbsp;practices for the Company&rsquo;s family of Websites
            (collectively, the &ldquo;Site&rdquo;), as well as related products
            and services we may offer to you (collectively referred to as the
            &ldquo;Services&rdquo;). This{' '}
          </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">
            &nbsp;also covers how personal and other information that we receive
            or collect about you is treated. Please read the information below
            to learn the following regarding your use of this Site.
          </span>
        </p>
        <p className="c1">
          <span className="c4">You acknowledge that this </span>
          <span className="c0 c3">Privacy Policy</span>
          <span className="c4">
            &nbsp;is designed to be read in connection with the Site Terms and
            Conditions of Use, which is available{' '}
          </span>
          <span className="c7">at </span>
          <span className="c7 c32">
            <a
              className="c20"
              href="https://www.google.com/url?q=http://joinskoller.com/tos&amp;sa=D&amp;ust=1596583156532000&amp;usg=AOvVaw1VlaJn6mUpLA6nYhR-jDjm"
            >
              joinskoller.com/tos
            </a>
          </span>
          <span className="c4">
            , and that by accessing or using our Site, you agree to be bound by
            the Site&rsquo;s terms and conditions, as well as this{' '}
          </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">.</span>
        </p>
        <p className="c1">
          <span className="c4">We reserve the right to change this </span>
          <span className="c0 c3">Privacy Policy</span>
          <span className="c4">
            &nbsp;from time to time. We will notify you about significant
            changes in the way we treat personal information by sending a notice
            to the primary email address specified in your account, by placing a
            prominent notice on our site, and by updating any{' '}
          </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">
            &nbsp;information on this page. Your continued use of the Site and
            or Services available through this Site after such modifications
            will constitute your: (a) acknowledgment of the modified{' '}
          </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">
            ; and (b) your agreement to abide and be bound by that{' '}
          </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">.</span>
        </p>
        <p className="c9">
          <span className="c4">If you have any questions about this </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">, please feel free to contact us at: </span>
          <span className="c32 c27 c29 c33">
            <a className="c20" href="mailto:support@skoller.co">
              support@skoller.co
            </a>
          </span>
          <span className="c4">.</span>
        </p>
        <p className="c1">
          <span className="c4 c29">Optional:</span>
        </p>
        <p className="c1">
          <span className="c4">
            [IMPORTANT: BY USING THE SITE AND/OR OFFERINGS AVAILABLE ON THIS
            SITE, YOU GIVE YOUR CONSENT THAT ALL PERSONAL{' '}
          </span>
          <span className="c0 c3">DATA</span>
          <span className="c4">
            &nbsp;THAT YOU SUBMIT MAY BE PROCESSED BY US IN THE MANNER AND FOR
            THE PURPOSES DESCRIBED BELOW. IF YOU DO NOT AGREE TO THESE TERMS AND
            CONDITIONS, DO NOT USE THE SITE.]
          </span>
        </p>
        <p className="c1">
          <span className="c0">1. Types of Information We Collect</span>
        </p>
        <p className="c1">
          <span className="c4">
            In order to better provide you with a better journey through your
            college or university experience, helping your university athletic
            departments track students grades and schedule and placing students
            with potential employers through Skoller Jobs, we collect two types
            of information about our users: Personally Identifiable Information
            (&ldquo;PII&rdquo;) and Aggregate Information.
          </span>
        </p>
        <p className="c1">
          <span className="c0">Personally Identifiable Information:</span>
          <span className="c4">
            &nbsp;This refers to information that lets us know the specifics of
            who you are. When you engage in certain activities on this Site,
            such as registering for an account, downloading or purchasing a
            product or service, submitting content and/or posting content in the
            user forums, or sending us feedback, we may ask you to provide
            certain information about yourself.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            Examples of PII may include your first and last name, email address,
            mailing address (including zip code), employer, job title and
            department, telephone and facsimile numbers, grades, className
            schedule, athletic sports team, groups or clubs, resume, and other
            identifying information. When ordering products or services on the
            Site, you may be asked to provide a credit card number.
          </span>
        </p>
        <p className="c1">
          <span className="c0">Aggregate Information:</span>
          <span className="c4">
            &nbsp;This refers to information that does not by itself identify a
            specific individual. We gather certain information about you based
            upon where you visit on our Site and what other sites may have
            directed you to us. This information, which is collected in a
            variety of different ways, is compiled and analyzed on both a
            personal and an aggregated basis. This information may include the
            Website&rsquo;s Uniform Resource Locator (&ldquo;URL&rdquo;) that
            points to the site you just came from, which URL you go to after
            visiting our Site, what browser you are using, and your Internet
            Protocol (&ldquo;IP&rdquo;) address.
          </span>
        </p>
        <p className="c1">
          <span className="c0">2. How We Collect and Use Information</span>
        </p>
        <p className="c1">
          <span className="c4">
            We do not collect any PII about you unless you voluntarily provide
            it to us. However, you may be required to provide certain PII to us
            when you elect to use certain products or services available on the
            Site. These may include: (a) registering for an account on our Site;
            (b) entering a sweepstakes or contest sponsored by us or one of our
            partners; (c) signing up for special offers from selected third
            parties; (d) sending us an email message; (e) submitting a form or
            transmitting other information by telephone or letter; (e)
            submitting your credit card or other payment information when
            ordering and purchasing products and services on our Site; (f)
            signing up at a university during enrollment or at the direction of
            said university athletic department; or (g) providing this all
            information to employers as a part of Skoller Jobs for employment.
            When processing certain information, such as payment information
            with affiliated banking institutions or payment processors, we
            encrypt the transaction, using Secure Socket Layer (SSL) encryption
            technology, in order to prevent your PII from being stolen or
            intercepted. Additionally, your credit card information{' '}
          </span>
          <span className="c4">
            is encrypted and stored on a restricted-access database that is away
            from our main Site and only accessible by authorized users.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            We will primarily use your PII to provide product or service
            offerings to you. We will also use certain forms of PII to enhance
            the operation of our Site, improve our internal marketing and
            promotional efforts, statistically analyze Site use, improve our
            product and service offerings, and customize our Site&rsquo;s
            content, layout, and services. We may use PII to deliver information
            to you and to contact you regarding administrative notices. Finally,
            we may use your PII to resolve disputes, troubleshoot problems and
            enforce our agreements with you, including our Site Terms of Use,
            and this{' '}
          </span>
          <span className="c0 c3">Privacy Policy</span>
          <span className="c4">.</span>
        </p>
        <p className="c1">
          <span className="c4">
            We may also collect, or our third-party advertising partners may
            collect certain Aggregate Information. For example, we may use your
            IP address to diagnose problems with our servers, software, to
            administer our Site and to gather demographic information. Our
            third-party advertising partners may also provide us with aggregate,
            but not individual, reports that will tell us how many ads were
            presented and clicked upon at out Site.
          </span>
        </p>
        <p className="c1">
          <span className="c0">3. Cookies</span>
        </p>
        <p className="c1">
          <span className="c4">
            Depending on how you use our Site, we may store cookies on your
            computer in order to collect certain aggregate{' '}
          </span>
          <span className="c0 c3">data</span>
          <span className="c4">
            &nbsp;about our users and to customize certain aspects of your
            specific user experience. A cookie is a small{' '}
          </span>
          <span className="c0 c3">data</span>
          <span className="c4">
            &nbsp;text file which is stored on your computer that uniquely
            identifies your browser. Cookies may also include more personalized
            information, such as your IP address, browser type, the server your
            computer is logged onto, the area code and zip code associated with
            your server, and your first name to welcome you back to our Site. We
            may use cookies to perform tasks such as: monitoring aggregate site
            usage metrics, storing and remembering your passwords (if you allow
            us to do so), storing account and advertising preferences that you
            have set, and personalizing the Services we make available to you.
            However, we do not use cookies to track your browsing behaviors.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            We may also use an outside advertising partner to display banner
            advertisements on our Site. As part of their service, they will
            place a separate cookie on your computer. We will not provide any
            third-party advertising partners with any of your PII or information
            about your purchases. We and our third party ad server will collect
            and use Aggregate Information about you, such as your IP address,
            browser type, the server your computer is logged onto, the area code
            and zip code associated with your server and whether you responded
            to a particular ad. Other advertisers may also place banner ads on
            our Site in the same manner as above, but we will not disclose any
            PII to them.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            Most browsers are initially set up to accept cookies, but you can
            reset your browser to refuse all cookies or to indicate when a
            cookie is being sent. However, some aspects of the Site may not
            function properly if you elect to disable cookies.
          </span>
        </p>
        <p className="c1">
          <span className="c0">4. Release of Information</span>
        </p>
        <p className="c1">
          <span className="c4">
            We will not sell, trade, or rent your PII to others. We do provide
            some of our product and service offerings through contractual
            arrangements made with affiliates, service providers, partners and
            other third parties (&ldquo;Service Partners&rdquo;). We and our
            Service Partners may need to use some PII in order to perform tasks
            between our respective sites, or to deliver products or services to
            you. For example, we must release your credit card information to
            the card-issuing bank to confirm payment for products and services
            purchased on this Site; release your address information to the
            delivery service to deliver products that you ordered; and provide
            order information to third parties that help us provide customer
            service.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            We will encourage our Service Partners to adopt and promote strong{' '}
          </span>
          <span className="c0 c3">privacy policies</span>
          <span className="c4">
            . However, the use of your PII by our Service Partners is governed
            the respective{' '}
          </span>
          <span className="c0 c3">privacy policies</span>
          <span className="c4">
            &nbsp;of those providers, and is not subject to our control. Except
            as otherwise discussed in this{' '}
          </span>
          <span className="c0 c3">Privacy Policy</span>
          <span className="c4">
            , this document only addresses the use and disclosure of information
            we collect from you. Other Sites accessible through this Site,
            including our Advertising and Service Partners, have their own{' '}
          </span>
          <span className="c0 c3">privacy policies</span>
          <span className="c4">&nbsp;and </span>
          <span className="c0 c3">data</span>
          <span className="c4">
            &nbsp;collection, use and disclosure practices. Please consult each
            Site&rsquo;s{' '}
          </span>
          <span className="c0 c3">privacy policy</span>
          <span className="c4">. We are not responsible for the </span>
          <span className="c0 c3">policies</span>
          <span className="c4">&nbsp;or practices of third parties.</span>
        </p>
        <p className="c1">
          <span className="c4">
            Occasionally we may be required by law enforcement or judicial
            authorities to provide PII to the appropriate governmental
            authorities. In such cases, we will disclose PII upon receipt of a
            court order, subpoena, or to cooperate with a law enforcement
            investigation. We fully cooperate with law enforcement agencies in
            identifying those who use our services for illegal activities. We
            reserve the right to report to law enforcement agencies any
            activities that we in good faith believe to be unlawful.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            We may also provide Aggregate Information about our customers&rsquo;
            sales, traffic patterns, and related Site information to third party
            advertisers, but these statistics do not include any Personally
            Identifiable Information.
          </span>
        </p>
        <p className="c1">
          <span className="c0">5. Updating and Correcting Information</span>
        </p>
        <p className="c1">
          <span className="c4">
            We believe you should have the ability to access and edit the PII
            that you have provided to us. You may change any of your PII in your
            account online at any time by linking to your account in accordance
            with instructions posted elsewhere on this Site. You may also access
            and correct your personal information and{' '}
          </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">
            &nbsp;preferences by emailing or writing us at:
          </span>
        </p>
        <p className="c11">
          <span className="c2">701 Murfreesboro Pike</span>
        </p>
        <p className="c11">
          <span className="c2">Nashville, TN&nbsp;37210</span>
        </p>
        <p className="c11">
          <span className="c0">Attn:</span>
          <span className="c4">&nbsp;</span>
          <span className="c0 c3">Privacy</span>
          <span className="c4">&nbsp;Compliance Officer</span>
        </p>
        <p className="c28">
          <span className="c0">Email:</span>
          <span className="c7">&nbsp;</span>
          <span className="c3 c7 c21">
            <a className="c20" href="mailto:support@skoller.co">
              support@skoller.co
            </a>
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            Please include your name, address, and/or email address when you
            contact us.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            We encourage you to promptly update your PII if it changes. You may
            ask to have the information on your account deleted or removed;
            however, some information, such as past transactions, logs of
            technical support calls, or other information may not be deleted. In
            addition, it may be impossible to completely delete your information
            without some residual information because of backups.
          </span>
        </p>
        <p className="c1">
          <span className="c0">
            6. User Choices on Collection and Use of Information
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            We may, from time to time, send you email regarding new products and
            services that we feel may interest you. In addition, if you
            indicated upon registration that you are interested in receiving
            offers or information from us and our partners, we may occasionally
            call or send you direct mail about products and services that may be
            of interest to you. Only Company (or agents working on behalf of
            Company and under confidentiality agreements) will send you these
            solicitations, and only if you have previously indicated that you
            wish to receive them. If you do not want to receive solicitations
            from us, you can &ldquo;opt-out&rdquo; by accessing your account
            online editing your account information to no longer receive such
            offers and mailings.
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            You also have choices with respect to cookies, as described above.
            By modifying your browser preferences, you have the choice to accept
            all cookies, to be notified when a cookie is set, or to reject all
            cookies. If you choose to reject all cookies some parts of our Site
            may not work properly in your case.
          </span>
        </p>
        <p className="c1">
          <span className="c0">7. Security of Your PII</span>
        </p>
        <p className="c1">
          <span className="c4">
            At our Site you can be assured that your PII is secure, consistent
            with current industry standards. We strive to take appropriate
            security measures to protect against unauthorized access to or
            unauthorized alteration, disclosure or destruction of your PII. For
            example:
          </span>
        </p>
        <ul className="c13 lst-kix_list_1-0 start">
          <li className="c25">
            <span className="c4">We work hard to ensure that the </span>
            <span className="c0 c3">data</span>
            <span className="c4">
              &nbsp;we collect is reliable, accurate, complete and current. We
              encrypt all PII, in order to prevent unauthorized parties from
              viewing such information when it is transmitted to us. We also
              only keep collected information only for as long as reasonably
              necessary and use it only for the purposes for which it was
              collected or to comply with any applicable legal or ethical
              reporting or document retention requirements.
            </span>
          </li>
        </ul>
        <ol className="c13 lst-kix_list_2-0 start" start="1">
          <li className="c25">
            <span className="c4">
              We limit access to PII only to specific employees, contractors and
              agents who have a reasonable need to come into contact with your
              information. For example, we may provide members of our technical
              support team with limited access to your account in order to allow
              them to troubleshoot problems you may be having with the Site.
            </span>
          </li>
        </ol>
        <ol className="c13 lst-kix_list_3-0 start" start="1">
          <li className="c25">
            <span className="c4">
              Additionally, we also employ a number of physical, electronic, and
              procedural safeguards to protect PII. Our secure servers and our{' '}
            </span>
            <span className="c0 c3">data</span>
            <span className="c4">
              &nbsp;centers are protected by industry-standard encryption, and
              our servers reside behind firewalls and employ high-level password
              protection.
            </span>
          </li>
        </ol>
        <ol className="c13 lst-kix_list_4-0 start" start="1">
          <li className="c25">
            <span className="c4">
              Finally, access by you to your PII is available through a password
              and unique customer ID selected by you. This password is
              encrypted. We recommend that you do not divulge your password to
              anyone.
            </span>
          </li>
        </ol>
        <p className="c1">
          <span className="c4">
            In order to most effectively serve you, credit card transactions and
            order fulfillment are handled by established third party banking
            institutions and processing agents (such as PayPal). They receive
            the information needed to verify and authorize your credit card or
            other payment information and to process and ship your order.
          </span>
        </p>
        <p className="c1">
          <span className="c4">Unfortunately, no </span>
          <span className="c0 c3">data</span>
          <span className="c4">
            &nbsp;transmission over the Internet or any wireless network can be
            guaranteed to be 100% secure. As a result, while we strive to
            protect your PII, you acknowledge that: (a) there are security and{' '}
          </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">
            &nbsp;limitations inherent to the Internet which are beyond our
            control; and (b) the security, integrity and{' '}
          </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">&nbsp;of any and all information and </span>
          <span className="c0 c3">data</span>
          <span className="c4">
            &nbsp;exchanged between you and us through this Site cannot be
            guaranteed.
          </span>
        </p>
        <p className="c1">
          <span className="c0">8. Miscellaneous</span>
        </p>
        <p className="c1">
          <span className="c4">
            You must be at least 18 years old to have our permission to use this
            Site. Our{' '}
          </span>
          <span className="c0 c3">policy</span>
          <span className="c4">
            &nbsp;is that we do not knowingly collect, use or disclose PII about
            minor visitors.
          </span>
        </p>
        <p className="c9">
          <span className="c4">
            You should also be aware that when Personally Identifiable
            Information is voluntarily disclosed (i.e. your name, email address,
            etc.) in the discussion forums or other public areas on this Site,
            that information, along with any information disclosed in your
            communication, can be collected and used by third parties and may
            result in unsolicited messages (including unwanted spam messages)
            from third parties. Such activities are beyond our control and this{' '}
          </span>
          <span className="c0 c3">Policy</span>
          <span className="c4">
            &nbsp;does not apply to such information. Please consult our Site
            Terms and Conditions of Use Agreement for our Site Conduct{' '}
          </span>
          <span className="c0 c3">policies</span>
          <span className="c4">. </span>
          <span className="c3 c7 c23">
            <a href="https://www.google.com/url?q=http://joinskoller.com/tos&amp;sa=D&amp;ust=1596583156538000&amp;usg=AOvVaw1xhJLFN2dsHxQtBjk2_Db9">
              http://joinskoller.com/tos
            </a>
          </span>
        </p>
        <p className="c1">
          <span className="c4">
            If you have any questions, concerns or inquiries about our{' '}
          </span>
          <span className="c0 c3">Privacy Policy</span>
          <span className="c4">, or our use of your PII, or our </span>
          <span className="c0 c3">privacy</span>
          <span className="c4">&nbsp;practices, please contact us at: </span>
          <span className="c32 c7 c33 c29">
            <a className="c20" href="mailto:support@skoller.co">
              support@skoller.co
            </a>
          </span>
          <span className="c4">. You can also reach our </span>
          <span className="c0 c3">Privacy</span>
          <span className="c4">
            &nbsp;Compliance Officer by sending written correspondence to:
          </span>
        </p>
        <p className="c11 c31">
          <span className="c2"></span>
        </p>
        <p className="c11">
          <span className="c2">Skoller, Inc.</span>
        </p>
        <p className="c11">
          <span className="c2">701 Murfreesboro Pike</span>
        </p>
        <p className="c11">
          <span className="c2">Nashville, TN&nbsp;37210</span>
        </p>
        <p className="c11">
          <span className="c0">Attn:</span>
          <span className="c4">&nbsp;</span>
          <span className="c0 c3">Privacy</span>
          <span className="c4">&nbsp;Compliance Officer</span>
        </p>
        <p className="c15">
          <span className="c2">
            <br />
          </span>
        </p>
        <p className="c24 c34">
          <span className="c2"></span>
        </p>
        <div>
          <p className="c5">
            <span className="c10"></span>
          </p>
          <a id="t.3a0e1432b395f6d8c6cb1b1a0e9be52a217af50d"></a>
          <a id="t.1"></a>
          <table className="c12">
            <tbody>
              <tr className="c16">
                <td className="c17">
                  <p className="c24">
                    <span className="c10"></span>
                  </p>
                </td>
                <td className="c14">
                  <p className="c19">
                    <span className="c7">SKOLLER, INC</span>
                  </p>
                </td>
                <td className="c17">
                  <p className="c24">
                    <span className="c10"></span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="c5">
            <span className="c10"></span>
          </p>
        </div>
      </React.Fragment>
    )
  }

  const onScroll = () => {
    if (termsRef.current.scrollTop > (termsRef.current.scrollHeight - termsRef.current.offsetHeight - 120)) {
      setBottom(true)
    }
  }

  const scroll = () => {
    termsRef.current.scroll({top: termsRef.current.scrollHeight - termsRef.current.offsetHeight, behavior: 'smooth'})
  }

  const accept = () => {
    actions.insights.invitations.acceptInvitation(props.invitation.organization.id, props.invitation.id)
      .then(r => {
        props.onSubmit && props.onSubmit()
      })
  }

  return (
    <div className='sk-org-invitation'>
      <div className='sk-org-invitation-message'>
        <h1>Welcome to Skoller!</h1>
        <h2>An advisor from {invitation.organization.name} would like to collaborate with you on Skoller.</h2>
        <h2>Please review the privacy policy to proceed.</h2>
      </div>
      <div className='sk-org-invitation-terms-container'>
        <div className='terms' ref={termsRef} onScroll={onScroll}>
          {renderTerms()}
        </div>
        <div className={'si-button ' + (bottom ? '' : 'inactive')}>
          {bottom
            ? <p onClick={() => accept()}>Accept Invitation</p>
            : <p onClick={() => scroll()}>Review</p>
          }
        </div>
      </div>
    </div>
  )
}

InvitationTermsAgreement.propTypes = {
  onSubmit: PropTypes.func,
  invitation: PropTypes.object,
  user: PropTypes.object
}

export default InvitationTermsAgreement
