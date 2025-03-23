import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRouteUser = ({ children }) => {
    const navigate=useNavigate();
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return token ? children: null;
};

export default ProtectedRouteUser;
