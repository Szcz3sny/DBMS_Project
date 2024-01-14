import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type VehicleFormData = {
  userId: string;
  brand: string;
  model: string;
  yearOfProduction: string;
  vin: string;
  licensePlate: string;
};

type User = {
  id: number;
  name: string;
};

const AddVehicle: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<VehicleFormData>();

  useEffect(() => {
    axios
      .get("https://api.bazydanych.fun/v1/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError("Error fetching users: " + error.message);
      });
  }, []);

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    try {
      const response = await axios.post(
        `https://api.bazydanych.fun/v1/user/${data.userId}/vehicles`,
        {
          brand: data.brand,
          model: data.model,
          yearOfProduction: parseInt(data.yearOfProduction),
          licensePlate: data.licensePlate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Vehicle added successfully", response.data);
        reset();
      } else {
        setError(`Failed to add vehicle: Status code ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.data.message}`);
        console.error("Error adding vehicle", error.response?.data);
      } else {
        setError("An unknown error occurred");
        console.error("Unknown error", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 bg-black rounded-lg shadow-xl border border-gray-700 text-white">
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Dodaj pojazd
          </h2>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium">
              Użytkownik
            </label>
            <select
              {...register("userId")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
              required
            >
              <option value="">Wybierz użytkownika</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-wrap gap-4">
            <input
              {...register("brand")}
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              placeholder="Marka"
              required
            />
            <input
              {...register("model")}
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              placeholder="Model"
              required
            />
            <input
              {...register("yearOfProduction")}
              type="number"
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              placeholder="Rok produkcji"
              required
            />
            <input
              {...register("vin")}
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              placeholder="VIN"
              required
            />
            <input
              {...register("licensePlate")}
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              placeholder="Tablica rejestracyjna"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 font-bold w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Dodaj pojazd
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
