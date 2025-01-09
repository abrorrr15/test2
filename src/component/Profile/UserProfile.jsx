import React, { useEffect } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../State/Authentication/Action";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(getUser(jwt));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    dispatch(logout());
    navigate("/account/login");
  };
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-2xl font-semibold">Code with Botir</h1>
        <p>Email:botirabdualimov7@gmail.com</p>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
