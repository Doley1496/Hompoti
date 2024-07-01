/* */

/* Truncate will remove extra letters if we don't have enough space. */

/* To make a image little bigger when we hover over the image we can do that using. hover:scale-105 */

/* For type="commonjs" we have to export like this.
     module.exports = connectionUrl;
*/

{
  /* When we use defaultValue then we cannot give space between the quotes if we give 
                  then the placeholder's value will not be shown in the input field.
              */
}

/* Using useSelector() hook we are destructing (importing) currentUser, loading and error from the 
     initial-state (ie. currentUser) of the userSlice variable using the global state user. 
  */

const { currentUser, loading, error } = useSelector((state) => state.user);

/* Creating a useState() hook to hold the message of the textarea in the message array and passing its 
     initial value as empty string because initially we will not show any message to the user.
  */

const [message, setMessage] = useState("");

/* Creating a function with name change() and passing it in the onChange event of the textarea of the
     Contact lanlord section.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

const change = (event) => {
  /* */

  setMessage(event.target.value);

  /* */
};

/* Sending a GET fetch request to the following route to get the listings of the user.

          The browsers will only expose(show) the response to the frontend JavaScript code if the
          Access-Control-Allow-Credentials value is true.
          Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the
          credentials as "include" and when we will pass its value as true inside the cors() function then
          it will expose the response to the frontend.
          After adding this only we will get the cookies,updated values etc.

          Credentials are cookies, authorization headers, or TLS client certificates.
      */

/* Sending a POST fetch request to the following route to send the necessary information of the
         user that we will received from the user entered in the inputs fields such as its email 
         and password to the back-end so that we can SignIn the existing user 
         
        The browsers will only expose(show) the response to the frontend JavaScript code if the 
        Access-Control-Allow-Credentials value is true.
        Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to pass the 
        credentials as "include" and when we will pass its value as true inside the cors() function then 
        it will expose the response to the frontend. 
        After adding this only we will get the cookies,updated values etc.

        Credentials are cookies, authorization headers, or TLS client certificates.
      */
