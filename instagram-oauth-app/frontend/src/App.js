import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Posts from "./components/posts";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
};

export default App;
