import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useEffect } from "react";








export default function UpdateClient() {

  
 const [formData,setFormData]=useState({});
 const [error,setError]=useState(null);
 const [loading,setLoading]=useState(false);
 const navigate=useNavigate();
 const {clientId} = useParams();



 useEffect(()=>{
  try {
     const fetchClient=async()=>{
     const res = await fetch(`http://localhost:4000/api/client/getclients?clientId=${clientId}`);
     const data = await res.json();
     if(!res.ok){
      console.log(data.message);
      setError(data.message);
     }
     if(res.ok){
      setError(null);
      setFormData(data.clients[0]);
     }
     }
     fetchClient();
  } catch (error) {
      console.log(error);
      setError(data.message);
  }
},[])

const handleSubmit=async(e)=>{
  e.preventDefault();
  try {
      const res = await fetch(`http://localhost:4000/api/client/update/${formData._id}/`,{
          method:'PUT',
          headers:{
              'Content-Type':'application/json'
          },
      body:JSON.stringify(formData),
      })
      const data = await res.json();
      
      if(!res.ok){
          setError(data.message);
          return;
      }
      if(res.ok){
          navigate('/dashboard?tab=clients');
      }
  } catch (error) {
      setError('something went wrong');
  }
}
   




  return (
    <div className="w-full mx-auto p-6 ">
    <h1 className="text-2xl font-bold text-center mb-6">Update client</h1>
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <TextInput value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} type="text" id="name" name="name"  required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <TextInput value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} type="email" id="email" name="email"  required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <TextInput value={formData.address} onChange={(e)=>setFormData({...formData,address:e.target.value})} type="text" id="address" name="address" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <TextInput value={formData.phoneNumber} onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})} type="tel" id="phoneNumber" name="phone" required />
      </div>
      <div>
        <label  className="block text-sm font-medium text-gray-700">Inscription Date</label>
        <TextInput value={formData.inscriptionDate} onChange={(e)=>setFormData({...formData,inscriptionDate:e.target.value})} type="date" id="inscriptionDate" name="inscriptionDate" required />
      </div>
      <Select value={formData.category} className="rounded-md" onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                    <option value='uncategorized'>Select Client Category</option>
                    <option value='Regular'>Regular</option>
                    <option value='VIP'>VIP</option>
                    <option value='Partner'>Partner</option>
                    <option value='Retail'>Retail</option>
                </Select>
      <Button disabled={loading} type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      {loading ? 'updating...' : 'Update Client'}
      </Button>
      {error && <p className="text-red-700 text-sm">{error}</p> }
    </form>
  </div>
  )
}