const res = await fetch(
  `${SERVER_URL}/api/auth/reset-password/${id}/${token}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Inputs),
    credentials: "include",
  }
);

/* After getting the response we will convert the response that we got into the json format
         and save it in a variable say data.
      */
const data = await res.json();

/* If we cannot successfully make an api call ie. when we will get success message as false then
           we will display a toast error message of the backend and simply return.
        */
if (data.success === false) {
  /* */

  toast.error(data.message);

  return;
}

/* After getting and converting the response into json format.
      
         * We will set the lanlord array of the useState() hook using the setLanlord() function with the 
           data's of the data variable where we saved the response by converting it into the json format.

         * We have to set error to false if everything is ok.

      */

setLanlord(data);

/* Returning the content that we will display in the  route.
     because for this route we have provide component {<ContactPage />}
     ie.. <Route path="" element={<ContactPage />} />
  */

return (
  /* */

  <Wrapper>
    {/* */}

    {/* */}
  </Wrapper>

  /* */
);

/* Creating a variable to initialize useNavigate(). */
const navigate = useNavigate();

/* Creating a variable for useDispatch(). */
const dispatch = useDispatch();

/* *************************************************************************************** */
/* Creating a function with name change() and passing it in the onChange event of the email 
       and the password fields of the SignIn form.
       onChange() event will temporarily save the data of the input fields.
          ie.. The onChange() event attribute fires the event when the element loses focus.
    */

const changes = (event) => {
  /* */

  setInputs({ ...Inputs, [event.target.id]: event.target.value });

  /* */
};

/* Creating an useState() hook to store the value(keyword) provided in the search field in the 
     searchTerm array and passing its initial value as empty string because initially there will be no 
     search keyword in the search field.
  */

const [searchTerm, setSearchTerm] = useState("");

/* Dispatching the reducer function ie.. signInFailure() function created inside the userSlice 
           variable by using dispatch() function and passing the error message in it.
        */
dispatch(signInFailure(data.message));

/* Else if we successfully make an api call then we will dispatch the reducer function 
         ie.. signInSuccess() function created inside the userSlice variable and pass the data in it by 
         using the dispatch() function and we will redirect(navigate) the user to the home-page.
      */
dispatch(signInSuccess(data));

/* Creating a function with name change() and passing it in the onChange event of the name,description,
     address,checkboxes,regular-price and discount-price of create-listing page.
     onChange() event will temporarily save the data of the input fields.
     ie.. The onChange() event attribute fires the event when the element loses focus.
  */

const changess = (event) => {
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

/* Creating a reference using inbuilt method useRef() of react and passing initial value as null. */
const fileRef = useRef(null);

const changesss = (event) => {
  /* */

  /* In our models we have different types of fields such as number, text, textarea and boolean 
       therefore we will provide conditions for different fields.
  
          Using event.target we target a particular field.
    */

  /* If the id of the field is sell, rent or all (both sell or rent) then we will set the sideBarData
       array of the useState() hook using the setSideBarData() function with the previous information of
       the sideBarData array and we will set the type of the field with the id of that particular field.
         
         ie.. if the id of the field is equal to all then type will be set to all(both rent and sell). 
              if the id of the field is equal to sell then type will be set to sell.
              if the id of the field is equal to rent then type will be set to rent. 
    */
  if (
    event.target.id === "all" ||
    event.target.id === "rent" ||
    event.target.id === "sell"
  ) {
    setSideBarData({ ...sideBarData, type: event.target.id });
  }

  /* If the id of the field is parking or furnished or offer then we will set the sideBarData array 
       of the useState() hook using the setSideBarData() function with the previous information present  
       in that array and we will set the id of the field with the boolean true value of checked event 
       of that particular field ie. event.target.checked.
       and if event.target.checked is equal to string true then we will set event.target.checked as true 
       otherwise we will set it as false.
    */
  if (
    event.target.id === "parking" ||
    event.target.id === "furnished" ||
    event.target.id === "offer"
  ) {
    setSideBarData({
      ...sideBarData,
      [event.target.id]:
        event.target.checked || event.target.checked === "true" ? true : false,
    });
  }

  /* If the id of the field is searchTerm then we will set the sideBarData array of the useState() hook
       using the setSideBarData() function with the previous information of the sideBarData array and we
       will set the searchTerm with the value of that particular field.
    */
  if (event.target.id === "searchTerm") {
    setSideBarData({ ...sideBarData, searchTerm: event.target.value });
  }

  /* If the id of the select field ( ie.. event.target.id ) is equal to sort_order we will :
       We have two things together( ie.. the sort and the order ) so we need to split it. 

      * 1st we will find the value for sort(sorting).
       
        If there is 1st value ( ie.. 0th position value) then we will split the first value with a 
        underline using the split() function. Otherwise if there is no first value we will provide sort 
        value with created_at (ie.. creation-time). ie.. we will sort according to creation-time.

      * 2nd we will find the value for order(in which we want to sort).
        
        If there is 2nd value( ie.. 1st position value) then we will split the second value with a 
        underline using the split() function. Otherwise if there is no second value we will provide order 
        value as desc (ie.. descending order). ie.. we will sort in descending order.

      * 3rd we will set the sideBarData array of the useState() hook using the setSideBarData() function 
        with the previous information of sideBarData array and we will also add the sort and the order.
    */
  if (event.target.id === "sort_order") {
    /* */

    const sort = event.target.value.split("_")[0] || "created_at";

    const order = event.target.value.split("_")[1] || "desc";

    setSideBarData({ ...sideBarData, sort, order });
  }

  /* */
};

const SetSearchListings = (event) => {
  /* */

  try {
    /* */

    event.preventDefault();

    /* Getting the information of all the queries provided(available) in the url.
         We will get the information of the queries but we will not search those queries location.
      
         In order to get the information of queries (the searched information) we can use a method of 
         react call URLSearchParams() and inside this we will not pass window.location.search because now 
         we don't need to get the location of the queries ie. we will not search in what location all the 
         queries of the url is present. But later using useEffect() we will get the sideBar data 
         anytime the url changes. 

             ie......

        * When the user selects queries and search in the sideBar search-form then we will also add all
          the other remaining unselected queries as false with the selected queries.

        * When the user will search a particular keyword in the header search-form then we will add all 
          the previous queries along with that searched keyword if available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 

      */

    const urlParams = new URLSearchParams();

    /* After getting the information we will set(change) all the values of the input-fields 
         of the url (ie.. urlParams where we saved all the information of the queries) 
         with the sideBarData array

         Ex. 
             To set(change) the searchTerm of the url we can use sideBarData.searchTerm which 
             we provided in the value of the searchTerm input-field of the sideBar search-form.

         And Similarly we will set(change) the value for all the fields of the search-form.
      */

    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("parking", sideBarData.parking);
    urlParams.set("furnished", sideBarData.furnished);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);

    /* Then we will convert the url ( ie. urlParams where we saved all the information 
         of the queries) into string because some of them is number or other-things and 
         saved it in a variable say searchQuery.
      */

    const searchQuery = urlParams.toString();

    /* After creation of the searchQuery is done we will navigate to the following route */
    navigate(`/search?${searchQuery}`);

    /* Catching the error and displaying it. */
  } catch (error) {
    /* */

    console.log(error);

    toast.error("Something went wrong");

    /* */
  }

  /* */
};

/* Creating a function name GetSearchListings() and passing(calling) it in the useEffect()
     function so that in initial time we can get all the listings that matches with the 
     filter applied by the user and display in the web-page. 
  */

const GetSearchListings = () => {
  /* */

  /* To get all the listings according to the search-term we will:
     
      * 1st getting the information of all the queries.
      * Then getting the values of all the input-fields from the url.
      * Then if we get the searchTerm, type, parking, furnished, offer, sort, order from 
        the url (ie.. urlParams) then we will set all the values of the input fields of 
        sideBarData array of the useState() hook using the setSideBarData() function.
  
       so that in initial time we get the searchTerm(search-keyword) in both the side-bar 
       search-box and the header search-box and passing location.search in the array as 
       dependencies because when the location.search changes (ie.. the searching location of 
       the keyword changes) then we will update our searchTerm with the keyword of the 
       search-form input-field.

               ie......

       When anything is changes in the url then we will get that changes automatically in the 
       sidebar search-form.
       And when anything is changes in the sidebar search-form then we will get that changes 
       automatically in the url.
       ie.. We can change from the url as well as from the search-form.

  */

  /* Getting the information of all the queries provided(available) in the url.
      
         In order to get this informaion (the searched information) we can use a method 
         of react call URLSearchParams() and inside this we will pass location.search 
         which will search in what location all the queries of the url is present.
    
             ie......
   
        * When the user selects queries and search in the sideBar search-form then we 
          will also add all the other remaining unselected queries as false with the 
          selected queries.

        * When the user will search a particular keyword in the header search-form then 
          we will add all the previous queries along with that searched keyword if 
          available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 
    */

  const urlParams = new URLSearchParams(location.search);

  /* Then we will get all the values of the input-fields from the url ( ie.. urlParams where
       we saved all the information of the queries) and saving it in different variables.
    */

  const searchTermFromUrl = urlParams.get("searchTerm");
  const typeFromUrl = urlParams.get("type");
  const parkingFromUrl = urlParams.get("parking");
  const furnishedFromUrl = urlParams.get("furnished");
  const offerFromUrl = urlParams.get("offer");
  const sortFromUrl = urlParams.get("sort");
  const orderFromUrl = urlParams.get("order");

  /* Then if we get the searchTerm, type, parking, furnished, offer, sort, order from the 
       url (ie.. urlParams) then we will set all the values of the input fields of 
       sideBarData array of the useState() hook using the setSideBarData() function.
     
        ie..
     
          * If there is a change in searchTerm(search-box) ie.. if we get the searchTerm then we 
            will set the searchTerm with searchTermFromUrl otherwise we will set it to empty string " ".
     
          * If there is a change in type ie.. if we get the type then we will set the type with 
            typeFromUrl otherwise we will set it to "all".
     
          * If there is a change in parking ie.. if we get the parking as true from the url then we 
            will set the parking as true otherwise we will set the parking to false.
     
          * If there is a change in furnished ie.. if we get the furnished as true from the url then 
            we will set the furnished as true otherwise we will set the furnished to false.
             
          * If there is a change in offer ie.. if we get the offer as true from the url then we will 
            set the offer as true otherwise we will set the offer to false.
            
          * If there is a change in sort ie.. if we get the sort then we will set the sort with 
            sortFromUrl otherwise we will set it to "created_at".
     
          * If there is a change in order ie.. if we get the order then we will set the order with 
            orderFromUrl otherwise we will set it to "desc".
           
    */

  if (
    searchTermFromUrl ||
    typeFromUrl ||
    parkingFromUrl ||
    furnishedFromUrl ||
    offerFromUrl ||
    sortFromUrl ||
    orderFromUrl
  ) {
    setSideBarData({
      searchTerm: searchTermFromUrl || " ",
      type: typeFromUrl || "all",
      parking: parkingFromUrl === "true" ? true : false,
      furnished: furnishedFromUrl === "true" ? true : false,
      offer: offerFromUrl === "true" ? true : false,
      sort: sortFromUrl || "created_at",
      order: orderFromUrl || "desc",
    });
  }

  /* Calling the fetchAllListings() function. */
  fetchAllSearchListings();
};

const fetchAllSearchListings = async () => {
  /* */

  try {
    /* */

    /*  Setting the loading array of the useState() hook as true using the setLoading() 
          function because in initial time using useEffect() hook we will display loading 
          effects ( ie.. display text as Loading... in the search-page ) 
      */
    setLoading(true);

    /* Then we will set the showMore array of the useState() hook as false using the 
         setShowMore() function because initially we will show the Show More button only when 
         number of listings is more then 7.
      */
    setShowMore(false);

    /* Getting the information of all the queries provided(available) in the url.
      
         In order to get this informaion (the searched information) we can use a method of react 
         call URLSearchParams() and inside this we will pass location.search which will search in 
         what location all the queries of the url is present.
    
             ie......
   
        * When the user selects queries and search in the sideBar search-form then we will also 
          add all the other remaining unselected queries as false with the selected queries.

        * When the user will search a particular keyword in the header search-form then we will 
          add all the previous queries along with that searched keyword if available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 
      */

    const urlParams = new URLSearchParams(location.search);

    /* Then we will convert the url ( ie. urlParams where we saved all the information of the
         queries) into string because some of them is number or other-type and then we will saved
         it in a variable say searchQuery.
      */
    const searchQuery = urlParams.toString();

    /* Sending a GET fetch request to the following route to get the listings of the user.
             
          The browsers will only expose(show) the response to the frontend JavaScript code if 
          the Access-Control-Allow-Credentials value is true.
          Therefore to set Access-Control-Allow-Credentials value as true 1st we will have to 
          pass the credentials as "include" and when we will pass its value as true inside the 
          cors() function then it will expose the response to the frontend.
          After adding this only we will get the cookies,updated values etc.
             
          Credentials are cookies, authorization headers, or TLS client certificates.
      */
    const res = await fetch(
      `${SERVER_URL}/api/listing/getAllSearchListings?${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    /* After getting the response we will convert the response that we got into the json 
         format and save it in a variable say data.
      */
    const data = await res.json();

    /* Ater fetching the listings if we get the total number of listings more then 3 
         (ie.. when length of the data is more then 3) then we will set the showMore array 
         of the useState() hook as true using the setShowMore() function because when the number
         of listings is more then 4 then we will show the Show More button. Else we will set it 
         to false (ie.. not show the Show More button).
         The length of the total number of listings cannot be greater then the limit.
         Ex: if limit = 8 then length should be less then the limit ie..  -> data.length > 7
      */

    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }

    /* After getting and converting the response into json format.
                   
          * We will set the listingResults array of the useState() hook using the setListingResults() 
            function with the data's of the data variable where we saved the response by converting 
            it into the json format.
             
          * When we get the data we need to set the loading to false because after getting the data
            we will not show Loading... in the listing page.
      */

    setListingResults(data);

    setLoading(false);

    /* Catching the error and setting the error array of the useState() hook using the setError() 
         function with the message that we received from the error we catched and also we will set 
         the loading array of the useState() hook as false using the setLoading() function because 
         if we catch any error then will not show Loading... in the listing page.
      */
  } catch (error) {
    /* */

    setError(error.message);

    setLoading(false);

    /* */
  }
};

