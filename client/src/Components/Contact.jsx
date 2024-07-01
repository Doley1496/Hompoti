/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Contact({ listing }) {
  /* */

  const [landlord, setLanlord] = useState(null);

  const [error, setError] = useState(false);

  const [message, setMessage] = useState("");

  const change = (event) => {
    /* */

    setMessage(event.target.value);

    /* */
  };

  /* Creating a function name fetchLanlord() and passing(calling) it in the useEffect() hook so that 
     in initial time we can get all the details of the landlord.
  */

  const fetchLanlord = async () => {
    /* */

    try {
      /* */

      const res = await fetch(`${SERVER_URL}/api/user/${listing.userRef}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      setLanlord(data);

      setError(false);

      /* Catching the error and displaying on the console. */
    } catch (error) {
      /* */

      setError(error.message);

      console.log(error);

      /* */
    }

    /* */
  };

  /* *********************************************************************************************** */
  /* ********************************    useEffect() hooks    ************************************** */
  /* *********************************************************************************************** */

  /* Creating an useEffect() hook and calling the fetchLanlord() function to get all the details of the 
     lanlord except his password in initial time and passing listing inside the array as dependencies.
  */

  useEffect(() => {
    /* */

    fetchLanlord();

    /* */
  }, [listing]);

  /* **************************************************************************************** */
  /* **************************************************************************************** */
  /* **************************************************************************************** */
  /* **************************************************************************************** */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* If we get the landlord then inside a div we will show :

          * In a paragraph we will show to Contact the owner-name for that particular listing of that 
            property.
          * Then provide a textarea to write the message the user wants to send to the owner.
          * Provide a Link to open the mail automatically with email of the landlord its subject 
            and the message pre entered.

          ie to={`mailto: ${landlord.email} ? subject= Regarding ${listing.name} &body = ${message}`}
       
      */}

      {landlord && (
        /* */

        <div
          className="flex flex-col gap-3 bg-slate-600 rounded-lg h-[600px] mb-[80px]"
          style={{ textAlign: "center", display: "block" }}
        >
          {/* */}

          <p
            className="font-semibold font-sans mt-5 pt-5 text-[#D8CEE6] text-3xl mb-4
            responsive-contact-info"
          >
            {/* */}

            <span className="font-semibold font-sans"> Contact </span>

            <span className="text-[#F248B6] text-4xl font-mono mx-4 underline responsive-ownerName">
              {landlord.firstName + " " + landlord.lastName}
            </span>

            <span className="font-semibold font-sans"> for </span>

            <span className="font-semibold font-sans">
              {listing.name.toLowerCase()}
            </span>

            {/* */}
          </p>

          <p>
            {landlord.phoneNumber ? (
              <p
                className="font-semibold font-sans mt-5 text-[#dba14a] text-3xl mb-4 
                responsive-contact-info"
              >
                Phone Number : {landlord.phoneNumber}
              </p>
            ) : (
              ""
            )}
          </p>

          <p
            className="font-semibold font-sans mt-5 pt-5 mx-4 text-[#D8CEE6] text-3xl mb-4 
            responsive-contact-info"
          >
            To send a message to the owner please type your message inside the
            box and then click on the send message button.
          </p>

          <textarea
            name="message"
            id="message"
            rows="2"
            placeholder="Enter Your Message Here"
            value={message}
            required
            autoFocus="on"
            onChange={change}
            className="w-[60%] border py-[40px] mb-[40px] mt-[40px] rounded-lg text-center text-3xl 
            font-semibold font-sans responsive-textArea"
          ></textarea>

          <div className="mt-[30px]">
            <Link
              to={`mailto: ${landlord.email} ? subject= Regarding ${listing.name} &body = ${message}`}
              className="bg-[#EBAAB0] text-gray-900 uppercase rounded-lg px-[40px] py-[20px]
              text-3xl font-semibold font-sans hover:opacity-95 responsive-button"
              style={{ width: "100%" }}
            >
              Send Message
            </Link>
          </div>

          {/* */}
        </div>

        /* */
      )}

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

    .responsive-contact-info {
      font-size: 2.4rem;
      margin: 10px;
      line-height: 1.4;
    }

    .responsive-textArea {
      font-size: 2.3rem;
      padding-top: 27px;
      padding-bottom: 27px;
      width: 80%;
    }

    .responsive-button {
      font-size: 2.3rem;
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .responsive-ownerName {
      font-size: 2.8rem;
    }

    /* */
  }

  /* */
`;
