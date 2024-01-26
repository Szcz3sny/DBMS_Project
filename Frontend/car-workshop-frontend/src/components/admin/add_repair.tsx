import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

type Vehicle = {
  id: number;
  model: string;
};

type User = {
  id: number;
  fullName: string;
};

type RepairFormData = {
  vehicleId: number;
  description: string;
  price: number;
  photo: FileList; // Dodane pole dla przechowywania pliku/zdjęcia
};

const AddRepair: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { register, handleSubmit, reset, watch } = useForm<RepairFormData>();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [enteredUserId, setEnteredUserId] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  const onSubmit: SubmitHandler<RepairFormData> = async (data) => {
    try {
      const repairResponse = await axios.post(
        "https://api.bazydanych.fun/v1/repairs",
        {
          vehicleId: data.vehicleId,
          description: data.description,
          price: data.price,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const repairId = repairResponse.data.id;

      const formData = new FormData();
      formData.append("photo", data.photo[0]);

      const photoResponse = await axios.post(
        `https://api.bazydanych.fun/v1/repairs/${repairId}/photos`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Pomyślnie dodano zdjęcie:", photoResponse.data);
      reset();
    } catch (error) {}
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
            Dodaj naprawę
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
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Opis
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full  text-base rounded-md bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-300"
            >
              Cena
            </label>
            <input
              {...register("price")}
              type="text"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-300"
            >
              Zdjęcie
            </label>
            <input
              type="file"
              {...register("photo")}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full inline-flex font-bold justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600"
          >
            Dodaj naprawę
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRepair;
