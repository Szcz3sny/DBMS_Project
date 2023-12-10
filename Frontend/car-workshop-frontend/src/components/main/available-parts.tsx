import React from "react";
import warsztatImage from "../img/warsztatTło.png";
import akebonoLogo from "../img/akebono.png";
import bmwLogo from "../img/BMW.png";
import boschLogo from "../img/bosch.png";
import kybLogo from "../img/kyb.png";
import maybachLogo from "../img/skoda.png";
import rrLogo from "../img/mini.png";

const AvailableParts = () => {
  const availablePartsList = [
    { brand: "Akebono", logo: akebonoLogo },
    { brand: "BMW", logo: bmwLogo },
    { brand: "Bosch", logo: boschLogo },
    { brand: "KYB", logo: kybLogo },
    { brand: "skoda", logo: maybachLogo },
    { brand: "mini", logo: rrLogo },
  ];

  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
      }}
      aria-label="Warsztat"
    >
      <div className="mx-auto max-w-screen-lg bg-black bg-opacity-80 text-white p-4 md:p-8 text-center">
        <h2 className="text-3xl font-semibold mt-4">Dostępne Części w Warsztacie Samochodowym</h2>

        <div className="flex flex-wrap justify-around items-center mt-4">
          {availablePartsList.map((part, index) => (
            <div key={index} className="m-4 w-1/3">
              <img src={part.logo} alt={`${part.brand} logo`} className="h-32 w-full object-contain mb-2" />
              <p>{part.brand}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableParts;
