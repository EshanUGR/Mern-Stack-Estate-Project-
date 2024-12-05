import React, { useState } from 'react'
import { useSelector } from 'react-redux'


import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
const Profile = () => {
  const [updateSuccess,setUpdateSuccess]=useState(false);

  const {currentUser,loading,error}=useSelector((state)=>state.user);

  const [formData,setFormData]=useState({});
  
  
const dispatch=useDispatch();
  const handleChange=(e)=>
  {
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>
  {
    e.preventDefault();
try{
  dispatch(updateUserStart());
  const res = await fetch(`/api/user/update/${currentUser._id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  });
  const data=await res.json();
  if(data.success===false)
  {
    dispatch(updateUserFailure(data.message));
    return;
  }
  dispatch(updateUserSuccess(data));
  setUpdateSuccess(true);
}

catch(error)
{
  dispatch(updateUserFailure(error.message));
}

    
  };
  const handleDeleteUser=async()=>
  {
    try{
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      });
const data=await res.json();
if(data.success===false)
{
  dispatch(deleteUserFailure(data.message));
  return;
}
dispatch(deleteUserSuccess(data));
      
    }
    catch(error)
    {
      dispatch(deleteUserFailure(error.message));
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

        <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-80" disabled={loading}>
         {loading?'loading':'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className='mt-5 text-red-700'>{error ?error:''}</p>
      <p className='mt-5 text-green-700'>{updateSuccess?'User Updated successfully':''}</p>
    </div>
  );
}

export default Profile
