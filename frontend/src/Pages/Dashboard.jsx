import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../Components/DashSidebar';
import Clients from '../Components/Clients';
import AddClient from '../Components/AjouterClient';
import Statistics from '../Components/Statistics';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Welcome section should only show if no specific tab is selected */}
        {tab === '' && (
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold mb-2">Welcome to the Client Gesture App</h1>
            <img
              src="https://static.vecteezy.com/system/resources/previews/043/181/718/non_2x/young-man-cheerful-business-man-gesturing-welcome-sign-vector.jpg" // Replace with your image URL
              alt="Welcome"
              className="w-40 h-40 object-cover rounded-full mx-auto"
            />
          </div>
        )}

        {/* Display different components based on tab */}
        {tab === 'ajouterclient' && <AddClient />}
        {tab === 'clients' && <Clients />}
        {tab === 'totalclients' && <Statistics />}
      </div>
    </div>
  )
}