/* Creating a function name SetSearchListings() and passing(calling) it in the onSubmit 
     event of the Search-form ie... when we will click(submit) the Search button then this 
     function will get execute and inside this function we have written the logic to search 
     all the listings that matches with the filter applied by the user from our database and 
     display in the web-page. 
  */

const SetSearchListing = async (event) => {
  /* */

  try {
    /* */

    /* Preventing the default refresh of the web page. */
    event.preventDefault();

    /* Getting the information of all the queries provided(available) in the url.
          
           In order to get this informaion (the searched information) we can use a method of 
           react call URLSearchParams() and inside this we will pass window.location.search which 
           will search in what location all the queries of the url is present.
        
                 ie......
       
            * When the user selects queries and search in the sideBar search-form then we will 
              also add all the other remaining unselected queries as false with the selected queries.
    
            * When the user will search a particular keyword in the header search-form then we will 
              add all the previous queries along with that searched keyword if available in the url. 
    
             ie.. we will search the keyword along with those queries provided by the user. 
        */

    const urlParams = new URLSearchParams(window.location.search);

    /* After getting the information we will set(change) the searchTerm of the url ( ie. urlParams 
           where we saved all the information of the queries) with the searchTerm which we provided in 
           the value of the input field of the search-form of the header section.  
        */

    urlParams.set("searchTerm", searchTerm);

    /* Then we will convert the url ( ie. urlParams where we saved all the information of the queries) 
           into string because some of them is number or other-things and saved it in a variable say
           searchQuery.
        */

    const searchQuery = urlParams.toString();

    /* After everything is done we will navigate to the following route.  */
    navigate(`/search?${searchQuery}`);

    /* Catching the error and dsplaying in the console. */
  } catch (error) {
    /* */

    setError(error.message);

    console.log(error);

    /* */
  }

  /* */
};

