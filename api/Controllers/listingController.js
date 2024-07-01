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

    const listing = await listingModel.create(req.body);

    return res.status(200).json(listing);

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*************************************************************************************************/
/***************************      2 : Deleting listing Controller  *******************************/
/*************************************************************************************************/

export const deleteListingController = async (req, res, next) => {
  /* */

  try {
    /* */

    const listing = await listingModel.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    /* If the listing exist then we will check that user is the owner of that listing or not.
    
       If he is the owner of that listing then we will find that listing of the user on basis of its 
       listing id and then delete it. We will get the id of the listing from req.params.id.

       Else we will return an error by passing the middleware function errorHandler() that we created in 
       errorHandler.js with a statusCode of 401 and message as "You can only delete your own listings." 
       inside the next() function.
    */

    if (req.user.id === listing.userRef) {
      /* */

      await listingModel.findByIdAndDelete(req.params.id);

      res.status(200).json("Listings has been deleted");

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only delete your own listings."));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*************************************************************************************************/
/***************************      3 : Editing(Updating) listing Controller  **********************/
/*************************************************************************************************/

export const updateListingController = async (req, res, next) => {
  /* */

  try {
    /* */

    const listing = await listingModel.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    /* If the listing exist then we will check that user is the owner of that listing or not.
    
       If he is the owner of that listing then we will find that listing of the user on basis of its 
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

        {
          new: true,
        }

        /* */
      );

      res.status(200).json(updatedListing);

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only update your own listings."));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*************************************************************************************************/
/********************    4 : Getting(Reading) a particular listing-details Controller  ***********/
/*************************************************************************************************/

export const getParticularListingDetailsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const listing = await listingModel.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    res.status(200).json(listing);

    /* Catching the error and passing it to the next() function which is a middleware to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*************************************************************************************************/
/****************************   5 : To get all the user-listings Controller **********************/
/*************************************************************************************************/

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

      const listings = await listingModel.find({ userRef: req.params.id });

      res.status(200).json(listings);

      /* */
    } else {
      /* */

      return next(errorHandler(401, "You can only view your own listings!"));

      /* */
    }

    /* Catching the error and passing it to the next() function to handle the error. */
  } catch (error) {
    /* */

    next(error);

    /* */
  }

  /* */
};

/*************************************************************************************************/
/**********************    6 : Getting(Reading) all-search-listings Controller      **************/
/*************************************************************************************************/

export const getAllSearchListingsController = async (req, res, next) => {
  /* */

  try {
    /* */

    const limit = parseInt(req.query.limit) || 9;

    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || "false") {
      furnished = { $in: [true, false] };
    }

    let parking = req.query.parking;
    if (parking === undefined || "false") {
      parking = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

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
