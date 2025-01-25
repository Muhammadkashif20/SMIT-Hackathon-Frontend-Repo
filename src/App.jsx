import React from "react";
import axios from "axios";
import './index.css';
import { Base_Url } from "./utils/baseurl";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/auth/Login"
import SignUp from "../src/auth/SignUp"
import Home from "./Components/Home";
const App = () => {
  const getUser = async () => {
    try {
      const response = await axios.get(`${Base_Url}/users`);
      console.log("response=>", response);
    } catch (error) {
      console.error("error=>",error);
    }
  };
  getUser();
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<SignUp/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;
