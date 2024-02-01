import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {

    const [loggedIn] = useState(true);

    if (loggedIn) {
        return <Outlet />
    } else {
        return <Navigate to={'/signin'} />;
    }

}

export default PrivateRoute