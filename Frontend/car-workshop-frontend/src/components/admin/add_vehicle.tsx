import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type VehicleFormData = {
  brand: string;
  model: string;
  yearOfProduction: string;
  vin: string;
  licensePlate: string;
};

type Vehicle = {
  id: number;
  brand: string;
  model: string;
  licensePlate: string;
};

type User = {
  id: number;
  fullName: string;
};

const AddVehicle: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userVehicles, setUserVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState("");
  const { register, handleSubmit, reset } = useForm<VehicleFormData>();
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
        setError("Błąd przy pobieraniu uzytkowników: " + error.message);
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
          setUserVehicles(response.data);
        })
        .catch((error) => {
          setError("Błąd przy pobieraniu pojazdów:: " + error.message);
        });
    } else {
      setUserVehicles([]);
    }
  }, [selectedUserId]);

  const fetchUserVehicles = (userId: string) => {
    if (userId) {
      axios
        .get(`https://api.bazydanych.fun/v1/user/${userId}/vehicles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserVehicles(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setUserVehicles([]); // Ustaw pustą listę, jeśli użytkownik nie istnieje
            console.log("Użytkownik o podanym identyfikatorze nie istnieje.");
          } else {
            setError("Błąd przy pobieraniu pojazdów: " + error.message);
          }
        });
    } else {
      setUserVehicles([]);
    }
  };

  const handleUserSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userId = event.target.value;
    setSelectedUserId(userId ? parseInt(userId) : undefined);
    setEnteredUserId(userId);

    if (userId && !isNaN(parseInt(userId))) {
      fetchUserVehicles(userId);
    } else {
      setUserVehicles([]);
    }
  };

  const handleUserIdInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userId = event.target.value;
    setEnteredUserId(userId);
    setSelectedUserId(userId ? parseInt(userId) : undefined);

    if (userId && !isNaN(parseInt(userId))) {
      fetchUserVehicles(userId);
    } else {
      setUserVehicles([]);
    }
  };

  const handleDeleteVehicle = async (vehicleId: number) => {
    try {
      const response = await axios.delete(
        `https://api.bazydanych.fun/v1/user/${selectedUserId}/vehicles/${vehicleId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("Pojazd pomyślnie usunięty", response.data);
        setUserVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.id !== vehicleId)
        );
      } else {
        setError(`Błąd podczas usuwania pojazdu: Kod błędu ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          setUserVehicles([]); // Wyczyść listę pojazdów
          console.log("Nie znaleziono pojazdu o podanym identyfikatorze.");
        } else {
          setError(`Błąd: ${error.response.data.message}`);
          console.error("Błąd podczas usuwania pojazdu", error.response.data);
        }
      } else {
        setError("Wystąpił nieznany błąd");
        console.error("Nieznany błąd", error);
      }
    }
  };

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    if (!selectedUserId) {
      setError("Proszę wybrać użytkownika lub wpisac ID użytkownika.");
      return;
    }

    try {
      const response = await axios.post(
        `https://api.bazydanych.fun/v1/user/${selectedUserId}/vehicles`,
        {
          ...data,
          yearOfProduction: parseInt(data.yearOfProduction),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Pojazd został pomyślnie dodany", response.data);
        reset();
        setEnteredUserId("");
        setSelectedUserId(undefined);

        fetchUserVehicles(selectedUserId.toString());
      } else {
        setError(`Nie udało się dodać pojazdu: Kod statusu ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Błąd: ${error.response.data.message}`);
        console.error("Błąd podczas dodawania pojazdu", error.response.data);
      } else {
        setError("Wystąpił nieznany błąd");
        console.error("Nieznany błąd", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 bg-black rounded-lg shadow-xl border border-gray-700 text-white">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">
            Dodaj pojazd
          </h2>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium">
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
            className="mt-4 font-bold w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600"
          >
            Dodaj pojazd
          </button>
        </form>
        <div className="mb-4">
          <h3 className="text-2xl font-semibold mb-3 text-center">
            Lista pojazdów
          </h3>
          {userVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex justify-between items-center mb-2 bg-gray-800 rounded-md p-2"
            >
              <span>{`${vehicle.brand} ${vehicle.model} - ${vehicle.licensePlate}`}</span>
              <button
                onClick={() => handleDeleteVehicle(vehicle.id)}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
              >
                Usuń
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
