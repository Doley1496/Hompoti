/* */

import React, { useState } from "react";

import Layout from "../Components/Layout";

import PageNavigation from "../Components/PageNavigation.jsx";

import styled from "styled-components";

import { Link, useNavigate, NavLink } from "react-router-dom";

import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let SessionId = localStorage.getItem("id");

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ContactPage() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Using useSelector() hook we are destructing (importing) currentUser, loading and error from the 
     initial-state (ie. currentUser) of the userSlice variable using the global state user. 
  */
  const { currentUser } = useSelector((state) => state.user);

  /* Creating a useState() hook to store the data's of the input field's of the contact page
     ex: firstName, lastName, email, etc.
  */

  const [Inputs, setInputs] = useState({
    firstName: currentUser ? currentUser.firstName : "",
    lastName: currentUser ? currentUser.lastName : "",
    email: currentUser ? currentUser.email : "",
    phone: currentUser ? currentUser.phone : "",
    message: "",
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

  /* Creating a function name handleSignUp() and passing(calling) it in the onSubmit event of the form. 
     ie... when we will click on the SignUp button then this function will get execute and inside this 
     function we have written the logic to submit all the details provided in the SignUp form into our 
     database.  
  */

  const handleContactForm = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      /* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user entered in the inputs fields such as its email 
         and password to the back-end so that we can SignIn the existing user. 
      */

      const res = await fetch(`${SERVER_URL}/api/auth/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        /* In body along with all the data's of the inputs fields of contact page we will also
           have to pass SessionId because we need to know which user is creating the todoList. 
        */
        body: JSON.stringify({
          ...Inputs,
          id: SessionId,
        }),

        credentials: "include",
      });

      /* After getting the response we will convert the response that we got into json format. */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then
         we will display a toast error message of the backend and simply return.
      */
      if (data.success === false) {
        /* */

        toast.error(data.message);

        return;
      }

      /* After successful signIn we will redirect the user to the home-page. */
      navigate("/complaintSuccess");

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

  /* Returning the content that we will display in the "/contact" route.
     because for this route we have provide component {<ContactPage />}
     ie. <Route path="/contact" element={<ContactPage />} /> 
  */

  return (
    /* */

    <Wrapper className="box-wrapper">
      {/* */}

      <div className="mb-5 mt-[-30px] ml-[-80px] mr-[-80px]">
        <PageNavigation title="Contact Us" />
      </div>

      <Layout title={"Contact-Page"} className="pb-[40px]">
        {/* */}

        {/* <ToastContainer className="text-2xl font-bold" /> */}

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

        {/* Part 1 Contact Info. */}

        <div className="info-wrap mt-5 responsive-main-contact">
          {/* */}

          <h2 className="font-bold text-center uppercase mb-5 text-4xl font-mono">
            Contact Info
          </h2>

          <p className="font-bold font-sans leading-10 mb-5 text-[#CDD193] text-2xl responsive-main-contact">
            For any additional information, please contact us at the below
            contact details or send us a message in the contact form. Please
            call between: 10 am and 5 pm (IST) on all working days.
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
              text-3xl rounded-3xl inline-block"
            />

            <Link
              to="https://www.instagram.com/"
              className="fab fa-instagram bg-green-700 text-white p-3 mr-6 hover:bg-pink-500
              text-3xl rounded-3xl inline-block "
            />

            <Link
              to="https://twitter.com/"
              className="fab fa-twitter bg-green-700 text-white p-3 mr-6 hover:bg-pink-500
              text-3xl rounded-3xl inline-block "
            />

            {/* <li className="inline-block mr-5">
              <a href="#">
                <i
                  className="fab fa-twitter bg-green-700 text-white p-3 mr-3 hover:bg-pink-500
                  text-3xl rounded-3xl"
                />
              </a>
            </li> */}

            {/* */}
          </ul>

          {/* */}
        </div>

        {/* Part 2 Message writing. */}

        <div className="form-wrap border border-black rounded-3xl mt-5 mb-[80px]">
          {/* */}

          <form onSubmit={handleContactForm}>
            <h2 className="text-3xl text-center text-[#CDD193] font-bold m-5">
              For any complaint send us a message
            </h2>

            <div className="mb-3">
              {/* */}

              {/* When we use defaultValue then we cannot give space between the quotes if we give 
                  then the placeholder's value will not be shown in the input field.
              */}

              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="font-semibold p-4 bg-transparent w-full text-[#D8CEE6] text-3xl"
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
                  defaultValue={currentUser ? currentUser.phone : ""}
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

            <input
              type="submit"
              defaultValue="Send Message"
              className="w-full text-centen text-3xl border p-4 bg-slate-700 font-semibold
            text-blue-400 hover:bg-pink-900 rounded-2xl transition:300 mt-4 mb-[67px]"
              name="submit"
            />
          </form>

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
/* Using styled of styled-components we are styling the footer and storing in a variable Wrapper.
   This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

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
      padding-left: 80px;
      padding-bottom: 15px;
    }

    .responsive-contact1 {
      margin-left: 90px;
    }

    /* */
  }

  /* */
`;
