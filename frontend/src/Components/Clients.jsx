import  { useEffect, useState } from 'react'
import {Button, Modal, Table} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';


export default function Clients() {
const [clients,setClients]=useState([]);
const [showModal,setShowModal]=useState(false);
const [clientIdToDelete,setclientIdToDelete]=useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/client/getclients')
        const data = await res.json()
        if(res.ok){
          setClients(data.clients)
       }


      } catch (error) {
        
      }
    };
      fetchUsers();
  },[])
 
  const handleDeleteClient=async()=>{
    setShowModal(false);
    try {
      const res = await fetch(`http://localhost:4000/api/client/deleteclient/${clientIdToDelete}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        console.log(data.message);
      }else{
        setClients((prev)=>prev.filter((client)=>client._id!==clientIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100
     scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
        <>
          <Table hoverable className='shadow-md '>
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>PhoneNumber</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Edit</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>


            </Table.Head>
            
            {clients && clients.length > 0 && clients.map((client)=>(
              <Table.Body key={client._id} className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(client.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className='hover:underline cursor-pointer'>
                    <Link to={`/client/${client._id}`}>
                    {client.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell >
                 {client.email}
                  </Table.Cell>
                  <Table.Cell>{client.phoneNumber}</Table.Cell>
                  <Table.Cell>{client.category}</Table.Cell>     
                  <Table.Cell>
                  <Link to={`/update-client/${client._id}`}>
                      <Button>Edit</Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={()=>{setShowModal(true);setclientIdToDelete(client._id)}} color='failure'>Delete</Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </>

         <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header/>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this client</h3>
              <div className="flex justify-center gap-10 ">
                <Button onClick={handleDeleteClient} color='failure'>Yes, I'm sure</Button>
                <Button onClick={()=>setShowModal(false)} color='success'>No, cancel</Button>                  
              </div>
            </div>
          </Modal.Body>         
     </Modal>
    </div>
  )
}
