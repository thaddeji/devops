import  { useEffect, useState } from 'react'
import {Table} from 'flowbite-react'



export default function Statistics() {
const [totalClients,setTotalClients]=useState(0);
const [lastMontClients,setLastMonthClients]=useState(0);


  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/client/getclients')
        const data = await res.json()
        if(res.ok){
          setTotalClients(data.totalClients)
          setLastMonthClients(data.lastMonthClients)

       }


      } catch (error) {
        
      }
    };
      fetchClients();
  },[])
 
  

  return (
    <div className='mx-auto justify-center items-center mt-40'>
        <>
          <Table hoverable className='shadow-md '>
            <Table.Head>
            <Table.HeadCell>total clients</Table.HeadCell>
            <Table.HeadCell>last month clients</Table.HeadCell>
            </Table.Head>
              <Table.Body>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell >
                 {totalClients}
                  </Table.Cell>
                  <Table.Cell>{lastMontClients}</Table.Cell>
                </Table.Row>
              </Table.Body>
          </Table>
        </>
    </div>
  )
}
