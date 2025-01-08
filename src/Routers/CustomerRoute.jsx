import React from 'react';
import Navbar from '../component/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from '../component/Home/Home';  // UserProfile komponentasini import qilish
import Orders from '../component/Profile/Orders';  // Masalan, Orders komponentasini import qilish
import RestaurantDetails from '../component/Restaurant/RestaurantDetails'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth';
const CustomerRoute = () => {
  return (
    <div>
      <Navbar />  {/* Navbar komponenyasini qo'shish */}
      
      {/* Routing */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/account/:register" element={<Home />} /> 
        <Route path="/restaurant/:city/:title/:id" element={<RestaurantDetails />} /> 
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/my-profile/*" element={<Profile />} /> 
      </Routes>
      <Auth/>
    </div>
  );
};

export default CustomerRoute;
///my-profile/order
