import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Login from "./scenes/login";
import ScheduleManagement from "./scenes/schedule";
import OnlineMeeting from "./scenes/onlinemeeting";
import Handover from "./scenes/handover";
import HandoverTNV from "./scenes/handoverTNV";
import DiaryTNV from "./scenes/diaryTNV";
import DiaryTBCm from "./scenes/diaryTBCm";
import HandoverTBCm from "./scenes/handoverTBCm";
import ManageAccounts from "./scenes/account"
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
            <Route path="/schedule-management" element={<ScheduleManagement />} />
            <Route path="/online-meeting" element={<OnlineMeeting />} />
            <Route path="/handover" element={<Handover />} />
            <Route path="/handoverTNV" element={<HandoverTNV />} />
            <Route path="/diaryTNV" element={<DiaryTNV />} />
            <Route path="/diaryTBCm" element={<DiaryTBCm />} />
            <Route path="/handoverTBCm" element={<HandoverTBCm />} />
            <Route path="/manageAccounts" element={<ManageAccounts />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default AppRouter;
