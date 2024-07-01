/* */

import React, { useState } from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Footer() {
  /* */

  const navigate = useNavigate();

  const [Inputs, setInputs] = useState({
    email: "",
  });

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleEmailSubscription = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const res = await fetch(`${SERVER_URL}/api/user/emailSubscription`, {
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
      }

      navigate("/emailSubscription");

      setInputs({
        email: "",
      });

      toast.success("You email is submitted successfully!");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  /* ************************************************************************************ */
  /* ************************************************************************************ */
  /* ************************************************************************************ */

  /* Returning the content to be displayed in the footer */

  return (
    /* */

    <Wrapper>
      {/* */}

      <footer className="bg-slate-700 body-font shadow-lg mb-5 pt-[60px]">
        {/* */}

        {/* ***************************** */}
        {/*    Footer Header section.     */}

        <div className="grid grid-three-column">
          {/* */}

          {/* ************************* */}
          {/* Company logo and message. */}

          <div
            className="footer-about"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <Link to="/">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd7N6uz3RlFsiQIfblRXraazBfhEvbOcyPV9DjBOfW4g&s"
                alt="contactus"
                className="w-40 h-18 text-white p-2 rounded-full bg-slate-700 mx-auto responsive-logo"
              />
            </Link>

            <h1 className="font-bold text-3xl mt-4 responsive-heading">
              <span className="text-[#4e71d1]">Hom</span>
              <span className="text-[#b7a5d1]">poti</span>
            </h1>

            <p className="mt-4 font-bold text-2xl text-[#D8CEE6] responsive-heading1">
              Best place for property dealing.
            </p>

            {/* */}
          </div>

          {/* ************************ */}
          {/* Email subscribe section. */}

          <div
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            {/* */}

            <h3 className="text-[#bb4b4b] text-3xl mb-5 font-bold font-sans responsive-text">
              Subscribe to get important updates
            </h3>

            <form onSubmit={handleEmailSubscription}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="YOUR E-MAIL ID"
                required
                className="text-[17px] p-3 py-[7px] font-bold font-sans pt-3 rounded-lg"
                value={Inputs.email}
                onChange={change}
              />

              <button
                type="submit"
                className=" bg-indigo-500 text-white rounded-lg font-bold uppercase p-3 pb-[6px] 
                  ml-[-10px] text-[18px]"
              >
                Subscribe
              </button>
            </form>

            {/* */}
          </div>

          {/* ************************** */}
          {/* Copyright and social-icons */}

          <div className="">
            {/* */}

            <p className="sm:text-left text-2xl pt-5 text-[#FF75D8] font-bold responsive-heading3">
              © 2023 HOMPOTI
            </p>

            <span className="inline-flex sm:ml-auto sm:mt-0 sm:justify-start mb-5 pt-4 m-auto">
              {/* */}

              <Link className="text-[#DCBAA9] pt-2" to="https://facebook.com/">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-8 h-8 responsive-icons"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </Link>

              <Link
                className="ml-3 text-[#DCBAA9] pt-2"
                to="https://twitter.com/"
              >
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-8 h-8 responsive-icons"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </Link>

              <Link
                className="ml-3 text-[#DCBAA9] pt-2"
                to="https://www.instagram.com/"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-8 h-8 responsive-icons"
                  viewBox="0 0 24 24"
                >
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </Link>

              <Link
                className="ml-3 text-[#DCBAA9] pt-2"
                to="https://www.linkedin.com"
              >
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  className="w-8 h-8 responsive-icons"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  />
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </Link>

              {/* */}
            </span>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* ********************************************************************** */}
        {/* Creating different links for privacy-policy, terms, contacts, and faq. */}

        <div className="flex-grow flex flex-wrap -mb-10 md:mt-0 text-center pb-[40px] leading-[45px] pt-[30px]">
          {/* */}

          <div className="lg:w-1/4 md:w-1/2 w-full ">
            {/* */}

            <Link
              to="/terms"
              className="title-font font-bold text-[17px] tracking-widest hover:underline text-[#7CF3A0]"
            >
              Terms and Conditions
            </Link>

            {/* */}
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full">
            {/* */}

            <Link
              to="/faq"
              className="title-font font-bold text-[17px] tracking-widest hover:underline text-[#7CF3A0]"
            >
              FAQ's
            </Link>

            {/* */}
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full">
            {/* */}

            <Link
              to="/contact"
              className="title-font font-bold tracking-widest text-[17px] hover:underline text-[#7CF3A0]"
            >
              Contact Us
            </Link>

            {/* */}
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full">
            {/* */}

            <Link
              to="/policy"
              className="title-font font-bold tracking-widest text-[17px] hover:underline text-[#7CF3A0]"
            >
              Privacy Policy
            </Link>

            {/* */}
          </div>

          {/* */}
        </div>

        {/* *********** */}
        {/* Decription. */}

        <div
          className="pt-[30px] text-[#da539b]"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          {/* */}

          <p className="text-[16px] font-bold mb-5">
            {/* */}

            <p> With regards Hompoti property dealing </p>

            <p> Golaghat, Assam, India - 785 621 </p>

            <p> Phone: +91 9101134037, </p>

            <p className="mx-4">
              Fax: +91 471 2322279, E-mail: infohompoti@gmail.com
            </p>

            <p className="mx-[13px]">
              <span> All rights reserved </span>
              <span className="text-[18px] mt-1"> © </span>
              <span> Hompoti {new Date().getFullYear()} </span>
              <span className="text-orange-700"> Copyright </span> |
              <span className="text-orange-700"> Terms of Use. </span>
            </p>

            {/* */}
          </p>

          {/* */}
        </div>

        {/* ***************** */}
        {/* Developer section */}

        <div className="pt-[30px] pb-[80px]">
          <h3 className="text-gray-300 text-center text-[18px] font-sans font-bold mt-10 pb-[40px]">
            ✸
            <span className="ml-3 mr-3 ">
              Design And Developed By Doley Tech
            </span>
            ✸
          </h3>
        </div>

        {/* */}
      </footer>

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

  .grid-three-column {
    grid-template-columns: 0.8fr 1.7fr 0.8fr;
  }

  footer {
    background-color: ${({ theme }) => theme.colors.footer_bg};

    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 0.5rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};
        hover: opacity-75;

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    footer {
      padding: 4rem 0 9rem 0;

      background-color: ${({ theme }) => theme.colors.footer_bg};

      .footer-social--icons {
        display: flex;
        gap: 2rem;

        div {
          padding: 0.5rem;
          border-radius: 50%;
          border: 2px solid ${({ theme }) => theme.colors.white};
          hover: opacity-75;

          .icons {
            color: ${({ theme }) => theme.colors.white};
            font-size: 3rem;
            position: relative;
            cursor: pointer;
          }
        }
      }
    }

    .grid-three-column {
      margin-left: 3px;
      margin-right: 3px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .responsive-heading {
      font-size: 2.9rem;
    }

    .responsive-heading1 {
      font-size: 1.9rem;
      padding-top: 10px;
    }

    .responsive-heading2 {
      margin-left: -130px;
      margin-top: 10px;
    }

    .responsive-heading3 {
      font-size: 2.9rem;
      padding-top: 10px;
      padding-bottom: 14px;
    }

    .responsive-logo {
      margin: auto;
      width: 80px;
      height: 80px;
    }

    .responsive-text {
      font-size: 2.1rem;
      align-items: center;
      margin-bottom: 30px;
    }

    .responsive-icons {
      width: 25px;
      height: 25px;
      margin: 10px;
    }

    /* */
  }

  /* */
`;
