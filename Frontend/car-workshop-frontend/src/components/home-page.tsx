import React from "react";
import MainHomePage from "@/components/main/main-home-page";
import UserHomePage from "@/components/user/user-home-page";
import AdminHomePage from "@/components/admin/admin-home-page";

interface HomePageProps {
  isLoggedIn: boolean;
  username?: string;
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, username }) => {
  if (isLoggedIn) {
    if (username === "admin") {
      return <AdminHomePage />;
    } else {
      return <UserHomePage username={username} />;
    }
  } else {
    return <MainHomePage />;
  }
};

export default HomePage;
