import {  useState } from 'react';


import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
   const [error,setError]=useState(false);
   const[loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
  
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });
console.log(formData);
  const handleSubmit=async(e)=>
  {
    e.preventDefault();

    try{

      if(formData.regularPrice<formData.discountPrice)return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);

      const res=await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          ...formData,
        userRef:currentUser._id,
        }),
      });

      const data=await res.json();
      setLoading(false);
      if(data.success===false)
      {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`)
    }
    catch(error)
    {
      setError(error.message);
      setLoading(false);
    }

    
  }
  const handleChange=(e)=>
  {
    
    if(e.target.id==='sale' || e.target.id==='rent')
    {
      setFormData({
        ...formData,
        type:e.target.id
      })
    }


    if(e.target.id==='parking' ||e.target.id==='furnished' || e.target.id==='offer')
    {
      setFormData({
        ...formData,
        [e.target.id]:e.target.checked
    })
    }


    if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea')
    {
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
    }
  }


  return (
    <main className='max-w-4xl p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 sm:flex-row'>
        <div className='flex flex-col flex-1 gap-4'>
          <input
            type='text'
            placeholder='Name'
            className='p-3 border rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type='text'
            placeholder='Description'
            className='p-3 border rounded-lg'
            id='description'
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type='text'
            placeholder='Address'
            className='p-3 border rounded-lg'
            id='address'
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bedrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='bathrooms'
                min='1'
                max='10'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
              <input
                type='number'
                id='regularPrice'
                min='50'
                max='10000000'
                required
                className='p-3 border border-gray-300 rounded-lg'
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className='flex flex-col items-center'>
                <p>Regular price</p>
                {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className='flex items-center gap-2'>
                <input
                  type='number'
                  id='discountPrice'
                  min='0'
                  max='10000000'
                  required
                  className='p-3 border border-gray-300 rounded-lg'
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className='flex flex-col items-center'>
                  <p>Discounted price</p>

                  {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>

          
        </div>
        
          
        <div className='flex flex-col flex-1 gap-4'>
        
        
         
          <button
        
            className='p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80' type='submit'
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create listing'}
          </button>
          {error && <p className='text-sm text-red-700'>{error}</p>}
        </div>
      </form>
    </main>
  );
}