/* Creating a function name GetSearchListings() and passing(calling) it in the useEffect()
       function so that in initial time we can get all the listings that matches with the 
       filter applied by the user and display in the web-page. 
    */

const GetSearchListing = () => {
  /* */

  /* To get listings according to the match search-term we will:
    
         
          * 1st getting the information of all the queries.
          * Then getting the searchTerm from the url.
          * Then if we get the searchTerm from the url we will set the searchTerm array.
      
           so that in initial time we get the searchTerm(search-keyword) in the header 
           search-box and passing location.search in the array as dependencies because when 
           the location.search changes (ie.. the searching location of the keyword changes)
           then we will update our searchTerm with the keyword of the search-form input field.
      */

  /* 1. Getting the information of all the queries provided in the url.
          
         In order to get this informaion (the searched information) we can use a method of react
         call URLSearchParams() and inside this we will pass location.search which will search 
         in what location all the queries of the url is present.
        
              ie......
    
          * When the user selects queries and search then we will also add all the other remaining 
            unselected queries as false with the selected queries.
    
          * When the user will search a particular keyword in the search field then we will also 
            add all the previous queries along with that searched keyword if available in the url. 
    
            ie.. we will search the keyword along with those queries provided by the user. 
      */

  const urlParams = new URLSearchParams(location.search);

  /* 2. Then we will get the searchTerm from the url ( ie.. urlParams where we saved all the 
            information of the queries) and saving it in a variable say searchTermFromUrl.
      */

  const searchTermFromUrl = urlParams.get("searchTerm");

  /* 3. If there is a change in searchTerm(search-box) ie.. if we get the searchTerm from the url 
            (ie.. urlParams) then we will set the searchTerm array of the useState() hook using the 
            setSearchTerm() function with the searchTermFromUrl varibale where we saved the searchTerm
            of the url.
      */

  if (searchTermFromUrl) {
    setSearchTerm(searchTermFromUrl);
  }

  /* */
};

