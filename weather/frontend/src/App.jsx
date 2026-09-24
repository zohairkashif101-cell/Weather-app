import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Weather from "./pages/Weather";
import { logoutUser } from "./services/api";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => (
    localStorage.getItem("token") ? { authenticated: true } : null
  ));

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <>
      <Navbar isAuthenticated={Boolean(user)} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
