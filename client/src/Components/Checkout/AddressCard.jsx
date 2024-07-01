/* */

import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import AddressUpdateModal from "./AddressUpdateModal.jsx";

let userId = localStorage.getItem("id");

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function AddressCard() {
  /* */

  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);

  const currentStep = querySearch.get("step");

  const [billingUserAddressLength, setBillingUserAddressLength] = useState("");

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const [billingUser, setBillingUser] = useState("");

  const toggle = () => {
    /* */

    setModal(!modal);

    /* */
  };

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

  const deleteBillingAddress = async (addressId) => {
    /* */

    try {
      /* */

      if (userId) {
        /* */

        const res = await fetch(
          `${VITE_SERVER_URL}/api/address/delete-billingAddress/${addressId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userId,
            }),

            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success === false) {
          /* */

          toast.error(data.message);

          return;
        }

        toast.success("Your address is deleted");

        /* Reloading the web-page. */
        window.location.reload();

        /* */
      } else {
        /* */

        toast.error("Please! Login First");

        /* */
      }

      /* Catching the error and console logging it. */
    } catch (error) {
      /* */

      console.log(error);

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  /* ************************************************************************************** */
  /* ******************************** useEffect() hooks *********************************** */
  /* ************************************************************************************** */

  useEffect(() => {
    /* */

    getBillingAddress();

    /* */
  }, []);

  useEffect(() => {
    /* */

    addressLength();

    /* */
  }, [billingUserAddressLength, billingUser]);

  /* */
  return (
    /* */

    <Wrapper>
      {/* */}

      <h1 className="text-3xl m-4 responsive-heading">Your Billing Details</h1>

      {billingUserAddressLength === 1 ? (
        /* */

        <div className="space-y-3 font-sans font-semibold">
          {/* */}

          {billingUser?.map((billingUser, index) => {
            return (
              /* */

              <div key={index}>
                {/* */}

                <div className="grid gap-3 mt-4 mb-6 responsive-address-text">
                  {/* */}

                  <p className="font-semibold font-sans text-3xl uppercase">
                    {billingUser.firstName} {billingUser.lastName}
                  </p>

                  <p className="font-sans font-semibold">{billingUser.phone}</p>

                  <p className="font-sans font-semibold">{billingUser.email}</p>

                  <p className="font-sans font-semibold">
                    {billingUser.streetAddress}, {billingUser.pincode}
                  </p>

                  <p className="font-sans font-semibold">
                    {billingUser.city}, {billingUser.state}
                  </p>

                  {/* */}
                </div>

                {/* ****************************************** */}
                {/* Creating the update and the delete button. */}

                <div className="flex justify-around mt-[30px] mb-4">
                  {/* */}

                  <div
                    className="flex justify-center items-center px-2 py-1 cursor-pointer uppercase "
                    onClick={() => setModal(true)}
                  >
                    <MdEditSquare
                      className="font-bold text-3xl cursor-pointer hover:scale-105 transition-scale 
                     text-[#116530] responsive-icon"
                    />
                    <span className="text-2xl font-bold responsive-icon-text">
                      Update
                    </span>
                  </div>

                  <div
                    className="flex justify-center items-center px-2 py-1 cursor-pointer uppercase"
                    onClick={() => deleteBillingAddress(billingUser._id)}
                  >
                    <RiDeleteBin5Line
                      className="font-bold text-3xl cursor-pointer hover:scale-105 transition-scale
                    text-[#a83737] responsive-icon"
                    />

                    <span className="text-2xl font-bold responsive-icon-text">
                      Delete
                    </span>
                  </div>

                  {/* */}
                </div>

                <div className="">
                  <AddressUpdateModal
                    modal={modal}
                    toggle={toggle}
                    billingUser={billingUser}
                    addressId={billingUser._id}
                  />
                </div>

                {/* */}
              </div>

              /* */
            );
          })}

          {/* */}
        </div>
      ) : (
        ""
      )}

      {currentStep == 3 && billingUserAddressLength === 1 ? (
        /* */

        <div className="text-3xl">
          <h5 className="m-4 text-red-900 font-semibold font-sans">
            You can change your billing details by clicking on the below button
          </h5>

          <p className="text-4xl font-bold text-black text-center"> ↓ </p>
        </div>
      ) : (
        ""
      )}

      {currentStep == 3 && billingUserAddressLength != 1 ? (
        /* */

        <div className="text-3xl">
          <h5 className="m-4 text-red-900 font-semibold font-sans">
            You don't have any billing details
          </h5>

          <h1 className="m-4 text-red-900 font-semibold font-sans">
            Please add your billing details by clicking on the below button
            <p className="text-4xl font-bold text-black text-center">↓</p>
          </h1>
        </div>
      ) : (
        ""
      )}

      {currentStep == 2 && billingUserAddressLength != 1 ? (
        <div className="text-3xl">
          <p className="m-1 my-4 text-red-900 font-semibold font-sans">
            You don't have any billing details
          </p>

          <p className="m-1 text-red-900 font-semibold font-sans">
            Please add your billing details by filling up the form
          </p>
        </div>
      ) : (
        ""
      )}

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

    .responsive-heading {
      font-size: 2.4rem;
    }

    .responsive-address-text {
      font-size: 16px;
    }

    .responsive-address-height {
      height: auto;
    }

    .responsive-icon {
      font-size: 2.4rem;
    }

    .responsive-icon-text {
      font-size: 2rem;
    }

    /* */
  }

  /* */
`;
