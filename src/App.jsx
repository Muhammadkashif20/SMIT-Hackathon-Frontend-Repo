import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home.jsx"
import Login from "./auth/Login.jsx"
import Proceed from "./auth/Proceed.jsx"
import Password from "./auth/Password.jsx"
import GurantorsForm from "./auth/GurantorsForm.jsx"
import Dashboard from './user/Dashboard'
import WeddingLoans from './user/WeddingLoans'
import ConstructionLoans from './user/ConstructionLoans'
import BussinessLoans from './user/BussinessLoans'
import EducationalLoans from './user/EducationalLoans'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/user" element={<Dashboard/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/proceed" element={<Proceed/>}></Route>
           <Route path="/password" element={<Password/>}></Route>
           <Route path="/guarantors" element={<GurantorsForm/>}></Route>
           <Route path="/weddingloans" element={<WeddingLoans/>}></Route>
           <Route path="/constructionloans" element={<ConstructionLoans/>}></Route>
           <Route path="/bussinessloans" element={<BussinessLoans/>}></Route>
           <Route path="/educationloans" element={<EducationalLoans/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
