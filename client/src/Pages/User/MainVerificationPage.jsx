/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/Layout.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";

import { CgSpinner } from "react-icons/cg";

import {
  signInStart,
  signInSuccess,
  signInFailure,
  setAccessToken,
} from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let localStorageEmail = localStorage.getItem("email");

export default function MainVerificationPage() {
  /* */

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const { userId, token, email } = useParams();

  const [loading, setLoading] = useState(false);

  const [Inputs, setInputs] = useState({});

  const [emailLoading, setEmailLoading] = useState(false);

  const [emailVerificationSendSuccess, setEmailVerificationSendSuccess] =
    useState(false);

  const [emailVerifiedToast, setEmailVerifiedToast] = useState(false);

  const [hideVerifyEmailButton, setHideVerifyEmailButton] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);

  const [user, setUser] = useState([]);

  const currentUserEmail = localStorageEmail;

  const change = (event) => {
    /* */

    if (event.target.type === "email" || event.target.type === "number") {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    /* */
  };

  const emailPhoneVerifiedResult = () => {
    if (currentUser === null) {
      setEmailVerified(user.emailVerified);
    } else {
      setEmailVerified(currentUser.emailVerified);
    }
  };

  const sendVerificationMail = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      setEmailLoading(true);

      const res = await fetch(`${VITE_SERVER_URL}/api/auth/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUserEmail,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        setEmailLoading(false);

        return;

        /* */
      }

      toast.success("Email verification link has been sent to your email id");

      setEmailVerificationSendSuccess(true);

      setEmailLoading(false);

      setHideVerifyEmailButton(true);

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  const verifyEmail = async (event) => {
    /* */

    try {
      /* */

      dispatch(signInStart());

      const res = await fetch(
        `${VITE_SERVER_URL}/api/auth/verify-email/${userId}/${token}/${email}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        dispatch(signInFailure(data.message));

        toast.error(data.message);

        setLoading(false);

        return;

        /* */
      }

      setLoading(false);

      window.localStorage.setItem("id", data.user._id);

      dispatch(signInSuccess(data.user));

      dispatch(setAccessToken(data.token));

      setEmailVerifiedToast(true);

      if (emailVerifiedToast) {
        toast.success("Email verified successfully");
      }

      toast.success("Successfully Logged In");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(signInFailure(error.message));

      toast.error("Something went wrong. Please try again");

      console.log(error);

      /* */
    }

    /* */
  };

  const getSingleUserDetails = async () => {
    /* */

    try {
      /* */

      const res = await fetch(
        `${VITE_SERVER_URL}/api/user/getSingleUser/${currentUserEmail}`,
        {
          method: "GET",
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

      setUser(data.existingUser);

      /* Catching the error and displaying it with a toast message. */
    } catch (error) {
      /* */

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************** */
  /* ******************************** useEffect() hooks *********************************** */
  /* ************************************************************************************** */

  useEffect(() => {
    /* */

    emailPhoneVerifiedResult();

    /* */
  }, [currentUser]);

  useEffect(() => {
    /* */

    getSingleUserDetails();

    /* */
  }, [currentUserEmail]);

  useEffect(() => {
    /* */

    verifyEmail();

    /* */
  }, [userId, token]);

  /* ****************************************************************************************** */
  /* ****************************************************************************************** */
  /* ****************************************************************************************** */
  /* ****************************************************************************************** */

  return (
    /* */

    <Wrapper className="bg-image1 pt-5 pb-5 justify-center mx-auto bg-fixed">
      {/* */}

      <Layout title={"Verification-Page"}>
        {/* */}

        {/* ********************************************* */}
        {/* Creating a heading for the verification page. */}

        <div className="underline">
          <h1 className="text-5xl text-center font-bold font-sans my-7 text-red-900 mb-5">
            Your email status
          </h1>
        </div>

        <hr className="my-[30px] text-3xl font-bold w-[70%] mx-auto" />

        {/* ******************************************** */}
        {/* Section for the email id validation message. */}

        {!emailVerified ? (
          <h1 className="text-[24px] font-semibold font-sans text-center">
            Please verify your email id
          </h1>
        ) : (
          ""
        )}

        {/* *************************************** */}
        {/* Section for the email id verification . */}

        <div className="bg-image1 pt-5 pb-5 justify-center bg-fixed">
          <div
            className="mt-[10px] p-3 max-w-4xl h-[auto] mx-auto rounded-lg bg-[#3fc099] 
            responsive-form-portion"
          >
            {/* */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 text-red-900 mb-5">
              Email Id ={" "}
              {emailVerified == true ? (
                <span>✔️Verified</span>
              ) : (
                <span>❌ Not Verified</span>
              )}
            </h1>

            <div className="mb-6" style={{ textAlign: "center" }}>
              {/* */}

              {!hideVerifyEmailButton ? (
                <>
                  {!emailVerified ? (
                    /* */

                    <div className="flex flex-col">
                      {/* */}

                      <input
                        type="email"
                        id="email"
                        placeholder="Enter Your Email."
                        onChange={change}
                        value={currentUser ? currentUser.email : user.email}
                        className="border text-2xl font-sans font-semibold py-3 px-3 rounded-lg w-[60%] 
                        mb-4 mx-auto responsive-input-text"
                      />

                      <button
                        onClick={sendVerificationMail}
                        className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-4 
                        px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[40%] mx-auto
                        responsive-button"
                      >
                        {emailLoading && (
                          <CgSpinner
                            size={20}
                            className="mx-auto mb-2 animate-spin "
                          />
                        )}

                        <span>Verify Email Id</span>
                      </button>

                      {/* */}
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}

              {/* */}
            </div>

            {emailVerificationSendSuccess ? (
              <h1 className="text-[19px] font-semibold font-sans text-center mt-3 mb-[30px] text-[#642235]">
                Email verification link has been sent to{" "}
                {currentUser ? currentUser.email : user.email}
                <br />
                Please verify your email !
              </h1>
            ) : (
              ""
            )}

            {/* */}
          </div>
        </div>

        <hr className="my-[30px] text-3xl font-bold w-[70%] mx-auto" />

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
      font-size: 2rem;
      padding-top: 15px;
      padding-bottom: 15px;
      width: auto;
    }

    .responsive-icon-eye {
      margin-top: -47px;
      margin-left: 270px;
      font-size: 3rem;
    }

    .responsive-input-text {
      font-size: 2rem;
      width: 80%;
    }

    .responsive-login-button {
      width: 75%;
    }

    /* */
  }

  /* */
`;