/* Getting the information of all the queries provided(available) in the url.
      
         In order to get this informaion (the searched information) we can use a method of react 
         call URLSearchParams() and inside this we will pass location.search which will search in 
         what location all the queries of the url is present.
    
             ie......
   
        * When the user selects queries and search in the sideBar search-form then we will also 
          add all the other remaining unselected queries as false with the selected queries.

        * When the user will search a particular keyword in the header search-form then we will 
          add all the previous queries along with that searched keyword if available in the url. 

         ie.. we will search the keyword along with those queries provided by the user. 
      */

const urlParams = new URLSearchParams(location.search);

/* Then we will convert the url ( ie. urlParams where we saved all the information of the
         queries) into string because some of them is number or other-type and then we will saved
         it in a variable say searchQuery.
      */
const searchQuery = urlParams.toString();

/* After getting the information we will set(change) the value of the startIndex of the url 
       (ie.. urlParams where we saved all the information of the queries) with the startIndex variable
       where we saved the total number of listings.
    */

urlParams.set("startIndex", startIndex);

/* Ater fetching the listings if we get the total number of listings more then 3 
         (ie.. when length of the data is more then 3) then we will set the showMore array 
         of the useState() hook as true using the setShowMore() function because when the number
         of listings is more then 4 then we will show the Show More button. Else we will set it 
         to false (ie.. not show the Show More button).
         The length of the total number of listings cannot be greater then the limit.
         Ex: if limit = 8 then length should be less then the limit ie..  -> data.length > 7
      */

if (data.length > 8) {
  setShowMore(true);
} else {
  setShowMore(false);
}

/* After getting and converting the response into json format.
                   
       * We will set the listingResults array of the useState() hook using the setListingResults() function 
         with the previous data of the listingResults array and the previous data's of the data variable where
         we saved the response by converting it into the json format.
    */

setListingResults([...listingResults, ...data]);

/* Creating a function with name handleShowPassword and passing it in the onClick event of the 
     password field of the register form.
     It will interchange its value.
     ie.  When we will click on the show-icon then it will display the hide-icon.
     And when we will click on the hide-icon then it will display the show-icon
  */

const handleShowPassword = () => {
  setShowPassword((previous) => !previous);
};

/* ******************************** 1: Testing the route ******************************** */

/* Creating a route(api endpoint) ie. /test and when this api endpoint will be call using axios 
   then the controller ie. testController will get execute and in this controller we have written 
   the logic to test our route.
*/
router.get("/test", testController);

/* ******************************** 2: Registering(SignUp) a new user ******************************** */

/* Creating a route(api endpoint) ie. /signUp and when this api endpoint will be call using 
   fetch/axios then the controller ie. SignUpController will get execute and inside this controller 
   we have written the logic how to register a new user.
*/
router.post("/signUp", SignUpController);

/* If we don't find the user ( ie. if user doesn't exist ) for that particular id then we will 
       return an error by passing the middleware function errorHandler() that we created in errorHandler.js 
       with a statusCode of 404 and message as "User not found" inside the next() function.
    */
if (!user) {
  return next(errorHandler(404, "User not found!"));
}

