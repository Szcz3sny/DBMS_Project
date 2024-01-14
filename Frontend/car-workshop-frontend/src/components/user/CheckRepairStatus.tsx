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
  status: string;
  price: number;
}

const CheckRepairStatus = () => {
  const [repairs, setRepairs] = useState<Repair[]>([]);

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

        const repairsPromises = vehiclesResponse.data.map((vehicle: any) =>
          axios.get(`https://api.bazydanych.fun/v1/repairs/vehicle/${vehicle.id}`, config)
        );

        const repairsResponses = await Promise.all(repairsPromises);
        const repairsData = repairsResponses.flatMap(response => response.data);

        setRepairs(repairsData);
      } catch (error) {
        console.error("Wystąpił problem podczas pobierania danych o naprawach", error);
      }
    };

    fetchRepairs();
  }, []);
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
              <TableHead>Status</TableHead>
              <TableHead>Cena</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repairs.map((repair) => (
              <TableRow key={repair.id}>
                <TableCell>{repair.vehicleId}</TableCell>
                <TableCell>{repair.description}</TableCell>
                <TableCell>{repair.status}</TableCell>
                <TableCell>{`${repair.price.toFixed(2)} zł`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CheckRepairStatus;
