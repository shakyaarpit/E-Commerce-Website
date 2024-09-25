import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/home";
import Order from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import NoPage from "./Pages/NoPage/NoPage";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ContextApi from "./Context/ContextApi";
import AllProducts from './Pages/AllProducts/AllProducts'
import Login from "./Pages/Registration/Login";
import Signup from "./Pages/Registration/Signup";
import ProductInfo from "./Pages/ProductInfo/ProductInfo";
import AddProduct from "./Pages/Admin/AddProduct";
import UpdateProduct from "./Pages/Admin/UpdateProduct";
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <>
      <ContextApi>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allproduct" element={<AllProducts />} />
            <Route path="/order" element={
              <protectedRoute>
            <Order/>
            </protectedRoute>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={
              <protectedRouteForAdmin>
                <Dashboard />
              </protectedRouteForAdmin>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/productinfo/:id" element={<ProductInfo />} />
            <Route path="/addproduct" element={
              <protectedRouteForAdmin>
                <AddProduct />
              </protectedRouteForAdmin>
            } />
            <Route path="/updateproduct" element={
              <protectedRouteForAdmin>
                <UpdateProduct />
              </protectedRouteForAdmin>
            } />
            <Route path="/*" element={<NoPage />} />
          </Routes>
          <ToastContainer/>
          <Footer />
        </BrowserRouter>
      </ContextApi>
    </>
  );
};

export default App;

// user

export const protectedRoute = (children) => {
  const user = localStorage.getItem("user")
  if (user){
    return children
  }
  else{
    return <Navigate to="/login"/>
  }
}

// admin
export const protectedRouteForAdmin = (children) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if(admin.user.email === "arpitshakya9956@gmail.com"){
    return children
  }
  else{
    return <Navigate to="/login"/>
  }
}