/*  If the user exist ie. if we get the user then we will destruct the password and the other 
          details of the user separately because we will not send the password to the user but only send
          the remaining details of the user.
          And we have to use ._doc because without it we cannot destruct the password (ie. remove the password).      
      */
const { passpord: passs, ...remainingDetails } = user._doc;

/* Then we will destruct the password and the other details of the user separately from the 
       validUser._doc because we will not send the password of the user we will only send other details
       of the user. And we have to use ._doc because without it we cannot destruct the details. 
    */
const { password: pass, ...remainingUserDetails } = validUser._doc;

/* After destructing the password and the other details of the user separately we will send a response
         with statusCode 200 and we will send all the remaining-details of the user in the json format to the 
         frontend so that everyone can see it. 
      */
res.status(200).json(remainingDetails);

/* new: true => will actually return and it will save the new information of this updated user
           replacing the previous one ie. it will give us the updated information(profile). 
           If we don't add this then we will get the previous information for our response.
        */
//  { new: true }

/* Then we will set(ie. update) all the changes made by the user in the input fields using $set:{} 
           method set is going to check, If the data is being changed then it will change that particular 
           data otherwise it will ignore that data. 
           We need to specify all of the fields individually so that user cannot send another information 
           that is not in the form.
        */

// {
//   $set: {
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//     phone: req.body.phoneNumber,
//     password: req.body.password,
//     avatar: req.body.avatar,
//   },
// },

/* We will create product listing by using the create() mongoose method on basis of req.body. */
const listing = await listingModel.create(req.body);

/* 1st we will find the listing of the user on basis of its id and we will get the id of the listing
       from req.params.id.
    */
const listings = await listingModel.findById(req.params.id);

