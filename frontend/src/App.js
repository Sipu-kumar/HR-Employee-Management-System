import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './App.css';

import Login from "./components/Login";
import Register from "./components/Register";
import AuthService from "./components/AuthService";

function App() {
  const user = AuthService.getCurrentUser();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={user ? <EmployeeList /> : <Login />} />
        <Route path="/add" element={user ? <AddEmployee /> : <Login />} />
        <Route path="/update/:id" element={user ? <UpdateEmployee /> : <Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
