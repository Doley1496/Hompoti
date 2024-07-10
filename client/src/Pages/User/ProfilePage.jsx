/* */

import React, { useState, useEffect, useRef } from "react";

import Layout from "../../Components/Layout.jsx";

import PageNavigation from "../../Components/PageNavigation.jsx";

import styled from "styled-components";

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
} from "../../Redux/Actions/authActions.jsx";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { signOutUserSuccess } from "../../Redux/Actions/authActions.jsx";

import { Checkmark } from "react-checkmark";

import { CgSpinner } from "react-icons/cg";

let VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

let localStorageEmail = localStorage.getItem("email");

export default function ProfilePage() {
  /* */

  /* Creating a reference using inbuilt method useRef() of react and passing initial value as null. */
  const fileRef = useRef(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Inputs, setInputs] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [updatedMessage, setUpdatedMessage] = useState(false);

  const [deletedMessage, setDeletedMessage] = useState(false);

  const [file, setFile] = useState(undefined);

  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);

  const [Error, setError] = useState(false);

  const [emailLoading, setEmailLoading] = useState(false);

  const emailVerified = currentUser.emailVerified;

  const currentUserEmail = localStorageEmail;

  /* ************************************************************************************ */
  /* *****************************   FUNCTIONS              ***************************** */
  /* ************************************************************************************ */
  /* ************************************************************************************ */

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

  const handleDeleteUserAccount = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setLoading(true);

      dispatch(deleteUserStart());

      const res = await fetch(
        `${VITE_SERVER_URL}/api/user/delete-profile/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        if (data.statusCode === 401) {
          /* */

          setLoading(false);

          dispatch(signOutUserSuccess());

          localStorage.clear();

          alert(
            "Your cookie is mismatched. You are signing out of our account!"
          );

          toast.success("Successfully Logged Out");

          return;

          /* */
        } else {
          /* */

          setLoading(false);

          dispatch(deleteUserFailure(data.message));

          toast.error(data.message);

          return;

          /* */
        }

        /* */
      }

      setLoading(false);

      dispatch(deleteUserSuccess(data));

      setDeletedMessage(true);

      /* clearing the local-storage */
      localStorage.clear();

      navigate("/");

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      setLoading(false);

      dispatch(deleteUserFailure(error.message));

      console.log(error);

      /* */
    }

    /* */
  };

  const handleUpdateUserAccount = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setLoading(true);

      dispatch(updateUserStart());

      const res = await fetch(
        `${VITE_SERVER_URL}/api/user/update-profile/${currentUser._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Inputs),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success === false) {
        /* */

        if (data.statusCode === 401) {
          /* */

          setLoading(false);

          dispatch(signOutUserSuccess());

          localStorage.clear();

          alert(
            "Your cookie is mismatched. You are signing out of our account!"
          );

          toast.success("Successfully Logged Out");

          return;

          /* */
        } else {
          /* */

          setLoading(false);

          dispatch(updateUserFailure(data.message));

          toast.error(data.message);

          return;

          /* */
        }

        /* */
      }

      setLoading(false);

      dispatch(updateUserSuccess(data));

      setUpdatedMessage(true);

      toast.success("Your profile is updated successfully");

      /* Catching the error and dispatching it. */
    } catch (error) {
      /* */

      setLoading(false);

      dispatch(updateUserFailure(error.message));

      console.log(error);

      /* */
    }

    /* */
  };

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

    /* */
  };

  const sendVerificationMail = async (event) => {
    /* */

    try {
      /* */

      event.preventDefault();

      setEmailLoading(true);

      const res = await fetch(`${VITE_SERVER_URL}/api/auth/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUserEmail,
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success === false) {
        /* */

        toast.error(data.message);

        setEmailLoading(false);

        return;

        /* */
      }

      toast.success("Email verification link has been sent to your email id");

      setEmailLoading(false);

      /* Catching the error and dispatching it to the frontend. */
    } catch (error) {
      /* */

      console.log(error);

      toast.error("Something went wrong");

      /* */
    }

    /* */
  };

  /* ****************************************************************************************** */
  /* ********************************** useEffect() hooks ************************************* */
  /* ****************************************************************************************** */

  /* Creating an useEffect() hook and if there is an image(file) then we will call 
     handleProfilePhotoUpload() function and pass the file inside it to upload the file in initial
     time and passing the file in the array as dependencies.
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

  /* **************************************************************************************** */
  /* **************************************************************************************** */
  /* **************************************************************************************** */
  /* **************************************************************************************** */

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
          className="p-3 max-w-xl mx-auto mt-[40px]"
          style={{
            textAlign: "center",
            display: "block",
          }}
        >
          {/* */}

          {/* **************************************** */}
          {/* Creating a heading for the profile page. */}

          <h1
            className="text-[30px] font-sans font-bold my-4 uppercase text-[#a94c4c] 
            responsive-heading-profileName"
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

            <div className="">
              <input
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
                onChange={(event) => setFile(event.target.files[0])}
              />

              <h1
                className="text-2xl font-semibold font-sans text-[#F3E1C0] mt-3 text-center 
                responsive-heading"
              >
                My profile photo
              </h1>
            </div>

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

            <div className="">
              <input
                type="text"
                placeholder="Your First Name."
                onChange={change}
                id="firstName"
                className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
                defaultValue={currentUser.firstName}
              />
            </div>

            {/* ***************************************** */}
            {/* Creating an input field for the lastName. */}

            <div className="">
              <input
                type="text"
                placeholder="Your Last Name."
                onChange={change}
                id="lastName"
                className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
                defaultValue={currentUser.lastName}
              />
            </div>

            {/* ************************************** */}
            {/* Creating an input field for the email. */}

            <div className="flex">
              {/* */}

              <input
                type="email"
                id="email"
                placeholder="Enter Your Email."
                onChange={change}
                value={currentUser ? currentUser.email : Inputs.email}
                className="border bg-slate-600 text-white py-4 px-3 rounded-lg w-[100%] 
                responsive-login-form"
              />

              {emailVerified ? (
                /* */

                <div className="">
                  <span className="pl-3 pt-4">Verified </span>
                  <Checkmark size="30px" color="#223344" />
                </div>
              ) : (
                /* */

                <div className="pl-3">
                  {/* */}

                  <span className=""> Not Verified </span>

                  <button
                    onClick={sendVerificationMail}
                    className="bg-emerald-900 text-2xl font-semibold font-sans text-red-300 py-3 
                    rounded-lg uppercase hover:opacity-95 disabled:opacity-80 px-3 mx-auto w-[auto]
                    responsive-button "
                  >
                    {emailLoading && (
                      <CgSpinner
                        size={20}
                        className="mx-auto mb-2 animate-spin "
                      />
                    )}
                    Verify Email
                  </button>

                  {/* */}
                </div>

                /* */
              )}

              {/* */}
            </div>

            {/* ******************************************** */}
            {/* Creating an input field for the phoneNumber. */}

            {/* <div className="">
              <input
                type="number"
                placeholder="Enter Your Phone Number."
                onChange={change}
                id="phoneNumber"
                className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
                defaultValue={
                  currentUser.phoneNumber ? currentUser.phoneNumber : ""
                }
              />
            </div> */}

            {/* ***************************************** */}
            {/* Creating an input field for the password. */}

            <div className="">
              <input
                type="password"
                placeholder="Create Your Password"
                onChange={change}
                id="password"
                className="border p-3 py-4 mb-3 rounded-lg w-[100%]"
              />
            </div>

            {/* ***************************************************** */}
            {/* Creating a button to Update the user-profile details. */}

            <button
              className="bg-slate-700 text-white rounded-lg mb-5 uppercase hover:opacity-95
              disabled:opacity-80 w-[100%] text-[20px] mt-4 py-[18px] font-bold font-sans"
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
              className="text-red-700 cursor-pointer font-semibold font-sans hover:underline text-3xl 
              mt-[20px] responsive-delete-button"
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

          {/* */}
        </div>

        {/* */}
      </Layout>

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
      margin: 20px;
      font-size: 2.6rem;
    }

    .responsive-heading {
      font-size: 2rem;
    }

    .responsive-heading-profileName {
      font-size: 3rem;
    }

    /* */
  }

  /* */
`;
