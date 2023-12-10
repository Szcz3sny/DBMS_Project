import warsztatImage from "../img/warsztatTło.png";

const ContactLocation = () => {
  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center"
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
      </div>
    </div>
  );
};

export default ContactLocation;
