/* */

import React from "react";

import styled from "styled-components";

import Layout from "../Components/Layout.jsx";

import PageNavigation from "../Components/PageNavigation.jsx";

const Policy = () => {
  /* */

  /* Returning the content that we will display in the "/policy" route.
     because for this route we have provide component {<PrivacyPolicy />}
     ie. <Route path="/policy" element={<PrivacyPolicy />} /> 
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Privacy-Policy-Page"}>
        {/* */}

        {/* Using grid to separate the contents in two parts 1st part contains image and 2nd part contains 
            some text.
        */}

        <PageNavigation title="Privacy policy" />

        {/* 1st part contains image */}

        {/* <div className="row m-3 p-3 justify-center ">
          <div className="col-md-6 ">
            <img
              src="/newImages/contactus.jpeg"
              alt="contactus"
              className="rounded-xl ml-[80px] responsive-img"
              style={{ width: "70%" }}
            />
          </div>
        </div> */}

        {/* 2nd part contains privacy policy information */}

        <div className="row mt-4">
          {/* */}

          <h1 className="text-center mb-[40px] mt-[40px] underline text-5xl font-bold font-sans text-[#14527C]">
            Privacy Policy
          </h1>

          {/* */}

          <div className="col-md-11 ml-[60px] mb-[40px] responsive-info">
            {/* */}

            {/* Headings paragraphs */}

            <div>
              {/* */}

              <p className="font-semibold mb-5 text-2xl responsive-paragraphs">
                This Privacy Policy describes our policies and procedures on the
                collection, use and disclosure of your information when you use
                the service and tells you about your privacy rights and how the
                law protects you. We use your personal data to provide and
                improve the service. By using the service, you agree to the
                collection and use of information in accordance with this
                Privacy Policy.
              </p>

              <p className="font-semibold mb-5 text-2xl responsive-paragraphs">
                This website is owned and operated by Hompoti. We recognize that
                visitors to our site may be concerned about the information they
                provide to us and how we treat that information. Hompoti is
                committed to ensuring that your privacy is protected. This
                Privacy Policy addresses those concerns. This policy may be
                changed or updated from time to time. You should check this page
                from time to time to ensure that you are happy with any changes.
                This policy is effective from 01/01/2023.
              </p>

              <p className="font-semibold mb-5 text-2xl responsive-paragraphs">
                If you have any questions about our Privacy Policy, you may
                contact us at: The Hompoti, Arengapara Milon Nagar Golaghat Pin-
                785 621, Assam India. Phone: 91- 70863-67457 E-mail:
                infohompoti@gmail.com
              </p>

              {/* */}
            </div>

            {/* Hompoti */}

            <div>
              {/* */}

              <p className="font-semibold mb-5 text-2xl responsive-paragraphs">
                <h1 className="text-4xl pb-3"> Hompoti </h1>
                Hompoti uses its best efforts to respect the privacy of its
                online visitors. At our site, we do not collect personally
                identifiable information from individuals unless they provide it
                to us voluntarily and knowingly. This means we do not require
                you to register or provide information to us in order to view
                our website. Hompoti only gathers personally identifiable data,
                such as names, addresses, zip/postal codes, e-mail addresses,
                etc., when voluntarily submitted by a visitor. For example, we
                ask for personal information on our online donation pages, and
                use this information to acknowledge receipt of your donation for
                tax purposes. Hompoti does not sell or trade such information
                collected to third parties. We will not share personally
                identifiable information with third parties unless authorized by
                the person submitting the information or required by law.
              </p>

              {/* */}
            </div>

            {/* Cookies */}

            <div>
              {/* */}

              <p className="font-semibold mb-5 text-2xl responsive-paragraphs">
                <h1 className="text-4xl pb-3"> Cookies </h1>
                Visitors should be aware that non-personal information and data
                may be automatically collected by Hompoti’s website through the
                use of cookies. Cookies are small text files a website can use
                to recognize repeat visitors, facilitate the visitor’s ongoing
                access to and use of the site, and allow a site to track usage
                behavior and compile aggregate data that will allow content
                improvements. Cookies are not programs that come onto a
                visitor’s system and damage files. Generally, cookies work by
                assigning a unique number to the visitor that has no meaning
                outside the assigning site. If a visitor does not want
                information collected through the use of cookies, there is a
                simple procedure in most browsers that allows the visitor to
                deny or accept the cookie feature. Hompoti uses cookie
                technology only to obtain non-personal information from its
                online visitors in order to improve visitors’ online experience
                and facilitate their visit within our site.
              </p>

              {/* */}
            </div>

            {/* External Links  */}

            <div>
              {/* */}

              <p className="font-semibold mb-5 text-2xl responsive-paragraphs">
                <h1 className="text-4xl pb-3"> External Links </h1>
                This website may contain links to other sites. Unless we
                expressly state otherwise, Hompoti makes no representations
                whatsoever concerning the content of those sites. The fact that
                Hompoti has provided a link to a site is not an endorsement,
                authorization, sponsorship, or affiliation with respect to such
                site, its owners, or its providers. There are risks associated
                with using any information, software, or products found on the
                internet, and Hompoti cautions you to make sure that you
                understand these risks before retrieving, using, relying upon,
                or purchasing anything via the internet. In addition, we
                encourage our users to be aware when they leave our site to read
                the privacy statements of each and every website that collects
                personally identifiable information. These other sites may
                collect or solicit personal data or send their own cookies to
                your computer. Please be aware that Hompoti is not responsible
                for the privacy practices of other websites. Please check the
                privacy statements of these other sites for more information
                about their policies on collection and use of personal
                information.
              </p>

              {/* */}
            </div>

            {/* Collecting and Using Your Personal Data */}

            <div>
              {/* */}

              <h2 className="font-bold font-sans text-4xl mb-4">
                Collecting And Using Your Personal Data
              </h2>

              <p className="font-semibold font-sans text-2xl mb-3 responsive-other-paragraphs">
                While using our service, we may ask you to provide us with
                certain personally identifiable information that can be used to
                contact or identify you. Personally identifiable information may
                include, but is not limited to:
              </p>

              <ol className="font-semibold font-sans text-2xl mb-5">
                <li>
                  <p>Email address</p>
                </li>
                <li>
                  <p>First name and last name</p>
                </li>
                <li>
                  <p>Phone number</p>
                </li>
                <li>
                  <p>Address, State, Province, ZIP/Postal code, City</p>
                </li>
              </ol>

              {/* */}
            </div>

            {/* Usage Data */}

            <div>
              <h3 className="font-semibold font-sans text-4xl mb-4">
                Usage Data
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                Usage data is collected automatically when using the service.
                Usage data may include information such as your device's
                Internet Protocol address (e.g. IP address), browser type,
                browser version, the pages of our service that you visit, the
                time and date of your visit, the time spent on those pages,
                unique device identifiers and other diagnostic data. When you
                access the service by or through a mobile device. We may collect
                certain information automatically, including, but not limited
                to, the type of mobile device you use. Your mobile device unique
                ID, the IP address of your mobile device, your mobile operating
                system, the type of mobile internet browser you use, unique
                device identifiers and other diagnostic data. We may also
                collect information that your browser sends whenever you visit
                our service or when you access the service by or through a
                mobile device.
              </p>
            </div>

            {/* Information from Third-Party Social Media Services  */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Information From Third-Party Social Media Services
              </h3>

              <p className="font-semibold font-sans text-2xl mb-4 responsive-other-paragraphs">
                The company allows you to create an account and log in to use
                the service through the following third-party social media
                services:
              </p>

              <ul className="font-semibold font-sans text-2xl mb-4">
                <li>Google</li>
                <li>Facebook</li>
              </ul>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                If you decide to register through or otherwise grant us access
                to a Third-Party Social Media Service, we may collect personal
                data that is already associated with your Third-Party Social
                Media Service's account, such as your name, your email address,
                your activities or your contact list associated with that
                account. You may also have the option of sharing additional
                information with the company through your Third-Party Social
                Media Service's account. If you choose to provide such
                information and personal data, during registration or otherwise,
                you are giving the company permission to use, share, and store
                it in a manner consistent with this Privacy Policy.
              </p>

              {/* */}
            </div>

            {/* With Providers */}

            <ul className="font-semibold font-sans text-[16px] mb-5 leading-10 responsive-providers">
              {/* */}

              <li className="mb-4">
                <strong>With Service Providers:</strong> We may share your
                personal information with service providers to monitor and
                analyze the use of our service, to contact you.
              </li>

              <li className="mb-4">
                <strong>For Business Transfers:</strong> We may share or
                transfer your personal information in connection with, or during
                negotiations of, any merger, sale of company assets, financing,
                or acquisition of all or a portion of our business to another
                company.
              </li>

              <li className="mb-4">
                <strong>With Affiliates:</strong> We may share your information
                with our affiliates, in which case we will require those
                affiliates to honor this Privacy Policy. Affiliates include our
                parent company and any other subsidiaries, joint venture
                partners or other companies that we control or that are under
                common control with Us.
              </li>

              <li className="mb-4">
                <strong>With Business Partners:</strong> We may share your
                information with our business partners to offer you certain
                products, services or promotions.
              </li>

              <li className="mb-4">
                <strong>With Other Users:</strong> When you share personal
                information or otherwise interact in the public areas with other
                users, such information may be viewed by all users and may be
                publicly distributed outside. If you interact with other users
                or register through a Third-Party Social Media Service, your
                contacts on the Third-Party Social Media Service may see your
                name, profile, pictures and description of your activity.
                Similarly, other users will be able to view descriptions of your
                activity, communicate with you and view your profile.
              </li>

              <li>
                <strong>With Your Consent</strong>: We may disclose your
                personal information for any other purpose with your consent.
              </li>

              {/* */}
            </ul>

            {/* Retention of Your Personal Data */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Retention Of Your Personal Data
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                The company will retain your personal data only for as long as
                is necessary for the purposes set out in this Privacy Policy. We
                will retain and use your personal data to the extent necessary
                to comply with our legal obligations (for example, if we are
                required to retain your data to comply with applicable laws),
                resolve disputes, and enforce our legal agreements and policies.
                The company will also retain usage data for internal analysis
                purposes. Usage data is generally retained for a shorter period
                of time, except when this data is used to strengthen the
                security or to improve the functionality of our service, or we
                are legally obligated to retain this data for longer time
                periods.
              </p>

              {/* */}
            </div>

            {/* Transfer of Your Personal Data */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Transfer Of Your Personal Data
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                Your information, including Personal Data, is processed at the
                company's operating offices and in any other places where the
                parties involved in the processing are located. It means that
                this information may be transferred to — and maintained on —
                computers located outside of your state, province, country or
                other governmental jurisdiction where the data protection laws
                may differ than those from your jurisdiction. Your consent to
                this Privacy Policy followed by your submission of such
                information represents your agreement to that transfer. The
                company will take all steps reasonably necessary to ensure that
                your data is treated securely and in accordance with this
                Privacy Policy and no transfer of your personal data will take
                place to an organization or a country unless there are adequate
                controls in place including the security of your data and other
                personal information.
              </p>

              {/* */}
            </div>

            {/* Delete Your Personal Data */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Delete Your Personal Data
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                You have the right to delete or request that we assist in
                deleting the personal data that we have collected about you. Our
                service may give you the ability to delete certain information
                about you from within the service. You may update, amend, or
                delete your information at any time by signing in to your
                account, if you have one, and visiting the account settings
                section that allows you to manage your personal information. You
                may also contact us to request access to, correct, or delete any
                personal information that you have provided to us. Please note,
                however, that we may need to retain certain information when we
                have a legal obligation or lawful basis to do so.
              </p>

              {/* */}
            </div>

            {/* Disclosure of Your Personal Data */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Disclosure Of Your Personal Data
              </h3>

              <h3 className="font-semibold font-sans text-3xl mb-4">
                Business Transactions
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                If the company is involved in a merger, acquisition or asset
                sale, your personal data may be transferred. We will provide
                notice before your personal data is transferred and becomes
                subject to a different Privacy Policy.
              </p>

              <h3 className="font-semibold font-sans text-3xl mb-4">
                Law enforcement
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                Under certain circumstances, the company may be required to
                disclose your personal data if required to do so by law or in
                response to valid requests by public authorities (e.g. a court
                or a government agency).
              </p>

              <h3 className="font-semibold font-sans text-3xl mb-4">
                Other legal requirements
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                The company may disclose your personal data in the good faith
                belief that such action is necessary to:
              </p>

              <ul className="font-semibold font-sans text-2xl mb-5 leading-10">
                {/* */}

                <li> ✹ Comply with a legal obligation</li>

                <li>
                  ✹ Protect and defend the rights or property of the company
                </li>

                <li>
                  ✹ Prevent or investigate possible wrong doing in connection
                  with the service
                </li>

                <li>
                  ✹ Protect the personal safety of users of the service or the
                  public
                </li>

                <li> ✹ Protect against legal liability</li>

                {/* */}
              </ul>

              {/* */}
            </div>

            {/* Security of Your Personal Data */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Security of your personal data
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                The security of your personal data is important to us, but
                remember that no method of transmission over the internet, or
                method of electronic storage is 100% secure. While we strive to
                use commercially acceptable means to protect your personal data,
                we cannot guarantee its absolute security.
              </p>

              {/* */}
            </div>

            {/* Children's Policy */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Children's privacy
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                Our service does not address anyone under the age of 13. We do
                not knowingly collect personally identifiable information from
                anyone under the age of 13. If you are a parent or guardian and
                you are aware that your child has provided us with personal
                data, please contact us. If we become aware that we have
                collected personal data from anyone under the age of 13 without
                verification of parental consent, We take steps to remove that
                information from our servers. If we need to rely on consent as a
                legal basis for processing your information and your country
                requires consent from a parent, we may require your parent's
                consent before we collect and use that information.
              </p>

              {/* */}
            </div>

            {/* Links to Other Websites */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Links to other websites
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                Our service may contain links to other websites that are not
                operated by us. If you click on a third party link, you will be
                directed to that third party's site. We strongly advise you to
                review the Privacy Policy of every site you visit. We have no
                control over and assume no responsibility for the content,
                privacy policies or practices of any third party sites or
                services.
              </p>

              {/* */}
            </div>

            {/* Changes to this Privacy Policy */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Changes to this privacy policy
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5 responsive-other-paragraphs">
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page. We will let you know via email and/or a prominent
                notice on our service, prior to the change becoming effective
                and update the &quot;Last updated&quot; date at the top of this
                Privacy Policy. You are advised to review this Privacy Policy
                periodically for any changes. Changes to this Privacy Policy are
                effective when they are posted on this page.
              </p>

              {/* */}
            </div>

            {/* Contact Us */}

            <div>
              {/* */}

              <h3 className="font-semibold font-sans text-4xl mb-4">
                Contact Us
              </h3>

              <p className="font-semibold font-sans text-2xl mb-5">
                If you have any questions about this Privacy Policy, You can
                contact us:
              </p>

              <ul className="mb-[40px]">
                <li>
                  {/* */}

                  <span className="font-semibold font-sans text-3xl mb-5 responsive-email-text ">
                    By email :
                  </span>

                  <span className="font-semibold font-sans text-2xl ml-2 text-red-800 responsive-email">
                    infohompoti@gmail.com
                  </span>

                  {/* */}
                </li>
              </ul>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>
  );

  /* */
};

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the hero-section and storing in a variable 
   Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-info {
      margin-left: 10px;
      padding-right: 25px;
    }

    .responsive-providers {
      font-size: 1.6rem;
      line-height: 1.5;
    }

    .responsive-email {
      font-size: 1.8rem;
    }

    .responsive-paragraphs {
      font-size: 1.6rem;
      line-height: 1.6;
    }

    .responsive-other-paragraphs {
      font-size: 1.6rem;
      line-height: 1.5;
    }

    .responsive-email-text {
      font-size: 2rem;
    }

    /* */
  }

  /* */
`;

export default Policy;
