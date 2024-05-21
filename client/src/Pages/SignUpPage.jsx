/* */

import React, { useState } from "react";

import Layout from "../Components/Layout.jsx";

import PageNavigation from "../Components/PageNavigation.jsx";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

/* Importing all the reducers function created in ReduxStore.js file. */
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../Redux/Actions/authActions.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ValidationSchema } from "../Components/Validation.jsx";

import { BiShow, BiHide } from "react-icons/bi";

import { ImLocation2 } from "react-icons/im";

import { IoPersonSharp } from "react-icons/io5";

import { RiLockPasswordFill } from "react-icons/ri";

import { MdMarkEmailUnread } from "react-icons/md";

import { FaPhoneVolume } from "react-icons/fa6";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SignUpPage() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState("");

  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phone: "",
    terms: "",
  });

  /* Creating a useState() hook to show the password. */
  const [showPassword, setShowPassword] = useState(false);

  /* **************************************************************************************** */
  /* Creating a function with name handleShowPassword and passing it in the onClick event of the 
     password field of the register form. It will interchange its value.
     ie.  When we will click on the show-icon then it will display the hide-icon.
          And when we will click on the hide-icon then it will display the show-icon
  */

  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  /* ****************************************************************************************** */
  /* Creating a function with name change() and passing it in the onChange event of the email 
     and the password fields of the SignIn form.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

  const change = (event) => {
    /* */

    if (
      event.target.type === "text" ||
      event.target.type === "email" ||
      event.target.type === "password" ||
      event.target.type === "number"
    ) {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    if (event.target.id === "terms") {
      setInputs({ ...Inputs, [event.target.id]: event.target.checked });
    }

    /* */
  };

  /* ******************************************************************************************** */
  /* Creating a function name handleSignUp() and passing(calling) it in the onSubmit event of 
     the form. 
     ie... when we will click on the SignUp button then this function will get execute and inside
           this function we have written the logic to submit all the details provided in the SignUp 
           form into our database.  
  */

  const handleRegistration = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      await ValidationSchema.validate(Inputs, { abortEarly: false });

      /* Dispatching the reducer function ie.. signInStart() function created inside the userSlice 
         variable by using dispatch() function. 
      */
      // dispatch(signInStart());

      setLoading(true);

      /* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user entered in the inputs fields such as its email 
         and password to the back-end so that we can SignIn the existing user. 
      */

      const res = await fetch(`${SERVER_URL}/api/auth/signUp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
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
           variable by using dispatch() function and passing the message of the data variable in it.
        */
        dispatch(signInFailure(data.message));

        toast.error(data.message);

        setLoading(false);

        return;
      }

      /* Else if we successfully make an api call then we will dispatch the reducer function 
         ie.. updateUserSuccess() function created inside the userSlice variable and pass the data in 
         it by using the dispatch() function and we will redirect(navigate) the user to the home-page.
      */

      dispatch(signInSuccess(data));

      /* After successful signIn we will redirect the user to the home-page. */
      navigate("/signIn");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      const newError = {};

      error.inner.forEach((error) => {
        newError[error.path] = error.message;
      });

      setErrors(newError);

      /* Dispatching the reducer function ie.. signUpFailure() function created inside the userSlice 
         variable by using dispatch() function and passing the error message in it.
      */
      dispatch(signInFailure(error.message));

      /* */
    }
  };

  /* *********************************************************************************** */
  /* *********************************************************************************** */
  /* *********************************************************************************** */
  /* *********************************************************************************** */

  /* Returning the content that we will display in the "/register" route.
     because for this route we have provide component {<RegistrationPage />}
     ie. <Route path="/register" element={<RegistrationPage />} /> 
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      <PageNavigation title="Register" />

      <Layout title={"Registration-Page"}>
        {/* */}

        <div className="bg-image2 pt-5 pb-5 justify-center mx-auto bg-fixed">
          <div className="p-3 max-w-2xl mx-auto rounded-lg bg-[#2d89a5] pt-4 pb-5 mt-5 responsive-form-portion">
            {/* */}

            <ToastContainer />

            {/*********************************************** */}
            {/* Creating a heading for the Registration form. */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 mb-5 text-blue-950">
              Registration Form
            </h1>

            {/*************************************************************** */}
            {/* Creating a form to get the user details from the signUp page. */}

            <form className="flex flex-col gap-4" onSubmit={handleRegistration}>
              {/* */}

              {/* ************************************** */}
              {/* Creating an input field for firstName. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Your First Name"
                  autoComplete="off"
                  autoFocus="on"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.firstName}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.firstName && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.firstName}
                </div>
              )}

              {/* ************************************* */}
              {/* Creating an input field for lastName. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <IoPersonSharp className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Your Last Name"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.lastName}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.lastName && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.lastName}
                </div>
              )}

              {/* ************************************* */}
              {/* Creating an input field for password. */}

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
                  placeholder="Create a Password"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mb-[-10px] mr-4
                  responsive-login-form"
                  value={Inputs.password}
                  onChange={change}
                />

                {/* */}
              </div>

              <span className="cursor-pointer" onClick={handleShowPassword}>
                {/* */}

                {/* Using ternary operator when we will get showPassword then we will display show-icon
                    otherwise we will display hide-icon. 
                */}

                {showPassword ? (
                  <BiShow className="text-[22px]  ml-[400px] mt-[-50px] responsive-eye-icon" />
                ) : (
                  <BiHide className="text-[22px]  ml-[400px] mt-[-50px] responsive-eye-icon" />
                )}
              </span>

              {errors.password && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.password}
                </div>
              )}

              {/* ********************************** */}
              {/* Creating an input field for email. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <MdMarkEmailUnread className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  autoComplete="off"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.email}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.email && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.email}
                </div>
              )}

              {/* ***************************************** */}
              {/* Creating an input field for phone-number. */}

              <div className="flex">
                {/* */}

                <span className="cursor-pointer">
                  <FaPhoneVolume className="text-[22px] mt-[18px] mr-3" />
                </span>

                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Your Phone"
                  className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl w-[100%] mr-4
                  responsive-login-form"
                  value={Inputs.phone}
                  onChange={change}
                />

                {/* */}
              </div>

              {errors.phone && (
                <div className="text-[16px] text-red-800 text-center font-bold mb-4">
                  {errors.phone}
                </div>
              )}

              {/* ******************** */}
              {/* Terms and conditions */}

              <div>
                <input
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="text-2xl"
                  checked={Inputs.terms}
                  onChange={change}
                />
                <span className="text-[18px] font-bold font-mono ml-3 responsive-terms">
                  All terms and conditions apply
                </span>

                {errors.terms && (
                  <div className="text-[16px] text-red-800 text-center font-bold mt-3 mb-4">
                    {errors.terms}
                  </div>
                )}
              </div>

              {/* ******************************* */}
              {/*  Creating a button to Register. */}

              <button
                disabled={loading}
                className="bg-slate-700 text-gray-300 p-3 py-4 rounded-lg uppercase hover:opacity-95 
                  disabled:opacity-80 text-2xl mt-4 font-bold font-sans responsive-button"
              >
                {loading ? "Loading..." : "Register"}
              </button>

              {/* */}
            </form>

            {/******************************************************************************* */}
            {/* Creating a link to go to the register page when user already have an account. */}

            <div className="flex gap-2 mt-5">
              <p className="font-bold font-sans text-slate-700 text-2xl responsive-link">
                Already Registered ?
              </p>

              <Link to="/login">
                <span className="text-blue-700 font-bold font-sans text-3xl underline responsive-link1">
                  Login
                </span>
              </Link>
            </div>

            {/* ************************************************************ */}
            {/* If any errors occurs we will display that error in red text. */}
            {/* <p className="text-red-700 mt-5">{error && error}</p> */}

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
      display: flex;
      flex-direction: column;
      font-size: 2rem;
    }

    .responsive-eye-icon {
      margin-top: -37px;
      margin-left: 270px;
      font-size: 2.7rem;
    }

    .responsive-terms {
      font-size: 2.2rem;
    }

    .responsive-button {
      font-size: 2rem;
    }

    .responsive-link {
      font-size: 2.3rem;
    }

    .responsive-link1 {
      font-size: 3rem;
    }

    .responsive-gender {
      font-size: 2.1rem;
    }

    /* */
  }

  /* */
`;
