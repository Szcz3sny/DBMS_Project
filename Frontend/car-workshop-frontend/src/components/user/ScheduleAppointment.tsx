import React, { useState, useEffect } from "react";
import axios from 'axios';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
}

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  license_plate: string;
}

const ScheduleAppointment = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserDataAndVehicles = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Brak tokenu");
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const userResponse = await axios.get('https://api.bazydanych.fun/v1/user/me', config);
        const fetchedUserId = userResponse.data.id;
        setUserId(fetchedUserId);

        if (fetchedUserId) {
          const vehiclesResponse = await axios.get(`https://api.bazydanych.fun/v1/user/${fetchedUserId}/vehicles`, config);
          setVehicles(vehiclesResponse.data);
        }

        // Pobranie usług
        const servicesResponse = await axios.get('https://api.bazydanych.fun/v1/price', config);
        setServices(servicesResponse.data);

      } catch (error) {
        console.error("Wystąpił problem podczas pobierania danych", error);
      }
    };

    fetchUserDataAndVehicles();
  }, []);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setSelectedService({ id: -1, name: "Inna usterka", description: "", price: "Cena do ustalenia" });
    } else {
      const serviceId = Number(e.target.value);
      const service = services.find(s => s.id === serviceId);
      setSelectedService(service || null);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedVehicle(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedService) {
      console.error('Usluga nie zostala wybrana');
      return;
    }

    const appointmentData = {
      user_id: userId,
      vehicle_id: selectedVehicle,
      datetime: selectedDate,
      defect: selectedService.name,
      status: 'Czeka na potwierdzenie'
    };

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      };

      try {
        const response = await axios.post('https://api.bazydanych.fun/v1/calendar', appointmentData, config);
        console.log('Wizyta zostala zaplanowana', response);
      } catch (error) {
        console.error('Wystapil problem z umawianiem sie na wizyte', error);
      }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-5">
          <h1 className="text-4xl font-bold text-center">Umów się na wizytę</h1>
        </div>
      </div>

      <div className="mx-auto max-w-sm text-white mb-20">
        <form className="bg-black text-white bg-opacity-80 p-4 md:p-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="service" className="text-xl font-bold text-center">
              Wybierz usługę:
            </label>
            <select
              id="service"
              value={selectedService ? selectedService.id.toString() : ""}
              onChange={handleServiceChange}
              className="form-select text-black block w-full mt-4"
            >
              <option value="">Wybierz usługę</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
              <option value="other">Inna usterka</option> {}
            </select>
          </div>
  
          {selectedService && (
            <div className="mb-4">
              <p className="text-white">
              {selectedService.name === "Inna usterka" ? selectedService.price : `Cena usługi: ${selectedService.price} zł`}
              </p>
            </div>
          )}
  
          <div className="mb-4">
            <label htmlFor="date" className="block text-xl font-medium mb-2">
              Wybierz datę:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="form-input text-black block w-full mt-1"
            />
          </div>
  
          <div className="mb-4">
        <label htmlFor="vehicle" className="block text-sm font-medium mb-2">
          Wybierz pojazd:
        </label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={handleVehicleChange}
          className="form-select text-black block w-full mt-1"
        >
          <option value="">Wybierz pojazd</option>
          {vehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>
              {`${vehicle.brand} ${vehicle.model} (${vehicle.license_plate})`}
            </option>
          ))}
        </select>
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
