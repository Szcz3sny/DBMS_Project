import React, { useState, useEffect } from "react";
import CheckRepairStatus from "./CheckRepairStatus";
import MyVehicles from "./MyVehicles";
import UserCalendar from "./UserCalendar";
import warsztatImage from "../img/warsztatTło.png";

interface UserHomePageProps {
  username?: string;
}

const UserHomePage: React.FC<UserHomePageProps> = () => {
  const [activeComponent, setActiveComponent] = useState<string>("");
  const [username, setUsername] = useState<string>("Gość"); 

  const isActive = (componentName: string) => activeComponent === componentName;

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  const menuItemClass = (componentName: string) =>
    `cursor-pointer p-2 md:p-4 ${
      activeComponent === componentName
        ? "bg-red-800 text-white"
        : "text-white hover:bg-red-600"
    }`;

  const renderComponent = () => {
    switch (activeComponent) {
      case "my-vehicles":
        return <MyVehicles />;
      case "check-repair-status":
        return <CheckRepairStatus />;
      case "calendar":
        return <UserCalendar />;
      default:
        return (
          <div className="flex justify-center items-center h-1/5 mt-5">
            <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8">
              <h1 className="text-4xl font-bold text-center">{`Witaj w Moto Serwisie, ${username}!`}</h1>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
      }}
      aria-label="Warsztat"
    >
      <div className="h-8 md:h-8 "></div>
      <div className="mx-auto  flex flex-col md:flex-row justify-center md:justify-between items-center w-full max-w-2xl p-4 bg-black bg-opacity-80 rounded mt-4">
        <div
          className={menuItemClass("my-vehicles")}
          onClick={() => setActiveComponent("my-vehicles")}
        >
          Zobacz moje pojazdy
        </div>
        <div
          className={menuItemClass("check-repair-status")}
          onClick={() => setActiveComponent("check-repair-status")}
        >
          Sprawdź stan naprawy
        </div>
        <div
          className={menuItemClass("calendar")}
          onClick={() => setActiveComponent("calendar")}
        >
          Kalendarz spotkań
        </div>
      </div>

      <div>{renderComponent()}</div>
    </div>
  );
};

export default UserHomePage;
