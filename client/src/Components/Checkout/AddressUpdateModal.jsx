/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { toast } from "react-toastify";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Box, Grid, TextField } from "@mui/material";

let userId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function AddressUpdateModal({
  modal,
  toggle,
  billingUser,
  addressId,
}) {
  /* */

  const [loading, setLoading] = useState(false);

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

  const change = (event) => {
    /* */

    setInputs({ ...Inputs, [event.target.id]: event.target.value });

    /* */
  };

  const updateBillingAddress = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setLoading(true);

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/address/update-billingAddress/${addressId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },

            body: JSON.stringify({
              ...Inputs,
              userId: userId,
            }),

            credentials: "include",
          }
        );

        const data = await res.json();

        setLoading(false);

        if (data.success === false) {
          /* */

          setError(data.message);

          toast.error(data.message);

          /* */
        } else {
          /* */

          toast.success("Your address is updated");

          setInputs("");

          /* Reloading the web-page. */
          window.location.reload();

          /* */
        }
      } else {
        /* */

        toast.error("Please login to update your address.");

        /* */
      }

      /* Catching the error and displaying it with a toast message. */
    } catch (error) {
      /* */

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  /* ************************************************************************************************ */
  /* **************************************  useEffect() hooks  ************************************* */
  /* ************************************************************************************************ */

  useEffect(() => {
    /* */

    setInputs({
      firstName: billingUser.firstName,
      lastName: billingUser.lastName,
      email: billingUser.email,
      phone: billingUser.phone,
      streetAddress: billingUser.streetAddress,
      city: billingUser.city,
      state: billingUser.state,
      pincode: billingUser.pincode,
    });

    /* */
  }, [billingUser]);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/todo-lists" route.
     when the Update button will be click.
  */

  return (
    /* */

    <Wrapper>
      <div className="bg-slate-700 mb-[60px]">
        {/* */}

        <Modal
          isOpen={modal}
          toggle={toggle}
          style={{ overflowY: "auto", height: "155vh" }}
        >
          {/* */}

          <ModalHeader
            toggle={toggle}
            className="responsive-heading"
            style={{
              fontSize: "30px",
              backgroundColor: "#F3E1C0",
              marginTop: "10px",
            }}
          >
            Update Your Todo List
          </ModalHeader>

          <ModalBody style={{ backgroundColor: "#955670" }}>
            {/* */}

            <Grid container spacing={4}>
              {/* */}

              <Grid item>
                <Box className="border rounded-lg shadow-md p-5">
                  <form className="">
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
                          defaultValue={billingUser.firstName || ""}
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
                          defaultValue={billingUser.lastName || ""}
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
                          id="phone"
                          name="phone"
                          label="Phone Number"
                          fullWidth
                          autoComplete="given-name"
                          onChange={change}
                          defaultValue={billingUser.phone || ""}
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
                          id="email"
                          name="email"
                          label="Email Id"
                          fullWidth
                          autoComplete="given-name"
                          onChange={change}
                          defaultValue={billingUser.email || ""}
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

                      <Grid item xs={12}>
                        <TextField
                          required
                          id="streetAddress"
                          name="streetAddress"
                          label="Address"
                          fullWidth
                          autoComplete="given-name"
                          onChange={change}
                          defaultValue={billingUser.streetAddress || ""}
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
                          defaultValue={billingUser.city || ""}
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
                          id="state"
                          name="state"
                          label="State / Region"
                          fullWidth
                          autoComplete="given-name"
                          onChange={change}
                          defaultValue={billingUser.state || ""}
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
                          id="pincode"
                          name="pincode"
                          label="Pincode"
                          fullWidth
                          onChange={change}
                          defaultValue={billingUser.pincode || ""}
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

                      {/* */}
                    </Grid>

                    {/* */}
                  </form>
                </Box>
              </Grid>

              {/* */}
            </Grid>

            {/* */}
          </ModalBody>

          <ModalFooter
            style={{
              backgroundColor: "#F3E1C0",
              marginBottom: "30px",
              marginTop: "10px",
              marginRight: "14px",
            }}
          >
            {/* */}

            <button
              disabled={loading}
              onClick={updateBillingAddress}
              className="responsive-text1"
              style={{
                backgroundColor: "#1e572f",
                color: "#f5e7e7",
                paddingLeft: "19px",
                paddingRight: "19px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <button
              onClick={toggle}
              className="responsive-text1"
              style={{
                backgroundColor: "#973333",
                color: "#f5e7e7",
                paddingLeft: "19px",
                paddingRight: "19px",
                paddingTop: "10px",
                paddingBottom: "10px",
                borderRadius: "4px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Close
            </button>

            {/* */}
          </ModalFooter>

          {/* */}
        </Modal>

        {/* */}
      </div>
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

    /* */
  }

  /* */
`;
