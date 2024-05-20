/* */

import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

/* ***************************************************************************************************** */
/* ****************************** 1. Creating the redux-slice. ***************************************** */
/* ***************************************************************************************************** */

/* Defining the initial state. */
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

/* We are creating a variable name userSlice for authentication ie. to know whether a particular 
   user exists in our database or not. 
   reducers are functions that should run when click.
*/
const userSlice = createSlice({
  name: "user",

  initialState,

  /* Creating some reducers. */
  reducers: {
    /* */

    /* Creating reducers for the signIn-form to signIn the user and action is the data that we
       will get from the database. 
    */

    /* Creating signInStart() function. */
    signInStart: (state) => {
      state.loading = true;
    },

    /* Creating signInSuccess() function. */
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    /* Creating signInFailure() function. */
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /* Creating reducers for the profile update-form ie. to update the details of the user 
       and action is the data that we will get from the database.   
    */

    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /* Creating reducers for the profile update-form ie. to delete the details of the user 
       and action is the data that we will get from the database.   
    */

    deleteUserStart: (state) => {
      state.loading = true;
    },

    deleteUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /* Creating reducers for the profile update-form ie. to signOut ie. logout the user from our 
       application and action is the data that we will get from the database.   
    */

    signOutUserStart: (state) => {
      state.loading = true;
    },

    signOutUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
      state.loading = false;
    },

    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

/* Exporting all the reducer functions present in the userSlice variable using its actions method. 
   ie.. userSlice.actions
*/
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

/* ***************************************************************************************************** */
/* ****************************** 2. Using redux-persist. ********************************************** */
/* ***************************************************************************************************** */

/* Using redux-persist to stored the user data in the local-storage so that when user refresh the web
   page its data is not lost.
*/

const rootReducer = combineReducers({ user: userSlice.reducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ***************************************************************************************************** */
/* ******************************* 3. Configuring the redux-store. ************************************* */
/* ***************************************************************************************************** */

/* We are Configuring the store of redux. */
export const reduxStore = configureStore({
  reducer: persistedReducer,

  /* To prevent any errors in our browser we are using default middleware and setting serializableCheck: false. */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

/* ***************************************************************************************************** */
/* We are making this reduxStore persist by the help of persistStore and storing it in a variable called
   persistor and exporting it.
*/
export const persistor = persistStore(reduxStore);
