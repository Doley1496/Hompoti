/* */

import React from "react";

import styled from "styled-components";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import { app } from "../firebase";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  setAccessToken,
} from "./../Redux/Actions/authActions.jsx";

import { toast } from "react-toastify";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function OAuth() {
  /* */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    /* */

    try {
      /* */

      dispatch(signInStart());

      /* Creating google provider from firebase/auth by writing new GoogleAuthProvider(). */
      const provider = new GoogleAuthProvider();

      /* Getting google auth from firebase/auth by writing getAuth() and we are passing app which 
         is the variable where firebase is initialized.
      */
      const auth = getAuth(app);

      /* Once we create the provider and get the auth we will create a popUp request using default
         statement. ie. signInWithPopup(auth, provider). 
      */
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${SERVER_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          firstName: result._tokenResponse.firstName,
          lastName: result._tokenResponse.lastName,
          email: result._tokenResponse.email,
          photo: result._tokenResponse.photoURL,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        dispatch(signInFailure(data.message));

        toast.error(data.message);

        return;

        /* */
      }

      window.localStorage.setItem("id", data.user._id);

      dispatch(signInSuccess(data.user));

      dispatch(setAccessToken(data.token));

      navigate("/");

      toast.success("Successfully Logged In");

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      dispatch(signInFailure(error.message));

      console.log("Could not sign in with google", error);

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* ******************************************************** */}
      {/* Creating a button to signIn or signUp with google Oauth. */}

      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 text-white p-3 py-4 rounded-lg uppercase hover:opacity-95
        font-bold font-sans text-2xl w-[100%] responsive-button"
      >
        Continue With Google
      </button>

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

    .responsive-button {
      font-size: 2.1rem;
      width: 100%;
    }

    /* */
  }

  /* */
`;
