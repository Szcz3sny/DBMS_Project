import warsztatImage from "../img/warsztatTło.png";

const AvailableParts = () => {
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

      <div className="mx-auto max-w-screen-lg bg-black bg-opacity-80 text-white p-4 md:p-8 text-center">
        <h2 className="text-3xl font-semibold">Kiedyś powstanie</h2>
      </div>
    </div>
  );
};

export default AvailableParts;
