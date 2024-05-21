/* */

import React, { useState, useEffect } from "react";

import { styled } from "styled-components";

import { useNavigate } from "react-router-dom";

import ListingItems from "../Components/ListingItems.jsx";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Search() {
  /* */

  /* Creating a variable to initialize useNavigate() in-build hook of react router dom. */
  const navigate = useNavigate();

  /* Creating a useState() hook to hold the value of the inputs fields ie. search-form 
     such as the searchTerm, type, parking etc and passing all its initial value.
  */
  const [sideBarData, setSideBarData] = useState({
    searchTerm: " ",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  /* Creating a useState() hook to store the listings that the user will get after searching 
     in the listingResults array and passing its initial value an array (empty-array) because
     it can contain many listing results. 
  */
  const [listingResults, setListingResults] = useState([]);

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error 
     that can occur during any operations and passing its initial value as false because 
     initially there will be no errors.
  */
  const [error, setError] = useState(false);

  /* Creating a useState() hook to store the boolean value of the loading-effects in the loading 
     array and passing its initial value as false as initially we will not load anything.
  */
  const [loading, setLoading] = useState(false);

  /* Creating a useState() hook to store the boolean value for the showMore button ie.. when it 
     will be true we will show the Show More button otherwise we will hide it and passing its 
     initial value as false because initially we will show the Show More button when number of 
     listings is more then 9.
  */
  const [showMore, setShowMore] = useState(false);

  /* ***************************************************************************************** */
  /* ***************************          FUNCTIONS              ***************************** */
  /* ***************************************************************************************** */

  /* Creating a function with name change() and passing it in the onChange event of the 
     searchTerm, type, offer, parking etc of the SearchPage.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

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

  /* Creating a function name SetSearchListings() and passing(calling) it in the onSubmit 
     event of the Search-form ie... when we will click(submit) the Search button then this 
     function will get execute and inside this function we have written the logic to search 
     all the listings that matches with the filter applied by the user from our database and 
     display in the web-page. 
  */

  const SetSearchListings = (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      /* Getting the information of all the queries provided(available) in the url.
         We will get the information of the queries but we will not search those queries location.
      
         In order to get the information of queries (the searched information) we can use a method of 
         react call URLSearchParams() and inside this we will not pass window.location.search because now 
         we don't need to get the location of the queries ie. we will not search in what location all the 
         queries of the url is present. But later using useEffect() we will get the sideBar data 
         anytime the url changes. 

             ie......

        * When the user selects queries and search in the sideBar search-form then we will also add all
          the other remaining unselected queries as false with the selected queries.

        * When the user will search a particular keyword in the header search-form then we will add all 
          the previous queries along with that searched keyword if available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 

      */

      const urlParams = new URLSearchParams();

      /* After getting the information we will set(change) all the values of the input-fields 
         of the url (ie.. urlParams where we saved all the information of the queries) 
         with the sideBarData array

         Ex. 
             To set(change) the searchTerm of the url we can use sideBarData.searchTerm which 
             we provided in the value of the searchTerm input-field of the sideBar search-form.

         And Similarly we will set(change) the value for all the fields of the search-form.
      */

      urlParams.set("searchTerm", sideBarData.searchTerm);
      urlParams.set("type", sideBarData.type);
      urlParams.set("parking", sideBarData.parking);
      urlParams.set("furnished", sideBarData.furnished);
      urlParams.set("offer", sideBarData.offer);
      urlParams.set("sort", sideBarData.sort);
      urlParams.set("order", sideBarData.order);

      /* Then we will convert the url ( ie. urlParams where we saved all the information 
         of the queries) into string because some of them is number or other-things and 
         saved it in a variable say searchQuery.
      */

      const searchQuery = urlParams.toString();

      /* After creation of the searchQuery is done we will navigate to the following route */
      navigate(`/search?${searchQuery}`);

      /* Catching the error and setting the error array of the useState() hook using the 
         setError() function with the message that we received from the error we catched. 
      */
    } catch (error) {
      /* */

      setError(error.message);

      /* */
    }
  };

  /* Creating a function name GetSearchListings() and passing(calling) it in the useEffect()
     function so that in initial time we can get all the listings that matches with the 
     filter applied by the user and display in the web-page. 
  */

  const GetSearchListings = () => {
    /* */

    /* To get all the listings according to the search-term we will:
     
      * 1st getting the information of all the queries.
      * Then getting the values of all the input-fields from the url.
      * Then if we get the searchTerm, type, parking, furnished, offer, sort, order from 
        the url (ie.. urlParams) then we will set all the values of the input fields of 
        sideBarData array of the useState() hook using the setSideBarData() function.
  
       so that in initial time we get the searchTerm(search-keyword) in both the side-bar 
       search-box and the header search-box and passing location.search in the array as 
       dependencies because when the location.search changes (ie.. the searching location of 
       the keyword changes) then we will update our searchTerm with the keyword of the 
       search-form input-field.

               ie......

       When anything is changes in the url then we will get that changes automatically in the 
       sidebar search-form.
       And when anything is changes in the sidebar search-form then we will get that changes 
       automatically in the url.
       ie.. We can change from the url as well as from the search-form.

  */

    /* Getting the information of all the queries provided(available) in the url.
      
         In order to get this informaion (the searched information) we can use a method 
         of react call URLSearchParams() and inside this we will pass location.search 
         which will search in what location all the queries of the url is present.
    
             ie......
   
        * When the user selects queries and search in the sideBar search-form then we 
          will also add all the other remaining unselected queries as false with the 
          selected queries.

        * When the user will search a particular keyword in the header search-form then 
          we will add all the previous queries along with that searched keyword if 
          available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 
    */

    const urlParams = new URLSearchParams(location.search);

    /* Then we will get all the values of the input-fields from the url ( ie.. urlParams where
       we saved all the information of the queries) and saving it in different variables.
    */

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    /* Then if we get the searchTerm, type, parking, furnished, offer, sort, order from the 
       url (ie.. urlParams) then we will set all the values of the input fields of 
       sideBarData array of the useState() hook using the setSideBarData() function.
     
        ie..
     
          * If there is a change in searchTerm(search-box) ie.. if we get the searchTerm then we 
            will set the searchTerm with searchTermFromUrl otherwise we will set it to empty string " ".
     
          * If there is a change in type ie.. if we get the type then we will set the type with 
            typeFromUrl otherwise we will set it to "all".
     
          * If there is a change in parking ie.. if we get the parking as true from the url then we 
            will set the parking as true otherwise we will set the parking to false.
     
          * If there is a change in furnished ie.. if we get the furnished as true from the url then 
            we will set the furnished as true otherwise we will set the furnished to false.
             
          * If there is a change in offer ie.. if we get the offer as true from the url then we will 
            set the offer as true otherwise we will set the offer to false.
            
          * If there is a change in sort ie.. if we get the sort then we will set the sort with 
            sortFromUrl otherwise we will set it to "created_at".
     
          * If there is a change in order ie.. if we get the order then we will set the order with 
            orderFromUrl otherwise we will set it to "desc".
           
    */

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

    /* Calling the fetchAllListings() function. */
    fetchAllSearchListings();
  };

  /* Creating a function name fetchAllListings() and passing(calling) it in the useEffect() hook 
     so that in initial time we can get all the listings created by different owners in the 
     search-page.   
  */

  const fetchAllSearchListings = async () => {
    /* */

    try {
      /* */

      /*  Setting the loading array of the useState() hook as true using the setLoading() 
          function because in initial time using useEffect() hook we will display loading 
          effects ( ie.. display text as Loading... in the search-page ) 
      */
      setLoading(true);

      /* Then we will set the showMore array of the useState() hook as false using the 
         setShowMore() function because initially we will show the Show More button only when 
         number of listings is more then 7.
      */
      setShowMore(false);

      /* Getting the information of all the queries provided(available) in the url.
      
         In order to get this informaion (the searched information) we can use a method of react 
         call URLSearchParams() and inside this we will pass location.search which will search in 
         what location all the queries of the url is present.
    
             ie......
   
        * When the user selects queries and search in the sideBar search-form then we will also 
          add all the other remaining unselected queries as false with the selected queries.

        * When the user will search a particular keyword in the header search-form then we will 
          add all the previous queries along with that searched keyword if available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 
      */

      const urlParams = new URLSearchParams(location.search);

      /* Then we will convert the url ( ie. urlParams where we saved all the information of the
         queries) into string because some of them is number or other-type and then we will saved
         it in a variable say searchQuery.
      */
      const searchQuery = urlParams.toString();

      /* Sending a GET fetch request to the following route to get the listings of the user.
             
          The browsers will only expose(show) the response to the frontend JavaScript code if 
          the Access-Control-Allow-Credentials value is true.
          Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to 
          pass the credentials as "include" and when we will pass its value as true inside the 
          cors() function then it will expose the response to the frontend.
          After adding this only we will get the cookies,updated values etc.
             
          Credentials are cookies, authorization headers, or TLS client certificates.
      */
      const res = await fetch(
        `${SERVER_URL}/api/listing/getAllSearchListings?${searchQuery}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into the json 
         format and save it in a variable say data.
      */
      const data = await res.json();

      /* Ater fetching the listings if we get the total number of listings more then 3 
         (ie.. when length of the data is more then 3) then we will set the showMore array 
         of the useState() hook as true using the setShowMore() function because when the number
         of listings is more then 4 then we will show the Show More button. Else we will set it 
         to false (ie.. not show the Show More button).
         The length of the total number of listings cannot be greater then the limit.
         Ex: if limit = 8 then length should be less then the limit ie..  -> data.length > 7
      */

      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }

      /* After getting and converting the response into json format.
                   
          * We will set the listingResults array of the useState() hook using the setListingResults() 
            function with the data's of the data variable where we saved the response by converting 
            it into the json format.
             
          * When we get the data we need to set the loading to false because after getting the data
            we will not show Loading... in the listing page.
      */

      setListingResults(data);

      setLoading(false);

      /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched and also we will set 
         the loading array of the useState() hook as false using the setLoading() function because 
         if we catch any error then will not show Loading... in the listing page.
      */
    } catch (error) {
      /* */

      setError(error.message);

      setLoading(false);

      /* */
    }
  };

  /* Creating a function name ShowMoreListings() and passing(calling) it in the onClick() event 
     of the Show More button and when that button will be click then this function will get execute 
     and inside this function we have written the logic to get the next 4 listings created by 
     different owners in the search-page because at starting we have set to view 4 listings on 
     the search-page. 
  */

  const ShowMoreListings = async () => {
    /* */

    /* 1st we will find the total number of listings present in our database. */
    const numberOfListings = listingResults.length;

    /* Then we will find the starting-index ie. from where we will start showing the listings. */
    const startIndex = numberOfListings;

    /* Then we will get params because based on the previous params we want to fetch the data. */

    /* Getting the information of all the queries provided(available) in the url.
      
         In order to get this informaion (the searched information) we can use a method of react call 
         URLSearchParams() and inside this we will pass location.search which will search in what 
         location all the queries of the url is present.
    
             ie......
   
        * When the user selects queries and search in the sideBar search-form then we will also add all
          the other remaining unselected queries as false with the selected queries.

        * When the user will search a particular keyword in the header search-form then we will add all 
          the previous queries along with that searched keyword if available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 
    */

    const urlParams = new URLSearchParams(location.search);

    /* After getting the information we will set(change) the value of the startIndex of the url 
       (ie.. urlParams where we saved all the information of the queries) with the startIndex variable
       where we saved the total number of listings.
    */

    urlParams.set("startIndex", startIndex);

    /* Then we will convert the url ( ie. urlParams where we saved all the information of the queries) 
       into string because some of them is number or other-type and then we will saved it in a variable 
       say searchQuery.
    */

    const searchQuery = urlParams.toString();

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
      `${SERVER_URL}/api/listing/getAllSearchListings?${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    /* After getting the response we will convert the response that we got into the json format
       and save it in a variable say data.
    */
    const data = await res.json();

    /* When we get the total number of listings less then 4 (ie.. when length of the data is less then 4)
       then we will set the showMore array of the useState() hook as false using the setShowMore() function
       because when the number of listings is less then 4 then we will not show the Show More button. 

       If we make it true then Show More button will be displayed, but when there is no listings available
       in our database we will not show the Show More button.  
    */

    if (data.length < 9) {
      setShowMore(false);
    }

    /* After getting and converting the response into json format.
                   
       * We will set the listingResults array of the useState() hook using the setListingResults() function 
         with the previous data of the listingResults array and the previous data's of the data variable where
         we saved the response by converting it into the json format.
    */

    setListingResults([...listingResults, ...data]);

    /* */
  };

  /* *************************************************************************************** */
  /* ********************************** useEffect() hooks ********************************** */
  /* *************************************************************************************** */

  /* Creating an useEffect() hook and calling the GetSearchListings() function so that in 
     initial time we can get all the listings that matches with the search-term in this 
     particular page and passing location.search as dependencies because when the 
     location.search changes (ie.. the searching location of the keyword changes) then we 
     will update our searchTerm with the keyword of the search-form input-field.
  */

  useEffect(() => {
    /* */

    GetSearchListings();

    /* */
  }, [location.search]);

  /* ***************************************************************************** */
  /* *************************          return      ****************************** */
  /* ***************************************************************************** */

  /* Returning the content that we will display in the "/search" route.
     because for this route we have provide component {<SearchPage />}
     ie.   <Route path="/search" element={<SearchPage />} />
  */

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
