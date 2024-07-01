/* */

import React, { useState } from "react";

import Layout from "../../Components/Layout.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { BiShow, BiHide } from "react-icons/bi";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ResetPasswordPage() {
  /* */

  const navigate = useNavigate();

  const { id, token } = useParams();

  const { loading } = useSelector((state) => state.user);

  const [Inputs, setInputs] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleResetPassword = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const res = await fetch(
        `${SERVER_URL}/api/auth/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Inputs),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;

        /* */
      }

      toast.success("Your password is updated successfully");

      navigate("/login");

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

    <Wrapper className="bg-image1 pt-5 pb-5 justify-center mx-auto bg-fixed">
      {/* */}

      <Layout title={"Reset-Password-Page"}>
        {/* */}

        <div className="p-3 max-w-3xl mx-auto bg-indigo-400 rounded-lg mt-[40px] py-[30px]">
          {/* */}

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
