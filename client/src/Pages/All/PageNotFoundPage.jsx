/* */

import React from "react";

import { Link } from "react-router-dom";

const PageNotFound = () => {
  /* */

  return (
    /* */

    <>
      <div className="flex justify-center m-5 p-3 gap-3">
        <h1 className="text-4xl">404 </h1>
        <h2 className="text-4xl"> Oops! Page Not Found</h2>
      </div>

      <div
        className="flex justify-center p-3 gap-3 bg-slate-700 text-white border 
        rounded-lg  hover:opacity-90 mb-60 uppercase w-40 mx-auto"
      >
        <Link to="/">Go Back</Link>
      </div>
    </>
  );

  /* */
};

export default PageNotFound;
