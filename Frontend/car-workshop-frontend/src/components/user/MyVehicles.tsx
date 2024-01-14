import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Vehicle {
  id: number;
  ownerId: number;
  vin: string;
  brand: string;
  licensePlate: string;
  yearOfProduction: number;
  model: string;
}

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
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
        
        const adjustedVehicles = vehiclesResponse.data.map((vehicle: any) => ({
          id: vehicle.id,
          ownerId: vehicle.owner.id, 
          vin: vehicle.vin,
          brand: vehicle.brand,
          licensePlate: vehicle.licensePlate, 
          yearOfProduction: vehicle.yearOfProduction,
          model: vehicle.model,
        }));
    
        setVehicles(adjustedVehicles);
      } catch (error) {
        console.error(
          "Wystąpił problem podczas pobierania danych pojazdów",
          error
        );
      }
    };

    fetchVehicles();
  }, []);

  useEffect(() => {
    console.log("Pojazdy:", vehicles);
  }, [vehicles]);

  return (
    <div>
      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-5">
          <h1 className="text-4xl font-bold text-center">Twoje pojazdy</h1>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg text-white mb-20">
        <Table className="bg-black text-white bg-opacity-80">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">VIN Pojazdu</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Numer rejestracyjny</TableHead>
              <TableHead>Rok produkcji</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.vin}</TableCell>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.licensePlate}</TableCell>
                <TableCell>{vehicle.yearOfProduction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyVehicles;
