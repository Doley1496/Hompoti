/* */

import React from "react";

import styled from "styled-components";

import PageNavigation from "../../Components/PageNavigation.jsx";

import Layout from "../../Components/Layout.jsx";

export default function FaqPage() {
  /* */

  return (
    /* */

    <Wrapper className="bg-gray-300 pb-[40px]">
      {/* */}

      <Layout title={"Faq-Page"}>
        {/* */}

        <PageNavigation title="Faq Page" />

        <h1 className="text-5xl text-center p-5 font-serif responsive-main-heading">
          Frequently Asked Questions
        </h1>

        <h4 className="ml-[60px] text-[30px] mb-3 text-[#080B39] responsive-heading">
          1. Who can use my website?
        </h4>

        <p
          className="ml-[90px] font-bold mb-5 mr-5 text-[18px] text-[#275070] font-sans leading-[25px]
          responsive-content"
        >
          Any person who is willing to use my website can use it without any
          hesitation
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 text-[#080B39] responsive-heading">
          2. What can i do in Hompoti?
          <span className="responsive-space"></span>
        </h4>

        <p
          className="ml-[90px] font-bold mb-5 mr-5 text-[18px] text-[#275070] font-sans leading-[25px]
          responsive-content"
        >
          Hompoti provides both users and owners a platform to sell, buy or rent
          real-estate properties
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 text-[#080B39] responsive-heading">
          3. What are the facilities provided by Hompoti?
          <span className="responsive-space"></span>
        </h4>

        <p
          className="ml-[90px] font-bold mb-5 mr-5 text-[18px] text-[#275070] font-sans leading-[25px]
          responsive-content"
        >
          Hompoti offers many facilities such as you can buy a property, you can
          sell a property, or you can give your property on rent, etc.
        </p>

        <h4 className="ml-[60px] text-[30px] mb-3 mr-4 text-[#080B39] responsive-heading">
          4. Is Hompoti free to use?
          <span className="responsive-space"></span>
        </h4>

        <p
          className="ml-[90px] font-bold mb-5 mr-5 text-[18px] text-[#275070] font-sans leading-[25px]
          responsive-content"
        >
          Yes Hompoti is absolutely free of cost. Anyone can use Hompoti's
          features without spending a single penny
        </p>

        {/* */}
      </Layout>

      {/* */}
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
      margin-left: 20px;
      margin-right: 10px;
      font-size: 2.7rem;
    }

    .responsive-content {
      font-size: 2rem;
      padding-top: 19px;
      margin-left: 17px;
      margin-right: 14px;
    }

    .responsive-main-heading {
      font-size: 5rem;
    }

    .responsive-space {
      margin-left: 40px;
    }

    /* */
  }

  /* */
`;
