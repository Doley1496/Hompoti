/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import {
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

import { BsCurrencyRupee } from "react-icons/bs";

import ContactPage from "../Components/ContactPage.jsx";

import { Link } from "react-router-dom";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* Importing some important methods we needed from swiper package. */
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

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

  /* Creating a variable to initialize useParams(). */
  const params = useParams();

  /* Using useSelector() hook we are destructing (importing) currentUser from the initial-state
     (ie. currentUser) of the userSlice variable using the global state user. 
  */
  const { currentUser } = useSelector((state) => state.user);

  /* Creating a useState() hook to store the listing created by a particular user in the listing array 
     and passing its initial value as null as initially there will be no listing.
  */
  const [listing, setListing] = useState(null);

  /* Creating a useState() hook to store the boolean value of the loading-effects in the loading array 
     and passing its initial value as false as initially we will not load anything.
  */
  const [loading, setLoading] = useState(true);

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error that 
     can occur during any operations and passing its initial value as false because initially there 
     will be no errors.
  */
  const [Error, setError] = useState(false);

  /* Creating a useState() hook to store the boolean value whether we have copied the page link or not 
     and passing its initial value as false because initially we will not copy any link of a web page.
  */

  const [copied, setCopied] = useState(false);

  /* Creating a useState() hook to store the boolean value of the contact button whether the user clicked
     on the contact lanlord button or not and passing its initial value as false because initially the user
     will not click on the contact-lanlord button ie. so initially we will not show the Contact component. 
     When the user click on the contact-lanlord button we will make the contact array as true and display 
     the Contact component.
  */

  const [showContact, setShowContact] = useState(false);

  const [showContactError, setShowContactError] = useState(false);

  /* Creating a function name fetchParticularListing() and passing(calling) it in the useEffect() hook so 
     that in initial time we can get all the current details(values) of a particular selected listing in the 
     listing-page that the user provided before while creating the listing.   
  */

  const fetchParticularListing = async () => {
    /* */

    try {
      /* */

      /*  Setting the loading array of the useState() hook as true using the setLoading() function 
          because in initial time using useEffect() hook we will display loading effects 
          ( ie.. display text as Loading... in the listing page ) 
      */

      setLoading(true);

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
        `${SERVER_URL}/api/listing/getParticularListingDetails/${params.listingId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into the json format
         and save it in a variable say data.
      */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then we 
         will set the error array of the useState() hook using setError() function with the message received
         from the data variable and also we will set the loading array as false because if we cannot make an 
         api call then we will not display any loading effects and then simply return back.
      */

      if (data.success === false) {
        setError(data.message);

        toast.error(data.message);

        setLoading(false);

        return;
      }

      /* After getting and converting the response into json format.
      
         * We will set the listing array of the useState() hook using the setListing() function with the 
           data's of the data variable where we saved the response by converting it into the json format.

         * When we get the data we need to set the loading to false because after getting the data we will 
           not show Loading... in the listing page.

         * We have to set error to false if everything is ok.
      */

      setListing(data);

      setLoading(false);

      setError(false);

      /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched and also we will set the 
         loading array of the useState() hook as false using the setLoading() function because if we catch 
         any error then will not show Loading... in the listing page.
      */
    } catch (error) {
      /* */

      setError(error.message);

      setLoading(false);

      /* */
    }
  };

  /* *********************************************************************************************** */
  /* ***********************************   useEffect() hooks  ************************************** */
  /* *********************************************************************************************** */

  /* Creating an useEffect() hook and calling the fetchParticularListing() function so that in initial 
     time we can get all the current details(values) of that particular selected listing in the listing-page 
     ie.. the details of the listings the user provided when he created the listings and passing params.listingId
     inside the array as dependencies because we are displaying for every particular listing-id.

     So that we can display all the details of that particular selected listing to the customer when the 
     customer select this listing on our web-page.
  */

  useEffect(() => {
    /* */

    fetchParticularListing();

    /* */
  }, [params.listingId]);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/listing/:listingId" route.
     because for this route we have provide component {<ListingPage />}
     ie.. <Route path="/listing/:listingId" element={<ListingPage />} />
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      {/* **************************************************************************************** */}
      {/* If loading is true (ie.. if we get loading) then we will display "Loading..." in red text 
          inside a paragraph.
      */}

      {loading && (
        <p className="text-slate-700 text-center text-4xl font-bold my-[40px]">
          Loading...
        </p>
      )}

      {/* **************************************************************************************** */}
      {/* If error is true (ie.. if any errors occurs) then we will display "Something went wrong" 
            in red text inside a paragraph.
      */}

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

        <div>
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

          {/* ******************************  Share-Icon  ******************************************* */}
          {/* Using react-icons ie. Fa-Share we are showing a sharing icon and when we will click on that 
                icon we will copy the link of that page and we will display Link copied! text for 2 secs.

                       ie....

              * 1st we are using writeText() method of navigator.clipboard API we are writing text to the
                clipboard and passing window.location.href property.

                The window.location.href property is used to extract the current URL from a webpage. 
                The location object has three methods - assign(), replace(), and reload(). 
                The assign() and replace() methods are used to open a new URL on the web page.

              * We will set the copied array of the useState() hook as true using the setCopied() function 
                so that when we will click on the share icon we can copy the link of that page and display
                the Link copied! text.
          
              * Then we will set the display-time of the Link copied! text for 2 secs and will make the 
                copied array as false because we already copied the link of that page and after 2 secs we 
                don't want to show the Link copied! text.
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

          {/* **************************************************************************************** */}
          {/* When we get the copied array(ie. when copied array will be true) then we will display 
                Link copied! text in white text and we will make this copied array as true when the user
                click on the share icon.
          */}

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

          <div className="flex flex-col max-w-4xl mx-auto p-3 gap-4 mb-[80px]">
            {/* */}

            {/* ************************ NAME, REGULAR-PRICE  *********************** */}
            {/* Creating a paragraph and inside this paragraph:

                  * 1st we will display the name of the listing.
                  * Then give a hyphen(-).
                  * Then $ symbol. 
                  * Then we will display the regular-price for that particular listing by 
                    converting it into US-english string format.
                  * And If the type of listing is rent then we will add /month with the 
                    price(ie..$ dollar).
            */}

            <p className="text-3xl font-bold flex text-center mt-[60px] responsive-name-price-type">
              {listing.name} - <BsCurrencyRupee className="mt-1 ml-3" />
              {listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " /month"}
            </p>

            {/* *********************************   ADDRESS   ********************************** */}
            {/* Creating a paragraph and inside this paragraph using react-icons ie. FaMapMarkerAlt 
                we are showing an address symbol followed by the address of the listing.
            */}

            <p className="flex items-center mt-6 gap-2 text-slate-600 font-bold text-3xl responsive-address">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>

            {/* ****************************  RENT/SELL and OFFER   ******************************** */}
            {/*  Creating a div for displaying the type of listing and the offer.

                 1. When the user set's the type of listing as rent we will display For Rent otherwise 
                    we will display For Sale.

                 2. When we get the offer of the listing (ie.. when the user gives an offer for his 
                    listing then we will display how much discount(ie.. off) he is giving by doing simple 
                    math and we are using + because it will convert the result into a integer number.
            */}

            <div className="flex gap-4">
              {/* */}

              <p
                className="bg-red-900 w-full max-w-[200px] text-gray-200 text-center p-2 py-4 rounded-md 
                text-2xl font-bold responsive-rent-sell"
              >
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>

              {listing.offer && (
                <p
                  className="bg-green-900 w-full max-w-[200px] text-gray-200 text-center p-2 py-4
                  pl-10 rounded-md flex items-center text-2xl font-bold responsive-discount"
                >
                  <BsCurrencyRupee className="text-3xl" />
                  {listing.discountPrice} Discount
                </p>
              )}

              {/* */}
            </div>

            {/* ********************************  DESCRIPTION  ********************************** */}
            {/* Creating a paragraph and inside this paragraph we are showing the description created
                by the owner for that particular listing. 
            */}

            <p className="text-slate-800 font-bold responsive-whole-description">
              <span className="font-bold text-black text-3xl mr-3 responsive-description-heading">
                Description -
              </span>

              <span className="text-[15px] font-bold text-[#080B39] responsive-description-content">
                {listing.description}
              </span>
            </p>

            {/* ********************************  FACILITIES  **************************************** */}
            {/* Creating a unordered-list and inside this unordered-list we are creating lists such as:

                1. 1st using react-icons FaBed we are showing bed symbol and when the number of bedrooms is 
                   more then one then we will add beds with the total number of bed otherwise we will add bed.

                2. 2nd using react-icons FaBath we are showing washroom(bathroom) symbol and when the number
                   washrooms is more then one then we will add washrooms with the total number of washroom
                   otherwise we will add washroom.

                3. 3rd using react-icons FaParking we are showing parking symbol and when the parking is
                   available for that listing (ie. when the owner provide parking facility for his listing
                   then we will show that parking is available otherwise we will show no parking variable.

                4. 4th using react-icons FaChair we are showing furnished symbol and when the furnished is
                   available for that listing (ie. when the owner provided that his listing(property) is 
                   furnished) then we will show that property is Furnished otherwise we will show Un-Furnished.
            */}

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

            {/* ********************************  CONTACT OWNER BUTTON ******************************** */}

            {/* Creating a button to contact the landlord (ie. the owner of that particular property).
                We will visible this button to all the customers except to the lanlord 
                (ie. to the lanlord account).

                So, we are giving a condition that when we will get the currentUser( ie. we will get the 
                currentUser when the user is login ) and if the id of that current-user is not equal to the
                user who created this listing then only we will show this button because if they are equal
                that means that login user himself is the lanlord.

                And we are providing an onClick() event on the button so when the user click on the 
                contact-lanlord button we will set the contact array of the useState() hook as true 
                using setContact() function because when the contact array will be true we will display 
                the Contact component.

            */}

            {currentUser ? (
              <div>
                {currentUser &&
                  currentUser._id !== listing.userRef &&
                  !contact && (
                    <button
                      className="bg-slate-700 text-white rounded-lg uppercase hover:opactiy-95 px-3 py-6 m-3
                      text-3xl font-bold w-[100%] responsive-button"
                      onClick={() => setShowContact(true)}
                    >
                      Contact Landlord
                    </button>
                  )}
              </div>
            ) : (
              <button
                className="bg-slate-700 text-white rounded-lg uppercase hover:opactiy-95 px-3 py-6 m-3
                text-3xl font-bold responsive-button"
                onClick={() => setShowContactError(true)}
              >
                Contact Lanlord
              </button>
            )}

            {showContactError && (
              <div className="text-3xl font-bold text-[#da4848] m-4">
                Please login to your account then visit this page to see the
                lanlord contact details
              </div>
            )}

            {/* When we get the contact ( ie.. when the contact array is true ) then we will display 
                the Contact component and in this Contact component we will pass the listing as props.
            */}

            {showContact && <ContactPage listing={listing} />}

            {/* */}
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

    .responsive-name-price-type {
      font-size: 2.1rem;
      font-weight: bold;
      margin-left: 10px;
    }

    .responsive-address {
      font-size: 2.3rem;
      margin-bottom: 10px;
    }

    .responsive-rent-sell {
      font-size: 2.3rem;
      padding-top: 17px;
      padding-bottom: 17px;
      font-weight: bold;
    }

    .responsive-discount {
      font-size: 2.3rem;
      padding-top: 17px;
      padding-bottom: 17px;
      font-weight: bold;
    }

    .responsive-description-heading {
      font-size: 2.6rem;
    }

    .responsive-description-content {
      font-size: 1.7rem;
      font-weight: bold;
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
      font-size: 2.5rem;
      padding-top: 17px;
      padding-bottom: 17px;
    }

    .responsive-image {
      height: 270px;
    }

    /* */
  }

  /* */
`;
