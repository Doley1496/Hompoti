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

import { authActionTypes } from "./../Constants/action-types.jsx";

import axios from "axios";

/* *************************************************************************************** */
/* Functions for signing in the user's profile. */
/* *************************************************************************************** */

export const signInStart = () => {
  /* */

  return {
    type: authActionTypes.SIGN_IN_START,
  };

  /* */
};

export const signInSuccess = (userDetails) => {
  /* */

  return {
    type: authActionTypes.SIGN_IN_SUCCESS,
    payload: userDetails,
  };

  /* */
};

export const signInFailure = (errorMessage) => {
  /* */

  return {
    type: authActionTypes.SIGN_IN_FAILURE,
    payload: errorMessage,
  };

  /* */
};

/* *************************************************************************************** */
/* Functions for signing out the user's profile. */
/* *************************************************************************************** */

export const signOutUserStart = () => {
  /* */

  return {
    type: authActionTypes.SIGN_OUT_START,
  };

  /* */
};

export const signOutUserSuccess = (userDetails) => {
  /* */

  return {
    type: authActionTypes.SIGN_OUT_SUCCESS,
    payload: userDetails,
  };

  /* */
};

export const signOutUserFailure = (errorMessage) => {
  /* */

  return {
    type: authActionTypes.SIGN_OUT_FAILURE,
    payload: errorMessage,
  };

  /* */
};

/* *************************************************************************************** */
/* Functions for updating the user's profile. */
/* *************************************************************************************** */

export const updateUserStart = () => {
  /* */

  return {
    type: authActionTypes.UPDATE_USER_START,
  };

  /* */
};

export const updateUserSuccess = (userDetails) => {
  /* */

  return {
    type: authActionTypes.UPDATE_USER_SUCCESS,
    payload: userDetails,
  };

  /* */
};

export const updateUserFailure = (errorMessage) => {
  /* */

  return {
    type: authActionTypes.UPDATE_USER_FAILURE,
    payload: errorMessage,
  };

  /* */
};

/* *************************************************************************************** */
/* Functions for deleting the user's profile. */
/* *************************************************************************************** */

export const deleteUserStart = () => {
  /* */

  return {
    type: authActionTypes.DELETE_USER_START,
  };

  /* */
};

export const deleteUserSuccess = (userDetails) => {
  /* */

  return {
    type: authActionTypes.DELETE_USER_SUCCESS,
    payload: userDetails,
  };

  /* */
};

export const deleteUserFailure = (errorMessage) => {
  /* */

  return {
    type: authActionTypes.DELETE_USER_FAILURE,
    payload: errorMessage,
  };

  /* */
};

/* ****************************************************************************** */
/* Creating a function ie.. getAllUsers() to get all the users from our database. */
/* ****************************************************************************** */

export const getAllUsers =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    /* */

    try {
      /* */

      dispatch({ type: authActionTypes.ALL_USERS_REQUEST });

      let link = `import.meta.env.VITE_BASE_URL/api/user/getAllFilteredUsers?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(link);

      dispatch({
        type: authActionTypes.ALL_USERS_SUCCESS,
        payload: data,
      });

      /* */
    } catch (error) {
      /* */

      dispatch({
        type: authActionTypes.ALL_USERS_FAIL,
        payload: error.response.data.message,
      });

      /* */
    }
  };
