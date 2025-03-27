import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    console.log("Token:", token);
    console.log("Role:", role);
    console.log("Allowed Role:", allowedRole);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else if (role !== "admin" && role !== allowedRole) {
            navigate(role === "user" ? "/user-dashboard" : "/admin-dashboard");
        }
    }, [token, role, navigate, allowedRole]);

    return token && (role === "admin" || [allowedRole].flat().includes(role))
        ? children
        : null;
};

export default ProtectedRoute;
