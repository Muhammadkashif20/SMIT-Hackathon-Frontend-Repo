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
import LoanDetail from './admin/loanDetail.jsx'
import UserInformation from './admin/UserInformation.jsx'
import ProtectedRouteUser from './user/ProtectedRoute.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="user-information/:_id" element={<UserInformation/>}></Route>
           <Route path="/admin-loandetail" element={<ProtectedRouteUser> <LoanDetail/></ProtectedRouteUser> }></Route>
           <Route path="/admin-appointments" element={<ProtectedRouteUser><AppointmentAdminSide/> </ProtectedRouteUser>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/proceed" element={  <Proceed/>  }></Route>
           <Route path="/password" element={<ProtectedRouteUser>  <Password/> </ProtectedRouteUser> }></Route>
           <Route path="/guarantors" element={<ProtectedRouteUser><GurantorsForm/></ProtectedRouteUser>}></Route>
           <Route path="/slipGenerate" element={<ProtectedRouteUser><SlipGeneration/></ProtectedRouteUser>}></Route>
           <Route path="/admin-dashboard" element={<ProtectedRouteUser><Dashboard/></ProtectedRouteUser>}></Route>
            <Route path="/weddingloans" element={ <ProtectedRouteUser> <WeddingLoans/> </ProtectedRouteUser>}></Route>
           <Route path="/constructionloans" element={ <ProtectedRouteUser> <ConstructionLoans/> </ProtectedRouteUser>}></Route>
           <Route path="/businessloans" element={ <ProtectedRouteUser> <BussinessLoans/>  </ProtectedRouteUser>}></Route>
           <Route path="/educationloans" element={  <ProtectedRouteUser> <EducationalLoans/>  </ProtectedRouteUser>}></Route>
           <Route path="/user-dashboard" element={ <ProtectedRouteUser> <UserDashboard/>  </ProtectedRouteUser>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
