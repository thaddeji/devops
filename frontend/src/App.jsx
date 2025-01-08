import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Clients from './Components/Clients'
import Header from './Header'
import ClientPage from './Pages/ClientPage'
import Dashboard from './Pages/Dashboard'
import Search from './Pages/Search'
import SignIn from './Pages/SignIn'
import UpdateClient from './Pages/UpdateClient'

export default function App() {
  return (
    <BrowserRouter>
    <Header/>  
    <Routes>
    <Route path='/' element={<SignIn />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path="/update-client/:clientId" element={<UpdateClient/>} /> 
    <Route path='/clients' element={<Clients />} />
    <Route path="/client/:clientId" element={<ClientPage/>} />
    <Route path="/search" element={<Search/>} />
    </Routes>
    </BrowserRouter>
  )
}
