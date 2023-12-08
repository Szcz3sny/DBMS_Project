import "./App.css";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDashboard from './userDashboard';
import CheckRepairStatus from './CheckRepairStatus';
import MyVehicles from './MyVehicles';
import ScheduleAppointment from './ScheduleAppointment';
>>>>>>> 943ac0c (Panel uzytkownika, poprawa formularza logowania, zmiana wygladu formularza, dodanie podstron)
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import HomePage from "@/components/home-page";
import Login from "@/components/login";
import Contact from "@/components/contactAndLocation";
import CheckVisits from "./components/check-visits";
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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [username, setUsername] = useState<string>(
    localStorage.getItem('username') || ''
  );

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
<<<<<<< HEAD
          <Route
            path="/login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/contactAndLocation" element={<Contact />} />
          <Route
            path="/check-visits"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CheckVisits />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
=======
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />}/>
            <Route path="/contactAndLocation" element={<Contact />} />
            <Route path="/dashboard" element={<UserDashboard username={username} />} />
            <Route path="check-repair-status" element={<CheckRepairStatus />} />
            <Route path="my-vehicles" element={<MyVehicles />} />
            <Route path="schedule-appointment" element={<ScheduleAppointment />} />

          </Routes>
          <Footer />
        </ThemeProvider>
>>>>>>> 943ac0c (Panel uzytkownika, poprawa formularza logowania, zmiana wygladu formularza, dodanie podstron)
      </BrowserRouter>
    </>
  );
}

export default App;
