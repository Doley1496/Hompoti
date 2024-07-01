/* */

import React, { useState } from "react";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  signInSuccess,
  signInFailure,
} from "../../Redux/Actions/authActions.jsx";

import { doingVerificationStart } from "../../Redux/Actions/othersActions.jsx";

import OAuth from "../../Components/OAuth.jsx";

import { toast } from "react-toastify";

import { BiShow, BiHide } from "react-icons/bi";

import { IoPersonSharp } from "react-icons/io5";

import { RiLockPasswordFill } from "react-icons/ri";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function SignInPage() {
  /* */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [errors, setErrors] = useState(false);

  const [loading, setLoading] = useState(false);

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const inputEmail = Inputs.email;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((previous) => !previous);
  };

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleLogin = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setLoading(true);

      const res = await fetch(`${SERVER_URL}/api/auth/signIn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Inputs),
        credentials: "include",
      });

      let data = await res.json();

      if (data.success === false) {
        /* */

        dispatch(signInFailure(data.message));

        setLoading(false);

        setErrors(data.message);

        toast.error(data.message);

        const message = data.message;
        const statusCode = data.statusCode;

        if (data.statusCode === 401) {
          /* */

          window.localStorage.setItem("email", inputEmail);

          dispatch(doingVerificationStart(data));

          navigate(`/verification/${message}/${statusCode}`);

          /* */
        } else if (data.statusCode === 404) {
          /* */

          navigate("/signUp");

          /* */
        }

        return;

        /* */
      }

      window.localStorage.setItem("id", data._id);

      dispatch(signInSuccess(data));

      toast.success("Successfully Logged In");

      navigate("/");

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      console.log(error);

      dispatch(signInFailure(error.message));

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

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
                className="bg-slate-700 text-2xl font-bold font-sans text-white p-3 rounded-lg 
                uppercase hover:opacity-95 disabled:opacity-80 responsive-login-form py-4 mb-4"
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
              <p
                className="m-3 mt-6 text-[18px] font-bold font-sans text-slate-700 hover:underline
                cursor-pointer"
              >
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

            {/* */}
          </div>
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
