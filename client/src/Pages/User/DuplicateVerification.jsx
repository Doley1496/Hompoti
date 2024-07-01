/* */

import React, { useState, useEffect } from "react";

import Layout from "../../Components/Layout.jsx";

import styled from "styled-components";

import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { Link, useParams } from "react-router-dom";

import { CgSpinner } from "react-icons/cg";

import { BsFillShieldLockFill } from "react-icons/bs";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import OtpInput from "otp-input-react";

import {
  signInSuccess,
  signInFailure,
} from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let RegistrationUserId = localStorage.getItem("registerUserId");

let localStorageEmail = localStorage.getItem("email");

let localStoragePhoneNumber = localStorage.getItem("phoneNumber");

export default function VerificationPage() {
  /* */

  const dispatch = useDispatch();

  const { userId, token, email } = useParams();

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [Inputs, setInputs] = useState({});

  const [error, setError] = useState("");

  const [emailLoading, setEmailLoading] = useState(false);

  const [resendOTPLoading, setResendOTPLoading] = useState(false);

  const [otp, setOtp] = useState("");

  const [showOtpInput, setShowOtpInput] = useState(false);

  const [emailVerificationSendSuccess, setEmailVerificationSendSuccess] =
    useState(false);

  const [hideVerifyEmailButton, setHideVerifyEmailButton] = useState(false);

  const [hidePhoneVerifyButton, setHidePhoneVerifyButton] = useState(false);

  const [hideSendOtpButton, setHideSendOtpButton] = useState(false);

  const [emailVerifiedToast, setEmailVerifiedToast] = useState(false);

  const currentUserEmail = localStorageEmail;

  const currentUserPhoneNumber = localStoragePhoneNumber;

  const inputEmail = Inputs.email;

  const inputPhoneNumber = Inputs.phoneNumber;

  const newPhone = "+91" + currentUserPhoneNumber;

  const [mainEmail, setMainEmail] = useState("");

  const [mainPhoneNumber, setMainPhoneNumber] = useState("");

  const [emailVerified, setEmailVerified] = useState(false);

  const [phoneVerified, setPhoneVerified] = useState(false);

  const change = (event) => {
    /* */

    if (event.target.type === "email" || event.target.type === "number") {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    /* */
  };

  const emailPhoneVerifiedResult = () => {
    if (currentUser === null) {
      setEmailVerified(false);
      setPhoneVerified(false);
    } else {
      setEmailVerified(currentUser.emailVerified);
      setPhoneVerified(currentUser.phoneVerified);
    }
  };

  const Email = () => {
    /* */

    if (inputEmail != undefined) {
      setMainEmail(inputEmail);
    } else {
      setMainEmail(currentUserEmail);
    }

    /* */
  };

  const phoneNumber = () => {
    /* */

    if (inputPhoneNumber != undefined) {
      setMainPhoneNumber("+91" + inputPhoneNumber);
    } else {
      setMainPhoneNumber("+91" + currentUserPhoneNumber);
    }

    /* */
  };

  const sendOTP = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      if (inputPhoneNumber === undefined && currentUserPhoneNumber === "") {
        /* */

        toast.error("Please add your number");

        setError("Please add your number");

        /* */
      } else {
        /* */

        setError("");

        setLoading(true);

        const res = await fetch(`${VITE_SERVER_URL}/api/auth/send-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: mainPhoneNumber }),
          credentials: "include",
        });

        const data = await res.json();

        if (data.success === false) {
          /* */

          toast.error(data.message);

          setLoading(false);

          setError(data.message);

          return;

          /* */
        }

        toast.success("OTP has been send to your phone number");

        setLoading(false);

        setShowOtpInput(true);

        setHideSendOtpButton(true);

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setLoading(false);

      setError(error.message);

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  const verifyOTP = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      if (otp === "" || otp === null) return setError("Please enter OTP");

      if (otp.length === 6) {
        /* */

        setError("");

        setLoading(true);

        const res = await fetch(
          `${VITE_SERVER_URL}/api/auth/verify-registration-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              otp,
              phoneNumber: newPhone,
              userId: RegistrationUserId,
            }),

            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          toast.error(data.message);

          setLoading(false);

          setError(data.message);

          return;

          /* */
        }

        window.localStorage.setItem("id", data._id);

        toast.success("OTP has been verified successfully");

        setLoading(false);

        setHidePhoneVerifyButton(true);

        /* */
      } else {
        /* */

        setError("OTP must be 6 digit");

        /* */
      }

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  const sendVerificationMail = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      if (inputEmail === undefined && currentUserEmail === "") {
        /* */

        toast.error("Please add your email");

        setError("Please add your email");

        /* */
      } else {
        /* */

        setEmailLoading(true);

        const res = await fetch(`${VITE_SERVER_URL}/api/auth/send-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: RegistrationUserId,
            email: mainEmail,
          }),
          credentials: "include",
        });

        const data = await res.json();

        if (data.success === false) {
          /* */

          toast.error(data.message);

          setLoading(false);

          return;

          /* */
        }

        toast.success("Email verification link has been sent to your email id");

        setLoading(false);

        setEmailVerificationSendSuccess(true);

        setEmailLoading(false);

        setHideVerifyEmailButton(true);

        /* */
      }

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

      window.localStorage.setItem("id", data._id);

      dispatch(signInSuccess(data));

      setEmailVerifiedToast(true);

      if (emailVerifiedToast) {
        toast.success("Email verified successfully");
      }

      setLoading(false);

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(signInFailure(error.message));

      toast.error("Something went wrong");

      console.log(error);

      /* */
    }

    /* */
  };

  const reSendOTP = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setError("");

      setResendOTPLoading(true);

      const res = await fetch(`${VITE_SERVER_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: newPhone }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        setResendOTPLoading(false);

        setError(data.message);

        return;

        /* */
      }

      toast.success("OTP has been send to your phone number");

      setResendOTPLoading(false);

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      setResendOTPLoading(false);

      setError(error.message);

      toast.error("Something went wrong");

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

    Email();

    /* */
  }, [inputEmail, currentUserEmail]);

  useEffect(() => {
    /* */

    phoneNumber();

    /* */
  }, [inputPhoneNumber, currentUserPhoneNumber]);

  useEffect(() => {
    /* */

    emailPhoneVerifiedResult();

    /* */
  }, [currentUser]);

  useEffect(() => {
    /* */

    verifyEmail();

    /* */
  }, [userId, token]);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

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
            Your email and phone status
          </h1>
        </div>

        <hr className="my-[30px] text-3xl font-bold w-[70%] mx-auto" />

        {/* ************************************************************* */}
        {/* Section for the email id and phone number validation message. */}

        <div>
          {/* */}

          {!emailVerified && !phoneVerified ? (
            <h1 className="text-[24px] font-semibold font-sans text-center">
              Please verify your email id and phone number to login to your
              account
            </h1>
          ) : (
            <>
              {/* */}

              {!emailVerified ? (
                <h1 className="text-[24px] font-semibold font-sans text-center">
                  Please verify your email id
                </h1>
              ) : (
                ""
              )}

              {!phoneVerified ? (
                <h1 className="text-[24px] font-semibold font-sans text-center">
                  Please verify your phone number
                </h1>
              ) : (
                ""
              )}

              {/* */}
            </>
          )}

          {/* */}
        </div>

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
                        defaultValue={currentUser ? currentUser.email : ""}
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
                Email verification link has been sent to {currentUser.email}.{" "}
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

        {/* ******************************************* */}
        {/* Section for the phone number verification . */}

        <div className="bg-image1 pt-5 pb-5 justify-center bg-fixed">
          <div
            className="mt-[10px] p-3 max-w-3xl h-[auto] mx-auto rounded-lg bg-[#3fc099] 
            responsive-form-portion"
          >
            {/* */}

            <h1 className="text-4xl text-center font-bold font-sans my-7 text-red-900 mb-5">
              Phone Number ={" "}
              {phoneVerified == true ? (
                <span>✔️Verified</span>
              ) : (
                <span>❌ Not Verified</span>
              )}
            </h1>

            <div className="" style={{ textAlign: "center" }}>
              {/* */}

              {!hidePhoneVerifyButton ? (
                <>
                  {showOtpInput ? (
                    <>
                      {/* */}

                      {/* ******************** */}
                      {/* Confirming the OTP : */}

                      <div style={{ textAlign: "center" }}>
                        {/* */}

                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                          <BsFillShieldLockFill size={30} />
                        </div>

                        <h1 className="text-2xl font-semibold font-sans text-gray-800 m-3 py-6 responsive-text">
                          Please enter the OTP send to {newPhone}
                        </h1>

                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          autoFocus
                          className="otp-container font-bold text-2xl "
                        ></OtpInput>

                        <div className="mt-[20px]">
                          {/* */}

                          <button
                            onClick={verifyOTP}
                            className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                            px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] mb-6 
                            mt-[19px] mr-6 responsive-button"
                          >
                            {loading && (
                              <CgSpinner
                                size={20}
                                className="text-center mb-2 mx-auto text-white animate-spin"
                              />
                            )}

                            <span>Verify OTP</span>
                          </button>

                          <button
                            onClick={reSendOTP}
                            disabled={loading}
                            className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                            px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] mb-6 
                            mt-[19px] responsive-button"
                          >
                            {resendOTPLoading ? (
                              <CgSpinner
                                size={20}
                                className="text-center mx-auto mb-2 text-white animate-spin"
                              />
                            ) : (
                              "Resend OTP"
                            )}
                          </button>

                          {/* */}
                        </div>

                        {/* */}
                      </div>

                      {/* */}
                    </>
                  ) : (
                    <>
                      {/* */}

                      {/* ***************** */}
                      {/* Sending the OTP : */}

                      {!phoneVerified ? (
                        /* */

                        <div>
                          {/* */}

                          <input
                            type="number"
                            id="phoneNumber"
                            placeholder="Enter Your phone number."
                            onChange={change}
                            defaultValue={
                              currentUser ? currentUser.phoneNumber : ""
                            }
                            className="border text-2xl font-sans font-semibold py-3 px-3 rounded-lg w-[60%] 
                            mb-4 mx-auto responsive-input-text"
                          />

                          <button
                            onClick={sendOTP}
                            className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-4 
                            px-7 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-[auto] mb-[30px]
                            responsive-button"
                          >
                            {loading && (
                              <CgSpinner
                                size={20}
                                className="mx-auto mb-2 animate-spin "
                              />
                            )}

                            <span>Verify Phone Number</span>
                          </button>

                          {/* */}
                        </div>
                      ) : (
                        ""
                      )}

                      {/* */}
                    </>
                  )}

                  {/* */}
                </>
              ) : (
                ""
              )}

              {/* */}
            </div>

            {/* */}
          </div>
        </div>

        {/* ******************************** */}
        {/* Section to go to the login page. */}

        {emailVerified && phoneVerified ? (
          <div className="text-center mt-4">
            {/* */}

            <h1 className="text-3xl font-semibold font-sans">
              You have successfully verified your phone number and email. Now
              you can login to your account
            </h1>

            <Link to="/login">
              <button
                disabled={loading}
                className="bg-slate-700 text-[18px] font-semibold font-sans text-white rounded-lg mt-4
                uppercase hover:opacity-95 disabled:opacity-80 py-3 px-[25px] mb-4 w-[auto] 
                responsive-login-form"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </Link>

            {/* */}
          </div>
        ) : (
          ""
        )}

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

    /* */
  }

  /* */
`;
