/* */

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

/* Importing in-built component Provider from react-redux.  */
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/* Importing component store from ./Redux/store.jsx.  */
import { store, persistor } from "./Redux/store.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
      />
    </PersistGate>
  </Provider>
);
