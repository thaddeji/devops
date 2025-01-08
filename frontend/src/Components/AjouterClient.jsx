import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Button, Select, TextInput } from 'flowbite-react'








export default function AddClient() {

  
 const [formData,setFormData]=useState({});
 const [error,setError]=useState(null);
 const [loading,setLoading]=useState(false);
 const navigate=useNavigate();
 

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        setError(false);
        try {
            const res = await fetch('http://localhost:4000/api/client/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
            body:JSON.stringify(formData),
            })
            const data = await res.json();
            setLoading(false);
            
            if(!res.ok){
                setError(data.message);
                return;
            }
            if(res.ok){
                setError(null);
                navigate('/dashboard?tab=clients')
            }
        } catch (error) {
            setError('something went wrong');
            setLoading(false);
        }
    }
   




  return (
    <div className="w-full mx-auto p-6 ">
    <h1 className="text-2xl font-bold text-center mb-6">Add client</h1>
    <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <TextInput onChange={(e)=>setFormData({...formData,name:e.target.value})} type="text" id="name" name="name"  required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <TextInput onChange={(e)=>setFormData({...formData,email:e.target.value})} type="email" id="email" name="email"  required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <TextInput onChange={(e)=>setFormData({...formData,address:e.target.value})} type="text" id="address" name="address" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <TextInput onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})} type="tel" id="phoneNumber" name="phone" required />
      </div>
      <div>
        <label  className="block text-sm font-medium text-gray-700">Inscription Date</label>
        <TextInput onChange={(e)=>setFormData({...formData,inscriptionDate:e.target.value})} type="date" id="inscriptionDate" name="inscriptionDate" required />
      </div>
      <Select className="rounded-md" onChange={(e)=>setFormData({...formData,category:e.target.value})}>
                    <option value='uncategorized'>Select Client Category</option>
                    <option value='Regular'>Regular</option>
                    <option value='VIP'>VIP</option>
                    <option value='Partner'>Partner</option>
                    <option value='Retail'>Retail</option>
                </Select>
      <Button disabled={loading} type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      {loading ? 'creating...' : 'Add Client'}
      </Button>
      {error && <p className="text-red-700 text-sm">{error}</p> }
    </form>
  </div>
  )
}
