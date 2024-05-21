/* */

import React, { useEffect } from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import {
  signOutUserSuccess,
  signOutUserFailure,
  signOutUserStart,
} from "../Redux/Actions/authActions.jsx";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Dropdown({ handleClick }) {
  /* */

  /* Creating a variable to initialize useNavigate(). */
  const navigate = useNavigate();

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  /* Using useSelector() hook we are destructing (importing) currentUser from the initial
     state (ie. currentUser) of the userSlice variable and storing it in a variable. 
  */

  const { currentUser } = useSelector((state) => state.user);

  /* Creating a function name handleSignOut() and passing(calling) it in the onClick event of the 
     signOut button ie... when we will click on the sign-out button then this function will get 
     execute and inside this function we have written the logic to logout the user from our application.
  */

  const handleLogOu = async (event) => {
    /* */

    try {
      /* */

      /* Using dispatch() function we are calling the reducer function ie.. signOutUserStart() function
         created inside the userSlice variable.
      */
      dispatch(signOutUserStart());

      /* Sending a GET fetch request to the following route to signOut(ie. logout) a user from our
         application when he click on the signOut button.
      */
      const res = await fetch(`${SERVER_URL}/api/auth/logOut`);

      /* After getting the response we will convert the response that we got into json format
         and save it in a variable say data.
      */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then we will
         dispatch a failure reducer function ie.. deleteUserFailure() function created inside the userSlice 
         variable and pass the failure message in it by using the dispatch() function and then simply return.
      */
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }

      /* Else if we successfully make an api call then we will dispatch a success reducer function
         ie.. deleteUserSuccess() function created inside the userSlice variable and pass the data in
              it by using the dispatch() function and we will redirect(navigate) the user to the signIn-page.
      */
      dispatch(signOutUserSuccess());

      /* After successful signOut we will redirect the user to the signIn-page. */
      navigate("/login");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      /* Dispatching the failure reducer function ie.. deleteUserFailure() function created inside the 
         userSlice variable by using dispatch() function and passing the error message in it.
      */
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleLogOut = async () => {
    /* */

    /* clearing the local-storage */
    localStorage.clear();

    /* After successful signIn we will redirect the user to the home-page. */
    navigate("/signIn");

    /* Reloading the web-page. */
    window.location.reload();

    /* */
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the dropdown menu when user click on the profile-pic. */

  return (
    /* */

    <Wrapper className="flex flex-col dropdownProfile">
      {/* */}

      <ul className="flex flex-col gap-4">
        {/* */}

        {/* Checking the role if equal to 1 then its the admin so for that we will redirect 
            to the admin dashboard page otherwise its a general user so redirect to the user 
            dashboard page because for admin we have given role as 1 and for 
            general user role as 0.
        */}

        <Link
          to={`/dashboard/${currentUser?.role === 1 ? "admin" : "user"}`}
          className="hover:bg-blue-300 rounded-lg text-center text-black 
          font-semibold responsive-content"
          onClick={handleClick}
        >
          Dashboard
        </Link>

        <Link
          to="dashboard/user/profile"
          className="font-semibold hover:bg-blue-300 rounded-lg text-center text-black 
          responsive-content"
          onClick={handleClick}
        >
          My Profile
        </Link>

        <Link
          to="dashboard/user/create-listing"
          className="font-semibold hover:bg-blue-300 rounded-lg text-center text-black 
          responsive-content"
          onClick={handleClick}
        >
          Create Listing
        </Link>

        {/* */}
      </ul>

      {/* Creating a button to signout from this current account. */}

      <span
        className="text-red-700 cursor-pointer font-semibold text-center hover:bg-blue-300 mt-3 
        rounded-lg responsive-content"
        onClick={handleLogOut}
      >
        <span onClick={handleClick}>LogOut</span>
      </span>

      {/* */}
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the hero-section and storing in a variable 
   Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-content {
      padding-top: 10px;
      padding-bottom: 10px;
    }

    /* */
  }

  /* */
`;
