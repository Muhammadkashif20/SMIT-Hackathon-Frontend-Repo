import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./components/Home.jsx"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import Dashboard from './user/Dashboard'
import WeddingLoans from './user/userComponents/WeddingLoans'
import ConstructionLoans from './user/userComponents/ConstructionLoans'
import BussinessLoans from './user/userComponents/BussinessLoans'
import EducationalLoans from './user/userComponents/EducationalLoans'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/Dashboard" element={<Dashboard/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/weddingloans" element={<WeddingLoans/>}></Route>
           <Route path="/constructionloans" element={<ConstructionLoans/>}></Route>
           <Route path="/bussinessloans" element={<BussinessLoans/>}></Route>
           <Route path="/educationloans" element={<EducationalLoans/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
