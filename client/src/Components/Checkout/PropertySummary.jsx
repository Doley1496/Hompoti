/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Box, Button, Grid } from "@mui/material";

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import AddressCard from "./AddressCard.jsx";

import { toast } from "react-toastify";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let userId = localStorage.getItem("id");

export default function PropertySummary() {
  /* */

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [billingUserAddressLength, setBillingUserAddressLength] = useState("");

  const [billingUser, setBillingUser] = useState("");

  const addressLength = () => {
    /* */

    if (billingUser) {
      setBillingUserAddressLength(billingUser.length);
    }

    /* */
  };

  const getBillingAddress = async () => {
    /* */

    try {
      /* */

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/address/get-billingAddress/${userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          toast.error(data.message);

          setLoading(false);

          return;

          /* */
        }

        setBillingUser(data);

        setLoading(false);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong.");

      setLoading(false);

      /* */
    }

    /* */
  };

  /* ************************************************************************************** */
  /* ******************************** useEffect() hooks *********************************** */
  /* ************************************************************************************** */

  useEffect(() => {
    /* */

    addressLength();

    /* */
  }, [billingUserAddressLength, billingUser]);

  useEffect(() => {
    /* */

    getBillingAddress();

    /* */
  }, []);

  /* ***************************************************************************** */
  /* ***************************************************************************** */
  /* ***************************************************************************** */

  /* */
  return (
    /* */

    <Wrapper>
      {/* */}

      <Grid container spacing={4} className="mb-[60px]">
        {/* */}

        {/* ****************************** */}
        {/* Creating the address section : */}

        <Grid
          xs={12}
          lg={4}
          className="border rounded-md shadow-md h-[auto] mt-[33px] py-[30px] responsive-address-height"
        >
          <div className="p-5 py-[40px] border-b cursor-pointer">
            {/* */}

            <AddressCard />

            <div className="">
              {billingUserAddressLength === 1 ? (
                /* */

                <Link to={"/propertySummaryPage/?step=2"}>
                  <Button
                    sx={{
                      mt: 2,
                      mb: 10,
                      pb: 10,
                      ml: 10,
                      py: 1.5,
                      bgcolor: "RGB(145 85 253)",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Change Address
                  </Button>
                </Link>
              ) : (
                /* */

                <Link to={"/propertySummaryPage/?step=2"}>
                  <Button
                    sx={{
                      mt: 2,
                      mb: 10,
                      pb: 10,
                      ml: 10,
                      py: 1.5,
                      bgcolor: "RGB(145 85 253)",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Add new Address
                  </Button>
                </Link>

                /* */
              )}
            </div>

            {/* */}
          </div>
        </Grid>

        {/* ********************************** */}
        {/* Creating the order summary section */}

        <Grid item xs={12} lg={8} className="h-[auto]">
          <Box className="border rounded-s-md shadow-md">
            {/* */}

            {/* ********************************** */}
            {/* Creating the heading for the order */}

            {billingUserAddressLength === 1 ? (
              <div className="">
                {/* */}

                <p className="text-5xl font-bold my-[30px] pt-5 text-slate-700 font-serif text-center">
                  <span className="text-7xl">⁂</span>

                  <span> Hi {currentUser.firstName} </span>

                  <span className="text-7xl">⁂</span>
                </p>

                <h1
                  className="text-[21px] font-semibold font-sans my-[30px] pt-5 text-slate-700 text-center 
                  responsive-text "
                >
                  We will contact you regarding this respective deal very soon.
                </h1>

                <h1
                  className="text-[24px] font-semibold font-sans my-[30px] pt-5 text-[#478C5C] text-center 
                  responsive-text "
                >
                  Thanks for choosing Hompoti.
                </h1>

                <div className="pb-[60px]" style={{ textAlign: "center" }}>
                  <Link to="/">
                    <button
                      className="bg-slate-700 text-[19px] font-semibold font-sans text-white rounded-lg 
                      mt-4 uppercase hover:opacity-95 disabled:opacity-80 py-[16px] px-[25px] mb-4 w-[30%] 
                      responsive-button"
                    >
                      Go Back
                    </button>
                  </Link>
                </div>

                {/* */}
              </div>
            ) : (
              ""
            )}

            {/* */}
          </Box>
        </Grid>

        {/* */}
      </Grid>

      {/* */}
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

    .responsive-text {
      font-size: 19px;
      line-height: 1.7;
    }

    .responsive-button {
      font-size: 2.3rem;
      padding-top: 17px;
      padding-bottom: 17px;
      width: 75%;
    }

    .responsive-address-height {
      height: auto;
    }

    /* */
  }

  /* */
`;
