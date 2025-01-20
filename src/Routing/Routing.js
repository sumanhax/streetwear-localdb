import React from 'react'
import { Routes,Route,BrowserRouter as Router } from 'react-router-dom'
import LandingPage from '../Hero/LandingPage'
import Navbar from '../Componenets/Layout/Navbar/Navbar'
import SignUpPage from '../Componenets/Authentication/SignUpPage'
import SignIn from '../Componenets/Authentication/SignIn'
import Profile from '../Componenets/Authentication/Profile'
import Dashboard from '../Admin/Dashboard'
import AdminLogin from '../Admin/AdminLogin'
import ProductDetails from '../Product/ProductDetails'
import AddProduct from '../Product/AddProduct'
import Footer from '../Componenets/Layout/Footer/Footer'
import AllProduct from '../Product/AllProduct'
import Cart from '../Cart/Cart'
import EditProduct from '../Product/EditProduct'
import ProtectedRoutes, { ProtectedRoutes2 } from '../Auth/auth'
import PNF from '../PNF/PNF'
import Error from '../Error/Error'
import Error2 from '../Error/Error2'

const Routing = () => {
  return (
    <div>
<Router>
    {/* <Navbar/> */}
    <Routes>
        <Route path='' element={<LandingPage/>} />
        <Route path='*' element={<PNF/>} />
        <Route path='signin' element={<SignIn/>} />
        <Route path='signup' element={<SignUpPage/>} />


        <Route element={<ProtectedRoutes/>}>
        <Route path='profile/:id' element={<Profile/>} />
        <Route path='cart' element={<Cart/>} />
        </Route>

        <Route path='adminlogin' element={<AdminLogin/>} />
        <Route path='productdetails/:id' element={<ProductDetails/>} />
        <Route path='allproduct/:all' element={<AllProduct/>} />

        <Route element={<ProtectedRoutes2/>}>
        <Route path='editproduct' element={<EditProduct/>} />
        <Route path='dashboard/:id' element={<Dashboard/>} />
        <Route path='addproduct' element={<AddProduct/>} />
        </Route>
        

        <Route path='error' element={<Error/>} />
        <Route path='error2' element={<Error2/>} />


    </Routes>
    
</Router>
    </div>
  )
}

export default Routing