export const getAllSearchListingsController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will create a limit using parseInt() method and we will pass the limit that we will
       get from the query  ie. from req.query.limit.
       And If there is no query for limit we will set the limit to 9. 

       Using this limit we can set how many listings we want to show per-page. 
    */

    const limit = parseInt(req.query.limit) || 9;

    /* 2nd we will create a startIndex using parseInt() method and we will pass the startIndex that we 
       will get from the query ie. from req.query.startIndex
       And If there is no query for startIndex we will set the startIndex to 0. 

       Using this startIndex we can set from which index(position) we will start showing the listings.
    */

    const startIndex = parseInt(req.query.startIndex) || 0;

    /* Now we will get all the queries such as offer, parking, furnished, type of listing, searchTerm
       sort, and order from req.query.
    */

    /* 1st we will get the query of offer from req.query.  ie. from req.query.offer

       When the offer is false or undefined we will set the offer inside the database to search for both 
       true and false condition because we want to show the listings with offers and no-offers.

       ie. When the user choose the offer then he will see only the listing with offers and when offer is 
           not selected the user will see all the listings the offered-listings and the noOffered-listings.
    */

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    /* 2nd we will get the query of furnished from req.query.  ie. from req.query.furnished

       When the furnished is false or undefined we will set the furnished inside the database to search for
       both true and false condition because we want to show the listings with furnished and non-furnished.

       ie. When the user choose the furnished option then he will see only the listing with furnished facilities
           and when furnished option is not selected the user will see all the listings the furnished-listings 
           and the nonFurnished-listings.
    */

    let furnished = req.query.furnished;
    if (furnished === undefined || "false") {
      furnished = { $in: [true, false] };
    }

    /* 3rd we will get the query of parking from req.query.  ie. from req.query.parking

       When the parking is false or undefined we will set the parking inside the database to search for
       both true and false condition because we want to show the listings with parking and no-parking.

       ie. When the user choose the parking option then he will see only the listing with parking facilities
           and when parking option is not selected the user will see all the listings the parking-listings 
           and the nonParking-listings.
    */

    let parking = req.query.parking;
    if (parking === undefined || "false") {
      parking = { $in: [true, false] };
    }

    /* 4th we will get the query of type from req.query.  ie. from req.query.type

       When the type of the listing is all ( ie. if both rent and sell type option is selected )
       or undefined we will set the type inside the database to search for both sell and rent condition 
       because we want to show the listings with both sell and rent type.

       ie. When the user choose the sell&rent option then he will see all the listing which is listed
           for sell and the listed for rent.  
    */

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    /* 5th we will get the query of searchTerm from req.query ie. from req.query.searchTerm.
       And if we donot get the query of the searchTerm then we will set empty string for the searchTerm.
    */

    const searchTerm = req.query.searchTerm || "";

    /* 6th we will get the query of sort from req.query ie. from req.query.sort.
       And if we donot get the query of the sort then we will set the sort query with createdAt time.
    */

    const sort = req.query.sort || "createdAt";

    /* 7th we will get the query of order from req.query ie. from req.query.order.
       And if we donot get the query of the order then we will set the order query with desc(desending)
       ie. We will sort the listings in descending order of the created time the listing which created 
       recently will appear first.
    */

    const order = req.query.order || "desc";

    /* */

    /* 
    
      1. 1st we will find(search) the name, offer, furnished, parking, and type in our database.
      
        * To find we will use find() function of mongoDB.

          But to search the name in our database we will use regex.
          regex will search the keyword we provided in the search field in the entire section ie. here name
          ie.. regex is a search functionality for mongoDB.

          And we will provide an options i which will focus only on the alphabets it will not care whether 
          the searching keyword is in uppercase or lowercase alphabet and give the results accordingly.

        
      2. Then we will sort the search results using sort() funcion of mongoDB and pass the sort in an array as 
         key and order as its value. ie: [sort]:order so that all the results are sorted in a particular order.

      3. Then we will limit the search results using limit() function of mongoDB and pass the limit we created
         above.

      4. Then we will skip the startIndex using the skip() function of mongoDB.
         If the startIndex is 0 it will start from the beginning or if the startIndex is 1 then it will skip 
         the first nine results for us because we limit the search results to 9 by default.
    */

    const listings = await listingModel
      .find({
        name: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/* Before creating the user we will hashed the password of the user using hashSync method of bcryptjs. */
const hashedPassword = bcryptjs.hashSync(password, 10);

/* Checking the current logging user is a existing user or not in the users collection of our 
       Database using findOne() mongoose method on the basis of the user's email.
    */
const validUser = await userModel.findOne({ email });

/* If the user's email doesn't exists in our database ie. not registered then we will return an 
          error by passing the middleware function errorHandler() that we created in errorHandler.js
          with statusCode 404 and send a message that "Email not Registered! Please Register".
       */
if (!validUser) {
  return next(errorHandler(404, "Email Not Registered! Please Register"));
}

/* When user's email and password match then we will signIn the user :
          To signIn a user we have to ----

         * create a token
         * destruct its password and other remaining-details separately and
         * set the cookie and send a response status of 200 and the remaining details of the 
           user in the json format.
      
    */

/* We know using JWT we can create token which helps us in security similar to salting.
       Creating a token by using sign method of json-web-token(JWT) on basis of the user's id and
       the json-web-token secret key we created in .env file and providing expiry date for the token.

       The token number will be generated when the signIn is successful.

    */

const token = JWT.sign({ id: validUser._id }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

/* After destructing the password and the other details of the user separately we will set the cookie 
       with name "access_token" and its value will be the token we created using json-web-token and we will 
       set the httpOnly true so that no third party app can access our cookie ie.. to make our cookie more 
       secure and provide a time of 6-mins for the token to expire and we will send a response status of 200
       and the remaining details of the user in the json format to the frontend so that everyone can see it.
       
       { expire: 360000 + Date.now() } or { maxAge: 360000 } 

    */

res
  .cookie("access_token", token, { httpOnly: true })
  .status(200)
  .json(remainingUserDetails);

/* Generating a random password because in our model we gave password field as required and if we 
         donot provide a password then we will get an error.
         By signing up with google we don't actually get a password from google.
         Therefore we will generate a random password for the user and whenever the user wants to update 
         the password they can update their password.
     
         We are creating a unique password of 16 characters. 8 + 8 
         Using Math.random() we are generating a number and converting the number to string 
         Here. 36 means numbers from 0 to 9 and also letters from a-z ie. it will form a password with 
         random numbers and letters together and we will take only the last eight digits from both the 
         generated string (password) and formed a 16 digit characters.
      */

const generatePassword =
  Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

/* Before creating the user we will hashed the password of the user using hashSync method of bcryptjs. */
const hashedPasswords = bcryptjs.hashSync(generatePassword, 10);

/* The username should be connected not separated. So Inorder to get separated we need to:
              
           1st we will have to split the name with a space and 
           2nd we will join the name without a space and
           3rd we will convert them to lowercase 
           4th we will add some random numbers and letters at the end to make them unique and we will take
               only the last four digits of the generated string. 
        */

// username:
//   req.body.name.split(" ").join("").toLowerCase() +
//   Math.random().toString(36).slice(-4),

{
  /* Dynamically accessing the above userListings array of the useState() hook using map function 
                and passing all its data's in the listing parameter and inside the div we are creating two 
                links one link for the image and one for the image's-text and two buttons delete and edit button.
            */
}

{
  userListings.map((listing) => (
    /* */

    <div key={listing._id} className="border rounded-lg py-3 gap-4 mb-[30px]">
      {/* ********************************************************************************* */}
      {/* Creating a link to go the following route when the user will click on this particular 
                    image and we display only the 1st image amoung all the images.
                */}

      <div>
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrl[0]}
            alt="listing-image"
            className="rounded-lg"
            style={{ width: "100%", height: "240px" }}
          />
        </Link>
      </div>

      {/* ************************************ */}
      {/* Displaying the name of the listings. */}

      <div className="mt-4 responsive-text">
        <Link
          to={`/listing/${listing._id}`}
          className="text-slate-700 font-bold font-sans text-3xl text-center hover:underline truncate 
                    responsive-text"
        >
          <p>{listing.name}</p>
        </Link>
      </div>

      {/* ******************************************************************** */}
      {/* Creating Edit and Delete button to update or to delete the listings. */}

      <div
        className="font-bold mt-4"
        style={{ textAlign: "center", display: "block" }}
      >
        {/* */}

        <button
          className="text-red-700 uppercase text-2xl font-bold mr-6 responsive-text-button"
          onClick={() => deleteParticularListing(listing._id)}
        >
          Delete
        </button>

        <button className="text-green-700 uppercase text-2xl font-bold responsive-text-button">
          <Link to={`/dashboard/user/update-listing/${listing._id}`}>Edit</Link>
        </button>

        {/* */}
      </div>

      {/* */}
    </div>

    /* */
  ));
}

{
  /* If we have one or more then one image in our Inputs array then we will dynamically access 
            only 
                the image-url's of the above Inputs array of the useState() using map function 
                and pass all its 
                url's data's in the url parameter and index's in index parameter.
          
                And we will display all the images present in the Inputs array as preview before final creation
                and we will provide a delete button to delete a particular image if needed.
            */
}

{
  Inputs.imageUrl.length > 0 &&
    Inputs.imageUrl.map((url, index) => (
      <div key={url} className="flex justify-between p-3 border items-center">
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
          className="text-red-700 p-3 uppercase rounded-lg font-semibold font-sans
                    hover:opacity-95 disabled:opacity-80 text-2xl responsive-delete-button"
        >
          Delete
        </button>
      </div>
    ));
}

{
  /* ******************************  Share-Icon  ******************************************* */
}
{
  /* Using react-icons ie. Fa-Share we are showing a sharing icon and when we will click on that 
                icon we will copy the link of that page and we will display Link copied! text for 2 secs.

                       ie....

              * 1st we are using writeText() method of navigator.clipboard API we are writing text to the
                clipboard and passing window.location.href property.

                The window.location.href property is used to extract the current URL from a webpage. 
                The location object has three methods - assign(), replace(), and reload(). 
                The assign() and replace() methods are used to open a new URL on the web page.

              * We will set the copied array of the useState() hook as true using the setCopied() function 
                so that when we will click on the share icon we can copy the link of that page and display
                the Link copied! text.
          
              * Then we will set the display-time of the Link copied! text for 2 secs and will make the 
                copied array as false because we already copied the link of that page and after 2 secs we 
                don't want to show the Link copied! text.
          */
}

<div
  className="fixed top-[26%] right-[5%] z-10 border rounded-full w-14 h-14 flex justify-center 
            items-center bg-white cursor-pointer responsive-share-button"
>
  <FaShare
    className="text-[#F248B6] text-2xl"
    onClick={() => {
      /* */

      navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);

      /* */
    }}
  />
</div>;

/*

   1. Install firebase in the client-side by writing    ->   npm install firebase

   2. Then make a file ex. firebase.js and paste the firebase code from firebase.com as it is inside it.

   3. Then by importing inbuilt methods of firebase we can create many things according to our need.
        Ex: 
          To work with firebase storage we have to import from "firebase/storage"
          To work with firebase authentication we have to import from "firebase/auth"

   4. To use storage of firebase we have to do some changes in our firebase account such as.
        allow read;
        allow write: if 
        request.resource.size < 2 * 1024 * 1024 && 
        request.resource.contentType.matches("image/.*")
  
  5. Add domain name in the authentication -> settings -> Authorised domains -> add the domain 
     if using with a live domain.

*/

<div className="mb-[20px]">
  {/* */}

  {currentStep == 3 ? (
    /* */

    <div className="text-3xl">
      <h5 className="m-4 text-red-900 font-semibold font-sans">
        You don't have any billing details
      </h5>

      <h1 className="m-4 text-red-900 font-semibold font-sans">
        Please add your billing details by clicking on the below button
        <p className="text-4xl font-bold text-black text-center">↓</p>
      </h1>
    </div>
  ) : (
    /* */

    <div className="text-3xl">
      <p className="m-1 my-4 text-red-900 font-semibold font-sans">
        You don't have any billing details
      </p>

      <p className="m-1 text-red-900 font-semibold font-sans">
        Please add your billing details by filling up the form
      </p>
    </div>

    /* */
  )}

  {/* */}
</div>;
