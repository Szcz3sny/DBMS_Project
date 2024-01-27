import React from "react";
import warsztatImage from "../img/warsztatTło.png";

const ContactLocation = () => {
  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
      }}
      aria-label="Warsztat"
    >
      <div className="h-16 md:h-24"></div>
      <div className="text-center text-white ">
        <h2 className="text-3xl font-semibold mb-4">
          <span className="bg-black bg-opacity-80 px-4 py-2 rounded-md">
            Kontakt
          </span>
        </h2>
        <p className="mb-2">
          <span className="bg-black bg-opacity-80 px-2 py-1 rounded-md ">
            Telefon: (123) 456-7890
          </span>{" "}
        </p>
        <p>
          <span className="bg-black bg-opacity-80 px-2 py-1 rounded-md ">
            Email: kontakt@motoserwis.pl
          </span>{" "}
        </p>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">
            <span className="bg-black bg-opacity-80 px-4 py-2 rounded-md">
              Lokalizacja
            </span>
          </h2>
          <p>
            <span className="bg-black bg-opacity-80 px-2 py-1 rounded-md">
              Adres: ul. Armii Krajowej 78, 58-302 Wałbrzych
            </span>
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4"></h2>
          <div className="max-w-lg mx-auto">
            <div
              className="relative overflow-hidden"
              style={{ paddingBottom: "50%" }}
            >
              <iframe
                title="Mapa Google"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.442021153748!2d16.280979315810552!3d50.75700977952712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fbc025010e2ab%3A0x676c0ef3980d5706!2sul.%20Armii%20Krajowej%2078%2C%2058-302%20Wa%C5%82brzych!5e0!3m2!1spl!2spl!4v1676006822277!5m2!1spl!2spl"
                allowFullScreen
                loading="eager"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
