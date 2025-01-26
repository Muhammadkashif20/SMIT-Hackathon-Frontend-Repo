import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from "./Pages/Home"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import User from './user/user'
import WeddingLoans from './user/userComponents/weddingLoans'
import ConstructionLoans from './user/userComponents/ConstructionLoans'
import BussinessLoans from './user/userComponents/BussinessLoans'
import EducationalLoans from './user/userComponents/EducationalLoans'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<User/>}></Route>
           <Route path="/home" element={<Home/>}></Route>
           <Route path="/login" element={<Login/>}></Route>
           <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/weddingloans" element={<WeddingLoans/>}></Route>
           <Route path="/constructionloans" element={<ConstructionLoans/>}></Route>
           <Route path="/bussinessloans" element={<BussinessLoans/>}></Route>
           <Route path="/educationloans" element={<EducationalLoans/>}></Route>
           <Route path="/signup" element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
