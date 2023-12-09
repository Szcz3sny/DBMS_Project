import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import HomePage from "@/components/home-page";
import Login from "@/components/login";
import Contact from "@/components/main/contactAndLocation";
import Offers from "@/components/main/offers";
import AParts from "@/components/main/available-parts";

import { useState } from "react";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: JSX.Element;
}

const ProtectedRoute = ({ isLoggedIn, children }: ProtectedRouteProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string>("");

  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <>
      <BrowserRouter>
        <NavBar
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
        />
        <Routes>
          <Route
            path="/"
            element={<HomePage isLoggedIn={isLoggedIn} username={username} />}
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/contactAndLocation" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/avaible-parts" element={<AParts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
