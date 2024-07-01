/* */

import React, { useState } from "react";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import styled from "styled-components";

import { Link, useNavigate, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import { toast } from "react-toastify";

let SessionId = localStorage.getItem("id");

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ContactPage() {
  /* */

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [Inputs, setInputs] = useState({
    firstName: currentUser ? currentUser.firstName : "",
    lastName: currentUser ? currentUser.lastName : "",
    email: currentUser ? currentUser.email : "",
    phone: currentUser ? currentUser.phone : "",
    message: "",
  });

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const handleContactForm = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const res = await fetch(`${SERVER_URL}/api/auth/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          ...Inputs,
          id: SessionId,
        }),

        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;

        /* */
      }

      navigate("/complaintSuccess");

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper className="box-wrapper">
      {/* */}

      <div className="mb-5 mt-[-40px] mx-[-80px] responsive-pagination">
        <PageNavigation title="Contact Us" />
      </div>

      <Layout title={"Contact-Page"} className="mb-[80px]">
        {/* */}

        <h2 className="text-center text-5xl m-4 mb-5 text-[#800000] font-sans font-bold">
          Send us a message
        </h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3570.4742260239977!2d93.95794847456722!3d26.504868577500055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sarengapara%20golaghat!5e0!3m2!1sen!2sin!4v1701831446062!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* ******************** */}
        {/* Part 1 Contact Info. */}

        <div className="info-wrap mt-5 responsive-main-contact">
          {/* */}

          <h2 className="font-bold text-center uppercase mb-5 text-4xl font-mono">
            Contact Info
          </h2>

          <p className="font-bold font-sans leading-10 mb-5 text-[#CDD193] text-2xl responsive-main-contact">
            For any additional information, please contact us at the below
            contact details or send us a message in the contact form. Please
            call between: 10 am and 8 pm (IST) on all working days.
          </p>

          {/********************************************* */}
          {/* Contact details phone, email, website part. */}

          <ul className="">
            {/* */}

            <li className="mt-2 font-semibold text-gray-300 text-2xl responsive-main-contact">
              {/* */}

              <i className="fas fa-phone-alt bg-green-700 text-gray-300 p-2 mr-3 rounded-2xl text-3xl" />

              <span>Phone :</span>

              <NavLink to="" className="m-3">
                + 91 - 70863-67457
              </NavLink>

              <br />

              <NavLink to="" className="m-3 pl-[104px] responsive-contact">
                + 91 - 94011-87976
              </NavLink>

              {/* */}
            </li>

            <li className="mt-3 font-semibold text-gray-300 text-2xl responsive-main-contact">
              <i className="fas fa-paper-plane  bg-green-700 text-gray-300 p-2 mr-3 rounded-2xl text-3xl" />

              <span className="mb-1">Email : </span>

              <Link to="mailto:info@yoursite.com" className="hover:underline">
                infohompoti@gmail.com
              </Link>
            </li>

            <li className="mt-3 font-semibold text-gray-300 text-2xl responsive-main-contact">
              <i className="fas fa-globe  bg-green-700 text-gray-300 p-2 mr-3 rounded-2xl text-3xl" />
              <span>Address : </span>

              <Link to="" className="hover:underline">
                Arengapara milon nagar{" "}
                <span className="ml-[120px] pt-3 responsive-contact1">
                  Golaghat (Assam) 785-621
                </span>
              </Link>
            </li>

            {/* */}
          </ul>

          {/************************************ */}
          {/* Contact details social-icons part. */}

          <ul className="m-5">
            {/* */}

            <Link
              to="https://facebook.com/"
              className="fab fa-facebook bg-green-700 text-white p-3 mr-6 hover:bg-pink-500 
              text-3xl rounded-2xl inline-block"
            />

            <Link
              to="https://www.instagram.com/"
              className="fab fa-instagram bg-green-700 text-white p-3 mr-6 hover:bg-pink-500
              text-3xl rounded-2xl inline-block "
            />

            <Link
              to="https://twitter.com/"
              className="fab fa-twitter bg-green-700 text-white p-3 mr-6 hover:bg-pink-500
              text-3xl rounded-2xl inline-block "
            />

            {/* */}
          </ul>

          {/* */}
        </div>

        {/* *********************** */}
        {/* Part 2 Message writing. */}

        <div className="form-wrap border border-black rounded-3xl mt-5 mb-[70px]">
          {/* */}

          <form onSubmit={handleContactForm}>
            {/* */}

            <h2
              className="text-[25px] text-center text-[#CDD193] font-bold m-5 
              responsive-messageWriting-heading"
            >
              For any complaint send us a message
            </h2>

            <div className="mb-3">
              {/* */}

              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="font-semibold py-4 px-3 bg-transparent w-full text-[#D8CEE6] text-3xl"
                  placeholder="First Name"
                  required
                  onChange={change}
                  defaultValue={currentUser ? currentUser.firstName : ""}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="font-semibold p-4 bg-transparent w-full text-[#D8CEE6] text-3xl"
                  placeholder="Last Name"
                  required
                  onChange={change}
                  defaultValue={currentUser ? currentUser.lastName : ""}
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Mail"
                  className="font-semibold p-4 bg-transparent w-full text-[#D8CEE6] text-3xl"
                  required
                  onChange={change}
                  defaultValue={currentUser ? currentUser.email : ""}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="font-semibold p-4 bg-transparent w-full text-[#D8CEE6] text-3xl"
                  required
                  onChange={change}
                  defaultValue={currentUser ? currentUser.phoneNumber : ""}
                />
              </div>

              <div className="form-group w-100">
                <textarea
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Write your message"
                  className="h-40 font-semibold p-3 bg-transparent pt-5 w-full text-3xl text-[#D8CEE6]"
                  required
                  onChange={change}
                  value={Inputs.message}
                />
              </div>

              {/* */}
            </div>

            <div className="">
              <input
                type="submit"
                defaultValue="Send Message"
                className="w-[100%] text-centen text-[20px] border py-[18px] bg-slate-700 font-semibold
              text-blue-400 hover:bg-pink-900 rounded-2xl transition:300 mt-4 mb-[29px]"
                name="submit"
              />
            </div>

            {/* */}
          </form>

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

    .responsive-pagination {
      margin-left: auto;
      margin-right: auto;
    }

    .responsive-heading {
      margin: auto;
      font-size: 2rem;
    }

    .responsive-heading1 {
      font-size: 1.6rem;
    }

    .responsive-paragraph {
      font-size: 1.7rem;
    }

    .responsive-main-contact {
      font-size: 1.7rem;
    }

    .responsive-contact {
      padding-left: 79px;
      margin-bottom: 40px;
      padding-bottom: 40px;
    }

    .responsive-contact1 {
      margin-left: 90px;
    }

    .responsive-messageWriting-heading {
      font-size: 2.4rem;
    }

    /* */
  }

  /* */
`;
