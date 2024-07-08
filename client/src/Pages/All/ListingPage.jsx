/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import { useParams, Link } from "react-router-dom";

import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

import { BsCurrencyRupee } from "react-icons/bs";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Importing some important methods we needed from swiper package. */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

import { setListingsDetails } from "../../Redux/Actions/othersActions.jsx";

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

let firstRender = true;

export default function Listings() {
  /* */

  /* Initializing SwiperCore of swiper and using its navigation method because we want to use 
     the navigation. 
  */
  SwiperCore.use([Navigation]);

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

  const dispatch = useDispatch();

  const params = useParams();

  const { listing } = useSelector((state) => state.others);

  const [loading, setLoading] = useState(true);

  const [Error, setError] = useState(false);

  const [copied, setCopied] = useState(false);

  const fetchParticularListing = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      const res = await fetch(
        `${SERVER_URL}/api/listing/getParticularListingDetails/${params.listingId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        setError(data.message);

        toast.error(data.message);

        setLoading(false);

        return;

        /* */
      }

      dispatch(setListingsDetails(data));

      setLoading(false);

      setError(false);

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      setError(error.message);

      setLoading(false);

      console.log(error);

      /* */
    }

    /* */
  };

  const refreshToken = async () => {
    /* */

    try {
      /* */

      const res = await fetch(`${SERVER_URL}/api/auth/refreshToken`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      return data;

      /* */
    } catch (error) {
      /* */

      console.log(error);

      /* */
    }

    /* */
  };

  /* ************************************************************************************* */
  /* ********************************** useEffect() hooks ******************************** */
  /* ************************************************************************************* */

  useEffect(() => {
    /* */

    fetchParticularListing();

    /* */
  }, [params.listingId]);

  // useEffect(() => {
  //   /* */

  //   if (firstRender) {
  //     /* */

  //     firstRender = false;

  //     fetchRentListings();
  //     fetchSellListings();
  //     fetchOfferListings();

  //     /* */
  //   }

  //   let interval = setInterval(() => {
  //     refreshToken();
  //   }, 1000 * 28);

  //   return () => clearInterval(interval);

  //   /* */
  // }, []);

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper>
      {/* */}

      {loading && (
        <p className="text-slate-700 text-center text-4xl font-bold my-[40px]">
          Loading...
        </p>
      )}

      {Error && (
        <p className="text-red-700 text-center text-4xl font-bold my-[40px]">
          Something went wrong
        </p>
      )}

      {/* If there is a listing and if the page is not loading and there is no errors then we will show 
          all the details of the listing such as :
            
            1. We will show all the images one by one in slide view using Swiper package and we will use
               navigation of Swiper to swipe the images one by one.
            2. Then we will add the share icon.
            3. Then we will add the listing name, price, address, type of listing, offer, description

      */}

      {listing && !loading && !Error && (
        /* */

        <div className="mb-[80px]">
          {/* */}

          <Swiper navigation>
            {/* */}

            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                {/* */}

                <div
                  className="h-[450px] w-full responsive-image"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>

                {/* */}
              </SwiperSlide>
            ))}

            {/* */}
          </Swiper>

          {/* Showing a sharing icon and when we will click on that icon we will copy the link 
              of that page and we will display Link copied! text for 2 secs 
          */}

          <div
            className="fixed top-[26%] right-[5%] z-10 border rounded-full w-14 h-14 flex justify-center 
            items-center bg-white cursor-pointer responsive-share-button"
          >
            <FaShare
              className="text-[#F248B6] text-2xl"
              onClick={() => {
                /* */

                navigator.clipboard.writeText(window.location.href);

                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 2000);

                /* */
              }}
            />
          </div>

          {copied && (
            <p
              className="fixed top-[23%] right-[5%] z-10 text-2xl font-bold rounded-md bg-slate-100 
              p-2 responsive-link-copied"
            >
              Link copied!
            </p>
          )}

          {/* ********************************************************************************* */}
          {/* After showing the images in slides and creating a share-icon then we will add the
              listing name, price's, address, type of listing, offer, description, facilities etc.
          */}

          <div className="flex flex-col max-w-4xl mx-auto p-3 gap-4 mb-[20px]">
            {/* */}

            {/* ************************************************************ */}
            {/* Displaying the name, regular-price and type of the property. */}

            <div
              className="text-3xl font-semibold font-sans flex text-center mt-[60px] 
              responsive-name-price-type"
            >
              {/* */}

              <p className="mx-3"> {listing.name} - </p>

              <BsCurrencyRupee className="ml-2 text-[30px] responsive-rupee" />

              <p className="flex">
                {listing.regularPrice.toLocaleString("en-US")}

                {listing.type === "rent" && " /month"}
              </p>

              {/* */}
            </div>

            {/* ********************************************************************** */}
            {/* Displaying the address of the listing followed by the address symbol. */}

            <p
              className="flex items-center mt-6 gap-2 text-slate-900 font-semibold font-sans text-3xl 
              responsive-address"
            >
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>

            {/* ******************************************************************* */}
            {/* Displaying the type of the listing followed by the discount amount. */}

            <div className="flex gap-4">
              {/* */}

              <p
                className="bg-red-900 w-full max-w-[200px] text-gray-200 text-center py-[18px] 
                rounded-md text-2xl font-semibold font-sans responsive-rent-sell"
              >
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>

              {listing.offer && (
                <div
                  className="bg-green-900 w-full max-w-[200px] text-gray-200 rounded-md 
                  text-2xl px-2 font-semibold font-sans"
                  style={{ textAlign: "center" }}
                >
                  <span className="flex flex-row mt-3 mx-[40px] font-semibold font-sans responsive-discount">
                    <BsCurrencyRupee className="text-3xl responsive-rupee" />
                    {listing.discountPrice}
                  </span>

                  <h1 className="ml-3 pb-3 font-sans responsive-discount1">
                    Discount
                  </h1>
                </div>
              )}

              {/* */}
            </div>

            {/* **************************************************************************** */}
            {/* Displaying the description created by the owner for that particular listing. */}

            <p className="text-slate-800 responsive-whole-description">
              <span className="font-bold text-black text-3xl mr-3 responsive-description-heading">
                Description -
              </span>

              <span
                className="text-[15px] font-semibold font-sans text-[#080B39] 
                responsive-description-content"
              >
                {listing.description}
              </span>
            </p>

            {/* *************************************************************************** */}
            {/* Displaying the facilities created by the owner for that particular listing. */}

            <ul
              className="text-green-900 font-bold text-sm flex flex-wrap items-center gap-4 sm:gap-6 
              mb-10 mt-4 responsive-whole-facilities"
            >
              {/* */}

              <li className="flex items-center gap-2 whitespace-nowrap text-2xl mr-4 responsive-facilities">
                <FaBed className="text-2xl font-bold responsive-facilities-icons" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed`}
              </li>

              <li className="flex items-center gap-2 whitespace-nowrap text-2xl mr-4 responsive-facilities">
                <FaBath className="text-2xl font-bold responsive-facilities-icons" />
                {listing.washrooms > 1
                  ? `${listing.washrooms} washrooms `
                  : `${listing.washrooms} washroom `}
              </li>

              <li className="flex items-center gap-2 whitespace-nowrap text-2xl mr-4 responsive-facilities">
                <FaChair className="text-2xl font-bold responsive-facilities-icons" />
                {listing.furnished ? "Furnished" : "Un-Furnished"}
              </li>

              <li className="flex items-center gap-2 whitespace-nowrap text-2xl mr-4 responsive-facilities">
                <FaParking className="text-2xl font-bold responsive-facilities-icons" />
                {listing.parking ? "Parking Available" : "No Parking "}
              </li>

              {/* */}
            </ul>

            {/* */}
          </div>

          {/* *********************************************************** */}
          {/* Creating dynamic button for buying or renting the property. */}

          <div className="">
            {listing.type === "rent" ? (
              <Link
                to={"/propertySummaryPage/?step=2"}
                style={{
                  textAlign: "center",
                  display: "block",
                }}
              >
                <button
                  className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
                  disabled:opacity-90 mt-[45px] w-[30%] font-sans font-semibold text-4xl responsive-button"
                >
                  Buy property on rent
                </button>
              </Link>
            ) : (
              <Link
                to={"/propertySummaryPage/?step=2"}
                style={{
                  textAlign: "center",
                  display: "block",
                }}
              >
                <button
                  className="py-[20px] px-4 bg-[#800000] text-[#d8d0d2] rounded-lg hover:opacity-75 
                  disabled:opacity-90 mt-[45px] w-[30%] font-sans font-semibold text-4xl responsive-button"
                >
                  Buy property
                </button>
              </Link>
            )}
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

    .responsive-homeListings {
      height: 200px;
    }

    .responsive-share-button {
      top: 10%;
      right: 10%;
      font-size: 2rem;
      width: 40px;
      height: 40px;
    }

    .responsive-link-copied {
      top: 15%;
      right: 10%;
      font-weight: bold;
      font-size: 2rem;
    }

    .responsive-address {
      font-size: 2.3rem;
      margin-bottom: 10px;
    }

    .responsive-rent-sell {
      font-size: 2.3rem;
      font-weight: bold;
    }

    .responsive-discount {
      font-size: 2rem;
      font-weight: bold;
      line-height: 1.4;
    }

    .responsive-discount1 {
      font-size: 16px;
    }

    .responsive-rupee {
      font-size: 24px;
    }

    .responsive-name-price-type {
      font-size: 2rem;
    }

    .responsive-description-heading {
      font-size: 2.6rem;
    }

    .responsive-description-content {
      font-size: 1.7rem;
    }

    .responsive-whole-description {
      margin-left: 10px;
      margin-right: 10px;
      margin-top: 20px;
    }

    .responsive-facilities {
      font-size: 2.1rem;
    }

    .responsive-facilities-icons {
      font-size: 2.5rem;
    }

    .responsive-whole-facilities {
      margin-left: 17px;
      margin-top: 20px;
    }

    .responsive-button {
      font-size: 2.3rem;
      padding-top: 17px;
      padding-bottom: 17px;
      width: 75%;
    }

    .responsive-image {
      height: 270px;
    }

    /* */
  }

  /* */
`;
