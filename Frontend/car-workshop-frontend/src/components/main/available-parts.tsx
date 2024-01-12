import React from "react";
import warsztatImage from "../img/warsztatTło.png";
import akebonoLogo from "../img/akebono.png";
import bmwLogo from "../img/BMW.png";
import boschLogo from "../img/bosch.png";
import kybLogo from "../img/kyb.png";
import maybachLogo from "../img/skoda.png";
import rrLogo from "../img/mini.png";
import { useHref } from "react-router-dom";

const AvailableParts = () => {
  const availablePartsList = [
    { brand: "Akebono", logo: akebonoLogo, url: "http://akebonobrakes.com"},
    { brand: "BMW", logo: bmwLogo,url: "https://d-art.ppstatic.pl/kadry/k/r/7c/8b/5edbd29e8c09f_o_full.jpg" },
    { brand: "Bosch", logo: boschLogo,url: "https://www.bosch.pl" },
    { brand: "KYB", logo: kybLogo,url: "https://kyb-europe.com/polska/" },
    { brand: "skoda", logo: maybachLogo,url: "https://www.skoda-auto.pl" },
    { brand: "mini", logo: rrLogo,url: "https://www.mini.com.pl/pl_PL/home.html" },
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
            <a key={index} href={part.url || "#"} target="_blank" rel="noopener noreferrer" className="m-4 w-1/3">
            <img
              src={part.logo}
              alt={`${part.brand} logo`}
              className="h-32 w-full object-contain mb-2"
            />
            <p>{part.brand}</p>
          </a>
          ))}
        </div>
      </div>
    </div>
  );
};``

export default AvailableParts; 
