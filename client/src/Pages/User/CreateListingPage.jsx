/* */

import React, { useState } from "react";

import styled from "styled-components";

import Layout from "../../Components/Layout.jsx";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../../firebase.js";

let SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function ListingPage() {
  /* */

  /* Creating a variable for useNavigate(). */
  const navigate = useNavigate();

  /* Using useSelector() hook we are destructing (importing) currentUser from the 
     initial-state (ie. currentUser) of the userSlice variable using the global state user. 
  */

  const { currentUser } = useSelector((state) => state.user);

  /* Creating a useState() hook to hold the value of the files(images) to be uploaded and 
     passing its initial value an array (empty-array) because it can contain many files. 
  */

  const [files, setFiles] = useState([]);

  /* Creating a useState() hook to store the data's of the input field's of the create-listing page
     ex: url of the image,name,description etc.
  */

  const [Inputs, setInputs] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: "1",
    washrooms: "1",
    regularPrice: 10,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  /* Creating a useState() hook to store the error that can occur during uploading of the file 
     in the array say fileUploadError and passing the initial value as false.
  */

  const [fileUploadError, setFileUplaodError] = useState(false);

  /* Creating a useState() hook to store the boolean value of the uploading file.
     ie. when file is uploading we will set it to true that will display text as Loading... 
         in the upload button.
     And initially we will not upload any image therefore we will take the value as false.
  */

  const [uploading, setUploading] = useState(false);

  /* Creating a useState() hook to store the error in the array say error if any error occurs while 
     creating the listing and passing its initial value as false as initially there will be no errors.
  */
  const [error, setError] = useState(false);

  /* Creating a useState() hook to store the loading while creating the listing
     in the array say loading and passing its initial value as false as initially we will not load anything.
  */
  const [loading, setLoading] = useState(false);

  /* Creating a function with name change() and passing it in the onChange event of the name,description,
     address,checkboxes,regular-price and discount-price of create-listing page.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

  const change = (event) => {
    /* */

    /* In our models we have different types of fields such as number,text,textarea and boolean therefore 
       we will provide conditions for different fields.

        Using event.target we target a particular field.
    */

    /* If the type of the field is number or text or textarea then we will set the Inputs array with the previous
       information and we will set the id of a particular field with the value of that particular field.
    */
    if (
      event.target.type === "number" ||
      event.target.type === "text" ||
      event.target.type === "textarea"
    ) {
      setInputs({ ...Inputs, [event.target.id]: event.target.value });
    }

    /* If the id of the field is sell or rent then we will set the Inputs array with the previous
       information and we will set the type of the field with the id of that particular field.
       
       ie.. if the id of the field is equal to sell then type will be set to sell.
            if the id of the field is equal to rent then type will be set to rent. 
    */
    if (event.target.id === "sell" || event.target.id === "rent") {
      setInputs({ ...Inputs, type: event.target.id });
    }

    /* If the id of the field is parking or furnished or offer then we will set the Inputs array with 
       the previous information and we will set the id of the field with the checked of that particular field.
    */
    if (
      event.target.id === "parking" ||
      event.target.id === "furnished" ||
      event.target.id === "offer"
    ) {
      setInputs({ ...Inputs, [event.target.id]: event.target.checked });
    }

    /* */
  };

  /* Creating a function name storeImage() and passing(calling) it inside push function of the
     handleImageUpload() function.

     Inside this function we will return a new-promise which will contain the parameters resolve and reject
     so that we can resolve or reject if any errors occurs while uploading the files(images) because we will 
     have to wait for the images to be uploaded in our firebase-storage.
     
     And inside this return function we will:

      * 1st we will get the storage using a firebase method getStorage().
      * 2nd Create a unique file name.
      * 3rd create a storage-reference using a firebase method ref().
      * 4th create a upload-task using a firebase method uploadBytesResumable().
   
     Once we created a upload-task we will set the upload-task by uploadTask.on() and pass 
    "state_changed" and if any errors occurs we will reject that error and get the downloadUrl().
  */

  const storeImage = async (file) => {
    /* */

    return new Promise((resolve, reject) => {
      /* */

      /* Getting a storage using a firebase method getStorage() and we are passing app which is
         the variable where firebase is initialized and storing it in a variable say storage.     
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
         "state_changed" and a callback function passing the snapshot inside that function.
          Then we will get the error and then get the downloadUrl().
      */

      uploadTask.on(
        /* Here "state_changed" will track the changes and gives us a snapshot first which we will use to 
           create the progress and to set the percentage. Here we will upload more then one file. 
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

          // setFileUploadPercentage(Math.round(progress));

          console.log(`Upload is ${progress}% completed`);
        },

        /* If any errors occurs while uploading the file(image) we will reject that error. */
        (error) => {
          reject(error);
        },

        /* After rejecting the error we will get the Url.
           We will create a callback function and use a firebase method call getDownloadURL() and pass
           uploadTask.snapshot.ref inside it and if the upload is successful then we will get the 
           downloadURL. After getting the downloadURL we will resolve this downloadURL.
        */

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );

      /* */
    });
  };

  /* Creating a function name handleImageUpload() and passing(calling) it in the onClick event of the 
     upload button.  ie... when we will click on the Upload button then this function will get execute 
     and inside this function we have written the logic to upload all the files(images) of the properties 
     into our application.
  */

  const handleImageUpload = (event) => {
    /* */

    /* 1st we will check the number of files(images).
       If the number of files we want to upload for a particular property in our application is 
       greater then 0 and the number of files together with the previous url's is less then 7 then 
       only we will upload the files(images).
    */

    if (files.length > 0 && files.length + Inputs.imageUrl.length < 7) {
      /* */

      /* While uploading any image we want to show Loading... in the Upload button so we will set 
         the uploading array of the useState() hook as true. 
      */

      setUploading(true);

      /* At starting there will be no errors so we will set the file-upload-error array of the 
         useState() hook as false.
      */

      setFileUplaodError(false);

      /* We will create a empty array name promise because we are going to upload not only one image 
         but we want to upload more then one image so we will wait for all of them ie.. one by one 
         images should be uploded to the storage.
      */

      const promise = [];

      /* Then we will run a for loop from 0 to the length of the files and we will push all the 
         files(images) one by one in the empty promise array by using a function storeImage().
         In this function we will pass(upload) all the files(images) one by one for every iteration.
      */

      for (let i = 0; i < files.length; i++) {
        promise.push(storeImage(files[i]));
      }

      /* We will have to wait for all of the files(images) and this Promise will going to wait for every 
         files present in the promise array variable.
         ie.  Inside the promise we have all the files(images) which we got it from storeImage() function.

         And if we get all the promise's successfully then we will get the urls for each files(images).

    *    After getting the urls we will set the Inputs array with the previous information of the Inputs 
         array and we will set the imageUrl field with the previous urls and the new urls together using 
         concat() method because we don't want to replace everything we want to keep the previous images 
         inside the Inputs array.

    *    And we will set the file-upload-error array of the useState() hook as false because at starting 
         there will be no errors.

    *    And we will set the uploading array of the useState() hook as false because at starting 
         there will not upload image automatically.

         The previous url will be present in Inputs array's imageUrl field ie.. Inputs.imageUrl.

         Else we will catch the error and we will set the file-upload-error array with a message 
              as "Image upload failed (Max 2 MB size per image)" and we will also set the uploading 
              array of the useState() hook as false.
      */

      Promise.all(promise)
        .then((urls) => {
          /* */

          setInputs({ ...Inputs, imageUrl: Inputs.imageUrl.concat(urls) });

          setFileUplaodError(false);

          setUploading(false);
        })
        .catch((error) => {
          setFileUplaodError("Image upload failed (Max 5 MB size per image)");
        });

      /* When length is out of the range we will set the file-upload-error with a message
         ie..  "You can only upload 6 images per listing." and we will also set the uploading array of 
                the useState() hook as false because after uploading any image we don't want to show 
                Loading...
      */
    } else {
      /* */

      setFileUplaodError("You can only upload 6 images per listing.");

      setUploading(false);

      /* */
    }
  };

  /* Creating a function name handleImageDelete() and passing(calling) it in the onClick event of the 
     delete button of the image preview section below image-upload section.
     ie... when we will click on the Delete button then this function will get execute and inside this 
     function we have written the logic to delete that particular file(image) from the preview section. 
  */

  const handleUploadedImageDelete = (index) => {
    /* */

    /* 1st we will set the Inputs array by its setter function ie. setInputs() and we will pass all
       the previous data's of Inputs array and then we will filter the image-url's from the Inputs 
       array using the filter method.
       ie. we will remove(filter) the url that is present only in this current particular index.
       And we will keep the url's that doesn't match with the current particular index by simply 
       providing a condition ie.. currentUrl !== index  
    */

    setInputs({
      ...Inputs,
      imageUrl: Inputs.imageUrl.filter((_, url) => url !== index),
    });
  };

  /* Creating a function name handleCreateListing() and passing(calling) it in the onSubmit() event of the
     form. 
     ie.. when we will click on the Create Listing button then this function will get execute and inside 
     this function we have written the logic to create a new listing for that particular user. 
  */

  const handleCreateListing = async (event) => {
    /* */

    try {
      /* */

      /* Preventing the default refresh of the web page. */
      event.preventDefault();

      /* Giving some conditions to create a listing. */

      /* The user must upload atleast one image for creating a listing.
         So when the user tries to create a listing without uploading any image we will return an 
         error message using the setError() function.
      */

      if (Inputs.imageUrl.length < 1) {
        return setError("You must upload atleast one image");
      }

      /* The regularPrice should always be greater then the discoutPrice.
         So when the regularPrice is smaller then the discountPrice then we will return an error 
         message using the setError() function by adding + we can simply convert them to number.
      */

      if (+Inputs.regularPrice < +Inputs.discountPrice) {
        return setError("Discount price must be lower then the regular price");
      }

      /* Setting the error array of the useState() hook as false using the setError() function 
         because initially there will be no errors. 
      */

      setError(false);

      /*  Setting the loading array of the useState() hook as true using the setLoading() function 
          because when file is uploading we will display text as Loading... inside the upload button. 
      */

      setLoading(true);

      /* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user entered in the inputs fields such as its name,
         description address etc. to the back-end so that we can create a listing for that particular user.
         
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function 
        then it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */

      const res = await fetch(`${SERVER_URL}/api/listing/createListing`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        /* In body along with all the data's of the inputs fields of create-listing page we will also
           have to pass userRef because we need to know which user is creating the listing. 
        */

        body: JSON.stringify({
          ...Inputs,
          userRef: currentUser._id,
        }),

        credentials: "include",
      });

      /* After getting the response we will convert the response that we got into json format 
         and save it in a variable say data. 
      */

      const data = await res.json();

      /*  After converting the response into json format and saving it in the data variable we will
          set the loading array of the useState() hook as false using the setLoading() function 
          because after sending the request we will not show Loading... inside the upload button.  
      */

      setLoading(false);

      /* If we cannot successfully make an api call ie. when we will get success message as false 
         then we will set the error array of the useState() hook using setError() function with the
         message received from the data variable.
      */

      if (data.success === false) {
        /* */

        setError(data.message);

        toast.error("Your Listing is created");

        return;

        /* */
      }

      /* If we successfully make an api call (when we will get success message as true) 
         (ie. after successfully creating the listing) we will redirect the user to the 
         following route. 
      */

      navigate(`/listing/${data?._id}`);

      /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched and also we will set the 
         loading array of the useState() hook as false using the setLoading() function because if we 
         catch any error then we will not show Loading... in the upload button.
      */
    } catch (error) {
      /* */

      setError(error.message);

      setLoading(false);

      /* */
    }
  };

  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */
  /* ***************************************************************************************************** */

  /* Returning the content that we will display in the "/createListing" route.
     because for this route we have provide component {<ListingPage />}
     ie. <Route path="/createListing" element={<ListingPage />} /> 
  */

  return (
    /* */

    <Wrapper className="p-3 max-w-7xl mx-auto my-[40px] mb-[90px]">
      {/* */}

      <Layout title={"Create-Listing Page"}>
        {/* */}

        <h1 className="text-4xl font-bold text-center my-[40px] text-[#164416]">
          Create a Listing
        </h1>

        <form
          className="flex flex-col sm:flex-row gap-4"
          onSubmit={handleCreateListing}
        >
          {/* */}

          {/* *********************************** */}
          {/* Creating a section for input fields */}

          <div className="flex flex-col gap-4 flex-1 ">
            {/* */}

            {/* ********************************* */}
            {/* Creating an input field for name. */}

            <input
              type="text"
              placeholder="Enter Property Name"
              className="border py-6 pl-3 rounded-lg text-[#21525e] text-2xl font-bold responsive-input-text"
              id="name"
              maxLength="62"
              minLength="10"
              required
              onChange={change}
              value={Inputs.name}
            />

            {/* ******************************************* */}
            {/* Creating an textarea field for description. */}

            <textarea
              type="text"
              placeholder="Enter Property Description"
              className="border py-6 pl-3 rounded-lg text-[#21525e] text-2xl font-bold responsive-input-text"
              id="description"
              required
              onChange={change}
              value={Inputs.description}
            />

            {/* ************************************ */}
            {/* Creating an input field for address. */}

            <input
              type="text"
              placeholder="Enter Property Address"
              className="border py-6 pl-3 rounded-lg text-[#21525e] text-2xl font-bold responsive-input-text"
              id="address"
              required
              onChange={change}
              value={Inputs.address}
            />

            {/* */}

            {/* *********************************** */}
            {/* Creating checkboxes for Sell, Rent. */}

            <div className="flex gap-6 flex-wrap my-7">
              {/* */}

              <h1 className="text-green-700 font-bold uppercase text-[19px] responsive-heading">
                Purpose:
              </h1>

              {/* SELL */}

              <div className="flex gap-2 pl-10 mt-1">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5 h-8 border border-gray-300 rounded-lg text-2xl responsive-checkBox"
                  onChange={change}
                  /* This check-box will be checked only if the type of Inputs (ie.. Inputs.type) is equal 
                     to the string ie.. sell 
                  */
                  checked={Inputs.type === "sell"}
                />

                <span className="font-bold text-2xl responsive-heading-content">
                  Sell
                </span>
              </div>

              {/*RENT */}

              <div className="flex gap-2 mt-1">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-8 border border-gray-300 rounded-lg text-2xl responsive-checkBox"
                  onChange={change}
                  /* This check-box will be checked only if the type of Inputs (ie.. Inputs.type) is equal 
                     to the string ie.. rent
                  */
                  checked={Inputs.type === "rent"}
                />
                <span className="font-bold text-2xl responsive-heading-content">
                  Rent
                </span>
              </div>

              {/* */}
            </div>

            {/* ********************************************************** */}
            {/* Creating checkboxes for Parking spot, Furnished and offer. */}

            <div className="flex gap-2 flex-wrap mb-[30px]">
              {/* */}

              <h1 className="pr-5 text-green-700 font-bold text-[19px] uppercase responsive-heading">
                Facilities:
              </h1>

              <div className="flex gap-2 mr-3 mt-1">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5 h-8 border border-gray-300 rounded-lg text-2xl responsive-checkBox"
                  onChange={change}
                  /* This check-box will be checked only if the type of Inputs (ie.. Inputs.type) is equal 
                     to the string ie.. parking 
                  */
                  checked={Inputs.parking}
                />
                <span className="font-bold text-2xl responsive-heading-content">
                  Parking Spot
                </span>
              </div>

              <div className="flex gap-2 mr-3 mt-1">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5 h-8 border border-gray-300 rounded-lg text-2xl responsive-checkBox"
                  onChange={change}
                  /* This check-box will be checked only if the type of Inputs (ie.. Inputs.type) is equal 
                   to the string ie.. furnished 
                */
                  checked={Inputs.furnished}
                />
                <span className="font-bold text-2xl responsive-heading-content">
                  Furnished
                </span>
              </div>

              <div className="flex gap-2 mt-1 ml-[170px]">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5 h-8 border border-gray-300 rounded-lg text-2xl responsive-checkBox"
                  onChange={change}
                  /* This check-box will be checked only if the type of Inputs (ie.. Inputs.type) is equal 
                     to the string ie.. offer 
                  */
                  checked={Inputs.offer}
                />
                <span className="font-bold text-2xl responsive-heading-content">
                  Offer
                </span>
              </div>

              {/* */}
            </div>

            {/* *************************************************** */}
            {/* Creating an input field for bedrooms and washromms. */}

            <div className="flex gap-3 mb-3">
              {/* */}

              <h1 className="text-green-700 font-bold text-[19px] uppercase responsive-heading">
                Rooms Features:
              </h1>

              {/* *************************************************** */}
              {/* Creating an input field for bedrooms and washrooms. */}

              <div className="flex items-center gap-2">
                {/* */}

                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border font-bold text-2xl border-gray-300 rounded-lg responsive-input-text1"
                  onChange={change}
                  value={Inputs.bedrooms}
                />

                <p className="font-bold text-2xl responsive-heading-content">
                  Beds
                </p>

                {/* ************************************** */}
                {/* Creating an input field for washrooms. */}

                <input
                  type="number"
                  id="washrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border font-bold text-2xl border-gray-300 rounded-lg responsive-input-text1"
                  onChange={change}
                  value={Inputs.washrooms}
                />

                <p className="font-bold text-2xl responsive-heading-content">
                  Washrooms
                </p>

                {/* */}
              </div>

              {/* */}
            </div>

            {/* ************************************************************* */}
            {/* Creating an input field for regular-price and discount price. */}

            <div className="flex flex-col">
              {/* */}

              <div className="flex items-center gap-2 mb-3">
                {/* */}

                <h1 className="text-green-700 font-bold text-[19px] uppercase responsive-heading">
                  Regular Price:
                </h1>

                <input
                  type="number"
                  id="regularPrice"
                  min="8"
                  max="5000000000"
                  required
                  className="p-3 border border-gray-300 font-bold text-[14px] rounded-lg responsive-input-text1"
                  onChange={change}
                  value={Inputs.regularPrice}
                />

                {Inputs.type === "rent" ? (
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-2xl responsive-heading-content">
                      Regular Price
                    </p>
                    <span className="font-bold text-2xl responsive-heading-content">
                      (Rs/ month)
                    </span>
                  </div>
                ) : (
                  ""
                )}

                {/* */}
              </div>

              {/* ********************************************************************************** */}
              {/* Creating an input field for discount-price. We are providing a condition that when we
                  get the offer(ie.. when we select the offer) then only we will show the discount-price 
                  input field otherwise we will hide it. 
              */}

              {Inputs.offer && (
                <div className="flex items-center gap-2">
                  {/* */}

                  <h1 className="pr-5 text-green-700 font-bold text-[19px] uppercase responsive-heading">
                    Discount Price:
                  </h1>

                  <input
                    type="number"
                    id="discountPrice"
                    min="0"
                    max="50000000"
                    required
                    className="p-3 border border-gray-300 font-bold text-[14px] rounded-lg responsive-input-text1"
                    onChange={change}
                    value={Inputs.discountPrice}
                  />

                  {Inputs.type === "rent" ? (
                    <div className="flex flex-col items-center">
                      <p className="font-bold text-2xl responsive-heading-content">
                        Discount Price
                      </p>
                      <span className="font-bold text-2xl responsive-heading-content">
                        (Rs/ month)
                      </span>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* */}
                </div>
              )}

              {/* */}
            </div>

            {/* */}
          </div>

          {/* *********************************** */}
          {/* Creating a section for image-upload */}

          <div className="flex flex-col flex-1 gap-4 ml-[40px] responsive-image-upload-heading">
            {/* */}

            <p className="font-bold responsive-image-upload-heading1">
              <span className="font-bold text-3xl"> Images: </span>
              <span className="font-bold text-2xl text-gray-600 ml-2 responsive-image-upload-content">
                The first image will be the cover (max 6)
              </span>
            </p>

            {/* *************************************************************** */}
            {/* Creating an input field along with a button to upload an image. */}

            <div className="flex gap-4 responsive-upload-button">
              {/* */}

              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="p-3 border border-gray-300 rounded font-bold text-2xl responsive-image-upload-content"
                onChange={(event) => {
                  setFiles(event.target.files);
                }}
              />

              <button
                type="button"
                disabled={uploading}
                onClick={handleImageUpload}
                className="p-3 bg-green-700 border text-white rounded-lg uppercase hover:shadow-lg 
                disabled:opacity-80 w-[45%] text-[17px] font-bold responsive-upload-button1"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>

              {/* */}
            </div>

            {/* ************************************************************ */}
            {/* If any errors occurs we will display that error in red text. */}

            <p className="text-red-700 font-bold text-3xl">
              {fileUploadError && fileUploadError}
            </p>

            {/* If we have one or more then one image in our Inputs array then we will dynamically access only 
                the image-url's of the above Inputs array of the useState() using map function and pass all its 
                url's data's in the url parameter and index's in index parameter.
          
                And we will display all the images present in the Inputs array as preview before final creation
                and we will provide a delete button to delete a particular image if needed.
            */}

            {Inputs.imageUrl.length > 0 &&
              Inputs.imageUrl.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing-image"
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      handleUploadedImageDelete(index);
                    }}
                    className="text-red-700 p-3 uppercase rounded-lg font-bold hover:opacity-95 
                    disabled:opacity-80 text-2xl"
                  >
                    Delete
                  </button>
                </div>
              ))}

            {/* *********************************************** */}
            {/* Creating a button to create(save) the listings. */}

            <button
              disabled={loading || uploading}
              className="px-3 py-6 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 
              disabled:opacity-80 text-3xl font-bold mt-4 w-[100%] responsive-create-button"
            >
              {loading ? "Creating..." : "Create Listing"}
            </button>

            {/* ************************************************************ */}
            {/* If any errors occurs we will display that error in red text. */}

            <p className="text-red-700 text-3xl font-semibold">
              {error && error}
            </p>

            {/* */}
          </div>

          {/* */}
        </form>

        {/* */}
      </Layout>

      {/* */}
    </Wrapper>

    /* */
  );
}

