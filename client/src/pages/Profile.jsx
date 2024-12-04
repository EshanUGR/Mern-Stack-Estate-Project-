import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  
  const {currentUser}=useSelector((state)=>state.user)
  return (
    <div className='max-w-lg p-3 mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

    <form action="" className='flex flex-col gap-4'>

      
<img src={currentUser.avatar} alt="profile-picture" className='self-center object-cover w-24 h-24 mt-2 rounded-full cursor-pointer' />

<input type="text" placeholder='username' className='p-3 border rounded-lg' id='username'/>
<input type="email" placeholder='email' className='p-3 border rounded-lg' id='email'/>
<input type="text" placeholder='password' className='p-3 border rounded-lg' id='password'/>

<button className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-80'>Update</button>
      
    </form>
    <div className='flex justify-between mt-5'>
<span className='text-red-700 cursor-pointer'>Delete Account</span>
<span className='text-red-700 cursor-pointer'>Sign Out</span>
      
    </div>
    </div>
  )
}

export default Profile
