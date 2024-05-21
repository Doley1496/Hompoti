/* */

import { authActionTypes } from "../Constants/action-types.jsx";

/* Defining the initial state. */
const initialState = {
  /* */

  currentUser: null,
  isLoggedIn: false,
  error: null,
  loading: false,

  all_filtered_users: [],
  usersCount: 0,
  resultPerPage: 0,
  filteredUsersCount: 0,

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

export const authReducer = (state = initialState, action) => {
  /* */

  switch (action.type) {
    /* */

    /* ********************************************************* */
    /* Creating reducers for the signIn-form to signIn the user. */
    /* ********************************************************* */

    case authActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload,
        error: null,
        loading: false,
      };

    case authActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload,
        loading: false,
      };

    /* *********************************************************** */
    /* Creating reducers for the profile page to signOut the user. */
    /* *********************************************************** */

    case authActionTypes.SIGN_OUT_START:
      return {
        ...state,
        loading: true,
      };

    case authActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
        error: null,
        loading: false,
      };

    case authActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        isLoggedIn: true,
        error: action.payload,
        loading: false,
      };

    /* ***************************************************************************** */
    /* Creating reducers for the profile page ie. to update the details of the user. */
    /* ***************************************************************************** */

    case authActionTypes.UPDATE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case authActionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        loading: false,
      };

    case authActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    /* ***************************************************************************** */
    /* Creating reducers for the profile page ie. to delete the details of the user. */
    /* ***************************************************************************** */

    case authActionTypes.DELETE_USER_START:
      return {
        ...state,
        loading: true,
      };

    case authActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
        loading: false,
      };

    case authActionTypes.DELETE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    /* ********************************************************** */
    /* Creating reducers for setting the filtered-user value's */
    /* ********************************************************** */

    case authActionTypes.ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        all_filtered_users: [],
      };

    case authActionTypes.ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        all_filtered_users: action.payload.AllUsers,
        usersCount: action.payload.usersCount,
        resultPerPage: action.payload.resultPerPage,
        filteredUsersCount: action.payload.filteredUsersCount,
      };

    case authActionTypes.ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;

    /* */
  }

  /* */
};
