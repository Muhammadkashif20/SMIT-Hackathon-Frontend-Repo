import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home.jsx"
import Login from "./auth/Login.jsx"
import Proceed from "./auth/Proceed.jsx"
import Password from "./auth/Password.jsx"
import GurantorsForm from "./auth/GurantorsForm.jsx"
import SlipGeneration  from "./user/SlipGeneration.jsx"
import UserDashboard from './user/Dashboard.jsx'
import Dashboard from './admin/Dashboard.jsx'
import WeddingLoans from './user/WeddingLoans'
import ConstructionLoans from './user/ConstructionLoans.jsx'
import AppointmentAdminSide from './admin/Appointments.jsx'
import BussinessLoans from './user/BussinessLoans.jsx'
import EducationalLoans from './user/EducationalLoans.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/user-dashboard" element={<UserDashboard/>}></Route>
           <Route path="/admin-loanDetails" element={<UserDashboard/>}></Route>
           <Route path="/admin-appointments" element={<AppointmentAdminSide/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/proceed" element={<Proceed/>}></Route>
           <Route path="/password" element={<Password/>}></Route>
           <Route path="/guarantors" element={<GurantorsForm/>}></Route>
           <Route path="/slipGenerate" element={<SlipGeneration/>}></Route>
           <Route path="/admin-dashboard" element={<Dashboard/>}></Route>
           <Route path="/weddingloans" element={<WeddingLoans/>}></Route>
           <Route path="/constructionloans" element={<ConstructionLoans/>}></Route>
           <Route path="/businessloans" element={<BussinessLoans/>}></Route>
           <Route path="/educationloans" element={<EducationalLoans/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
