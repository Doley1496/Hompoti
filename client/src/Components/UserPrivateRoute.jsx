/* */

import React from "react";

import { useSelector } from "react-redux";

/* Importing the in-built components ie. Outlet and Navigate from react-router-dom. */
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  /* */

  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/signIn" />;

  /* */
}
