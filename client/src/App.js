import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from "./context/AuthContext";
import ErrorPage from "./pages/error/ErrorPage";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/error" element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
