import warsztatImage from "./img/warsztatTło.png";

const ContactLocation = () => {
  return (
    <div
      className="flex flex-col items-center justify-center p-8"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <div className="text-center absolute top-1/4 w-full">
        <h2 className="text-3xl font-semibold mb-4">
          <span className="bg-black bg-opacity-70 px-4 py-2 rounded-md">
            Kontakt
          </span>
        </h2>
        <p className="mb-2">
          <span className="bg-black bg-opacity-70 px-2 py-1 rounded-md ">
            Telefon: (123) 456-7890
          </span>{" "}
        </p>
        <p>
          <span className="bg-black bg-opacity-70 px-2 py-1 rounded-md ">
            Email: kontakt@motoserwis.pl
          </span>{" "}
        </p>

        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4">
            <span className="bg-black bg-opacity-70 px-4 py-2 rounded-md">
              Lokalizacja
            </span>
          </h2>
          <p>
            <span className="bg-black bg-opacity-70 px-2 py-1 rounded-md">
              Adres: ul. Armii Krajowej 78, 58-302 Wałbrzych
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
