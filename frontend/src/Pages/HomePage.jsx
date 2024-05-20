/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Layout from "../Components/Layout.jsx";

import { Link } from "react-router-dom";

import ListingItems from "./../Components/ListingItems.jsx";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ****************************************************** */
/* Function for next-arrow ie. to move to the next image. */

function NextArrow(props) {
  /* */

  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "grey",
        border: "2px solid white",
        height: "10vh",
        width: "30px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        fontSize: "2rem",
      }}
      onClick={onClick}
    />
  );

  /* */
}

/* ************************************************************** */
/* Function for previous-arrow ie. to move to the previous image. */

function PrevArrow(props) {
  /* */

  const { className, style, onClick } = props;

  return (
    /* */

    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        background: "grey",
        border: "2px solid white",
        height: "10vh",
        width: "30px",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
        fontSize: "2rem",
      }}
      onClick={onClick}
    />
  );

  /* */
}

export default function HomePage() {
  /* */

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,

    /* */
  };

  /* Creating an array to store images. */
  let HomeListings = [
    "images/hotel 11.jpg",
    "images/hotel 4.webp",
    "images/hotel 6.jpg",
    "images/hotel 7.webp",
    "images/resort 7.jpg",
    "images/resort 5.webp",
    "images/resort 3.jpg",
    "images/resort10.jpg",
  ];

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error that 
     can occur during any operations and passing its initial value as false because initially there 
     will be no errors.
  */

  const [error, setError] = useState(false);

  /* Creating a useState() hook to store the listings with offers and passing its initial value an 
     array (empty-array) because there can be many listing with offers. 
  */

  const [offerListings, setOfferListings] = useState([]);

  /* Creating a useState() hook to store the listings posted for selling and passing its initial value an 
     array (empty-array) because there can be many listing for sell. 
  */

  const [sellListings, setSellListings] = useState([]);

  /* Creating a useState() hook to store the listings posted for rent and passing its initial value an 
     array (empty-array) because there can be many listing for rent. 
  */

  const [rentListings, setRentListings] = useState([]);

  /* Creating a function name fetchOfferListings() and passing(calling) it in the useEffect() hook so 
     that in initial time we can get all the listings that is posted with offers by different owners in 
     the home-page.   
  */

  const fetchOfferListings = async () => {
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

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?offer=true&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into the json format
         and save it in a variable say data.
      */
      const data = await res.json();

      /* After getting and converting the response into json format.
                   
          * We will set the offerListings array of the useState() hook using the setOfferListings() 
            function with the data's of the data variable where we saved the response by converting 
            it into the json format.
             
          * And we will call the fetchRentListings() function so that we can get all listings for rent.
      */

      setOfferListings(data);

      fetchRentListings();

      /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched.
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
  };

  /* Creating a function name fetchRentListings() and passing(calling) it in the useEffect() hook so 
     that in initial time we can get all the listings that is posted for rent by different owners in 
     the home-page.   
  */

  const fetchRentListings = async () => {
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

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?type=rent&limit=10`,

        {
          method: "GET",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into the json format
         and save it in a variable say data.
      */

      const data = await res.json();

      /* After getting and converting the response into json format.
                   
          * We will set the rentListings array of the useState() hook using the setRentListings() 
            function with the data's of the data variable where we saved the response by converting 
            it into the json format.
             
          * And we will call the fetchSellListings() function so that we can get all listings for sell.
      */

      setRentListings(data);

      fetchSellListings();

      /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched.
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
  };

  /* Creating a function name fetchSellListings() and passing(calling) it in the useEffect() hook so 
     that in initial time we can get all the listings that is posted for selling by different owners in 
     the home-page.   
  */

  const fetchSellListings = async () => {
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

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?type=sell&limit=10`,

        {
          method: "GET",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into the json format
         and save it in a variable say data.
      */
      const data = await res.json();

      /* After getting and converting the response into json format.
                   
          * We will set the sellListings array of the useState() hook using the setSellListings() 
            function with the data's of the data variable where we saved the response by converting 
            it into the json format.
      */

      setSellListings(data);

      /* Catching the error and setting the error array of the useState() hook using the 
         setError() function with the message that we received from the error we catched.
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
  };

  /* ************************************************************************************************ */
  /* ************************************   useEffect() hooks  ************************************** */
  /* ************************************************************************************************ */

  /* Creating an useEffect() hook and calling the functions :

     * fetchRentListings();
     * fetchSellListings();
     * fetchOfferListings();
     
     So that in initial time we can get all listings for rent, for sell and the listings which has offers.
     and passing an empty array as dependencies.
  */

  useEffect(() => {
    /* */

    fetchRentListings();
    fetchSellListings();
    fetchOfferListings();

    /* */
  }, []);

  /* *********************************************************************************************** */
  /* *********************************************************************************************** */
  /* *********************************************************************************************** */
  /* *********************************************************************************************** */

  /* Returning the content that we will display in the "/" route.
     because for this route we have provided component {<HomePage />}
     ie.. <Route path="/" element={<HomePage />} />
  */

  return (
    /* */

    <Wrapper>
      <Layout title={"Home"}>
        {/* */}

        <div>
          {/* */}

          {/* ************************************************************************************************* */}
          {/* Creating the top section of the home-page with some heading, and a link to go to the search page. */}

          <div className="flex flex-col gap-6 p-28 px-8 max-w-6xl mx-auto">
            {/* */}

            <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl responsive-heading1">
              Find your next <span className="text-slate-500"> perfect </span>
              place with ease
            </h1>

            <div className="text-gray-500 text-2xl sm:text-2xl font-bold responsive-heading2">
              HomPoti is the best place to find your next perfect place to live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>

            <Link
              to={"/search"}
              className="text-[16px] text-blue-800 font-bold font-sans hover:underline responsive-link"
            >
              Let's get started...
            </Link>

            {/* */}
          </div>

          <Slider
            {...settings}
            style={{ marginLeft: "40px", marginRight: "40px" }}
          >
            {/* */}

            {HomeListings.map((listings, index) => (
              <div className="col-lg-3 col-md-4 hover:no-underline" key={index}>
                <div
                  className="border rounded-lg overflow-hidden cursor-pointer h-[460px] responsive-homeListings"
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.5)" }}
                >
                  <img
                    src={listings}
                    alt="photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="object-cover hover:scale-105 transition-scale duration-300 rounded-lg"
                  />

                  {/* */}
                </div>
              </div>
            ))}

            {/* */}
          </Slider>

          {/* ***************************************** */}
          {/* listings-results for offer, sell and rent */}

          <div
            style={{ textAlign: "center", display: "block" }}
            className="mt-[40px] mb-[80px]"
          >
            <div className="max-w-14xl p-3 flex flex-col gap-8 my-10 ml-[60px] responsive-all-listings">
              {/* */}

              {/* Displaying all the listings which has offers 

               If there is listing with offers(ie.. if we get the offerListings as true) and its 
               length is greater then 0 (ie.. if we get 1 more then 1 listings with offers) then we will :

                * Display a heading 
          
                * Create a link to go search-page ie... /search?offer=true

                * Then we will Dynamically access all the listings of the above offerListings array of the 
                  useState() hook using map function and passing all its data's in the listing parameter 
                  and we will display the ListingItems component and in this ListingItems component we will
                  pass the listing as props so that we can get this listing(props) in the ListingItems 
                  component and with the help of this listing(props) we can create some cards with the 
                  listings details and display those listing cards in this home-page when the filter 
                  applied or the search-keyword matches.
        

                  And Similarly for the listings posted for rent and sell.

              */}

              {offerListings && offerListings.length > 0 && (
                <div>
                  {/* */}

                  <div className="my-6">
                    <h1 className="text-4xl font-bold font-sans text-[#69124A] mb-[30px] responsive-heading3">
                      Recent Offers
                    </h1>

                    <Link
                      to={"/search?offer=true"}
                      className="text-blue-800 font-bold hover:underline cursor-pointer text-2xl responsive-heading4"
                    >
                      Show more offers
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-10 mt-[30px]">
                    {offerListings.map((listing) => (
                      <ListingItems key={listing._id} listing={listing} />
                    ))}
                  </div>

                  {/* */}
                </div>
              )}

              {rentListings && rentListings.length > 0 && (
                <div>
                  {/* */}

                  <div className="my-5">
                    <h1 className="text-4xl font-bold font-sans text-[#69124A] mb-[30px] responsive-heading3">
                      Recent Places For Rent
                    </h1>

                    <Link
                      to={"/search?type=rent"}
                      className="text-blue-800 font-bold hover:underline cursor-pointer text-2xl responsive-heading4"
                    >
                      Show more places for rent
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-[10px] mt-[30px]">
                    {rentListings.map((listing) => (
                      <ListingItems key={listing._id} listing={listing} />
                    ))}
                  </div>

                  {/* */}
                </div>
              )}

              {sellListings && sellListings.length > 0 && (
                <div>
                  {/* */}

                  <div className="my-5">
                    <h1 className="text-4xl font-bold font-sans text-[#69124A] mb-[30px] responsive-heading3">
                      Recent Places For Sell
                    </h1>

                    <Link
                      to={"/search?type=sell"}
                      className="text-blue-800 font-bold hover:underline cursor-pointer text-2xl 
                      responsive-heading4"
                    >
                      Show more places for sell
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-6 mt-[30px]">
                    {sellListings.map((listing) => (
                      <ListingItems key={listing._id} listing={listing} />
                    ))}
                  </div>

                  {/* */}
                </div>
              )}

              {/* */}
            </div>
          </div>

          {/* */}
        </div>

        {/* */}
      </Layout>
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

    .responsive-heading1 {
      font-size: 2.7rem;
      line-height: 1.4;
    }

    .responsive-heading2 {
      font-size: 2rem;
      line-height: 1.6;
    }

    .responsive-link {
      font-size: 2.3rem;
    }

    .responsive-all-listings {
      margin: auto;
    }

    .responsive-homeListings {
      height: 200px;
    }

    .responsive-heading3 {
      font-size: 3rem;
    }

    .responsive-heading4 {
      font-size: 2rem;
      font-weight: bold;
    }

    /* */
  }

  /* */
`;
