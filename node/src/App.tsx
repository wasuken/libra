import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import useAuth from "@/useAuth";

function App() {
  const { logout } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <div>
                <a href="/">本をかりる</a>
              </div>
              <div>
                <a href="/">本をかえす</a>
              </div>
              <div>
                <a href="/">本一覧をみる</a>
              </div>
              <button onClick={logout}>logout</button>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
