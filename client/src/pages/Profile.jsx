import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { updateUserFailure,updateUserStart,updateUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
const Profile = () => {
  
  const {currentUser}=useSelector((state)=>state.user);

  const [formData,setFormData]=useState({});
const dispatch=useDispatch();
  const handleChange=(e)=>
  {
    setFormData({...FormData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>
  {
    e.preventDefault();
try{
  dispatch(updateUserStart());
  const res=await fetch(`/api/user/update/${currentUser._id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(formData),
  });
  const data=await res.json();
  if(data.success===false)
  {
    dispatch(updateUserFailure(data.message));
    return;
  }
  dispatch(updateUserSuccess(data));
}

catch(error)
{
  dispatch(updateUserFailure(error.message));
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

        <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

export default Profile
