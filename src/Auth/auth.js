import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoutes=()=>{
    const isUserLogged = window.sessionStorage.getItem('isUserLogged')
    return (isUserLogged) ? <Outlet/>:<Navigate to='/error' />;
}


export const ProtectedRoutes2=()=>{
    const isAdminLogged = window.sessionStorage.getItem('isAdminLogged')
    // console.log(isAdminLogged);
    
    return (isAdminLogged) ? <Outlet/>:<Navigate to='/error2' />;
   }

export default ProtectedRoutes