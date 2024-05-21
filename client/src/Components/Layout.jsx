/* */

import React from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

/* Creating a layout which will contain the same functionality for all the web pages. */
const Layout = ({ children, title, description, keywords, author }) => {
  /*  */
  return (
    <div>
      {/* Using react helmet for doing SEO in react js */}
      <Helmet>
        {/* HTML Meta tags helps us to do SEO */}

        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>

      {/* Displaying the Header component */}
      {/* <Header /> */}

      <main style={{ minHeight: "70vh" }}>
        {/* Using the Toaster component for notifications */}
        <Toaster />

        {/* This children will collect all the contents of a particular component where this layout 
            is used respectively.
            ie. Where this layout is used the layout will pass all the contents of that component in the
            children props.
         */}
        {children}
      </main>

      {/* Displaying the Footer component */}
      {/* <Footer /> */}
    </div>
  );
};

/* Creating a layout for doing SEO */
Layout.defaultProps = {
  title: "Ecommerce - App Shop Now",
  description: "Mern - Stack Project",
  keywords:
    "mern,react,mongodb,express,nodejs,web development,website ,website designing",
  author: "Doley",
};

export default Layout;
