import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import DashboardPlus from "./components/dashboardPlus";
import Signup from "./components/signup";
import Login from "./components/login";
import Posts from "./components/posts";
import LinkedIn from "./components/linkedin";

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard-plus" element={<DashboardPlus key={Date.now()} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/authentication/linkedin/callback" element={<LinkedIn />} />
      </Routes>
    </Router>
  );
};

export default App;
