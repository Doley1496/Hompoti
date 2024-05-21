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
} from "../Redux/Actions/authActions.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function OAuth() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  /* Creating a function name handleGoogleClick() and passing(calling) it in the onClick event of the button. 
     ie... when we will click on the Continue With Google button then this function will get execute and 
     inside this function we have written the logic to submit all the details of the user for
     signIn and signUp with google Oauth.      
  */

  const handleGoogleClick = async () => {
    /* */

    try {
      /* */

      dispatch(signInStart());

      /* Creating google provider from firebase/auth by writing new GoogleAuthProvider(). */
      const provider = new GoogleAuthProvider();

      /* Getting google auth from firebase/auth by writing getAuth() and we are passing app which is
         the variable where firebase is initialized.
      */
      const auth = getAuth(app);

      /* Once we create the provider and get the auth we will create a popUp request using default statement. 
         ie. signInWithPopup(auth, provider). 
      */
      const result = await signInWithPopup(auth, provider);

      /* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user's email-Id such as its name,email and photo to the back-end
         so that we can create the new user.  
         
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then 
        it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(`${SERVER_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // body: JSON.stringify({
        //   name: result.user.displayName,
        //   email: result.user.email,
        //   photo: result.user.photoURL,
        // }),

        body: JSON.stringify({
          firstName: result._tokenResponse.firstName,
          lastName: result._tokenResponse.lastName,
          email: result._tokenResponse.email,
          photo: result._tokenResponse.photoURL,
        }),
        credentials: "include",
      });

      /* After getting the response we will convert the response that we got into json format. */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then we will 
         dispatch the reducer function ie.. signInFailure() function created inside the userSlice variable and 
         pass the failure message in it by using the dispatch() function and and then simply return.
      */
      if (data.success === false) {
        /* Dispatching the reducer function ie.. signInFailure() function created inside the userSlice 
           variable by using dispatch() function and passing the error message in it.
        */
        dispatch(signInFailure(data.message));

        toast.error(data.message);

        return;
      }

      /* Storing the id of the user in Session Storage. */
      window.localStorage.setItem("id", data._id);

      /* Else if we successfully make an api call then we will dispatch the reducer function 
         ie.. signInSuccess() function created inside the userSlice variable and pass the data in it by 
         using the dispatch() function and we will redirect(navigate) the user to the home-page.
      */
      dispatch(signInSuccess(data));

      /* After successful signIn we will redirect the user to the home-page. */
      navigate("/");

      /* Reloading the web-page. */
      window.location.reload();

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      console.log("Could not sign in with google", error);

      /* */
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display when this component will be call. */

  return (
    /* */

    <Wrapper>
      {/* */}

      <ToastContainer />

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
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the images ie.. the images to be display
   vertically and the seleced(click) image that is to be display horizontally and storing in  
   a variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
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
