import React from "react";
import MainHomePage from "@/components/main/main-home-page";
import UserHomePage from "@/components/user/user-home-page";

interface HomePageProps {
  isLoggedIn: boolean;
  username?: string; // Optional because it will only be there if logged in
}

const HomePage: React.FC<HomePageProps> = ({ isLoggedIn, username }) => {
  if (isLoggedIn) {
    return <UserHomePage username={username} />;
  } else {
    return <MainHomePage />;
  }
};

export default HomePage;
