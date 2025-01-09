import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "./Theme/DarkTheme";
import { CssBaseline } from "@mui/material";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Home/Home";
import RestaurantDetails from "./component/Restaurant/RestaurantDetails";
import Cart from "./component/Cart/Cart";
import Profile from "./component/Profile/Profile";
import CustomerRoute from "./Routers/CustomerRoute";
import Auth from "./component/Auth/Auth";
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <Home />
      <RestaurantDetails />
      <Cart />
      <Profile />
      <CustomerRoute />
    </ThemeProvider>
  );
}

export default App;
