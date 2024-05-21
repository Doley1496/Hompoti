/* */

import React from "react";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import styled from "styled-components";

import { useSelector } from "react-redux";

import { UserMenu } from "../../Components/UserMenu.jsx";

const UserDashboard = () => {
  /* */

  /* Using useSelector() hook we are destructing (importing) currentUser from the initial-state
     (ie. currentUser) of the userSlice variable using the global state user. 
  */
  const { currentUser } = useSelector((state) => state.user);

  /* *********************************************************************************************** */
  /* *************************************      return      **************************************** */
  /* *********************************************************************************************** */

  /* Returning the content that we will display in the "/dashboard/user" route.
     because for this route we have provide component {<UserDashboardPage />}
     ie.    <Route path="/dashboard/user" element={<UserDashboardPage />} />  
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      <PageNavigation title="Dashboard" />

      <Layout title={"Dashboard-Page"}>
        {/* */}

        <div className="container-fluid m-3 p-3">
          <div className="row">
            {/* */}

            {/* Using grid system to separate the contents in two parts :
                1st part contains User's menu
                2nd part contains User's information. 
            */}

            {/* 1st part contains user's menu */}

            <div className="col-md-4 mt-5">
              <UserMenu />
            </div>

            {/* 2nd part contains user's information*/}

            <div className="col-md-7 ml-[80px] responsive-dashboard-info">
              <div className="text-[#800000] mt-[50px] font-bold font-sans ">
                {/* */}

                {/* If we get auth variable then we will apply optional chaining and if we get 
                    the user then we can show the user's details here ( ie.. in this page we will 
                    show user's information as we are creating for user dashboard.
                */}

                <div className="text-4xl mb-5 responsive-dashboard-info1">
                  <p className="">
                    {/* */}

                    <span> My Name </span>

                    <span className="text-4xl"> ➠ </span>

                    <span className="leading-9 responsive-name">
                      {`${currentUser.firstName} ${currentUser.lastName}`}
                    </span>

                    {/* */}
                  </p>
                </div>

                <div className="text-4xl mb-5 responsive-dashboard-info1">
                  <p className="">
                    {/* */}

                    <span> My Email </span>

                    <span className="text-4xl"> ➠ </span>

                    <span>{currentUser.email}</span>

                    {/* */}
                  </p>
                </div>

                <div className="text-4xl mb-5 responsive-dashboard-info1">
                  <p className="">
                    {/* */}

                    <span> My Phone </span>

                    <span className="text-4xl"> ➠ </span>

                    <span className="leading-10">
                      {currentUser.phone
                        ? currentUser.phone
                        : "Please update your phone number in your profile"}
                    </span>

                    {/* */}
                  </p>
                </div>

                {/* */}
              </div>
            </div>

            {/* */}
          </div>
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>

    /* */
  );
};

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the colors, minus-button, plus-button, 
   and quantity and storing in a variable Wrapper. This Wrapper will be use to wrap the whole
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-name {
      line-height: 1.6;
      margin-right: 10px;
      padding-right: 10px;
    }

    .responsive-dashboard-info {
      margin-left: 10px;
    }

    .responsive-dashboard-info1 {
      margin-right: 20px;
    }

    /* */
  }

  /* */
`;

export default UserDashboard;