/* **************************************************************************************** */
/* Using styled of styled-components we are styling the images ie.. the images to be display
   vertically and the seleced(click) image that is to be display horizontally and storing in   
   a variable Wrapper. This Wrapper will be use to wrap the whole elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  .grid-three-column {
    grid-template-columns: repeat(3, 2.7fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-input-text {
      font-size: 2rem;
      padding: 17px;
    }

    .responsive-input-text1 {
      font-size: 1.7rem;
    }

    .responsive-heading {
      font-size: 2rem;
      font-weight: bold;
    }

    .responsive-checkBox {
      height: 16px;
      width: 20px;
    }

    .responsive-heading-content {
      font-size: 1.8rem;
    }

    .responsive-image-upload-content {
      font-size: 1.8rem;
    }

    .responsive-image-upload-heading {
      padding-top: 17px;
      margin: auto;
    }

    .responsive-image-upload-heading1 {
      padding-bottom: 18px;
    }

    .responsive-create-button {
      margin: auto;
      margin-top: 17px;
      width: 100%;
    }

    .responsive-upload-button {
      display: flex;
      flex-direction: column;
    }

    .responsive-upload-button1 {
      width: 100%;
    }

    .responsive-gap {
      padding-left: -20px;
    }

    /* */
  }

  /* */
`;
