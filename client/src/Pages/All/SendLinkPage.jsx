/* */

import React, { useState, useRef } from "react";

import Layout from "../../Components/Layout.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SendLink() {
  /* */

  const emailRef = useRef();

  const { loading } = useSelector((state) => state.user);

  const [Inputs, setInputs] = useState({
    email: "",
  });

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleSendLink = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const res = await fetch(`${SERVER_URL}/api/auth/send-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;

        /* */
      }

      toast.success(
        "Password reset link has been successfully send to your email id"
      );

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper className="bg-image3 py-[40px] justify-center mx-auto bg-fixed">
      {/* */}

      <Layout title={"Send-Link-Page"}>
        {/* */}

        <div className="p-3 max-w-2xl mx-auto bg-indigo-400 rounded-lg">
          {/* */}

          {/* Creating a heading for the signIn page. */}

          <div className="">
            <h1 className="text-3xl text-center font-bold font-sans my-4 mb-5 uppercase responsive-heading">
              Reset your password
            </h1>

            <p className="text-[18px] font-sans font-bold text-center mb-4 text-slate-900 responsive-heading1">
              Please enter your register email id below <br /> We will send a
              link to your registered email id to reset your password
            </p>
          </div>

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

          {/* */}
        </div>

        {/* */}
      </Layout>

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
