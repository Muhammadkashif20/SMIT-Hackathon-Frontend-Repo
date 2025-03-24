import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home.jsx"
import Login from "./auth/Login.jsx"
import Proceed from "./auth/Proceed.jsx"
import Password from "./auth/Password.jsx"
import GurantorsForm from "./auth/GurantorsForm.jsx"
import SlipGeneration from "./user/SlipGeneration.jsx"
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
import NotFound from './auth/NotFound.jsx'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user-information/:_id" element={<UserInformation />} />
          {/* ✅ Admin Protected Routes */}
          <Route path="/admin-loandetail" element={<ProtectedRouteUser allowedRole="admin"><LoanDetail /></ProtectedRouteUser>} />
          <Route path="/admin-appointments" element={<ProtectedRouteUser allowedRole="admin"><AppointmentAdminSide /></ProtectedRouteUser>} />
          <Route path="/admin-dashboard" element={<ProtectedRouteUser allowedRole="admin"><Dashboard /></ProtectedRouteUser>} />
          {/* ✅ Public Routes */}
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/proceed" element={<Proceed />} />
          {/* ✅ User Protected Routes */}
          <Route path="/password" element={<ProtectedRouteUser allowedRole="user"><Password /></ProtectedRouteUser>} />
          <Route path="/guarantors" element={<ProtectedRouteUser allowedRole="user"><GurantorsForm /></ProtectedRouteUser>} />
          <Route path="/slipGenerate" element={<ProtectedRouteUser allowedRole="user"><SlipGeneration /></ProtectedRouteUser>} />
          <Route path="/weddingloans" element={<ProtectedRouteUser allowedRole="user"><WeddingLoans /></ProtectedRouteUser>} />
          <Route path="/constructionloans" element={<ProtectedRouteUser allowedRole="user"><ConstructionLoans /></ProtectedRouteUser>} />
          <Route path="/businessloans" element={<ProtectedRouteUser allowedRole="user"><BussinessLoans /></ProtectedRouteUser>} />
          <Route path="/educationloans" element={<ProtectedRouteUser allowedRole="user"><EducationalLoans /></ProtectedRouteUser>} />
          <Route path="/user-dashboard" element={<ProtectedRouteUser allowedRole="user"><UserDashboard /></ProtectedRouteUser>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
