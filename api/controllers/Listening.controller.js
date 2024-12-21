
import Listing from "../models/Listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListening=async(req,res,next)=>
{
try{
const listing=await Listing.create(req.body);
return res.status(201).json(listing);

}
catch(error)
{
next(error)
}

}


export const deleteListing=async(req,res,next)=>
{
const listing=await Listing.findById(req.params.id);

if(!listing){
  return next(errorHandler(404,'Listing not found!'));
}
if(req.user.id !==listing.userRef)
{
  return next(errorHandler(401,'You can only delete your own listings!'));
}

try{
await Listing.findByIdAndDelete(req.params.id);
res.status(200).json('Listing has been deleted!');
}
catch(error)
{
  next(error);

}

};

export const updateListing=async(req,res,next)=>
{
const listing=await Listing.findById(req.params.id);

if(!listing)
{
  return next(errorHandler(404,'Listing not found'));
}

if(req.user.id!==listing.userRef)
{
  return next(errorHandler(401,'You can only update your own listings'));
}

try{
const updatedListing=await Listing.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}

);
res.status(200).json(updateListing);
}
catch(error)
{

}
}

export const getListing=async(req,res,next)=>
{
try{
const listing = await Listing.findById(req.params.id);
if(!listing)
{
  return next(errorHandler(404,'Listing not found!'));
}
res.status(200).json(listing);
}
catch(error)
{
  next(error);
}

}


export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const offer =
      req.query.offer === "true"
        ? true
        : req.query.offer === "false"
        ? false
        : { $in: [false, true] };
    const furnished =
      req.query.furnished === "true"
        ? true
        : req.query.furnished === "false"
        ? false
        : { $in: [false, true] };
    const parking =
      req.query.parking === "true"
        ? true
        : req.query.parking === "false"
        ? false
        : { $in: [false, true] };

    const type =
      req.query.type && req.query.type !== "all"
        ? req.query.type
        : { $in: ["rent", "sell"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "CreatedAt";
    const order = req.query.order === "asc" ? 1 : -1; // Ensure proper order for MongoDB sorting.

    // Query the database
    const listings = await Listing.find({
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
  } catch (error) {
    next(error);
  }
};
