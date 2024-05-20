/* */

import React, { useState } from "react";

import Layout from "../Components/Layout.jsx";

import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate, useParams } from "react-router-dom";

/* Importing useDispatch from react-redux to call the function of the reducers.
   Importing useSelector from react-redux to destruct (import) loading and error from the 
   global state user.
*/
import { useSelector } from "react-redux";

import { BiShow, BiHide } from "react-icons/bi";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ResetPasswordPage() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Destructing the id and the token from the link route that we created and send to the user's email
     we will destruct using useParams() hook. 
  */
  const { id, token } = useParams();

  /* Using useSelector() hook we are destructing (importing) loading and error from the initial-state
     (ie. loading and error) of the userSlice variable using the global state user.
  */
  const { loading, error } = useSelector((state) => state.user);

  /* Creating a useState() hook to hold the value of the inputs fields email and password. */
  const [Inputs, setInputs] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  /* Creating a useState() hook to show the password. */
  const [showPassword, setShowPassword] = useState(false);

  /* ***************************************************************************************************** */

  /* Creating a function with name handleShowPassword and passing it in the onClick event of the 
     password field of the register form.
     It will interchange its value.
     ie.  When we will click on the show-icon then it will display the hide-icon.
     And when we will click on the hide-icon then it will display the show-icon
  */
  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  /* ***************************************************************************************************** */

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

  const handleResetPassword = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

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
      const res = await fetch(
        `${SERVER_URL}/api/auth/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Inputs),
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into json format 
         and save it in a variable say data. 
      */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then we will 
         display toast error message and then simply return.
      */
      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;
      }

      toast.success("Your password is updated successfully");

      /* After successfully resetting(updating) the password we will redirect the user to the login page. */
      navigate("/login");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      /* */
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/resetPassword" route.
     because for this route we have provide component {<resetPasswordPage />}
     ie. <Route path="/resetPassword" element={<resetPasswordPage />} /> 
  */

  return (
    /* */

    <Wrapper className="bg-image1 pt-5 pb-5 justify-center mx-auto bg-fixed">
      {/* */}

      <Layout title={"Reset-Password-Page"}>
        {/* */}

        <div className="p-3 max-w-3xl mx-auto bg-indigo-400 rounded-lg mt-[40px] py-[30px]">
          {/* */}

          <ToastContainer className="text-2xl font-bold" />

          {/* *************************************** */}
          {/* Creating a heading for the signIn page. */}

          <div>
            <h1 className="text-4xl text-center font-bold font-sans my-9 text-red-900 ">
              Reset your password
            </h1>
          </div>

          {/* ************************************************************* */}
          {/* Creating a form to get the user details from the signIn page. */}

          <form
            onSubmit={handleResetPassword}
            className="flex flex-col gap-4 mb-7"
          >
            {/* */}

            {/* ******************   Creating an input field for New-Password.  ************************ */}

            <input
              /* When we will get showPassword then we will make our type as text otherwise password type. */
              type={showPassword ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              required
              autoComplete="off"
              value={Inputs.newPassword}
              className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl responsive-input"
              onChange={change}
            />

            {/* Using ternary operator when we will get showPassword then we will display show-icon
                otherwise we will display hide-icon. 
            */}

            <span className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <BiShow className="text-3xl  ml-[460px] -mt-[56px] responsive-icon-eye" />
              ) : (
                <BiHide className="text-3xl  ml-[460px] -mt-[56px] responsive-icon-eye" />
              )}
            </span>

            {/* ******************   Creating an input field for Confirm-Password.  ******************* */}

            <input
              /* When we will get showPassword then we will make our type as text otherwise password type. */
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm new password"
              required
              autoComplete="off"
              value={Inputs.confirmPassword}
              className="border p-3 py-4 rounded-lg font-bold font-sans text-2xl responsive-input"
              onChange={change}
            />

            {/* Using ternary operator when we will get showPassword then we will display show-icon
                otherwise we will display hide-icon. 
            */}

            <span className="cursor-pointer" onClick={handleShowPassword}>
              {showPassword ? (
                <BiShow className="text-3xl  ml-[460px] -mt-[56px] responsive-icon-eye" />
              ) : (
                <BiHide className="text-3xl  ml-[460px] -mt-[56px] responsive-icon-eye" />
              )}
            </span>

            {/* *************************** */}
            {/* Creating a button to Login. */}

            <button
              disabled={loading}
              className="bg-slate-700 text-slate-200 rounded-lg uppercase hover:opacity-95 
              disabled:opacity-80 hover:underline font-bold font-sans text-2xl responsive-button"
            >
              {loading ? "Loading..." : "Reset"}
            </button>

            {/* */}
          </form>

          {/* *************************************** */}
          {/* Creating a button to go the login-page. */}

          <Link
            to="/login"
            disabled={loading}
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <button
              className="bg-black text-slate-300 p-3 py-[12px] rounded-lg uppercase hover:opacity-95 
              hover:underline disabled:opacity-80 text-[20px] mb-4 font-sans font-bold w-[75%]"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </Link>

          {/* If any errors occurs we will display that error in red text. */}
          {/* <p className="text-red-700 mt-5">{error && error}</p> */}

          {/* */}
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

  .responsive-button {
    font-size: 1.6rem;
    padding: 10px;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-input {
      font-size: 2.4rem;
      padding: 5px;
      padding-top: 18px;
      padding-bottom: 18px;
    }

    .responsive-button {
      font-size: 2.2rem;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .responsive-icon-eye {
      margin-top: -47px;
      margin-left: 300px;
      font-size: 3rem;
    }

    /* */
  }

  /* */
`;
