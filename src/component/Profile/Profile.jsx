import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import UserProfile from './UserProfile'; // UserProfile komponentasini import qilish
import Orders from './Orders';
import Address from './Address';
import Favourites from './Favourites';
import Events from './Events';

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false); // Sidebar holatini saqlash

  return (
    <div className="lg:flex justify-between">
      {/* Sidebar */}
      <div className="sticky h-[80vh] lg:w-[20%]">
        {/* ProfileNavigation komponenyasiga open va setOpenSideBar ni uzatish */}
        <ProfileNavigation open={openSideBar} setOpenSideBar={setOpenSideBar} />
      </div>

      {/* Asosiy kontent */}
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favorites" element={<Favourites />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
