import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type User = {
  id: number;
  fullName: string;
};

type Vehicle = {
  id: number;
  model: string;
};

type MeetingFormData = {
  userId: number;
  vehicleId: number;
  datetime: string;
  defect: string;
  status: string;
};

const AddMeeting: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset, watch } = useForm<MeetingFormData>();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [enteredUserId, setEnteredUserId] = useState<string>("");

  useEffect(() => {
    axios
      .get("https://api.bazydanych.fun/v1/user/names", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        setError("Błąd przy pobieraniu użytkowników: " + error.message);
      });
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      axios
        .get(`https://api.bazydanych.fun/v1/user/${selectedUserId}/vehicles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setVehicles(response.data);
        })
        .catch((error) => {
          setError("Błąd przy pobieraniu pojazdów: " + error.message);
        });
    }
  }, [selectedUserId]);

  const onSubmit: SubmitHandler<MeetingFormData> = async (data) => {
    try {
      const meetingData = {
        userId: data.userId,
        vehicleId: data.vehicleId,
        datetime: data.datetime,
        defect: data.defect,
        status: data.status,
      };
      console.log(meetingData);
      const response = await axios.post(
        `https://api.bazydanych.fun/v1/calendar`,
        {
          userId: data.userId,
          vehicleId: data.vehicleId,
          datetime: data.datetime,
          defect: data.defect,
          status: data.status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Spotkanie zostało dodane", response.data);
        reset();
      } else {
        setError(`Błąd podczas dodawania spotkania: Kod błędu ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Błąd: ${error.response.data.message}`);
        console.error("Błąd podczas dodawania spotkania", error.response.data);
      } else {
        setError("Wystąpił nienznany błąd");
        console.error("Nieznany błąd", error);
      }
    }
  };

  const handleUserSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userId = event.target.value;
    setSelectedUserId(userId ? parseInt(userId) : undefined);
    setEnteredUserId(userId);
  };

  const handleUserIdInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userId = event.target.value;
    setEnteredUserId(userId);
    setSelectedUserId(userId ? parseInt(userId) : undefined);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 bg-black rounded-lg shadow-xl border border-gray-700 text-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Dodaj wizytę
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-300"
              >
                Użytkownik
              </label>
              <select
                {...register("userId")}
                value={enteredUserId}
                onChange={handleUserSelectChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
                required
              >
                <option value="">Wybierz użytkownika</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={enteredUserId}
                onChange={handleUserIdInputChange}
                className="mt-4 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
                placeholder="Lub wpisz ID użytkownika"
              />
            </div>

            <div>
              <label
                htmlFor="vehicleId"
                className="block text-sm font-medium text-gray-300"
              >
                Pojazd
              </label>
              <select
                {...register("vehicleId")}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-gray-700 text-white"
                disabled={!selectedUserId}
              >
                <option value="">Wybierz pojazd</option>
                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.model}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("datetime")}
              type="datetime-local"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-gray-700 text-white"
              placeholder="Data i czas"
              required
            />
            <input
              {...register("defect")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md bg-gray-700 text-white"
              placeholder="Opis usterki"
              required
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-300"
            >
              Status
            </label>
            <select
              {...register("status")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
              required
            >
              <option value="">Status</option>
              <option value="Umówiony">Umówiony</option>
              <option value="Zakończony">Zakończony</option>
              <option value="Anulowany">Anulowany</option>
            </select>
          </div>

          <button
            type="submit"
            className="mt-4 w-full inline-flex font-bold justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Dodaj spotkanie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeeting;
