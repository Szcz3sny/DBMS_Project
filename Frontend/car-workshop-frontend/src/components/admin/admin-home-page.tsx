import React, { useState } from "react";

import warsztatImage from "../img/warsztatTło.png";
import ChangeOfferPanel from "./change-offer-panel";
import AddVehicle from "./add_vehicle";
import AddMeeting from "./add_appointment";
interface UserHomePageProps {
  username?: string;
}

const AdminHomePage: React.FC<UserHomePageProps> = ({ username }) => {
  const [activeComponent, setActiveComponent] = useState<string>("");

  const isActive = (componentName: string) => activeComponent === componentName;

  const menuItemClass = (componentName: string) =>
    `cursor-pointer p-2 md:p-4 ${
      activeComponent === componentName
        ? "bg-red-800 text-white"
        : "text-white hover:bg-red-600"
    }`;

  const renderComponent = () => {
    switch (activeComponent) {
      case "change-offer-panel":
        return <ChangeOfferPanel />;
      case "check-repair-status":
        return <AddVehicle />;
      case "add_appointment":
        return <AddMeeting />;
      default:
        return <div></div>;
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
          className={menuItemClass("change-offer-panel")}
          onClick={() => setActiveComponent("change-offer-panel")}
        >
          Zmień oferte
        </div>
        <div
          className={menuItemClass("check-repair-status")}
          onClick={() => setActiveComponent("check-repair-status")}
        >
          Dodaj pojazd
        </div>
        <div
          className={menuItemClass("add_appointment")}
          onClick={() => setActiveComponent("add_appointment")}
        >
          Umów na wizytę
        </div>
      </div>

      <div>{renderComponent()}</div>
    </div>
  );
};

export default AdminHomePage;
