/* */

import React from "react";

import styled from "styled-components";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import { Link } from "react-router-dom";

export default function EmailSubscriptionSuccessPage() {
  /* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Email-Subscription-Success-Page"}>
        {/* */}

        <PageNavigation title="Subscription Success" />

        <div className="fonts pb-[40px]">
          {/* */}

          <div
            style={{ textAlign: "center", display: "block" }}
            className="mx-[10px]"
          >
            {/* */}

            <img
              src="/images/tick.webp"
              alt=""
              className="h-[80px] w-[80px] justify-center align-middle text-center mx-auto mt-5"
            />

            <h1 className="text-4xl py-5 text-green-600 font-bold responsive-text1">
              Email Subscription Successfull !
            </h1>

            <p className="text-3xl mb-3 font-bold responsive-text">
              Now you will receive all the important updates from us!
            </p>

            <p className="text-3xl mb-[50px] font-bold responsive-text">
              Thanks for joining with us.
            </p>

            {/* */}
          </div>

          <div
            className="flex justify-center py-4 gap-3 bg-slate-700 text-white border text-4xl font-bold 
            rounded-lg hover:opacity-150 mb-60 uppercase w-[45%] mx-auto responsive-button"
            style={{ textAlign: "center", display: "block" }}
          >
            <Link to="/" className="text-3xl font-bold responsive-button">
              Go Back
            </Link>
          </div>

          {/* */}
        </div>

        {/* */}
      </Layout>
    </Wrapper>

    /* */
  );

  /* */
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      margin-left: -40px;
    }

    .responsive-text {
      font-size: 2.4rem;
      line-height: 1.4;
    }

    .responsive-text1 {
      font-size: 2.9rem;
    }

    .responsive-button {
      font-size: 2.6rem;
      width: 65%;
      padding: 10px;
    }

    /* */
  }

  /* */
`;
