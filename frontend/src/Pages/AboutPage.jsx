/* */

import React from "react";

import styled from "styled-components";

import PageNavigation from "../Components/PageNavigation.jsx";

import Layout from "../Components/Layout.jsx";

export default function AboutPage() {
  /* */

  return (
    /* */

    <Wrapper>
      <Layout title={"About Page"}>
        {/* */}

        <PageNavigation title="About Page" />

        <div className="py-20 px-4 max-w-6xl mx-auto text-2xl">
          {/* */}

          <h1 className="text-6xl font-bold mb-8 text-slate-800">
            About HomPoti
          </h1>

          <p className="mb-4 text-slate-700 font-bold responsive-text">
            HomPoti is a leading real estate agency that specializes in helping
            clients buy, sell, and rent properties in the most desirable
            neighborhoods. Our team of experienced agents is dedicated to
            providing exceptional service and making the buying and selling
            process as smooth as possible.
          </p>

          <p className="mb-4 text-slate-700 font-bold responsive-text">
            Our mission is to help our clients achieved their real-estate goals
            by providing expert advice , personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell or rent a property we are here to help you in every step of the
            way.
          </p>

          <p className="mb-4 text-slate-700 font-bold responsive-text">
            Our team of agents has a wealth of experience and knowledge in the
            real-estate industry and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>

          {/* */}
        </div>

        {/* */}
      </Layout>
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the images ie.. the images to be display
   vertically and the seleced(click) image that is to be display horizontally and storing 
   in a variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-text {
      line-height: 1.6;
      font-weight: bold;
      font-size: 1.8rem;
    }

    /* */
  }

  /* */
`;
