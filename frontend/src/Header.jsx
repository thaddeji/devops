import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import {TextInput } from 'flowbite-react'
import {AiOutlineSearch} from 'react-icons/ai'
import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';





export default function Header() {
  const path = useLocation().pathname;
  const [searchTerm,setSearchTerm]=useState('');
  const location = useLocation();
  const navigate = useNavigate();




  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
        setSearchTerm(searchTermFromUrl);
    }
},[location.search])

const handleSubmit=async(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);

}

  return (
    <header className='bg-slate-200 shadow-md' >
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3 ' >
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '  >
      <span className='text-slate-500' >Gestion</span>
      <span className='text-slate-700' >Client</span>
      </h1>
     
      <ul className='' >
      <span className='text-slate-500' >Talel</span>
      <span className='text-slate-700' > Haddeji</span>
      </ul>
      </div>
    

    </header>
  )
}
