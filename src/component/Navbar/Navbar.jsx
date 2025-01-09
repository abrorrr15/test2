import { Avatar, IconButton, Badge, Box } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  const navigate = useNavigate();
  const handleAvatarClick = () => {
    if (auth.user?.role === "ROLE_CUSTOMER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/restaurant");
    }
  };
  // Function to get the first letter of the user's full name
  const getUserInitial = (fullName) => {
    return fullName ? fullName.charAt(0).toUpperCase() : "?";
  };

  return (
    <Box className="px-5 sticky top-0 z-50 py-3 bg-[#e91e63] lg:px-20 flex justify-between items-center">
      {/* Logo */}
      <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
        <li
          onClick={() => navigate("/")}
          className="font-semibold text-gray-100 text-2xl"
        >
          Fast Food
        </li>
      </div>

      {/* Search, Avatar, and Cart Badge */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div>
          <IconButton>
            <SearchIcon sx={{ fontSize: "1.5rem", color: "white" }} />
          </IconButton>
        </div>

        {/* User Avatar or Login Icon */}
        <div>
          {auth.user ? (
            <Avatar
              onClick={handleAvatarClick}
              sx={{ bgcolor: "white", color: "#e91e63" }}
            >
              {getUserInitial(auth.user.fullName)}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person sx={{ fontSize: "1.5rem", color: "white" }} />
            </IconButton>
          )}
        </div>

        {/* Shopping Cart Badge */}
        <div>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <ShoppingCartIcon sx={{ fontSize: "1.5rem", color: "white" }} />
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
