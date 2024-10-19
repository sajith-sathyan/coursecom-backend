    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import Cookies from "js-cookie";

    const PrivateRoute = ({ children }) => {
    const [authed, setAuthed] = useState(false); 
    const navigate = useNavigate(); 

    useEffect(() => {
        const accessToken = Cookies.get("accessToken"); 

        if (accessToken) {
        setAuthed(true); 
        } else {
        navigate("/login"); 
        }
    }, [navigate]); 

    return <>{authed ? children : null}</>;
    };

    export default PrivateRoute;
