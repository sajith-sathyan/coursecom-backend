import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtectedRoutes = ({ children }) => {
const [authed, setAuthed] = useState(false); 
const navigate = useNavigate(); 

useEffect(() => {
    const admin = Cookies.get("admin"); 

    if (admin ) {
    setAuthed(true); 
    } else {
    navigate("/admin/login"); 
    }
}, [navigate]); 

return <>{authed ? children : null}</>;
};

export default AdminProtectedRoutes;
