import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Login from "./scenes/login";
import { UserProvider } from './UserContext';
const AppRouter = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/" element={authenticated ? <App /> : <Navigate to="/login" />} >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default AppRouter;
