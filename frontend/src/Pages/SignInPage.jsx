/* */

import React, { useState } from "react";

import Layout from "../Components/Layout.jsx";

import PageNavigation from "../Components/PageNavigation.jsx";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

/* Importing useDispatch from react-redux to call the function of the reducers.
   Importing useSelector from react-redux to destruct (import) loading and error from the 
   global state user.
*/
import { useDispatch } from "react-redux";

/* Importing all the reducers function created in ReduxStore.js file. */
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/Actions/authActions.jsx";

import OAuth from "../Components/OAuth.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BiShow, BiHide } from "react-icons/bi";

import { IoPersonSharp } from "react-icons/io5";

import { RiLockPasswordFill } from "react-icons/ri";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SignInPage() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(false);

  const [loading, setLoading] = useState(false);

  /* Creating a useState() hook to hold the value of the inputs fields email and password. */
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  /* Creating a useState() hook to show the password. */
  const [showPassword, setShowPassword] = useState(false);

  /* Creating a function with name handleShowPassword and passing it in the onClick event of the 
     password field of the register form.
     It will interchange its value.
     ie.  When we will click on the show-icon then it will display the hide-icon.
     And when we will click on the hide-icon then it will display the show-icon
  */

  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  /* Creating a function with name change() and passing it in the onChange event of the email 
     and the password fields of the SignIn form.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  /* Creating a function name handleSignUp() and passing(calling) it in the onSubmit event of the form. 
     ie... when we will click on the SignUp button then this function will get execute and inside this 
     function we have written the logic to submit all the details provided in the SignUp form into our database.  
  */

  const handleLogin = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      setLoading(true);

      /* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user entered in the inputs fields such as its email 
         and password to the back-end so that we can SignIn the existing user 
         
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then 
        it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(`${SERVER_URL}/api/auth/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
        credentials: "include",
      });

      /* After getting the response we will convert the response that we got into json format 
         and save it in a variable say data. 
      */
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

        setLoading(false);

        setErrors(data.message);

        return;
      }

      /* Storing the id of the user in Local Storage. */
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

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      /* Dispatching the reducer function ie.. signInFailure() function created inside the userSlice 
         variable by using dispatch() function and passing the error message in it.
      */

      dispatch(signInFailure(error.message));

      /* */
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/signIn" route.
     because for this route we have provide component {<SignInPage />}
     ie. <Route path="/signIn" element={<SignInPage />} /> 
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Layout title={"Login-Page"}>
        {/* */}

        <PageNavigation title="Login" />

        <div className="bg-image1 py-[40px] justify-center bg-fixed">
          <div className="p-3 max-w-2xl mx-auto rounded-lg bg-[#00ae48] responsive-form-portion">
            {/* */}

            {/* <ToastContainer className="text-2xl font-bold" /> */}

            {/* *************************************** */}
            {/* Creating a heading for the signIn page. */}

            <div>
              <h1 className="text-4xl text-center font-bold font-sans my-7 text-orange-950 responsive-heading">
                Welcome Back
              </h1>

              <h1 className="text-[20px] text-center font-bold font-sans my-7 responsive-heading">
                Please Login
              </h1>
            </div>

            {/* ************************************************************* */}
            {/* Creating a form to get the user details from the signIn page. */}

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 responsive-login-form"
            >
              {/* */}

              {/* ********************************** */}
              {/* Creating an input field for Email. */}

              {/* ********************************** */}
              {/* Creating an input field for Email. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="off"
                  autoFocus="on"
                  className="border p-3 py-4 rounded-lg text-2xl font-bold font-sans w-[100%] mr-4
                  responsive-login-form"
                  onChange={change}
                />

                {/* */}
              </div>

              {/* ************************************* */}
              {/* Creating an input field for Password. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <RiLockPasswordFill className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  /* When we will get showPassword then we will make our type as text otherwise password type. */
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg text-2xl font-bold font-sans w-[100%] mr-4
                  responsive-login-form"
                  onChange={change}
                />

                {/* */}
              </div>

              {/* ******************************************************************************** */}
              {/* Using ternary operator when we will get showPassword then we will display show-icon
                  otherwise we will display hide-icon. 
              */}

              <span className="cursor-pointer" onClick={handleShowPassword}>
                {showPassword ? (
                  <BiShow
                    className="text-3xl font-bold font-sans ml-[420px] -mt-[56px] responsive-icon-eye 
                    responsive-login-form "
                  />
                ) : (
                  <BiHide
                    className="text-3xl font-bold font-sans ml-[420px] -mt-[56px] responsive-icon-eye 
                    responsive-login-form "
                  />
                )}
              </span>

              {/* ************************************* */}
              {/* Displaying error if any error occurs. */}

              {errors && (
                <div className="text-[16px] text-red-900 text-center font-bold mt-[-10px]">
                  {errors}
                </div>
              )}

              {/* *************************** */}
              {/* Creating a button to Login. */}

              <button
                disabled={loading}
                className="bg-slate-700 text-2xl font-bold font-sans text-white p-3 rounded-lg uppercase 
                 hover:opacity-95 disabled:opacity-80 responsive-login-form py-4 mb-4"
              >
                {loading ? "Loading..." : "Login"}
              </button>

              {/* */}

              {/* */}
            </form>

            <OAuth className="responsive-login-form" />

            {/* *********************************************************************** */}
            {/* Creating a link to go to the /resetPassword page to reset the password. */}

            <Link to="/sendLink">
              <p className="m-3 mt-6 text-[18px] font-bold font-sans text-slate-700 hover:underline cursor-pointer">
                Reset Password
              </p>
            </Link>

            {/* **************************************************************************** */}
            {/* Creating a link to go to the /register page when user don't have an account. */}

            <div className="flex gap-2 mt-6 mb-[40px]">
              <p className="text-black text-[16px] font-bold font-sans mt-2">
                Dont Have an account ?
              </p>

              <Link to="/signUp">
                <span className="text-blue-900 text-[19px] font-bold font-sans underline ml-5">
                  Register
                </span>
              </Link>
            </div>

            {/* If any errors occurs we will display that error in red text. */}
            {/* <p className="text-red-700 mt-5 text-2xl font-bold">
              {error ? error : ""}
            </p> */}

            {/* */}
          </div>
        </div>

        {/* */}
      </Layout>

      {/* */}
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

    .responsive-form-portion {
      width: 500px;
    }

    .responsive-login-form {
      font-size: 2rem;
    }

    .responsive-icon-eye {
      margin-top: -47px;
      margin-left: 270px;
      font-size: 3rem;
    }

    /* */
  }

  /* */
`;
