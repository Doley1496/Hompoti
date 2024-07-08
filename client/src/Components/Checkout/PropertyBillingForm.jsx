/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Box, Button, Grid, TextField } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import AddressCard from "./AddressCard.jsx";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let userId = localStorage.getItem("id");

export default function PropertyBillingForm() {
  /* */

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [billingUserAddressLength, setBillingUserAddressLength] = useState("");

  const [billingUser, setBillingUser] = useState("");

  const [Inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
  });

  const addressLength = () => {
    /* */

    if (billingUser) {
      setBillingUserAddressLength(billingUser.length);
    }

    /* */
  };

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const createBillingAddress = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      if (billingUserAddressLength > 0) {
        /* */

        toast.error("You have already added your address");

        /* */
      } else {
        /* */

        setLoading(true);

        const res = await fetch(
          `${VITE_SERVER_URL}/api/address/create-billingAddress`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...Inputs,
              userId: userId,
            }),
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          if (data.statusCode === 401) {
            /* */

            setLoading(false);

            dispatch(signOutUserSuccess());

            localStorage.clear();

            alert(
              "Your cookie is mismatched. You are signing out of our account!"
            );

            toast.success("Successfully Logged Out");

            return;

            /* */
          } else {
            /* */

            toast.error(data.message);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        setLoading(false);

        navigate("/propertySummaryPage/?step=3");

        window.location.reload();

        /* */
      }

      /* */
    } catch (error) {
      /* */

      console.log(error);

      setLoading(false);

      toast.error("Something went wrong. Please try again later!");

      /* */
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

          if (data.statusCode === 401) {
            /* */

            setLoading(false);

            dispatch(signOutUserSuccess());

            localStorage.clear();

            alert(
              "Your cookie is mismatched. You are signing out of our account!"
            );

            toast.success("Successfully Logged Out");

            return;

            /* */
          } else {
            /* */

            toast.error(data.message);

            setLoading(false);

            return;

            /* */
          }

          /* */
        }

        setBillingUser(data);

        setLoading(false);

        /* */
      }

      /* Catching the error and displaying it. */
    } catch (error) {
      /* */

      toast.error("Something went wrong. Please try again later!");

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
  }, [billingUser]);

  /* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <Grid container spacing={4} className="mb-[60px]">
        {/* */}

        <Grid
          xs={12}
          lg={5}
          className="border rounded-md shadow-md h-[auto] my-[33px] py-[30px] responsive-address-height"
        >
          <div className="p-5 py-[40px] cursor-pointer">
            {/* */}

            <AddressCard />

            {billingUserAddressLength === 1 ? (
              <Link to={"/propertySummaryPage/?step=3"}>
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
                  Proceed to summary
                </Button>
              </Link>
            ) : (
              ""
            )}

            {/* */}
          </div>
        </Grid>

        <Grid item xs={12} lg={7} className="pb-[30px]">
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={createBillingAddress}>
              {/* */}

              <Grid container spacing={3}>
                {/* */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    inputProps={{
                      style: {
                        fontSize: 18,
                        fontWeight: "semibold",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    inputProps={{
                      style: { fontSize: 18, fontWeight: "semibold" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phone"
                    name="phone"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    inputProps={{
                      style: { fontSize: 18, fontWeight: "semibold" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Id"
                    required
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    inputProps={{
                      style: { fontSize: 18, fontWeight: "semibold" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Address"
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    multiline
                    rows={4}
                    inputProps={{
                      style: {
                        fontSize: 18,
                        fontWeight: "semibold",
                        paddingTop: 10,
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City / District"
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    inputProps={{
                      style: { fontSize: 18, fontWeight: "semibold" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State / Region"
                    fullWidth
                    autoComplete="given-name"
                    onChange={change}
                    inputProps={{
                      style: { fontSize: 18, fontWeight: "semibold" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="pincode"
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    onChange={change}
                    inputProps={{
                      style: { fontSize: 18, fontWeight: "semibold" },
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: "17px",
                        fontWeight: "bold",
                        "&.MuiOutlinedInput-notchedOutline": {
                          fontSize: "8px",
                        },
                      },
                    }}
                  />
                </Grid>

                <Button
                  size="large"
                  variant="contained"
                  type="submit"
                  sx={{
                    mt: 2,
                    ml: 3,
                    py: 2,
                    bgcolor: "RGB(145 85 83)",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Add Address Details
                </Button>

                {/* */}
              </Grid>

              {/* */}
            </form>
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

    .responsive-text-size {
      font-size: 3rem;
    }

    .responsive-address-height {
      height: auto;
    }

    /* */
  }

  /* */
`;
