/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Layout from "../../Components/Layout.jsx";

import ListingItems from "../../Components/ListingItems.jsx";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Link } from "react-router-dom";

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

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

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

  const [offerListings, setOfferListings] = useState([]);

  const [sellListings, setSellListings] = useState([]);

  const [rentListings, setRentListings] = useState([]);

  const fetchOfferListings = async () => {
    /* */

    try {
      /* */

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?offer=true&limit=10`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      setOfferListings(data);

      fetchRentListings();

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      console.log(error);

      /* */
    }

    /* */
  };

  const fetchRentListings = async () => {
    /* */

    try {
      /* */

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?type=rent&limit=10`,

        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      setRentListings(data);

      fetchSellListings();

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      console.log("Something went wrong", error);

      /* */
    }

    /* */
  };

  const fetchSellListings = async () => {
    /* */

    try {
      /* */

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?type=sell&limit=10`,

        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      setSellListings(data);

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      console.log("Something went wrong", error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* ********************************** useEffect() hooks ******************************** */
  /* ************************************************************************************* */

  useEffect(() => {
    /* */

    fetchRentListings();

    fetchSellListings();

    fetchOfferListings();

    /* */
  }, [offerListings, sellListings, rentListings]);

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper>
      <Layout title={"Home"}>
        {/* */}

        <div>
          {/* */}

          {/* ************************************************************************* */}
          {/* Creating the top section of the home-page with some heading, and a link to go 
              to the search page. 
          */}

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
                  className="border rounded-lg overflow-hidden cursor-pointer h-[460px] 
                  responsive-homeListings"
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
