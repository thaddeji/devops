import { Button, Select, Spinner, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Search() {

  const[sideBarData,setSideBarData]=useState({
    searchTerm:'',
    sort:'desc',
    category:'uncategorized',

  });
  const [clients,setClients]=useState([]);
  const [loading,setLoading]=useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(sideBarData);

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
        setSideBarData({...sideBarData,
            searchTerm:searchTermFromUrl,
            sort:sortFromUrl,
            category:categoryFromUrl,
        });
    }
    const fetchClients=async()=>{
        setLoading(true);
        const searchQuery= urlParams.toString();
        const res = await fetch(`http://localhost:4000/api/client/getclientsearch?${searchQuery}`);
        if(!res.ok){
            setLoading(false);
            return;
        }
        if(res.ok){
            const data = await res.json();
            setClients(data.clients);
            setLoading(false);
        }
    }
    fetchClients();
  },[location.search])

  const handleChange =(e)=>{
    if(e.target.id==='searchTerm'){
        setSideBarData({...sideBarData,searchTerm:e.target.value});
    }
    if(e.target.id==='sort'){
        const order = e.target.value || 'desc';
        setSideBarData({...sideBarData,sort:order});
    }
    if(e.target.id==='category'){
        const category = e.target.value || 'uncategorized';
        setSideBarData({...sideBarData,category:category});
    }
  }
  //when we search the url changes
  const handleSubmit =(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm',sideBarData.searchTerm);
    urlParams.set('sort',sideBarData.sort);
    urlParams.set('category',sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
 

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-1 border-b md:border-r border-gray-500 md:min-h-screen">
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 ">
                <label className='whitespace-nowrap font-semibold'>Search Term :</label>
                <TextInput placeholder='Search...' id='searchTerm' type='text'
                value={sideBarData.searchTerm} onChange={handleChange}/>
            </div>
            <div className="flex items-center gap-2">
                <label className='whitespace-nowrap font-semibold'>Sort :</label>
                <Select id='sort' value={sideBarData.sort} onChange={handleChange}>
                    <option value='desc'>Latest</option>
                    <option value='asc'>Oldest</option>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <label className='whitespace-nowrap font-semibold'>Category :</label>
                <Select id='category' value={sideBarData.category} onChange={handleChange}>
                    <option value='uncategorized'>uncategorized</option>
                    <option value='Partner'>Partner</option>
                    <option value='VIP'>VIP</option>
                    <option value='Regular'>Regular</option>
                    <option value='Retail'>Retail</option>
                </Select>
            </div>
            <Button type='submit'>Search</Button>
        </form>
      </div>
        <div className="w-full">
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>clients results :</h1>
            <div className="gap-4 p-7 flex-wrap lg:flex ">
            {
                !loading && (!clients || clients.length === 0) && (<p className='text-xl text-gray-500'>No clients found.</p>
            )
            }
             {
                loading && (<div className="flex justify-center items-center"><Spinner size='xl' /></div>)
            }
            {
                !loading && clients  && clients.map((client)=>(
                    <div key={client._id} className="p-4 border border-gray-300 mb-4 rounded-lg">
                    <p className="font-semibold">{client.name}</p>
                    <p>{client.email}</p>
                    <p>{client.address}</p>
                    <p>{client.phoneNumber}</p>
                    <p>{client.inscriptionDate}</p>
                    <p>{client.category}</p>
                    </div>
                ))
            }
        </div>
       
        </div>
    </div>
  )
}
