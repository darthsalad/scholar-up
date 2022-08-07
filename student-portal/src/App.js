import React from "react"
import Home from "./pages/Home/Home"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Profile from "./pages/Profile/Profile"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navbar } from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
