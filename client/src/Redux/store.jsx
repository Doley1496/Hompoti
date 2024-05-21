/* */

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

import { authReducer } from "./Reducers/authReducer";

/* Using persistReducer of redux-persist to stored the user data in the local-storage so that 
   when user refresh the web-page its data is not lost.
*/

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducers = combineReducers({
  user: authReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

/* ************************************** */
/* We are Configuring the store of redux. */

export const store = configureStore({
  /* */

  reducer: persistedReducer,

  /* To prevent any errors in our browser we are using default middleware and setting 
     serializableCheck: false. 
  */
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  /* */
});

/* ********************************************************************************************* */
/* We are making the store persist by the help of persistStore and storing it in a variable called
   persistor and exporting it.
*/
export const persistor = persistStore(store);
