
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

export const getListings=async(req,res,next)=>
{

try{

  const limit=parseInt(req.query.limit) ||9;
  const startIndex=parseInt(req.query.startIndex) || 0;

  let offer=req.query.offer;


  if(offer==='false' || offer===undefined)
  {
offer={$in:[false,true]};
  }

  const furnished=req.query.furnished;


  if(furnished===undefined || furnished==='false')
  {
    furnished={$in:[false,true]};
  }

  let parking=req.query.parking;

  if(parking===undefined || parking==='false')
  {
    parking={$in:[false,true]};
  }
let type=req.query.type;

if(type===undefined || type==='all')
{
  type={$in:['rent','sell']};

}
let serchTerm=req.query.searchTerm ||'';
const sort=req.query.sort || 'CreatedAt';

const order=req.query.order || 'desc';


const listings = await Listing.find({
  name: { $regex: serchTerm, $options: "i" },
  offer,
  furnished,
  parking,
  type
}).sort({
  [sort]:order
}).limit(limit).skip(startIndex);


return res.status(200).json(listings);

}
catch(error)
{
  next(error);
}

}