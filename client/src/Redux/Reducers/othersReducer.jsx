/* */

import {
  verificationActionTypes,
  billingActionTypes,
  listingsActionTypes,
} from "./../Constants/action-types";

/* Defining the initial state. */
const initialState = {
  /* */

  isLoggedIn: false,
  error: null,
  loading: false,

  billingUser: null,

  listing: null,

  verificationMessage: null,
  verificationFailed: false,

  /* */
};

/* Creating reducers for various functions. such as signInStart(), signInSuccess(),
     signInFailure(), signOutStart(), signOutSuccess(), signOutFailure() etc... 
  
  
     ...state = means we are taking the existing state(ie.. previous state).
     
     Action holds the data that we send in the action-function ie... the action-type and the
     data send in the payload. 
     And it will return the data according to the action-type ie.. the reducer function whose
     action-type matches with the action-type of the action function.
  */

export const othersReducer = (state = initialState, action) => {
  /* */

  switch (action.type) {
    /* */

    /* *************************************** */
    /* Creating reducers for the verification. */
    /* *************************************** */

    case verificationActionTypes.DOING_VERIFICATION_START:
      return {
        ...state,
        verificationMessage: action.payload,
        verificationFailed: true,
      };

    /* *********************************** */
    /* Creating reducers for the listings. */
    /* *********************************** */

    case listingsActionTypes.SET_LISTINGS_DETAILS:
      return {
        ...state,
        listing: action.payload,
      };

    /* *************************************** */
    /* Creating reducers for the billing-form. */
    /* *************************************** */

    case billingActionTypes.SET_BILLING_DETAILS:
      return {
        ...state,
        billingUser: action.payload,
      };

    case billingActionTypes.CREATE_BILLING_SUCCESS:
      return {
        ...state,
        billingUser: action.payload,
      };

    case billingActionTypes.CREATE_BILLING_FAILURE:
      return {
        ...state,
        billingUser: action.payload,
      };

    default:
      return state;

    /* */
  }

  /* */
};
