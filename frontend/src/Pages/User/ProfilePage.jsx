/* */

import React, { useState, useEffect, useRef } from "react";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../../firebase.js";

import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../../Redux/ReduxStore.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ProfilePage() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Creating a variable for useDispatch(). */
  const dispatch = useDispatch();

  /* Creating a reference using inbuilt method useRef() of react and passing initial value as null. */
  const fileRef = useRef(null);

  /* Creating a useState() hook to hold the value of the inputs fields ie. form such as the profile-photo
     username email and password and passing its initial value as empty object because initilly its values
     will be empty.
  */

  const [Inputs, setInputs] = useState({});

  /* Using useSelector() hook we are destructing (importing) currentUser, loading and error from the 
     initial-state (ie. currentUser) of the userSlice variable using the global state user. 
  */

  const { currentUser, loading, error } = useSelector((state) => state.user);

  /* Creating a useState() hook to store the boolean value for the profile-updation in updatedMessage array.
     ie. when user's profile gets sucessfully updated we will set it true using its setUpdatedMessage()
     setter function and passing its initial value as false because initially we will not update the user.
  */

  const [updatedMessage, setUpdatedMessage] = useState(false);

  /* Creating a useState() hook to store the boolean value for the profile-deletion in deletedMessage array.
     ie. when user's profile gets sucessfully deleted we will set it true using its setDeletedMessage()
     setter function and passing its initial value as false because initially we will not delete the user.
  */

  const [deletedMessage, setDeletedMessage] = useState(false);

  /* Creating a useState() hook to store the file uploaded by the user in the file array and passing its 
     initial value as undefined because initially we will not upload any file.
  */

  const [file, setFile] = useState(undefined);

  /* Creating a useState() hook to store the percentage of the uploading file in the filePercentage array
     and passing its initial value as 0 because initially we will not upload any file.
  */

  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);

  /* Creating a useState() hook to store the boolean value in the Error array ie. The error that 
     can occur during any operations and passing its initial value as false because initially there 
     will be no errors.
  */

  const [Error, setError] = useState(false);

  /* ***************************************************************************************************** */
  /* ********************************          FUNCTIONS              ************************************ */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Creating a function with name change() and passing it in the onChange event of the email 
     and the password fields of the SignIn form.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

  const change = (event) => {
    /* */

    if (
      event.target.type === "text" ||
      event.target.type === "email" ||
      event.target.type === "password" ||
      event.target.type === "number"
    ) {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    if (event.target.type === "radio") {
      setInputs({ ...Inputs, [event.target.name]: event.target.value });
    }

    /* */
  };

  /* Creating a function name handleDeleteUser() and passing(calling) it in the onClick event of the 
     delete button. ie... when we will click on this delete button then this function will get execute and 
     inside this function we have written the logic to delete all the details of the user from our database.  
  */

  const handleDeleteUserAccount = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      /* Using dispatch() function we are calling the reducer function ie.. deleteUserStart() function
         created inside the userSlice variable.
      */
      dispatch(deleteUserStart());

      /* Sending a DELETE fetch request to the following route to delete a particular user on basis of 
         this particular id.
          
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then 
        it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values(such update,delete get.) etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(
        `${SERVER_URL}/api/user/delete-profile/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into json format
         and save it in a variable say data.
      */

      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then we will
         dispatch the reducer function ie.. deleteUserFailure() function created inside the userSlice variable
         and pass the failure message in it by using the dispatch() function and then simply return.
      */

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        toast.error(data.message);
        return;
      }

      /* Else if we successfully make an api call then we will dispatch the reducer function
         ie.. deleteUserSuccess() function created inside the userSlice variable and pass the data in it
         by using the dispatch() function and we will redirect(navigate) the user to the home-page.
      */

      dispatch(deleteUserSuccess(data));

      /* After dispatch we will set the deletedMesssage useState() hook as true. */
      setDeletedMessage(true);

      /* clearing the local-storage */
      localStorage.clear();

      /* After successful deletion we will redirect the user to the home-page. */
      navigate("/");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      dispatch(deleteUserFailure(error.message));

      /* */
    }

    /* */
  };

  /* Creating a function name handleUpdateUser() and passing(calling) it in the onSubmit event of the 
     update-form. ie... when we will click on the update button then this function will get execute and 
     inside this function we have written the logic to submit all the details provided in the update-form 
     to the backend to update the details of the user in our database.  
  */

  const handleUpdateUserAccount = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      /* Using dispatch() function we are calling the reducer function ie.. updateUserStart() function
         created inside the userSlice variable.
      */
      dispatch(updateUserStart());

      /* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user entered in the inputs fields such as its email,username
         and password to the back-end so that we can update the existing user and by default cookies are 
         blocked in the browser.
         
        The browsers will only expose the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then it 
        will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.
        
        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(
        `${SERVER_URL}/api/user/update-profile/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Inputs),
          credentials: "include",
        }
      );

      /* After getting the response we will convert the response that we got into json format
         and save it in a variable say data.
      */
      const data = await res.json();

      /* If we cannot successfully make an api call ie. when we will get success message as false then we will
         dispatch the reducer function ie.. updateUserFailure() function created inside the userSlice variable
         and pass the failure message in it by using the dispatch() function and then simply return.
      */
      if (data.success === false) {
        /* */

        dispatch(updateUserFailure(data.message));

        toast.error(data.message);

        return;

        /* */
      }

      /* Else if we successfully make an api call then we will dispatch the reducer function
         ie.. updateUserSuccess() function created inside the userSlice variable and pass the data in it
         by using the dispatch() function and we will redirect(navigate) the user to the home-page.
      */

      dispatch(updateUserSuccess(data));

      /* After dispatch we will set the successMesssage useState() hook as true. */
      setUpdatedMessage(true);

      toast.success("Your profile updated successfully");

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      /* Dispatching the reducer function ie.. updateUserFailure() function created inside the userSlice
         variable by using dispatch() function and passing the error message in it.
      */
      dispatch(updateUserFailure(error.message));

      /* */
    }

    /* */
  };

  /* We are creating a function with name handleFileUpload() and passing the file inside it.
      This function will have this things:
   * 1st we will get the storage using a firebase method getStorage().
   * 2nd Create a unique file name.
   * 3rd create a storage-reference using a firebase method ref().
   * 4th create a upload-task using a firebase method uploadBytesResumable().
   
     Once we created a upload-task we will set the upload-task by uploadTask.on() and pass 
    "state_changed" and snapshot inside uploadTask.on().
     Then we will get the error and then get the downloadUrl().
  */

  const handleProfilePhotoUpload = (file) => {
    /* */

    /* Getting a storage using a firebase method getStorage() and we are passing app 
       which is the variable where firebase is initialized and storing it in a variable say storage.     
    */
    const storage = getStorage(app);

    /* Creating an unique file name using current time of our computer along with file.name. */
    const fileName = new Date().getTime() + file.name;

    /* Creating a storage-reference to know in which particular place we will save the storage 
       using a firebase method ref() and we are passing the storage and fileName inside it and
       storing it in a variable say storageRef.
    */
    const storageRef = ref(storage, fileName);

    /* To see the percentage of the uploading file we are using a firebase method uploadBytesResumable() 
       and passing the storageRef and file and storing it in a variable say uploadTask.
    */
    const uploadTask = uploadBytesResumable(storageRef, file);

    /*  We can use this variable uploadTask to get the percentage and also the error.

        Once we created a upload-task we will set the upload-task by uploadTask.on() and pass 
       "state_changed" and a callback function with snapshot inside uploadTask.on().
        Then we will get the error and then get the downloadUrl().
    */
    uploadTask.on(
      /* Here "state_changed" will track the changes and gives us a snapshot first which we will use to 
         create the progress and to set the percentage.
      */
      "state_changed",
      /* snapshot is a peice of information from each state change and we can just record the progress
         which is the percentage of upload by just saying snapshot.bytesTransferred / snapshot.totalBytes
         and we will have to multiply by 100 to get the percentage because that is something between 0 to 1
      */
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        /* Then we will set the FileUploadPercentage with the progress variable where we have stored the
           percentage value of the uploading file. We will get the % in decimal form therefore we are 
           converting the % to the integer form using Math.round() method. 
        */
        setFileUploadPercentage(Math.round(progress));
      },

      /* If any errors occurs when uploading the file we will display it. */
      (error) => {
        setError(true);
      },

      /* After displaying the error we will get the Url.
         We will create a callback function and use a firebase method call getDownloadURL() and pass
         uploadTask.snapshot.ref inside it and if the upload is successful then we will get the 
         downloadURL and set the Inputs object with previous values of Inputs array and we will set
         the avatar to the downloadURL. 
      */
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs({ ...Inputs, avatar: downloadURL });
        });
      }
    );
  };

  /* ************************************************************************************************ */
  /* *************************************** useEffect() hooks ************************************** */
  /* ************************************************************************************************ */

  /* Creating an useEffect() hook and if there is an image(file) then we will call handleProfilePhotoUpload() 
     function and pass the file inside it to upload the file in initial time and passing the file in the
     array as dependencies.
  */

  useEffect(() => {
    /* */

    /* If there is an image(file) then we will call handleFileUpload() function. */

    if (file) {
      /* */

      handleProfilePhotoUpload(file);

      /* */
    }

    /* */
  }, [file]);

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/profile" route.
     because for this route we have provide component {<ProfilePage />}
     ie.   <Route path="/profile" element={<ProfilePage />} />
  */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="mt-[-100px] responsive-pagination">
        <PageNavigation title="Profile" />
      </div>

      <Layout title={"My-Profile-Page"}>
        {/* */}

        <div
          className="p-3 max-w-lg mx-auto mt-[40px]"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          {/* */}

          <ToastContainer className="text-2xl font-bold" />

          {/* **************************************** */}
          {/* Creating a heading for the profile page. */}

          <h1
            className="text-4xl font-sans font-bold m-7 mt-5 uppercase text-[#a94c4c]"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            My Profile
          </h1>

          {/* ************************************************************* */}
          {/* Creating a form to get the user details from the signIn page. */}

          <form
            className="flex flex-col gap-4 p-3 text-2xl rounded-lg bg-slate-500 w-[130%] 
            font-bold ml-[-40px] responsive-profile"
            onSubmit={handleUpdateUserAccount}
          >
            {/* */}

            {/* ********************************************************************************* */}
            {/* Creating an input field to choose an image from the storage and making it hidden. */}

            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(event) => setFile(event.target.files[0])}
            />

            {/* ************************************************* */}
            {/* Displaying the profile-image of the current user. */}

            <img
              /* When we get the currentUser we will display the currentUser's photo otherwise we will 
                 display the default profile-photo we set to every user. 
              */

              src={Inputs.avatar || currentUser.avatar}
              alt="profile-image"
              className="rounded-full h-[70px] w-[70px] object-cover cursor-pointer self-center m-2"
              /* We are connecting the input feild and the profile-image together so that when the user 
                 will click on the profile-photo he can choose an image from his storage.
                 And inorder to do that we have to use an in-built function ie.. useRef from react.
              */
              onClick={() => fileRef.current.click()}
            />

            {/* *****************************************************************/}
            {/* Creating a paragraph to show the image upload success or error. */}

            {/* While uploading the file:

                * If we get any error we will display Error Image Upload in red color.
                * If the uploading file percentage is between 0 to 100 then we will show how 
                  much % has been uploaded in silver color.
                * If the uploading file percentage is completed ie. becomes 100% then we will show 
                Image Successfully Uploaded in green color otherwise we will show an empty string.

            */}

            <p className="text-sm self-center">
              {Error ? (
                <span className="text-red-700 test-2xl">
                  Error Image Upload(image must be less then 2 MB)
                </span>
              ) : fileUploadPercentage > 0 && fileUploadPercentage < 100 ? (
                <span className="text-slate-700">{`Uploading ${fileUploadPercentage}%`}</span>
              ) : fileUploadPercentage === 100 ? (
                <span className="text-[#080B39] text-2xl">
                  Image Selected Successfully! Please click on update
                </span>
              ) : (
                ""
              )}
            </p>

            {/* ****************************************** */}
            {/* Creating an input field for the firstName. */}

            <input
              type="text"
              placeholder="Your First Name."
              onChange={change}
              id="firstName"
              className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
              defaultValue={currentUser.firstName}
            />

            {/* ***************************************** */}
            {/* Creating an input field for the lastName. */}

            <input
              type="text"
              placeholder="Your Last Name."
              onChange={change}
              id="lastName"
              className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
              defaultValue={currentUser.lastName}
            />

            {/* ************************************** */}
            {/* Creating an input field for the email. */}

            <input
              type="email"
              placeholder="Enter Your Email."
              onChange={change}
              id="email"
              className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
              defaultValue={currentUser.email}
            />

            {/* ************************************** */}
            {/* Creating an input field for the phone. */}

            <input
              type="number"
              placeholder="Enter Your Phone Number."
              onChange={change}
              id="phone"
              className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
              defaultValue={currentUser.phone ? currentUser.phone : ""}
            />

            {/* ***************************************** */}
            {/* Creating an input field for the password. */}

            <input
              type="password"
              placeholder="Enter Your Password"
              onChange={change}
              id="password"
              className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
            />

            {/* ***************************************************** */}
            {/* Creating a button to Update the user-profile details. */}

            <button
              disabled={loading}
              className="bg-slate-700 text-white rounded-lg p-3 mb-5 uppercase hover:opacity-95
              disabled:opacity-80 w-[100%] mt-4 py-4 font-bold"
            >
              {loading ? "Loading..." : "Update"}
            </button>

            {/* */}
          </form>

          {/* ************************************************ */}
          {/* Creating a button to delete the current account. */}

          <div
            className="flex justify-between mt-7 pb-5"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <button
              className="text-red-700 cursor-pointer font-bold hover:underline text-3xl responsive-delete-button"
              onClick={handleDeleteUserAccount}
            >
              Delete Account
            </button>
          </div>

          {/* **************************************************************************************** */}
          {/* If user is successfully updated then we will display a success message that its updated. */}

          <div
            className="text-3xl mt-4 ml-8 font-bold font-sans"
            style={{
              textAlign: "center",
              display: "block",
            }}
          >
            <p className="text-[#4ddd84] mb-4">
              {updatedMessage ? "User is updated successfully" : ""}
            </p>

            <p>
              {updatedMessage
                ? "After updating if you don't see the changes then Please! logout from your account and login again"
                : ""}
            </p>
          </div>

          {/* *************************************************************************************** */}
          {/* If user is successfully deleted then we will display a delete message that its deleted. */}

          <p className="text-red-700 text-3xl mt-3 ml-8 font-semibold">
            {deletedMessage ? "User is deleted successfully" : ""}
          </p>

          {/* ************************************************************ */}
          {/* If any errors occurs we will display that error in red text. */}

          <p className="text-red-700 text-3xl mt-3 ml-8">{error && error}</p>

          {/* */}
        </div>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling how to display the products in grid view
   and storing in a variable Wrapper. This Wrapper will be use to wrap the whole
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  padding: 9rem 0;

  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-pagination {
      margin-top: -80px;
    }

    .responsive-profile {
      font-size: 2rem;
      margin-left: -37px;
    }

    .responsive-delete-button {
      margin: auto;
      font-size: 2rem;
    }

    /* */
  }

  /* */
`;
