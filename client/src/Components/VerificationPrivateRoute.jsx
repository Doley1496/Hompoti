/* */

import React from "react";

import { useSelector } from "react-redux";

import { Outlet, Navigate } from "react-router-dom";

export default function VerificationPrivateRoute() {
  /* */

  const { verificationFailed } = useSelector((state) => state.others);

  return verificationFailed ? <Outlet /> : <Navigate to="/" />;

  /* */
}
