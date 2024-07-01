/* */

import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

export const UserMenu = () => {
  /* */

  /* Returning the content to be display for this component */
  return (
    /* */

    <Wrapper>
      <div className="text-center">
        {/* */}

        <h3
          className="font-semibold font-sans uppercase mb-6 mt-6 text-gray-700 text-[30px] 
          responsive-heading"
        >
          DASHBOARD
        </h3>

        <div className="flex flex-col gap-5 text-3xl mt-5">
          {/* */}

          <NavLink
            to="/dashboard/user/profile"
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 py-[20px]
            disabled:opacity-80 font-sans font-semibold responsive-button"
          >
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/user/show-listing"
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 py-[20px]
            disabled:opacity-80 font-sans font-semibold responsive-button"
          >
            My Listings
          </NavLink>

          {/* */}
        </div>

        {/* */}
      </div>
    </Wrapper>

    /* */
  );
};

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
      font-size: 3.4rem;
    }

    .responsive-button {
      font-size: 2.3rem;
      margin-right: 15px;
      padding-top: 17px;
      padding-bottom: 17px;
    }

    /* */
  }

  /* */
`;
