import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

const Contact = ({listing}) => {
  const[landloard,setLandlord]=useState(null);
  const [message,setMessage]=useState('');



  const onChange=(e)=>
  {
    setMessage(e.target.value)
  }

  useEffect(()=>
  {

    const fetchLandlord=async()=>
    {
try{
const res=await fetch(`/api/user/${listing.userRef}`);
const data =await res.json();
setLandlord(data);
}
catch(error)
{
console.log(error);
}

    }
    fetchLandlord();

  },[listing.userRef])
  return (
    <div>
      {landloard && (
        <div className='flex flex-col gpa-2'>
          <p>
            Contact <span className="font-semibold">{landloard.username}</span>{" "}
            for
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full p-3 mt-5 border rounded-lg"
          ></textarea>

          <Link to ={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`}
          
          className='p-3 py-2 text-center text-white uppercase rounded-lg hover:opacity-95 bg-slate-700'
          >
          Send Message
          </Link>
        </div>
      )}
    </div>
  );
}

export default Contact
