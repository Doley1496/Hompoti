/* */

import React, { useState, useRef } from "react";

import Layout from "../Components/Layout.jsx";

import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SendLink() {
  /* */

  /* Destructing the id and the token from the link route that we created and send to the user's email
     we will destruct using useParams() hook. 
  */
  const { id, token } = useParams();

  /* Creating a variable for initializing useRef(). */
  const emailRef = useRef();

  /* Creating a variable for initializing useDispatch(). */
  const navigate = useNavigate();

  /* Using useSelector() hook we are destructing (importing) loading and error from the initial-state
     (ie. loading and error) of the userSlice variable using the global state user.
  */

  const { loading, error } = useSelector((state) => state.user);

  /* Creating a useState() hook to hold the value of the inputs fields email and password. */
  const [Inputs, setInputs] = useState({
    email: "",
  });

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

  /* Creating a function name  handleSendLink() and passing(calling) it in the onSubmit event of the form
     ie... when we will submit the form this function will get execute and inside this 
     function we are making an api call to the backend (ie. we are sending information to the backend) 
     where we have written the logic to send a link to the user's email id so that when the user click
     on that link it will open the reset-password page where the user can reset the password.  
  */

  const handleSendLink = async (event) => {
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
         credentials as "include" and when we will pass its value as true inside the cors() function 
         then it will expose the response to the frontend. 
         After adding this only we will get the cookies,updated values etc.
    
         Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(`${SERVER_URL}/api/auth/send-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
        credentials: "include",
      });

      /* After getting the response we will convert the response that we got into json format 
         and save it in a variable say data. 
      */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false
         then we will display a toast error message and then simply return.
      */
      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;
      }

      toast.success(
        "Password reset link has been successfully send to your email id"
      );

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      /* */
    }
  };

  /* ************************************************************************************* */
  /* ************************************************************************************* */
  /* ************************************************************************************* */
  /* ************************************************************************************* */

  /* Returning the content that we will display in the "/resetPassword" route.
     because for this route we have provide component {<ResetPasswordPage />}
     ie. <Route path="/resetPassword" element={<ResetPasswordPage />} /> 
  */

  return (
    /* */

    <Wrapper className="bg-image3 py-[40px] justify-center mx-auto bg-fixed">
      {/* */}

      <Layout title={"Send-Link-Page"}>
        {/* */}

        <div className="p-3 max-w-2xl mx-auto bg-indigo-400 rounded-lg">
          {/* */}

          {/* <ToastContainer /> */}

          {/* Creating a heading for the signIn page. */}

          <h1 className="text-3xl text-center font-bold font-sans my-4 mb-5 uppercase responsive-heading">
            Reset your password
          </h1>

          <p className="text-[18px] font-sans font-bold text-center mb-4 text-slate-900 responsive-heading1">
            Please enter your register email id below <br /> We will send a link
            to your registered email id to reset your password
          </p>

          {/* Creating a form to get the user details from the signIn page. */}

          <form className="flex flex-col gap-3 mb-7" onSubmit={handleSendLink}>
            {/* */}

            {/* ********  Creating an input field to enter email to Reset the password.  ********** */}

            <input
              /* When we will get showPassword then we will make our type as text otherwise password type. */
              type="email"
              name="email"
              id="email"
              placeholder="Enter your registered email id"
              required
              autoComplete="off"
              className="border py-4 px-3 rounded-lg flex text-2xl font-bold font-sans mb-4 responsive-input"
              onChange={change}
              value={Inputs.email}
              ref={emailRef}
            />

            {/* *************  Creating a button to Reset the password.  **************** */}

            <div className="justify-between mb-4">
              <button
                // onClick={sendOTP}
                disabled={loading}
                className="bg-red-700 text-gray-300 py-2 px-4 rounded-lg uppercase hover:opacity-95 
                disabled:opacity-80 text-[17px] font-sans font-bold ml-2 mr-[20px] hover:underline "
              >
                {loading ? "Loading..." : "Send Link"}
              </button>

              <Link
                to="/signIn"
                disabled={loading}
                className="bg-black text-gray-300 px-[19px] py-[10px] rounded-lg uppercase hover:opacity-95 
                disabled:opacity-80 text-[17px] font-sans font-bold ml-[180px] responsive-button"
              >
                {loading ? "Loading..." : "Back"}
              </Link>
            </div>

            {/* */}
          </form>

          {/* *************************************** */}
          {/* Creating a button to go the login-page. */}

          <Link
            to="/signIn"
            disabled={loading}
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <button
              className="bg-slate-700 text-gray-200 p-3 py-[12px] rounded-lg uppercase hover:opacity-95 
              disabled:opacity-80 text-center text-[20px] mb-4 font-sans font-bold w-[75%]"
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

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-heading {
      font-size: 3rem;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .responsive-heading1 {
      font-size: 2rem;
      padding-top: 15px;
      padding-bottom: 15px;
    }

    .responsive-input {
      font-size: 2.4rem;
      padding: 5px;
      padding-top: 18px;
      padding-bottom: 18px;
    }

    .responsive-button {
      margin: auto;
      margin-left: 90px;
    }

    /* */
  }

  /* */
`;
