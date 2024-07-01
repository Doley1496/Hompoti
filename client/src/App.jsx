/* */

/* Importing BrowserRouter, Routes, Route  from react-router-dom

   BrowserRouter will give access to the routes from anywhere outside this file.
   Routes will work like container where we can keep all our Route.
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyle } from "./GlobalStyle.jsx";
import { ThemeProvider } from "styled-components";

/* ALL PAGES : */

import HomePage from "./Pages/All/HomePage.jsx";
import AboutPage from "./Pages/All/AboutPage.jsx";
import ContactPage from "./Pages/All/ContactPage.jsx";
import PrivacyPolicyPage from "./Pages/All/PrivacyPolicyPage.jsx";
import TermsAndConditionsPage from "./Pages/All/TermsAndConditionsPage.jsx";
import PageNotFoundPage from "./Pages/All/PageNotFoundPage.jsx";
import FaqPage from "./Pages/All/FaqPage.jsx";
import ComplaintSuccessPage from "./Pages/All/ComplaintSuccessPage.jsx";
import EmailSubscriptionPage from "./Pages/All/EmailSubscriptionSuccessPage.jsx";

import SendLinkPage from "./Pages/All/SendLinkPage.jsx";
import ResetPasswordPage from "./Pages/All/ResetPasswordPage.jsx";

import ListingPage from "./Pages/All/ListingPage.jsx";
import SearchPage from "./Pages/All/SearchPage.jsx";

import PropertySummaryPage from "./Pages/All/PropertySummaryPage.jsx";

/* USER PAGES : */

import CreateListingPage from "./Pages/User/CreateListingPage.jsx";
import UpdateListingPage from "./Pages/User/UpdateListingPage.jsx";
import ShowListingsPage from "./Pages/User/ShowListingsPage.jsx";

import SignUpPage from "./Pages/User/SignUpPage.jsx";
import SignInPage from "./Pages/User/SignInPage.jsx";
import ProfilePage from "./Pages/User/ProfilePage.jsx";

import Header from "./Components/Header.jsx";
import Footer from "./Components/Footer.jsx";

import UserDashboardPage from "./Pages/User/UserDashboardPage.jsx";

import UserPrivateRoute from "./Components/UserPrivateRoute.jsx";
import PrivateRoute from "./Components/PrivateRoute";
import VerificationPrivateRoute from "./Components/VerificationPrivateRoute.jsx";

import VerificationPage from "./Pages/User/VerificationPage.jsx";
import MainVerificationPage from "./Pages/User/MainVerificationPage.jsx";

export default function App() {
  /* */

  const theme = {
    /* */

    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },

    /* */
  };

  return (
    /* */

    /* We will provide themeprovider to all the components and in its props ie.. theme
       we are passing the theme variable where we provided styling created(defined) above.
    */

    <ThemeProvider theme={theme}>
      {/* */}

      <BrowserRouter>
        {/* */}

        <GlobalStyle />

        <Header />

        <Routes>
          {/* */}

          {/* With the help of element we will show the components we want to show for different 
              web pages for different routes.
          */}

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />

          <Route path="/faq" element={<FaqPage />} />

          <Route
            path="/emailSubscription"
            element={<EmailSubscriptionPage />}
          />

          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/signIn" element={<SignInPage />} />

          <Route path="/listing/:listingId" element={<ListingPage />} />

          <Route path="/search" element={<SearchPage />} />

          <Route path="/sendLink" element={<SendLinkPage />} />

          <Route
            path="/reset-password/:id/:token"
            element={<ResetPasswordPage />}
          />

          {/* Means when all the above routes is not found then show this route(PageNotFound) */}
          <Route path="*" element={<PageNotFoundPage />} />

          {/* *********************************************************************** */}
          {/* ***********************  Private Route  ******************************* */}
          {/* *********************************************************************** */}

          <Route element={<PrivateRoute />}>
            {/* */}

            <Route
              path="/complaintSuccess"
              element={<ComplaintSuccessPage />}
            />

            <Route
              path="/propertySummaryPage"
              element={<PropertySummaryPage />}
            />

            {/* */}
          </Route>

          <Route element={<VerificationPrivateRoute />}>
            {/* */}

            <Route
              path="/verification/:message/:statusCode"
              element={<VerificationPage />}
            />

            <Route
              path="/verify-email/:userId/:token/:email"
              element={<MainVerificationPage />}
            />

            {/* */}
          </Route>

          {/* *********************************************************************** */}
          {/* ***********************  User Private Route  ************************** */}
          {/* *********************************************************************** */}

          {/* Creating a protected route to make the user's Dashboard component a private route.
              In the UserPrivateRoute page we have written a condition that when the user is 
              signIn then only we will allow the user to access this route's. Otherwise we will 
              navigate the user to the signIn page.
          */}

          <Route path="/dashboard" element={<UserPrivateRoute />}>
            {/* */}

            <Route path="user" element={<UserDashboardPage />} />

            <Route path="user/profile" element={<ProfilePage />} />

            <Route path="user/create-listing" element={<CreateListingPage />} />

            <Route
              path="user/update-listing/:listingId"
              element={<UpdateListingPage />}
            />

            <Route path="user/show-listing" element={<ShowListingsPage />} />

            {/* */}
          </Route>

          {/* */}
        </Routes>

        <Footer />

        {/* */}
      </BrowserRouter>

      {/* */}
    </ThemeProvider>

    /* */
  );

  /* */
}
