import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainNav } from "@/components/main-nav";
import { Fotter } from "@/components/footer";
import HomePage from "@/components/home-page";
import Login from "@/components/login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider>
          <MainNav />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Fotter />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
