/* */

import React from "react";

import styled from "styled-components";

import { NavLink } from "react-router-dom";

const PageNavigation = ({ title }) => {
  /* */

  /* ***************************************************************************** */
  /* *************************     return      *********************************** */
  /* ***************************************************************************** */

  /* Returning the content that we will display in the top portion where required. 
     ie.. we will import this component in the singleProductPage and use it there.
  */

  return (
    /* */

    <Wrapper>
      <NavLink to="/" className="text-indigo-600">
        Home
      </NavLink>
      /{title}
    </Wrapper>

    /* */
  );
};

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the page-navigation and storing in a 
   variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.2rem;
  padding-left: 1.2rem;

  a {
    font-size: 3.2rem;
  }

  /* */
`;

export default PageNavigation;
