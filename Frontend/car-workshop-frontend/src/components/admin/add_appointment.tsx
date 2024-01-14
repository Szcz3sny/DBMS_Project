import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type MeetingFormData = {
  userId: string;
  vehicleId: string;
  datetime: string;
  defect: string;
};

const AddMeeting: React.FC = () => {
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<MeetingFormData>();

  const onSubmit: SubmitHandler<MeetingFormData> = async (data) => {
    try {
      const response = await axios.post(
        `https://api.bazydanych.fun/v1/calendar`,
        {
          userId: parseInt(data.userId),
          vehicleId: parseInt(data.vehicleId),
          datetime: data.datetime,
          defect: data.defect,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Meeting added successfully", response.data);
        reset();
      } else {
        setError(`Failed to add meeting: Status code ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.data.message}`);
        console.error("Error adding meeting", error.response?.data);
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
          Dodaj spotkanie
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Wpisz dane spotkania
          </h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              {...register("userId")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="User ID"
              required
            />
            <input
              {...register("vehicleId")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="Vehicle ID"
              required
            />
            <input
              {...register("datetime")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="Datetime (YYYY-MM-DD HH:MM)"
              required
            />
            <input
              {...register("defect")}
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              placeholder="Defect"
              required
            />
            <button
              className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              type="submit"
            >
              Dodaj spotkanie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeeting;
