import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import HomePage from "@/components/home-page";
import Login from "@/components/login";
import Contact from "@/components/contactAndLocation";
import CheckVisits from "./components/check-visits";
import { useState } from "react";

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
          <Route path="/check-visits" element={<CheckVisits />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
