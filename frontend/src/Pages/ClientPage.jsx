import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function ClientPage() {
const {clientId} = useParams();
const [loading,setLoading]=useState(true);
const [error,setError]=useState(null);
const [client,setclient]=useState({});
useEffect(()=>{
    const fetchClient = async ()=>{
    try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/client/getclients?clientId=${clientId}`);
        const data = await res.json();
        if(!res.ok){
            setError(data.error);
            setLoading(false);
            return;
        }
        if(res.ok){
            setclient(data.clients[0]);
            setLoading(false);
            setError(null);
        }

        
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
    }
    fetchClient();
},[clientId])


  return(   <div className="w-full mx-auto p-6 ">
  <h1 className="text-4xl font-bold mb-6">Client Informations</h1>
    <div className="flex p-3 gap-4 items-center">
      <label className="block text-2xl font-medium text-gray-700 mt-4">Name :</label>
      <p className=' items-center mt-4 gap-2 text-gray-700 text-2xl'>{client.name}</p>
    </div>
    <div className="flex p-3 gap-4 items-center">
      <label className="block text-2xl font-medium text-gray-700 mt-4">Email :</label>
      <p className=' items-center mt-4 gap-2 text-gray-700 text-2xl'>{client.email}</p>
    </div>
    <div className="flex p-3 gap-4 items-center">
      <label className="block text-2xl font-medium text-gray-700 mt-4">Address :</label>
      <p className=' items-center mt-4 gap-2 text-gray-700 text-2xl'>{client.address}</p>
    </div>
    <div className="flex p-3 gap-4 items-center">
      <label className="block text-2xl font-medium text-gray-700 mt-4">Phone Number :</label>
      <p className=' items-center mt-4 gap-2 text-gray-700 text-2xl'>{client.phoneNumber}</p>
    </div>
    <div className="flex p-3 gap-4 items-center">
      <label className="block text-2xl font-medium text-gray-700 mt-4">Inscription Date :</label>
      <p className=' items-center mt-4 gap-2 text-gray-700 text-2xl'>{client.inscriptionDate}</p>
    </div>
    <div className="flex p-3 gap-4 items-center">
      <label className="block text-2xl font-medium text-gray-700 mt-4">Category :</label>
      <p className=' items-center mt-4 gap-2 text-gray-700 text-2xl'>{client.category}</p>
    </div>
</div>

  )
  }
