/* */

import React, { useState, useEffect } from "react";

import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";

import ListingItems from "../../Components/ListingItems.jsx";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Search() {
  /* */

  const navigate = useNavigate();

  const [listingResults, setListingResults] = useState([]);

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showMore, setShowMore] = useState(false);

  const [sideBarData, setSideBarData] = useState({
    searchTerm: " ",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  /* ***************************************************************************************** */
  /* ***************************          FUNCTIONS              ***************************** */
  /* ***************************************************************************************** */

  const change = (event) => {
    /* */

    /* In our models we have different types of fields such as number, text, textarea and boolean 
       therefore we will provide conditions for different fields.
  
          Using event.target we target a particular field.
    */

    /* If the id of the field is sell, rent or all (both sell or rent) then we will set the sideBarData
       array of the useState() hook using the setSideBarData() function with the previous information of
       the sideBarData array and we will set the type of the field with the id of that particular field.
         
         ie.. if the id of the field is equal to all then type will be set to all(both rent and sell). 
              if the id of the field is equal to sell then type will be set to sell.
              if the id of the field is equal to rent then type will be set to rent. 
    */
    if (
      event.target.id === "all" ||
      event.target.id === "rent" ||
      event.target.id === "sell"
    ) {
      setSideBarData({ ...sideBarData, type: event.target.id });
    }

    /* If the id of the field is parking or furnished or offer then we will set the sideBarData array 
       of the useState() hook using the setSideBarData() function with the previous information present  
       in that array and we will set the id of the field with the boolean true value of checked event 
       of that particular field ie. event.target.checked.
       and if event.target.checked is equal to string true then we will set event.target.checked as true 
       otherwise we will set it as false.
    */
    if (
      event.target.id === "parking" ||
      event.target.id === "furnished" ||
      event.target.id === "offer"
    ) {
      setSideBarData({
        ...sideBarData,
        [event.target.id]:
          event.target.checked || event.target.checked === "true"
            ? true
            : false,
      });
    }

    /* If the id of the field is searchTerm then we will set the sideBarData array of the useState() hook
       using the setSideBarData() function with the previous information of the sideBarData array and we
       will set the searchTerm with the value of that particular field.
    */
    if (event.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: event.target.value });
    }

    /* If the id of the select field ( ie.. event.target.id ) is equal to sort_order we will :
       We have two things together( ie.. the sort and the order ) so we need to split it. 

      * 1st we will find the value for sort(sorting).
       
        If there is 1st value ( ie.. 0th position value) then we will split the first value with a 
        underline using the split() function. Otherwise if there is no first value we will provide sort 
        value with created_at (ie.. creation-time). ie.. we will sort according to creation-time.

      * 2nd we will find the value for order(in which we want to sort).
        
        If there is 2nd value( ie.. 1st position value) then we will split the second value with a 
        underline using the split() function. Otherwise if there is no second value we will provide order 
        value as desc (ie.. descending order). ie.. we will sort in descending order.

      * 3rd we will set the sideBarData array of the useState() hook using the setSideBarData() function 
        with the previous information of sideBarData array and we will also add the sort and the order.
    */
    if (event.target.id === "sort_order") {
      /* */

      const sort = event.target.value.split("_")[0] || "created_at";

      const order = event.target.value.split("_")[1] || "desc";

      setSideBarData({ ...sideBarData, sort, order });
    }

    /* */
  };

  const SetSearchListings = (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      const urlParams = new URLSearchParams();

      urlParams.set("searchTerm", sideBarData.searchTerm);
      urlParams.set("type", sideBarData.type);
      urlParams.set("parking", sideBarData.parking);
      urlParams.set("furnished", sideBarData.furnished);
      urlParams.set("offer", sideBarData.offer);
      urlParams.set("sort", sideBarData.sort);
      urlParams.set("order", sideBarData.order);

      const searchQuery = urlParams.toString();

      /* After creation of the searchQuery is done we will navigate to the following route */
      navigate(`/search?${searchQuery}`);

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      console.log(error);

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  const GetSearchListings = () => {
    /* */

    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || " ",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    fetchAllSearchListings();

    /* */
  };

  const fetchAllSearchListings = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      setShowMore(false);

      const urlParams = new URLSearchParams(location.search);

      const searchQuery = urlParams.toString();

      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      setListingResults(data);

      setLoading(false);

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      console.log(error);

      setLoading(false);

      /* */
    }

    /* */
  };

  const ShowMoreListings = async () => {
    /* */

    /* 1st we will find the total number of listings present in our database. */
    const numberOfListings = listingResults.length;

    /* Then we will find the starting-index ie. from where we will start showing the listings. */
    const startIndex = numberOfListings;

    const urlParams = new URLSearchParams(location.search);

    /* After getting the information we will set(change) the value of the startIndex of the url 
       (ie.. urlParams where we saved all the information of the queries) with the startIndex 
       variable where we saved the total number of listings.
    */

    urlParams.set("startIndex", startIndex);

    const searchQuery = urlParams.toString();

    const res = await fetch(
      `${SERVER_URL}/api/listing/getAllSearchListings?${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }

    setListingResults([...listingResults, ...data]);

    /* */
  };

  /* ************************************************************************************* */
  /* ********************************** useEffect() hooks ******************************** */
  /* ************************************************************************************* */

  useEffect(() => {
    /* */

    GetSearchListings();

    /* */
  }, [location.search]);

  /* ************************************************************************************* */
  /* **********************************    return    ************************************* */
  /* ************************************************************************************* */

  return (
    /* */

    <Wrapper>
      <div className="flex flex-col md:flex-row">
        {/* */}

        {/* ******************************************************************************* */}
        {/* In 1st part we will display all the input fields such as a search-field to search a 
            listing and checkboxes for selecting the type, offer, amenities, and a select box 
            for sorting. Where the user can filter out what listings he want and according to 
            the filter applied by the user we will display all the related listings that 
            matches with the filter applied.
        */}

        <div className="border-b-2 p-10 md:border-r-2 md:min-h-screen">
          {/* */}

          {/* Creating a form to search the listings according to the filter provided by the user
              ie... when the user will click(submit) this form then this form will be submitted
              and we will get all the listings that matches with the filter applied by the user 
              from our database and display in the web-page. 
          */}

          <form
            className="flex flex-col gap-8 font-semibold"
            onSubmit={SetSearchListings}
          >
            {/* */}

            {/******************************************************************* */}
            {/* Creating an Input field with type text for searching (searchTerm) */}

            <div className="flex items-center gap-2 text-3xl font-bold">
              {/* */}

              <label className="whitespace-nowrap mr-4 font-bold responsive-heading">
                Search Term :
              </label>

              <input
                type="text"
                id="searchTerm"
                value={sideBarData.searchTerm}
                onChange={change}
                placeholder="Search..."
                className="border rounded-lg p-3 w-full bg-slate-100"
              />

              {/* */}
            </div>

            {/***************************************************************** */}
            {/* Creating an Input fields with type checkbox to select the type of 
                listing ie. Sell, Rent, or Both Rent and Sell. 
            */}

            <div className="flex gap-2 flex-wrap items-center ">
              {/* */}

              <label className="text-3xl font-bold mr-4 responsive-heading">
                Type :
              </label>

              <div className="flex gap-2 text-2xl font-bold">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5 responsive-checkBox"
                  checked={sideBarData.type === "all"}
                  onChange={change}
                />
                <span className="responsive-heading1">Rent & Sell</span>
              </div>

              <div className="flex gap-2 text-2xl font-bold">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 responsive-checkBox"
                  checked={sideBarData.type === "rent"}
                  onChange={change}
                />
                <span className="responsive-heading1">Rent</span>
              </div>

              <div className="flex gap-2 text-2xl font-bold">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5 responsive-checkBox"
                  checked={sideBarData.type === "sell"}
                  onChange={change}
                />
                <span className="responsive-heading1">Sell</span>
              </div>

              {/* */}
            </div>

            {/****************************************************************** */}
            {/*  Creating an Input field with type checkbox to select the offer. */}

            <div className="flex gap-2 flex-wrap items-center">
              {/* */}

              <label className="text-3xl font-bold mr-4 responsive-heading">
                Offer :
              </label>

              <div className="flex gap-2 text-2xl font-bold">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 responsive-checkBox"
                  value={sideBarData.offer}
                  onChange={change}
                />
                <span className="responsive-heading1">Offer</span>
              </div>

              {/* */}
            </div>

            {/********************************************************************* */}
            {/* Creating an Input fields with type checkbox to select the amenities 
                ie. Parking or Furnished. 
            */}

            <div className="flex gap-2 flex-wrap items-center">
              {/* */}

              <label className="text-3xl font-bold mr-4 responsive-heading">
                Amenities :
              </label>

              <div className="flex gap-2 text-2xl font-bold">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 responsive-checkBox"
                  value={sideBarData.parking}
                  onChange={change}
                />
                <span className="responsive-heading1">Parking</span>
              </div>

              <div className="flex gap-2 text-2xl font-bold">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 responsive-checkBox"
                  value={sideBarData.furnished}
                  onChange={change}
                />
                <span className="responsive-heading1">Furnished</span>
              </div>

              {/* */}
            </div>

            {/*********************************************************************** */}
            {/* Creating a select field where we are providing many options and 
                according to the option selected by the user we will sort the listings.
            */}

            <div className="flex items-center gap-2">
              {/* */}

              <label className="text-3xl font-bold mr-4 responsive-heading">
                Sort :
              </label>

              <select
                id="sort_order"
                defaultValue={"created_at_desc"}
                onChange={change}
                className="border rounded-lg p-3 bg-slate-300 text-2xl font-bold responsive-heading1"
              >
                <option value={"regularPrice_desc"}>Price High To Low</option>
                <option value={"regularPrice_asc"}>Price Low To High</option>
                <option value={"createdAt_desc"}>Latest</option>
                <option value={"createdAt_asc"}>Oldest</option>
              </select>

              {/* */}
            </div>

            {/********************************************************************* */}
            {/* Creating a button and when this button will be click it will Search 
                all the listings according to the filter applied. 
            */}

            <button
              className="border text-white bg-slate-700 rounded-lg uppercase hover:opacity-95
              py-4 text-3xl responsive-button"
            >
              Search
            </button>

            {/* */}
          </form>

          {/* */}
        </div>

        {/* ***************************************************** */}
        {/* In 2nd part we will display all the listings results. */}

        <div
          className="flex-1 mt-[30px] ml-[50px] responsive-listings"
          style={{ textAlign: "center", display: "block" }}
        >
          {/* */}

          {/* ****************************************** */}
          {/* Giving a heading for the listings results. */}

          <h1 className="font-semibold p-5 uppercase border-b text-3xl">
            Listing Results
          </h1>

          {/* Displaying all listings that matches with the filter applied or matching with 
              search-keyword.
          */}

          <div className="p-7 flex flex-wrap gap-4">
            {/* */}

            {/* When we get the loading as true (ie. when the web-page is refreshing) then we 
                will display Loading...  
            */}

            {loading && (
              <p className="text-3xl font-bold text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {/* When we get the loading as false(ie. when the web-page is not refreshing) 
                and the length of the listingResults is 0. 
                ie.. when there is no listings for that filter applied or for that 
                search-keyword then we will display No Listings Found.  
            */}

            {!loading && listingResults.length === 0 && (
              <p className="text-3xl font-bold text-slate-700 ">
                No Listings Found
              </p>
            )}

            {/* When we get the loading as false(ie. when the web-page is not refreshing) and we 
                get the listingResults as true.
                ie.. when there is any listings available for that filter applied or for that 
                search-keyword then we will dynamically access the above listingResults array
                of the useState() hook using the map function and pass all its data's in the 
                listing parameter and we will display the ListingItems component and in this 
                ListingItems component we will pass the listing as props so that we can get 
                this listing(props) in the ListingItems component and with the help of this 
                listing(props) we can create some cards with the listings details and display 
                those listing cards  in this search-page when the filter applied or the 
                search-keyword matches.                
            */}

            {!loading &&
              listingResults &&
              listingResults.map((listing) => (
                <ListingItems key={listing._id} listing={listing} />
              ))}

            {/* */}
          </div>

          {/* When we get the showMore array as true ( and we will make the showMore as true 
              when more then 4 listings is present in our database) then we will show the 
              Show More button. At starting we will display only 4 listings and when the user 
              will click on that Show More button we will display another 4 listings and so on 
              upto the listings exists.
          */}

          {showMore && (
            <div
              style={{
                textAlign: "center",
                display: "block",
              }}
              onClick={ShowMoreListings}
            >
              <button
                className="text-3xl text-center uppercase bg-slate-400 text-[#294e1d] px-4 py-4 mb-[80px]
                w-[75%] rounded-lg font-bold hover:opacity-75 hover:underline mt-5 responsive-button1"
              >
                {loading ? "Loading please wait...." : "See more"}
              </button>
            </div>
          )}

          {/* */}
        </div>

        {/* */}
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
      font-weight: bold;
      font-size: 2rem;
      padding-bottom: 10px;
    }

    .responsive-heading1 {
      font-weight: bold;
      font-size: 1.8rem;
    }

    .responsive-checkBox {
      width: 40px;
    }

    .responsive-button {
      font-size: 2.1rem;
      padding: 12px;
    }

    .responsive-button1 {
      font-size: 2.6rem;
    }

    .responsive-listings {
      margin: auto;
    }

    /* */
  }

  /* */
`;
