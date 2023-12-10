import React, { useState } from "react";

// Provided sample data
const visitsData = [
  {
    fault: "Zmiana oleju",
    description: "Wymiana oleju w samochodzie",
    price: "100.00",
  },
  {
    fault: "Sprawdzenie hamulców",
    description: "Sprawdzenie hamulców w samochodzie czy wszystko działa.",
    price: "250.00",
  },
  {
    fault: "Zmiana opon",
    description: "Wymiana opon na nowe.",
    price: "800.00",
  },
];

const ScheduleAppointment = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedService(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const selectedPrice =
    visitsData.find((service) => service.fault === selectedService)?.price ||
    "";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-1/5 mt-5">
      <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-20">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="service"
              className="block text-sm  font-medium mb-2"
            >
              Wybierz usługe:
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={handleServiceChange}
              className="form-select text-black block w-full mt-1"
            >
              <option value="" className="text-black">
                Wybierz usługe
              </option>
              {visitsData.map((service, index) => (
                <option
                  className="text-black"
                  key={index}
                  value={service.fault}
                >
                  {service.fault}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cena:</label>
            <input
              type="text"
              value={selectedPrice}
              readOnly
              className="form-input text-black block w-full mt-1"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm  font-medium mb-2">
              Wybierdz date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="form-input text-black block w-full mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 shadow md:mt-4"
          >
            Umów się
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
