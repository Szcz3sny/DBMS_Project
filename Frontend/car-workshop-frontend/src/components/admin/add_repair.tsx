import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { cwd } from "process";

type Vehicle = {
  id: number;
  model: string;
};

type User = {
  id: number;
  fullName: string;
};

type Repair = {
  id: number;
  vehicleId: number;
  description: string;
  price: number;
  status: string; 
};

type RepairFormData = {
  vehicleId: number;
  description: string;
  price: number;
  photo: FileList;
};

interface PhotoData {
  id: number;
  repairId: number;
  photoUrl: string;
}

const translateStatus = (status: string) => {
  const statusTranslations: {[key: string]: string} = {
    'FINISHED': 'Zakończono',
    'IN_PROGRESS': 'W trakcie',
    'CANCELED': 'Anulowano',
  };

  return statusTranslations[status] || status;
};

const AddRepair: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [repairPhotos, setRepairPhotos] = useState<PhotoData[]>([]);
  const { register, handleSubmit, reset, watch } = useForm<RepairFormData>();
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [enteredUserId, setEnteredUserId] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedRepairId, setSelectedRepairId] = useState<number | null>(null);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string | null>(null);
  const [editingRepairId, setEditingRepairId] = useState<number | null>(null);
  const [editedRepair, setEditedRepair] = useState<Repair | null>(null);


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

  useEffect(() => {
    axios
      .get("https://api.bazydanych.fun/v1/repairs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRepairs(response.data);
      })
      .catch((error) => {
        setError("Błąd przy pobieraniu napraw: " + error.message);
      });
  }, []);

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

       // Uzupełnianie brakujących danych
    if (repairResponse.data && repairResponse.data.id) {
      const newRepair = {
        id: repairResponse.data.id,
        vehicleId: data.vehicleId,
        description: data.description,
        price: data.price,
        status: "IN_PROGRESS"
      };
      setRepairs(previousRepairs => [...previousRepairs, newRepair]);
    } else {
      console.error("Niepełne dane w odpowiedzi serwera");
    }

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

      fetchRepairPhotos(repairId);
      reset();
    } catch (error) {
      console.error("Error occurred while adding repair:", error);
    }
  };
  const handleSaveChanges = async (repairId: number) => {
    if (!editedRepair) return;
    
    try {
      const response = await axios.post(
        `https://api.bazydanych.fun/v1/repairs/${repairId}/status`,
        {
          status: editedRepair.status,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.status === 200) {
        console.log("Status naprawy został pomyślnie zaktualizowany");
        setRepairs((prevRepairs) =>
          prevRepairs.map((repair) =>
          repair.id === repairId ? { ...repair, status: editedRepair.status } : repair
          )
        );
        setEditingRepairId(null);
        setEditedRepair(null);
  
      } else {
        setError(`Błąd podczas zapisywania zmian: Kod błędu ${response.status}`);
      }
    } catch (error) {
      setError("Błąd podczas zapisywania zmian");
    }
  };


  const openDialog = (repairId: number) => {
    setSelectedRepairId(repairId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedPhoto(null);
  };

  const handlePhotoUpload = () => {
    if (selectedPhoto && selectedRepairId !== null) {
      handleAddPhoto(selectedRepairId, selectedPhoto);
      closeDialog();
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

  const fetchRepairPhotos = async (repairId: number) => {
    try {
      const response = await axios.get(
        `https://api.bazydanych.fun/v1/repairs/${repairId}/photos`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const photosWithRepairId = response.data.map((photo: any) => ({
        id: photo.id,
        repairId: repairId,
        photoUrl: photo.photoUrl,
      }));

      console.log(photosWithRepairId);
      setRepairPhotos(photosWithRepairId);
    } catch (error) {
      console.error("Error occurred while fetching repair photos:", error);
    }
  };

  const handleDeletePhoto = async (repairId: number, photoId: number) => {
    try {
      await axios.delete(
        `https://api.bazydanych.fun/v1/repairs/${repairId}/photos/${photoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      fetchRepairPhotos(repairId);
    } catch (error) {}
  };
  const handleDeleteRepair = async (repairId: number) => {
    try {
      await axios.delete(`https://api.bazydanych.fun/v1/repairs/${repairId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRepairs(repairs.filter((repair) => repair.id !== repairId));
      console.log("Naprawa została pomyślnie usunięta");
    } catch (error) {
      console.error("Error occurred while deleting repair:", error);
    }
  };

  const handleAddPhoto = async (repairId: number, photo: File) => {
    try {
      const repairPhotoForm = new FormData();
      repairPhotoForm.append("photo", photo);

      const photoResponse = await axios.post(
        `https://api.bazydanych.fun/v1/repairs/${repairId}/photos`,
        repairPhotoForm,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Pomyślnie dodano zdjęcie do naprawy:", photoResponse.data);
      fetchRepairPhotos(repairId);
    } catch (error) {
      console.error("Error occurred while adding photo:", error);
    }
  };

  const handlePhotoClick = (photoUrl: string) => {
    window.open(photoUrl, "_blank");
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
                className="mt-3 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
                placeholder="Lub wpisz ID użytkownika"
              />
            </div>
            <div>
              <select
                {...register("vehicleId")}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
                required
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <input
                {...register("price")}
                type="text"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white rounded-md"
                placeholder="Cena"
                required
              />
            </div>
            <div>
              <input
                type="file"
                {...register("photo")}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-700 text-white"
                accept="image/*"
                required
              />
            </div>
          </div>
          <div>
            <input
              {...register("description")}
              type="text"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 text-white rounded-md"
              placeholder="Opis"
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
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Istniejące naprawy</h2>
          <div className="max-h-40 overflow-y-auto">
            <ul className="divide-y divide-gray-500">
            {repairs.map((repair) => (
              <li key={repair.id} className="py-2">
                {editingRepairId === repair.id ? (
                  <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <select
                        value={editedRepair?.status || repair.status}
                        onChange={(e) => setEditedRepair({ ...repair, status: e.target.value })}
                        className="p-2 border border-gray-600 rounded bg-gray-700 text-white"
                      >
                        <option value="IN_PROGRESS">W trakcie</option>
                        <option value="FINISHED">Zakończono</option>
                        <option value="CANCELED">Anulowano</option>
                      </select>
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleSaveChanges(repair.id)}
                        className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded"
                      >
                        Zapisz
                      </button>
                      <button
                        onClick={() => { setEditingRepairId(null); setEditedRepair(null); }}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Anuluj
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>ID Pojazdu: {repair.vehicleId}, Opis: {repair.description}, Cena: {repair.price} zł, Status: {translateStatus(repair.status)}</p>
                    <div className="flex justify-center mt-2">
                      <button
                        onClick={() => { setEditingRepairId(repair.id); setEditedRepair(repair); }}
                        className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Edytuj Status
                      </button>

                    <button
                      className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => fetchRepairPhotos(repair.id)}
                    >
                      Wyświetl zdjęcia
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteRepair(repair.id)}
                    >
                      Usuń naprawę
                    </button>
                    {isDialogOpen && (
                      <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                          </div>
                          <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                              <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                  <h3
                                    className="text-lg leading-6 font-medium text-gray-900 mb-2"
                                    id="modal-title"
                                  >
                                    Dodaj zdjęcie
                                  </h3>
                                  <div className="mt-2">
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        setSelectedPhoto(
                                          e.target.files?.[0] || null
                                        )
                                      }
                                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base rounded-md bg-gray-100 text-gray-900"
                                      accept="image/*"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                              <button
                                onClick={handlePhotoUpload}
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                              >
                                Dodaj
                              </button>
                              <button
                                onClick={closeDialog}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:w-auto sm:text-sm"
                              >
                                Anuluj
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <button
                      className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded ml-2"
                      onClick={() => openDialog(repair.id)}
                    >
                      Dodaj zdjęcie
                    </button>
                  </div>
                </div>
              )}
              </li>
            ))}
          </ul>
        </div>
      </div>
        {repairPhotos.length > 0 && (
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div
                  className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  style={{ maxHeight: "80vh" }}
                >
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900 mb-2"
                        id="modal-title"
                      >
                        Zdjęcia naprawy
                      </h3>
                      <div className="flex flex-wrap mt-6">
                        {repairPhotos.map((photo, index) => (
                          <div
                            key={index}
                            className="m-2 cursor-pointer"
                            onClick={() => handlePhotoClick(photo.photoUrl)}
                          >
                            <div className="relative">
                              <img
                                src={photo.photoUrl}
                                alt={`Zdjęcie ${index + 1}`}
                                className="w-24 h-24 object-cover rounded-md"
                              />
                              <button
                                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePhoto(photo.repairId, photo.id);
                                }}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedPhotoUrl && (
                        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black bg-opacity-75">
                          <div className="max-w-4xl w-full p-4">
                            <img
                              src={selectedPhotoUrl}
                              alt="Powiększone zdjęcie"
                              className="max-w-full max-h-full"
                            />
                          </div>
                          <button
                            className="absolute top-0 right-0 m-4 text-white"
                            onClick={() => setSelectedPhotoUrl(null)}
                          >
                            X
                          </button>
                        </div>
                      )}
                      <button
                        className="absolute top-0 right-0 m-4 text-white"
                        onClick={() => setSelectedPhotoUrl(null)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={() => setRepairPhotos([])}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRepair;
