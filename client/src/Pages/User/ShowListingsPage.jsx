/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Layout from "../../Components/Layout.jsx";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ProfilePage() {
  /* */

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [userListings, setUserListings] = useState([]);

  const [error, setError] = useState(false);

  const getAllListings = async () => {
    /* */

    try {
      /* */

      setError(false);

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAll-listings/${currentUser._id}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        if (data.statusCode === 401) {
          /* */

          dispatch(signOutUserSuccess());

          localStorage.clear();

          alert(
            "Your cookie is mismatched. You are signing out of our account!"
          );

          toast.success("Successfully Logged Out");

          return;

          /* */
        } else {
          /* */

          setError(data.message);

          toast.error(data.message);

          return;

          /* */
        }

        /* */
      }

      setUserListings(data);

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      setError(error.message);

      console.log(error);

      /* */
    }

    /* */
  };

  const deleteParticularListing = async (listingId) => {
    /* */

    try {
      /* */

      setError(false);

      const res = await fetch(
        `${SERVER_URL}/api/listing/deleteListing/${listingId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        if (data.statusCode === 401) {
          /* */

          dispatch(signOutUserSuccess());

          localStorage.clear();

          alert(
            "Your cookie is mismatched. You are signing out of our account!"
          );

          toast.success("Successfully Logged Out");

          return;

          /* */
        } else {
          /* */

          toast.error(data.message);

          setError(data.message);

          return;

          /* */
        }

        /* */
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

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      setError(error.message);

      console.log(error);

      /* */
    }

    /* */
  };

  /* ******************************************************************* */
  /* *******************  useEffect() hooks  *************************** */
  /* ******************************************************************* */

  useEffect(() => {
    /* */

    getAllListings();

    /* */
  }, [currentUser]);

  /* ******************************************************************* */
  /* ************************    return     **************************** */
  /* ******************************************************************* */

  return (
    /* */

    <Wrapper className="p-3 mb-[40px]">
      {/* */}

      <Layout title={"My Listing Page"}>
        {/* */}

        {/* *********************************** */}
        {/* Heading for the show-listings page. */}

        <div className="">
          {/* */}

          {userListings && userListings.length > 0 ? (
            /* */

            <h1
              className="text-center my-[40px] text-[30px] font-bold font-sans text-[#C8335B] 
              responsive-heading"
            >
              My Listings
            </h1>
          ) : (
            <div
              style={{ textAlign: "center", display: "block" }}
              className="mt-[100px] mb-[150px]"
            >
              <h1
                className="text-center my-[40px] text-[20px] font-semibold font-sans text-[#C8335B] 
                responsive-heading"
              >
                You donot have any listing! To create your listings <br /> Click
                on the below button
              </h1>

              <button
                className="bg-slate-700 text-white rounded-lg uppercase hover:opactiy-95 px-[10px] 
                py-[18px] text-3xl font-semibold font-sans w-[30%] responsive-button"
              >
                <Link to="/dashboard/user/create-listing">Create Listings</Link>
              </button>
            </div>

            /* */
          )}

          {/* */}
        </div>

        {/* *********************************************************************************** */}
        {/* When we will get userListings ie. when it is not empty and its length is greater then 0 
            then we will show all the listings created by that particular user.
        */}

        {userListings && userListings.length > 0 && (
          <div className="gap-4 grid grid-three-column ">
            {/* */}

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

                <div className="mt-[20px]">
                  <Link
                    to={`/listing/${listing._id}`}
                    className="text-slate-700 font-bold font-sans text-3xl text-center hover:underline 
                    truncate responsive-text"
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
                    className="text-red-700 uppercase text-2xl font-semibold font-sans mr-6 
                    responsive-button1"
                    onClick={() => deleteParticularListing(listing._id)}
                  >
                    Delete
                  </button>

                  <button
                    className="text-green-700 uppercase text-2xl font-semibold font-sans 
                    responsive-button1"
                  >
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
    grid-template-columns: repeat(3, 2.7fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .grid-three-column {
      grid-template-columns: repeat(1, 2.7fr);
    }

    .responsive-heading {
      font-size: 3.3rem;
      line-height: 1.4;
    }

    .responsive-text {
      font-size: 2.6rem;
      margin-top: 20px;
    }

    .responsive-button1 {
      font-size: 2.1rem;
      padding-top: 10px;
    }

    .responsive-button {
      font-size: 2.3rem;
      padding-top: 17px;
      padding-bottom: 17px;
      width: 75%;
    }

    /* */
  }

  /* */
`;
