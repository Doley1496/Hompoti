/* */

import listingModel from "../Models/listingModel.js";

import { errorHandler } from "./../Middlewares/errorHandler.js";

/*************************************************************************************************/
/***************************      1 : Creating listing Controller  *******************************/
/*************************************************************************************************/

/* Creating a Controller function with name createListingController which contains the logic to 
   create a listing.
*/

export const createListingController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* We will create product listing by using the create() mongoose method on basis of req.body. */
    const listing = await listingModel.create(req.body);

    /* After creating the listing we will send back a res(response) to the user with statusCode 201 and 
       we will send the listing created by the user in the json format. 
    */
    return res.status(200).json(listing);

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/***************************************************************************************************/
/***************************      2 : Deleting listing Controller  *********************************/
/***************************************************************************************************/

/* Creating a Controller function with name deleteListingController which contains the logic to 
   delete a particular listing.
*/

export const deleteListingController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will find the listing of the user on basis of its id and we will get the id of the listing
       from req.params.id.
    */
    const listing = await listingModel.findById(req.params.id);

    /* If we don't find the listing( ie. if listing doesn't exist ) for that particulr id then we will 
       return an error by passing the middleware function errorHandler() that we created in errorHandler.js 
       with a statusCode of 404 and message as "Listing not found" inside the next() function.
    */

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    /* If the listing exist then we will check that user is the owner of that listing or not. */

    /* If he is the owner of that listing then we will find that listing of the user on basis of its 
       listing id and then delete it. We will get the id of the listing from req.params.id.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only delete your own listings." 
       inside the next() function.
    */

    if (req.user.id === listing.userRef) {
      /* */

      /* Finding the listing of the user on basis of his listing id and we will get the listing id 
         from req.params.id. 
      */
      await listingModel.findByIdAndDelete(req.params.id);

      /* After deleting the listing of the user we will send a response with statusCode 200 and 
         we will send a message that "Listings has been deleted" in the json format. 
      */
      res.status(200).json("Listings has been deleted");

      /* */
    } else {
      return next(errorHandler(401, "You can only delete your own listings."));
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/****************************************************************************************************/
/***************************      3 : Editing(Updating) listing Controller  *************************/
/****************************************************************************************************/

/* Creating a Controller function with name editListingController which contains the logic to 
   edit a particular listing.
*/

export const updateListingController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will find the listing of the user on basis of its id and we will get the id of the listing
       from req.params.id.
    */

    const listing = await listingModel.findById(req.params.id);

    /* If we don't find the listing( ie. if listing doesn't exist ) for that particulr id then we will 
       return an error by passing the middleware function errorHandler() that we created in errorHandler.js 
       with a statusCode of 404 and message as "Listing not found" inside the next() function.
    */
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    /* If the listing exist then we will check that user is the owner of that listing or not. */

    /* If he is the owner of that listing then we will find that listing of the user on basis of its 
       listing id and then update it. We will get the id of the listing from req.params.id.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only update your own listings." 
       inside the next() function.
    */

    if (req.user.id === listing.userRef) {
      /* */

      const updatedListing = await listingModel.findByIdAndUpdate(
        /* */

        /* Finding the user whose details we will update on basis of his id. */
        req.params.id,

        /* What we are updating ie. we are updating the input fields. */
        req.body,

        /* new: true => will actually return and it will save the new information of this updated user
           replacing the previous one ie. it will give us the updated information(listings). 
           If we don't add this then we will get the previous information for our response.
        */

        {
          new: true,
        }
      );

      /* After updating the listing of the user we will send a response with statusCode 200 and 
         we will send all the updatedListings data in the json format. 
      */
      res.status(200).json(updatedListing);

      /* */
    } else {
      return next(errorHandler(401, "You can only update your own listings."));
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/****************************************************************************************************/
/********************    4 : Getting(Reading) a particular listing-details Controller  **************/
/****************************************************************************************************/

/* Creating a Controller function with name getParticularListingDetailsController which contains the 
   logic to get all the details of a particular selected listing created by that particular user(owner).
*/

export const getParticularListingDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will find the listing of the user on basis of its id and we will get the id of the listing
       from req.params.id.
    */
    const listing = await listingModel.findById(req.params.id);

    /* If we don't find the listing( ie. if listing doesn't exist ) for that particulr id then we will 
       return an error by passing the middleware function errorHandler() that we created in errorHandler.js 
       with a statusCode of 404 and message as "Listing not found" inside the next() function.
    */
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    /* If the listing exist ie. if we get the listing then we will send a response with statusCode 200 and 
       we will send all the listings data in the json format to the frontend so that everyone can see it. 
    */
    res.status(200).json(listing);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/*******************************************************************************************************/
/****************************   5 : To get all the user-listings Controller ****************************/
/*******************************************************************************************************/

/* Creating a Controller function with name showUserListingsController which contains the logic to show
   all the listings created by that particular user. 
*/

export const getProfileOwnerAllListingsController = async (req, res, next) => {
  /* */

  try {
    /* */

    /* 1st we will check the user who is trying to see the listings exist in our database or not.
       ie. he is the real owner of that listings or not.

       If the id of the user ( ie. the user we save in req.user in verifyToken function of verifyUser.js ) 
       is equal to the id that we will get from the /show-listings/:id route that means the user is  
       authenticated. Therefore in that case we will find all the listings of that particular user on basis 
       of its userRef and send the response of statusCode 200 with all the listings to the frontend in json 
       format so that the user can view all his listings he created.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only view your own listings!"
       inside the next() function.
    */

    if (req.user.id === req.params.id) {
      /* */

      /* If the id's matches then we will find all the listings of that particular user on basis of its userRef.
         We will get the userRef from req.params.id.
      */
      const listings = await listingModel.find({ userRef: req.params.id });

      /* After finding all the listings of a particular user we will send a response with statusCode 200 
         and we will send all the listings to the frontend in the json format to the frontend.
      */
      res.status(200).json(listings);

      /* */
    } else {
      return next(errorHandler(401, "You can only view your own listings!"));
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};

/****************************************************************************************************/
/**********************    6 : Getting(Reading) all-search-listings Controller      *****************/
/****************************************************************************************************/

/* Creating a Controller function with name getAllListingsController which contains the logic to 
   get all the listings created by different users(owners) in our application.
*/

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

    /* Then we will return a response with statusCode 200 and we will send the search-result we stored in 
       the listings variable in the json format to the frontend so that everyone can see it. 
    */

    return res.status(200).json(listings);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }
};
