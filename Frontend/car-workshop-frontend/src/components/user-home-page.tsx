import { Link } from "react-router-dom";
import warsztatImage from "./img/warsztatTło.png";
interface UserHomePageProps {
  username?: string;
}

const UserHomePage: React.FC<UserHomePageProps> = ({ username }) => {
  return (
    <div
      className="flex flex-col h-screen bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
      }}
      aria-label="User Home Page"
    >
      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8">
          <h1 className="text-4xl font-bold text-center">{`Witaj w Moto Serwisie, ${username}!`}</h1>
        </div>
      </div>

      <div className=" flex justify-center ">
        <div className="w-full  flex flex-col items-center justify-center p-4 md:px-0 space-y-4 ">
          <Link to="/" className="w-11/12 md:w-1/2 ">
            <div className="flex justify-center items-center h-24 bg-black shadow-md rounded-lg  mb-10  hover:bg-red-700 transition-colors">
              <h3 className="text-lg font-semibold text-white">Umów wizytę</h3>
            </div>
          </Link>
          <Link to="/check-visits" className="w-11/12 md:w-1/2 ">
            <div className="flex justify-center items-center h-24 bg-black shadow-md rounded-lg  mb-10  hover:bg-red-700 transition-colors">
              <h3 className="text-lg font-semibold text-white">
                Sprawdź wizyty
              </h3>
            </div>
          </Link>
          <Link to="/" className="w-11/12 md:w-1/2">
            <div className="flex justify-center items-center h-24 bg-black shadow-md rounded-lg  mb-10  hover:bg-red-700 transition-colors">
              <h3 className="text-lg font-semibold text-white">
                Sprawdź historię wizyt
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
