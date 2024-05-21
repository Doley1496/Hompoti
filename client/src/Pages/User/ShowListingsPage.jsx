/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Layout from "../../Components/Layout.jsx";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ProfilePage() {
  /* */

  /* Creating a useState() hook to hold the value of the inputs fields ie. form such as the profile-photo
     username email and password and passing its initial value as empty object because initilly its values
     will be empty.
  */

  const [Inputs, setInputs] = useState({});

  /* Using useSelector() hook we are destructing (importing) currentUser, loading and error from the 
     initial-state (ie. currentUser) of the userSlice variable using the global state user. 
  */

  const { currentUser, loading, error } = useSelector((state) => state.user);

  /* Creating a useState() hook to store all the listings of a particular user inside an array in the 
     userListings array and passing its initial value an array (empty-array) because it can contain 
     many listings.
  */

  const [userListings, setUserListings] = useState([]);

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error that 
     can occur during any operations and passing its initial value as false because initially there 
     will be no errors.
  */

  const [Error, setError] = useState(false);

  /* ***************************************************************************************************** */
  /* ********************************          FUNCTIONS              ************************************ */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Creating a function name handleShowListings() and passing(calling) it in the onClick event of the 
     Show Listings button ie... when we will click on the  Show Listings button then this function will get 
     execute and inside this function we have written the logic to show the user his listings.
  */

  const getAllListings = async (event) => {
    /* */

    try {
      /* */

      /*  Setting the Error array of the useState() hook as false using the setError() function because 
          initially there will be no errors.  
      */

      setError(false);

      /* Sending a GET fetch request to the following route to get all the listings created by the user.
         
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then 
        it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAll-listings/${currentUser._id}`,
        { credentials: "include" }
      );

      /* After getting the response we will convert the response that we got into the json format 
         and save it in a variable say data. 
      */

      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then 
         we will set the Error array of the useState() hook using setError() function with the message 
         received from the data variable and simply return back.
      */

      if (data.success === false) {
        setError(data.message);
        toast.error(data.message);
        return;
      }

      /* Then we will set the userListings array of the useState() hook using setUserListings() 
         function with the response we received and we saved it in the data variable. 
      */

      setUserListings(data);

      /* Catching the error and setting the Error array of the useState() hook as true using the 
         setError() function because after catching the error we will display the error.
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
  };

  /* Creating a function name handleDeleteListings() and passing(calling) it in the onClick event of the 
     Delete button ie... when we will click on the Delete button then this function will get 
     execute and inside this function we have written the logic to delete that selected listing.
  */

  const deleteParticularListing = async (listingId) => {
    /* */

    try {
      /* */

      /*  Setting the Error array of the useState() hook as false using the setError() function because
          initially there will be no errors.  
      */

      setError(false);

      /* Sending a DELETE fetch request to the following route to delete a particular listing of the user.
         
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then 
        it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(
        `${SERVER_URL}/api/listing/deleteListing/${listingId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into the json format 
         and save it in a variable say data. 
      */

      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then 
         we will set the Error array of the useState() hook using setError() function with the message 
         received from the data variable and simply return back.
      */

      if (data.success === false) {
        setError(data.message);

        toast.error(data.message);

        return;
      }

      /* If the delete is successfull we will set the userListings array of the useState() hook using 
         setUserListings() function using the previous data.
         
         ie. we gonna get the previous data and then from this previous data we will filter out that 
             particular listing that the user wants to delete.
           
         And we will only remove(filter) the listing that belongs to this listing-id. 
          
         And we will keep the listings (ie. listing._id) that doesn't match with the current listingId 
         by simply providing a condition ie.. listing._id !== listingId
      */

      setUserListings((previous) =>
        previous.filter((listing) => listing._id !== listingId)
      );

      /* Catching the error and setting the Error array of the useState() hook as true using the 
         setError() function because after catching the error we will display the error.
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
  };

  /* *************************************************************************************** */
  /* ********************************** useEffect() hooks ********************************** */
  /* *************************************************************************************** */

  /* Creating an useEffect() hook and calling the getAllListings() function so that in 
     initial time we can get all the listings.
  */

  useEffect(() => {
    /* */

    getAllListings();

    /* */
  }, []);

  /* ********************************************************************************************** */
  /* ********************************************************************************************** */
  /* ********************************************************************************************** */

  /* Returning the content that we will display in the "/profile" route.
     because for this route we have provide component {<ProfilePage />}
     ie.   <Route path="/profile" element={<ProfilePage />} />
  */

  return (
    /* */

    <Wrapper className="p-3 mb-[40px]">
      {/* */}

      <Layout title={"My Listing Page"}>
        {/* */}

        {/* ************************************************************************************* */}
        {/* When we will get userListings ie. when it is not empty and its length is greater then 0 
            then we will show all the listings created by that particular user.
        */}

        {userListings && userListings.length > 0 ? (
          <h1 className="text-center my-[40px] text-4xl font-bold font-sans text-[#C8335B] responsive-heading">
            My Listings
          </h1>
        ) : (
          <div
            style={{ textAlign: "center", display: "block" }}
            className="mt-[100px] mb-[150px]"
          >
            <h1 className="text-center my-[40px] text-4xl font-bold font-sans text-[#C8335B] responsive-heading">
              You donot have any listing! To create your listings <br /> Click
              on the below button
            </h1>

            <button
              className="bg-slate-700 text-white rounded-lg uppercase hover:opactiy-95 px-3 py-6 m-3
              text-3xl font-bold w-[75%] responsive-button"
            >
              <Link to="/dashboard/user/create-listing"> Create Listings </Link>
            </button>
          </div>
        )}

        {userListings && userListings.length > 0 && (
          <div className="gap-4 grid grid-three-column ">
            {/* */}

            {/* Dynamically accessing the above userListings array of the useState() hook using map function 
                and passing all its data's in the listing parameter and inside the div we are creating two 
                links one link for the image and one for the image's-text and two buttons delete and edit button.
            */}

            {userListings.map((listing) => (
              /* */

              <div
                key={listing._id}
                className="border rounded-lg py-3 gap-4 mb-[30px]"
              >
                {/* ********************************************************************************* */}
                {/* Creating a link to go the following route when the user will click on this particular 
                    image and we display only the 1st image amoung all the images.
                */}

                <div>
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrl[0]}
                      alt="listing-image"
                      className="rounded-lg"
                      style={{ width: "100%", height: "240px" }}
                    />
                  </Link>
                </div>

                {/* ************************************ */}
                {/* Displaying the name of the listings. */}

                <div className="mt-4 responsive-text">
                  <Link
                    to={`/listing/${listing._id}`}
                    className="text-slate-700 font-bold font-sans text-3xl text-center hover:underline truncate 
                    responsive-text"
                  >
                    <p>{listing.name}</p>
                  </Link>
                </div>

                {/* ******************************************************************** */}
                {/* Creating Edit and Delete button to update or to delete the listings. */}

                <div
                  className="font-bold mt-4"
                  style={{ textAlign: "center", display: "block" }}
                >
                  {/* */}

                  <button
                    className="text-red-700 uppercase text-2xl font-bold mr-6 responsive-text-button"
                    onClick={() => deleteParticularListing(listing._id)}
                  >
                    Delete
                  </button>

                  <button className="text-green-700 uppercase text-2xl font-bold responsive-text-button">
                    <Link to={`/dashboard/user/update-listing/${listing._id}`}>
                      Edit
                    </Link>
                  </button>

                  {/* */}
                </div>

                {/* */}
              </div>

              /* */
            ))}

            {/* */}
          </div>
        )}

        {/* */}
      </Layout>

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

  .grid-three-column {
    grid-template-columns: repeat(3, 2.7fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .grid-three-column {
      grid-template-columns: repeat(1, 2.7fr);
    }

    .responsive-heading {
      font-size: 3.6rem;
      line-height: 1.4;
    }

    .responsive-text {
      font-size: 2.8rem;
      margin-top: 20px;
    }

    .responsive-text-button {
      font-size: 2.6rem;
      padding-top: 10px;
    }

    .responsive-button {
      font-size: 2.5rem;
      padding-top: 17px;
      padding-bottom: 17px;
    }

    /* */
  }

  /* */
`;
