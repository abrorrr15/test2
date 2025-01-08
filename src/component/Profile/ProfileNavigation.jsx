import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; 
import CloseIcon from '@mui/icons-material/Close'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';

const menu = [
  { title: 'Orders', icon: <ShoppingBagIcon /> },
  { title: 'Favorites', icon: <FavoriteIcon /> },
  { title: 'Address', icon: <AddReaction /> },
  { title: 'Payments', icon: <AccountBalanceWalletIcon /> },
  { title: 'Notification', icon: <NotificationsActiveIcon /> },
  { title: 'Events', icon: <EventIcon /> },
  { title: 'Logout', icon: <LogoutIcon /> },
];

const ProfileNavigation = ({ open, setOpenSideBar }) => {
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      dispatch(logout());
      navigate('/');
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
    setOpenSideBar(false); // Close the menu after navigation
  };

  const handleToggle = () => {
    setOpenSideBar((prev) => !prev); // Toggle menu open/close
  };

  return (
    <div className="relative">
      {/* Menu Button */}
      <Button variant="contained" onClick={handleToggle}>
        {open ? <CloseIcon /> : <MenuIcon />} {/* Toggle between open/close icons */}
      </Button>

      {/* Drawer (Sidebar) */}
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'} // Temporary for small screens
        open={open}
        onClose={handleToggle}
        anchor="left"
        sx={{
          zIndex: 1100, // Higher z-index value
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        }}
      >
        <div className="w-full lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-20">
          {menu.map((item, i) => (
            <React.Fragment key={i}>
              <div onClick={() => handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                {item.icon}
                <span>{item.title}</span>
              </div>
              {i !== menu.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;
