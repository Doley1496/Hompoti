/* */

import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";

import { Link, NavLink, useNavigate } from "react-router-dom";

import { FaTimes } from "react-icons/fa";

import { CiMenuFries } from "react-icons/ci";

import { FaSearch } from "react-icons/fa";

import { useSelector } from "react-redux";

import Dropdown from "./Dropdown.jsx";

function Header() {
  /* */

  const handleClick = () => {
    setClick(!click);
  };

  /* Creating a variable to initialize useNavigate(). */
  const navigate = useNavigate();

  /* Using useSelector() hook we are destructing (importing) currentUser from the initial-state
     (ie. currentUser) of the userSlice variable aimport function from './../Pages/All/ServicePage';
     and storing it in a variable. 
  */

  const { currentUser } = useSelector((state) => state.user);

  /* Creating an useState() hook to store the value(keyword) provided in the search field in the 
     searchTerm array and passing its initial value as empty string because initially there will be no 
     search keyword in the search field.
  */

  const [searchTerm, setSearchTerm] = useState("");

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error that 
     can occur during any operations and passing its initial value as false because initially there 
     will be no errors.
  */

  const [Error, setError] = useState(false);

  /* Creating a useState() hook to store the boolean value in the openProfile array 
     ie. When the user will click on the link we will set this false value to true which will display 
     the dropdown menu and passing its initial value as false because initially nobody will 
     click on the link.
  */

  const [openProfile, setOpenProfile] = useState(false);

  /* Creating a logic to hide the dropdown menu when the user click on any part of the page. */
  const menuRef = useRef();
  const imgRef = useRef();

  /* When the user will click outside any portion of the profile-pic then we will set the openProfile 
     array of the useState() hook using its setter function setOpenProfile() as false so that the 
     dropdown menu get's hidden immediately.
   
     To do that we will use useRef() hook of react.
   
     we will make two variable's menuRef and imgRef from useRef() hook and pass this varibles in the
     ref method of profile-pic and its Link tag.
  */

  window.addEventListener("click", (event) => {
    /* */

    if (event.target !== menuRef.current && event.target !== imgRef.current) {
      setOpenProfile(false);
    }

    /* */
  });

  const [click, setClick] = useState(false);

  const content = (
    /* */

    <>
      <div
        className={
          click
            ? `lg:hidden block absolute top-16 w-full left-0 right-0 bg-slate-900 
               transition mt-[43px] z-[10]`
            : `hidden`
        }
      >
        {/* */}

        <ul className="text-center text-xl p-20 ">
          {/* */}

          {/*************************  <!-- Dropdown menu --> ***************************/}

          {/* Creating a ternary operator, when we will get the currentUser ie. when the user is
              logged-in then we will display his profile-pic otherwise we will display the Login text.

              And when the user will click on his profile-pic then we will set the openProfile array 
              of the useState() hook as true by using its setter function setOpenProfile() so that we 
              can display the dropdown menu. 

              And when this openProfile array becomes true we will display the dropdown menu.
          */}

          <div className="pt-3 pb-4">
            {/* */}

            {openProfile && <Dropdown handleClick={handleClick} />}

            {localStorage.getItem("id") ? (
              <Link
                className="hover:text-slate-600 font-semibold text-white"
                onClick={() => setOpenProfile((previous) => !previous)}
                ref={menuRef}
              >
                <img
                  src={currentUser.avatar}
                  alt="profile"
                  className="rounded-full h-[50px] w-[50px] object-cover ml-5 responsive-dropdown"
                  ref={imgRef}
                />
              </Link>
            ) : (
              <Link
                to="/signIn"
                className="bg-slate-700 text-[#eb5077] rounded-lg uppercase hover:opacity-95
                disabled:opacity-80 w-[100%] font-sans text-[17px] font-bold hover:text-[#478C5C] 
                responsive-login-button"
                onClick={() => setClick(!click)}
              >
                LogIn
              </Link>
            )}

            {/* */}
          </div>

          <Link
            to="/"
            className=""
            spy="true"
            smooth="true"
            onClick={() => setClick(!click)}
          >
            <li
              className="my-4 py-4 border-b border-slate-800 hover:bg-800 hover:rounded font-bold
              responsive-content"
            >
              Home
            </li>
          </Link>

          <Link
            to="/about"
            className=""
            spy="true"
            smooth="true"
            onClick={() => setClick(!click)}
          >
            <li
              className="my-4 py-4 border-b border-slate-800 hover:bg-800 hover:rounded font-bold 
              responsive-content"
            >
              About
            </li>
          </Link>

          {/* */}
        </ul>

        {/* */}
      </div>
    </>

    /* */
  );

  /* Creating a function name SetSearchListings() and passing(calling) it in the onSubmit 
     event of the Search-form ie... when we will click(submit) the Search button then this 
     function will get execute and inside this function we have written the logic to search 
     all the listings that matches with the filter applied by the user from our database and 
     display in the web-page. 
  */

  const SetSearchListings = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      /* Getting the information of all the queries provided(available) in the url.
        
         In order to get this informaion (the searched information) we can use a method of 
         react call URLSearchParams() and inside this we will pass window.location.search which 
         will search in what location all the queries of the url is present.
      
               ie......
     
          * When the user selects queries and search in the sideBar search-form then we will 
            also add all the other remaining unselected queries as false with the selected queries.
  
          * When the user will search a particular keyword in the header search-form then we will 
            add all the previous queries along with that searched keyword if available in the url. 
  
           ie.. we will search the keyword along with those queries provided by the user. 
      */

      const urlParams = new URLSearchParams(window.location.search);

      /* After getting the information we will set(change) the searchTerm of the url ( ie. urlParams 
         where we saved all the information of the queries) with the searchTerm which we provided in 
         the value of the input field of the search-form of the header section.  
      */

      urlParams.set("searchTerm", searchTerm);

      /* Then we will convert the url ( ie. urlParams where we saved all the information of the queries) 
         into string because some of them is number or other-things and saved it in a variable say
         searchQuery.
      */

      const searchQuery = urlParams.toString();

      /* After everything is done we will navigate to the following route.  */
      navigate(`/search?${searchQuery}`);

      /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched. 
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

    /* To get listings according to the match search-term we will:
  
       
        * 1st getting the information of all the queries.
        * Then getting the searchTerm from the url.
        * Then if we get the searchTerm from the url we will set the searchTerm array.
    
         so that in initial time we get the searchTerm(search-keyword) in the header 
         search-box and passing location.search in the array as dependencies because when 
         the location.search changes (ie.. the searching location of the keyword changes)
         then we will update our searchTerm with the keyword of the search-form input field.
    */

    /* 1. Getting the information of all the queries provided in the url.
        
       In order to get this informaion (the searched information) we can use a method of react
       call URLSearchParams() and inside this we will pass location.search which will search 
       in what location all the queries of the url is present.
      
            ie......
  
        * When the user selects queries and search then we will also add all the other remaining 
          unselected queries as false with the selected queries.
  
        * When the user will search a particular keyword in the search field then we will also 
          add all the previous queries along with that searched keyword if available in the url. 
  
          ie.. we will search the keyword along with those queries provided by the user. 
    */

    const urlParams = new URLSearchParams(location.search);

    /* 2. Then we will get the searchTerm from the url ( ie.. urlParams where we saved all the 
          information of the queries) and saving it in a variable say searchTermFromUrl.
    */

    const searchTermFromUrl = urlParams.get("searchTerm");

    /* 3. If there is a change in searchTerm(search-box) ie.. if we get the searchTerm from the url 
          (ie.. urlParams) then we will set the searchTerm array of the useState() hook using the 
          setSearchTerm() function with the searchTermFromUrl varibale where we saved the searchTerm
          of the url.
    */

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

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

  return (
    /* */

    <Wrapper className="bg-slate-900">
      <div className="h-10vh flex justify-between z-50 text-white px-20 lg:py-[30px] py-[20px]">
        {/* */}

        {/* **************************************************************************************** */}
        {/* Creating a link with the company logo when click it will take us to go to the home-page. */}

        <div className="flex flex-1 items-center responsive-hompoti">
          <NavLink to="/">
            <h1 className="font-bold text-5xl border-2 border-gray-600 px-2 py-1">
              <span className="text-[#C9B1C6]">Hom</span>
              <span className="text-[#db587f]">poti</span>
            </h1>
          </NavLink>
        </div>

        {/* ******************************************************************************* */}
        {/* Creating a form to search the listings according to the search-keyword provided by 
            the user in the search-box of the header section.
            ie... when the user will click(submit) this form then this form will be submitted
            and we will get all the results related to the search input from our database 
            and display in the web-page. 
        */}

        <form
          className="bg-slate-200 p-3 rounded-lg flex items-center"
          onSubmit={SetSearchListings}
        >
          {/* */}

          {/* ************************************************************************************* */}
          {/* Creating an Input field with type text for search bar (ie. searching the searchTerm). */}

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-[75%] text-[#72435C] text-3xl font-bold responsive-search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          {/******************************************************************************** */}
          {/* Creating a button and inside this button we are using react-icons ie. FaSearch 
              to show a search icon and when the user will click on that icon it will search 
              the keyword entered in that input-field and give the results accordingly.
          */}

          <button>
            <FaSearch className="text-slate-600 text-3xl ml-[40px]" />
          </button>

          {/* */}
        </form>

        <div className="lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 text-[18px] mt-3">
              {/* */}

              <Link to="/" className="" spy="true" smooth="true">
                <li
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                  hover:border-fuchsia-600 cursor-pointer text-2xl font-bold"
                >
                  Home
                </li>
              </Link>

              <Link to="/about" className="" spy="true" smooth="true">
                <li
                  className="hover:text-fuchsia-600 transition border-b-2 border-slate-900
                 hover:border-fuchsia-600 cursor-pointer text-2xl font-bold"
                >
                  About
                </li>
              </Link>

              {/*************************  <!-- Dropdown menu --> ***************************/}

              {/* Creating a ternary operator, when we will get the currentUser ie. when the user is
                  logged-in then we will display his profile-pic otherwise we will display the Login text.

                  And when the user will click on his profile-pic then we will set the openProfile array 
                  of the useState() hook as true by using its setter function setOpenProfile() so that we 
                  can display the dropdown menu. 

                  And when this openProfile array becomes true we will display the dropdown menu.
              */}

              <div className="">
                {openProfile && <Dropdown />}

                {localStorage.getItem("id") ? (
                  <NavLink
                    className="hover:text-slate-600 font-semibold text-white"
                    onClick={() => setOpenProfile((previous) => !previous)}
                    ref={menuRef}
                  >
                    <img
                      src={currentUser.avatar}
                      alt="profile"
                      className="rounded-full h-[50px] w-[50px] object-cover ml-9 mr-[-20px] mt-[-10px]"
                      ref={imgRef}
                    />
                  </NavLink>
                ) : (
                  <li>
                    <NavLink to="/signIn">
                      <button
                        className="bg-slate-700 text-[#e24d72] rounded-lg uppercase hover:opacity-95
                        disabled:opacity-80 w-[100%] font-sans mt-[-5px] text-3xl font-bold
                      hover:text-[#478C5C] md:ml-8 md:py-3 md:px-4"
                      >
                        LogIn
                      </button>
                    </NavLink>
                  </li>
                )}
              </div>

              {/* */}
            </ul>
          </div>
        </div>

        {/* **************************************************************************** */}
        {/* When click will be true ie.. When user click on the <CiMenuFries /> react-icon 
            (ie.. menu icon) then we will show the contents present in the content variable. 
        */}

        <div>{click && content}</div>

        {/* ****************************************************************************************** */}
        {/* When click will be true ie.. When user click on the <CiMenuFries /> react-icon (ie.. menu icon) 
            then we will show the <FaTimes /> react-icon (ie.. close icon) otherwise we will show
            <CiMenuFries /> react-icon (ie.. menu icon).
        */}

        <button
          className="block sm:hidden transition responsive-button"
          onClick={() => setClick(!click)}
        >
          {click ? <FaTimes /> : <CiMenuFries />}
        </button>

        {/* */}
      </div>
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the images ie.. the images to be display
   vertically and the seleced(click) image that is to be display horizontally and storing 
   in a variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-dropdown {
      margin-left: 250px;
      margin-top: -40px;
    }

    .responsive-content {
      font-size: 2.6rem;
    }

    .responsive-button {
      font-size: 3rem;
      padding-left: 10px;
      margin-right: -20px;
    }

    .responsive-login-button {
      font-size: 2.5rem;
      padding: 10px;
      background-color: #14527c;
    }

    .responsive-hompoti {
      margin-right: 10px;
      margin-left: -20px;
    }

    /* */
  }

  /* */
`;

export default Header;
