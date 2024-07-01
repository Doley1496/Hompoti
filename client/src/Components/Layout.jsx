/* */

import React from "react";

import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

/* Creating a layout which will contain the same functionality for all the web pages. */
const Layout = ({ children, title, description, keywords, author }) => {
  /*  */

  return (
    /* */

    <div>
      {/* Using react helmet for doing SEO in react js. HTML Meta tags helps us to do SEO */}

      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>

      <main style={{ minHeight: "70vh" }}>
        {/* */}

        {/* Using the Toaster component for notifications */}
        <Toaster />

        {/* This children will collect all the contents of a particular component where this layout 
            is used respectively.
            ie. Where this layout is used the layout will pass all the contents of that component in the
            children props.
         */}
        {children}

        {/* */}
      </main>

      {/* */}
    </div>

    /* */
  );

  /* */
};

/* Creating a layout for doing SEO */
Layout.defaultProps = {
  title: "Property-Dealing - App Buy Now",
  description: "Mern - Stack Project",
  keywords:
    "property,real-estate,housing,rent-property,sell-property,buy-property",
  author: "Doley",
};

export default Layout;
