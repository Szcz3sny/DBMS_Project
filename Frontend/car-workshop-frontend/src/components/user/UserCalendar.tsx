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

interface Visit {
  id: number;
  userId: number;
  vehicleId: number;
  datetime: string;
  defect: string;
  status: string;
}

const CheckVisits = () => {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchVisits = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Brak tokena autoryzacyjnego");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userResponse = await axios.get("https://api.bazydanych.fun/v1/user/me", config);
      const userId = userResponse.data.id;

      const visitsResponse = await axios.get(`https://api.bazydanych.fun/v1/calendar/user/${userId}`, config);

      setVisits(visitsResponse.data);
    } catch (error) {
      console.error(
        "łąd podczas pobierania danych: ",
        error
      );
    }
  };

  fetchVisits();

  }, []);
  return (
    <div>
      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-5">
          <h1 className="text-4xl font-bold text-center">
            Twoje obecnie zaplanowane wizyty
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg text-white mb-20">
        <Table className="bg-black text-white bg-black bg-opacity-80">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Termin</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits.map((visit, index) => (
              <TableRow key={index}>
                <TableCell>{visit.datetime}</TableCell>
                <TableCell>{visit.defect}</TableCell>
                <TableCell>{visit.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CheckVisits;
