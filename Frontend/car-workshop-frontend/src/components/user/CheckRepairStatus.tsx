import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Repair {
  id: number;
  vehicleId: number;
  description: string;
  price: number;
}

const CheckRepairStatus = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [selectedRepairPhotos, setSelectedRepairPhotos] = useState<string[]>(
    []
  );
  useEffect(() => {
    const fetchRepairs = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Brak tokenu");
        return;
      }

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const userResponse = await axios.get(
          "https://api.bazydanych.fun/v1/user/me",
          config
        );
        const userId = userResponse.data.id;

        const vehiclesResponse = await axios.get(
          `https://api.bazydanych.fun/v1/user/${userId}/vehicles`,
          config
        );

        const repairsData: Repair[] = [];
        for (const vehicle of vehiclesResponse.data) {
          const repairsResponse = await axios.get(
            `https://api.bazydanych.fun/v1/repairs/${vehicle.id}`,
            config
          );
          for (const repair of repairsResponse.data) {
            repairsData.push({
              id: repair.id,
              vehicleId: vehicle.id,
              description: repair.description,
              price: repair.price,
            });
          }
        }

        setRepairs(repairsData);
      } catch (error) {
        console.error(
          "Wystąpił problem podczas pobierania danych o naprawach",
          error
        );
      }
    };

    fetchRepairs();
  }, []);

  const handleShowPhotos = async (repairId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Brak tokenu");
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const photosResponse = await axios.get(
        `https://api.bazydanych.fun/v1/repairs/${repairId}/photos`,
        config
      );
      setSelectedRepairPhotos(photosResponse.data);
      console.log("Zdjęcia dla naprawy", repairId, ":", photosResponse.data);
    } catch (error) {
      console.error(
        "Wystąpił problem podczas pobierania zdjęć dla naprawy",
        repairId,
        ":",
        error
      );
    }
  };
  const handleCloseModal = () => {
    setSelectedRepairPhotos([]);
  };
  const handlePhotoClick = (photoUrl: string) => {
    window.open(photoUrl, "_blank");
  };

  return (
    <div>
      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-5">
          <h1 className="text-4xl font-bold text-center">Status Napraw</h1>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg text-white mb-20">
        <Table className="bg-black text-white bg-opacity-80">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">VIN Pojazdu</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead>Cena</TableHead>
              <TableHead>Zdjęcia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell>{repair.vehicleId}</TableCell>
                <TableCell>{repair.description}</TableCell>
                <TableCell>
                  {typeof repair.price === "number" ||
                  !isNaN(Number(repair.price))
                    ? `${Number(repair.price).toFixed(2)} zł`
                    : "Brak danych"}
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleShowPhotos(repair.id)}
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Wyświetl zdjęcia
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedRepairPhotos.length > 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Zdjęcia dla naprawy</h2>
            <div className="grid grid-cols-3 gap-4">
              {selectedRepairPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={photo.photoUrl}
                  alt={`Zdjęcie ${index + 1}`}
                  className="m-2 cursor-pointer w-24 h-24 object-cover rounded-md"
                  onClick={() => handlePhotoClick(photo.photoUrl)}
                />
              ))}
            </div>

            <button
              className="mx-auto w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleCloseModal}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CheckRepairStatus;
