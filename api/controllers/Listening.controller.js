
import Listing from "../models/Listing.model.js";

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