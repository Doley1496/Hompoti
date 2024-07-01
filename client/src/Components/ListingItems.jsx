/* */

import React from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";

import { MdLocationOn } from "react-icons/md";

import { FaBed, FaBath } from "react-icons/fa";

import { BsCurrencyRupee } from "react-icons/bs";

export default function ListingItems({ listing }) {
  /* */

  return (
    /* */

    <Wrapper>
      <div
        className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full
        sm:w-[230px]"
      >
        <Link to={`/listing/${listing._id}`}>
          {/* */}

          {/* **************************************** */}
          {/* Displaying the 1st image of the listing. */}

          <img
            src={listing.imageUrl[0]}
            alt="listing-cover"
            className="h-[120px] sm:h-[170px] w-full object-cover p-2 hover:scale-105 transition-scale duration-300"
          />

          {/* ****************************************** */}
          {/* Displaying all the content of the listing. */}

          <div className="font-bold p-2 flex flex-col gap-2">
            {/* */}

            {/* *********************************     NAME    ***************************************** */}
            {/* Creating a paragraph and inside this paragraph we will display the name of the listing. */}

            <p className="text-[#14527C] truncate text-center text-2xl mt-3 font-bold responsive-heading">
              {listing.name}
            </p>

            {/* **************************  ADDRESS   ***************************** */}
            {/* Creating a div and inside this div using react-icons ie. MdLocationOn 
                we are showing an address symbol followed by the address of the listing.
            */}

            <div className="flex items-center gap-2 mt-3">
              <MdLocationOn className="h-6 w-6 text-green-700 font-bold responsive-icons" />
              <p className="text-gray-600 truncate text-2xl font-bold responsive-text">
                {listing.address}
              </p>
            </div>

            {/* ********************************  DESCRIPTION  *********************************** */}
            {/* Creating a paragraph and inside this paragraph we are showing the description created
                by the owner for that particular listing. 
            */}

            <p className="text-[14px] my-2 text-gray-600 line-clamp-2 font-bold responsive-description">
              {listing.description}
            </p>

            {/* ********************************  PRICE  ***************************************** */}
            {/* Creating a paragraph and inside this paragraph we are showing the price of the listing 
                according to condition.
                If we get the offer of that listing as true (ie.. If that particular listing has offer) 
                then we will display the discount-price of that listing otherwise we will display the
                regular-price of that listing.
                And if the type of the listing is rent then we will add /month with the price.
            */}

            <p className="flex items-center text-slate-600 mt-2 mb-2 text-2xl font-bold responsive-text">
              <BsCurrencyRupee className="text-2xl font-bold font-sans text-[#5f2031] responsive-rupee" />

              {listing.regularPrice.toLocaleString("en-US")}

              {/* {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")} */}

              {listing.type === "rent" && " /month"}
            </p>

            {/* ********************************  FACILITIES  **************************************** */}
            {/* Creating a div and inside this div we are creating beds and washrooms:

                1. 1st using react-icons FaBed we are showing bed symbol and when the number of bedrooms is 
                   more then one then we will add beds with the total number of bed otherwise we will add bed.

                2. 2nd using react-icons FaBath we are showing washroom(bathroom) symbol and when the number
                   washrooms is more then one then we will add washrooms with the total number of washroom
                   otherwise we will add washroom.

                   
                    <FaBed className="text-lg" />
                    <FaBath className="text-lg" />
            */}

            <div className="text-slate-700 flex mb-4 justify-between">
              {/* */}

              <div className="font-bold text-2xl responsive-text">
                <FaBed className="text-2xl font-bold text-[#AE388B] responsive-facilities" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </div>

              <div className="font-bold text-2xl responsive-text">
                <FaBath className="text-2xl font-bold text-[#AE388B] responsive-facilities" />
                {listing.washrooms > 1
                  ? `${listing.washrooms} washrooms`
                  : `${listing.washrooms} washroom`}
              </div>

              {/* */}
            </div>

            {/* */}
          </div>

          {/* */}
        </Link>
      </div>
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

    .responsive-heading {
      font-size: 2rem;
      font-weight: bold;
    }

    .responsive-text {
      font-size: 1.9rem;
    }

    .responsive-facilities {
      font-size: 2.7rem;
      margin: 4px;
    }

    .responsive-rupee {
      font-size: 2.4rem;
    }

    .responsive-icons {
      width: 20px;
      height: 20px;
    }

    .responsive-description {
      margin: 3px;
    }

    /* */
  }

  /* */
`;
