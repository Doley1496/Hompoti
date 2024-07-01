/* */

/* In action component we create various functions, and inside this functions we provide
   a action-type in type key and we can also send value's in the payload when required.

   We use this action functions inside a dispatch() method.
   It holds the data if we send data in the action-function inside the dispatch() method.
      Ex: dispatch(signInSuccess(data));

   And we send this data in the payload along with the action-type because the reducer 
   function get's the data from the action-function.
   ie.. when we pass the action function inside the dispatch() method the dispatch() method
        calls the action method of the reducer-component and the action method returns that 
        data whose action-type matches with the action-type of the action function. 
*/

import {
  listingsActionTypes,
  verificationActionTypes,
  billingActionTypes,
} from "./../Constants/action-types";

/* ********************************************* */
/* Functions for doing verification of the user. */
/* ********************************************* */

export const doingVerificationStart = (verificationDetails) => {
  return {
    type: verificationActionTypes.DOING_VERIFICATION_START,
    payload: verificationDetails,
  };
};

export const setListingsDetails = (listingsDetails) => {
  return {
    type: listingsActionTypes.SET_LISTINGS_DETAILS,
    payload: listingsDetails,
  };
};

export const createBillingSuccess = (billingDetails) => {
  /* */

  return {
    type: billingActionTypes.CREATE_BILLING_SUCCESS,
    payload: billingDetails,
  };

  /* */
};

export const createBillingFailure = (errorMessage) => {
  /* */

  return {
    type: billingActionTypes.CREATE_BILLING_FAILURE,
    payload: errorMessage,
  };

  /* */
};

export const setBillingUserDetails = (billingsDetails) => {
  return {
    type: billingActionTypes.SET_BILLING_DETAILS,
    payload: billingsDetails,
  };
};
