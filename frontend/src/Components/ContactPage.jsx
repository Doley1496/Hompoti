/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Contact({ listing }) {
  /* */

  /* Using useSelector() hook we are destructing (importing) currentUser, loading and error from the 
     initial-state (ie. currentUser) of the userSlice variable using the global state user. 
  */

  const { currentUser, loading, error } = useSelector((state) => state.user);

  /* Creating a useState() hook to store the details of the landlord in the landlord array and passing 
     its initial value as null as initially we will not fetch any landlord.
  */

  const [landlord, setLanlord] = useState(null);

  console.log(currentUser);

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error that 
     can occur during any operations and passing its initial value as false because initially there 
     will be no errors.
  */

  const [Error, setError] = useState(false);

  /* Creating a useState() hook to hold the message of the textarea in the message array and passing its 
     initial value as empty string because initially we will not show any message to the user.
  */

  const [message, setMessage] = useState("");

  /* Creating a function with name change() and passing it in the onChange event of the textarea of the
     Contact lanlord section.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

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

      /* Sending a GET fetch request to the following route to get the listings of the user.

          The browsers will only expose(show) the response to the frontend JavaScript code if the
          Access-Control-Allow-Credentials value is true.
          Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the
          credentials as "include" and when we will pass its value as true inside the cors() function then
          it will expose the response to the frontend.
          After adding this only we will get the cookies,updated values etc.

          Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(`${SERVER_URL}/api/user/${listing.userRef}`, {
        method: "GET",
        credentials: "include",
      });

      /* After getting the response we will convert the response that we got into the json format
         and save it in a variable say data.
      */
      const data = await res.json();

      /* After getting and converting the response into json format.
      
         * We will set the lanlord array of the useState() hook using the setLanlord() function with the 
           data's of the data variable where we saved the response by converting it into the json format.

         * We have to set error to false if everything is ok.

      */

      setLanlord(data);

      setError(false);

      /* Catching the error and setting the Error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched because if we catch 
         any error we will show that error.
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
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

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the  route.
     because for this route we have provide component {<ContactPage />}
     ie.. <Route path="" element={<ContactPage />} />
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* If we get the landlord then inside a div we will show :

          * In a paragraph we will show to Contact the owner-name for that particular listing of that property.
          * Then provide a textarea to write the message the user wants to send to the owner.
          * Provide a Link to open the mail automatically with email of the landlord its subject and the 
            message pre entered.

             ie to={`mailto: ${landlord.email} ? subject= Regarding ${listing.name} &body = ${message}`}
       
      */}

      {landlord && (
        /* */

        <div
          className="flex flex-col gap-3 bg-slate-600 rounded-lg h-[600px]"
          style={{ textAlign: "center", display: "block" }}
        >
          {/* */}

          <p className="font-bold mt-5 pt-5 text-[#D8CEE6] text-3xl mb-4 responsive-contact-info">
            {/* */}

            <span> Contact </span>

            <span className="text-[#F248B6] text-4xl font-mono mx-4 underline responsive-ownerName">
              {landlord.firstName + " " + landlord.lastName}
            </span>

            <span> for </span>

            <span className="font-semibold">{listing.name.toLowerCase()}</span>

            {/* */}
          </p>

          <p>
            {landlord.phone ? (
              <p className="font-bold mt-5 text-[#dba14a] text-3xl mb-4 responsive-contact-info">
                Phone Number : {landlord.phone}
              </p>
            ) : (
              ""
            )}
          </p>

          <p className="font-bold mt-5 pt-5 mx-4 text-[#D8CEE6] text-3xl mb-4 responsive-contact-info">
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
            className="w-[90%] border p-4 py-5 mb-[40px] mt-[40px] rounded-lg text-center text-3xl font-bold 
            responsive-textArea"
          ></textarea>

          <div className="mt-[30px]">
            <Link
              to={`mailto: ${landlord.email} ? subject= Regarding ${listing.name} &body = ${message}`}
              className="bg-slate-700 text-gray-300 uppercase rounded-lg px-[40px] py-4
              text-3xl font-bold hover:opacity-95 responsive-button"
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
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the images ie.. the images to be display
   vertically and the seleced(click) image that is to be display horizontally and storing in   
   a variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
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
      padding-top: 17px;
      padding-bottom: 17px;
    }

    .responsive-button {
      font-size: 2.5rem;
      padding-top: 17px;
      padding-bottom: 17px;
    }

    .responsive-ownerName {
      font-size: 2.8rem;
    }

    /* */
  }

  /* */
`;
