/* */

import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserMenu = () => {
  /* */

  /* Returning the content to be display for this component */
  return (
    /* */

    <Wrapper>
      <div className="text-center">
        {/* */}

        <ToastContainer />

        <h3 className="font-semibold uppercase mb-6 mt-6 text-gray-700 text-4xl responsive-heading">
          DASHBOARD
        </h3>

        <div className="flex flex-col gap-5 text-3xl mt-5">
          {/* */}

          {/* Creating a link in the nav-bar( so using NavLink ) to go to the 
              route("/dashboard/user/profile") when click it will display the component 
              ie. {<UserProfilePage />}.
          */}

          <NavLink
            to="/dashboard/user/profile"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 
            disabled:opacity-80 font-sans font-bold responsive-button"
          >
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/user/show-listing"
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 
            disabled:opacity-80 font-sans font-bold responsive-button"
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
/* Using styled of styled-components we are styling the images ie.. the images to be display
   vertically and the seleced(click) image that is to be display horizontally and storing 
   in a variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      font-size: 3rem;
    }

    .responsive-button {
      font-size: 2rem;
      margin-right: 15px;
      padding-top: 17px;
      padding-bottom: 17px;
    }

    /* */
  }

  /* */
`;
