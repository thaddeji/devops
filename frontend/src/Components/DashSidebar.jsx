import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react';
import {  HiArrowSmRight, HiOutlineUserGroup, HiUser } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';




export default function DashSidebar() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  const navigate = useNavigate()
 

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    //console.log(tabFromUrl);
    if(tabFromUrl){
    setTab(tabFromUrl);
    }
    
  },[location.search])

  const handleSignout=async()=>{
    try {
      
      const res = await fetch('http://localhost:4000/api/auth/signout',{
        method:'POST',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
        return;
      }
      navigate('/')
    } catch (error) {
        console.log(error.message);
    }
  }




  return (
  <Sidebar className='w-full md:w-56'>
    <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
             <Link to='/dashboard?tab=ajouterclient'>
             <Sidebar.Item  icon={HiUser} as={'div'}>Add Client</Sidebar.Item>
            </Link>
            <Link to='/dashboard?tab=clients'>
             <Sidebar.Item icon={HiOutlineUserGroup} as={'div'}>Clients</Sidebar.Item>
            </Link>        
            <Link to='/dashboard?tab=totalclients'>
             <Sidebar.Item icon={HiOutlineUserGroup} as={'div'}>Total clients</Sidebar.Item>
            </Link>
            <Sidebar.Item className="cursor-pointer" icon={HiArrowSmRight} onClick={handleSignout}>Sign out</Sidebar.Item>           
        </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}
