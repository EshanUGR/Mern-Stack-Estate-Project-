import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
const Profile = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({});
const[showListingsError,setShwoListingsError]=useState(false);
const[userListings,setUserListings]=useState([]);
console.log(userListings)
  const dispatch = useDispatch();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };


  const handleShowListings=async(e)=>
  {

    try{
      setShwoListingsError(false);
      const res=await fetch(`/api/user/listings/${currentUser._id}`);
      const data=await res.json();

      if(data.success===false)
      {
       setShwoListingsError(true);
       return; 
      }

      setUserListings(data);
    }
    catch(error)
    {
      setShwoListingsError(true);
    }
    
  };

  const handleListingDelete=async(listingId)=>
  {
try{
  const res = await fetch(
    `/api/listing/delete/${listingId}`,{

      method:'DELETE'
    }
  );
  const data=await res.json();
if(data.success===false)
{
  console.log(data.message);
  return;
}
  setUserListings((prev)=>prev.filter((listing)=>listing._id===listingId));
  
  
}
catch(error)
{
  console.log(error.message);
}
    
  }
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <img
          src={currentUser.avatar}
          alt="profile-picture"
          className="self-center object-cover w-24 h-24 mt-2 rounded-full cursor-pointer"
        />

        <input
          type="text"
          placeholder="username"
          className="p-3 border rounded-lg"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="p-3 border rounded-lg"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 border rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-80"
          disabled={loading}
        >
          {loading ? "loading" : "Update"}
        </button>

        <Link
          to={"/create-listing"}
          className="p-3 text-center text-white uppercase bg-green-700 rounded-lg hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span
          className="text-red-700 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
      <p className="mt-5 text-red-700">{error ? error : ""}</p>
      <p className="mt-5 text-green-700">
        {updateSuccess ? "User Updated successfully" : ""}
      </p>
      <button className="w-full text-green-700" onClick={handleShowListings}>
        Show Listing
      </button>

      <p className="mt-5 text-red-700">
        {showListingsError ? "Error Showing listing" : ""}
      </p>

      {userListings && userListings.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h1 className='text-2xl font-semibold text-center mt-7'>Your  Listings</h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex items-center justify-between gap-4 p-3 font-semibold truncate border rounded-lg text-slate-700 hover:underline"
            >
              <Link to={`/listings/${listing._id}`} className="flex-1">
                <p className="font-semibold truncate text-slate-700 hover:underline">
                  {listing.name}
                </p>
              </Link>
              <div className="flex flex-col items-center">
                <button className="text-red-700 uppercase" onClick={()=>handleListingDelete(listing._id)}>Delete</button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No listings available</p>
      )}
    </div>
  );
};

export default Profile;
