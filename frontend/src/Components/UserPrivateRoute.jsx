/* */

import React from "react";
import { useSelector } from "react-redux";

/* Importing the in-built components ie. Outlet and Navigate from react-router-dom. */
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  /* */

  /* Using useSelector() hook we are destructing (importing) currentUser from the initial-state
     (ie. currentUser) of the userSlice variable using the global state user. 
  */
  const { currentUser } = useSelector((state) => state.user);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* If we get the current-user then we will allow the user to go to the profile-page otherwise we will 
     redirect (navigate) the user to the signIn page.
  */
  return currentUser ? <Outlet /> : <Navigate to="/signIn" />;
}
