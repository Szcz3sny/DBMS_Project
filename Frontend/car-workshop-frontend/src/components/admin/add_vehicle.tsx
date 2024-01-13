import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type VehicleFormData = {
  userId: string; // Assuming you will enter userId directly for simplicity
  brand: string;
  model: string;
  yearOfProduction: string;
  vin: string;
  licensePlate: string;
};

const AddVehicle: React.FC = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<VehicleFormData>();

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    try {
      // Now, post the vehicle data using the provided user ID
      const response = await axios.post(
        `https://api.bazydanych.fun/v1/user/${data.userId}/vehicles`, // Make sure the userId is provided correctly
        {
          brand: data.brand,
          model: data.model,
          yearOfProduction: parseInt(data.yearOfProduction), // Make sure to parse string to number
          vin: data.vin,
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
      <div className="w-full max-w-4xl p-6 bg-black rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-3xl font-semibold mb-4 text-center text-white">
          Dodaj pojazd
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Wpisz dane pojazdu
          </h3>
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Inputs and button for adding a vehicle */}
            <input
              {...register("userId")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="User ID"
              required
            />
            <input
              {...register("brand")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="Brand"
              required
            />
            <input
              {...register("model")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="Model"
              required
            />
            <input
              {...register("yearOfProduction")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="Year of Production"
              required
            />
            <input
              {...register("vin")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="VIN"
              required
            />
            <input
              {...register("licensePlate")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="License Plate"
              required
            />
            <button
              className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              type="submit"
            >
              Dodaj pojazd
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVehicle;
