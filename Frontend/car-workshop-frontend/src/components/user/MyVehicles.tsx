import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for vehicles, adapted to match the database schema
const vehiclesData = [
  {
    vin: "1HGBH41JXMN109186", // Sample VIN
    brand: "Honda",
    licensePlate: "XYZ 1234",
    yearOfProduction: 2010,
    model: "Accord",
  },
  // ... you can add more vehicle data here
];

const MyVehicles = () => {
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
              <TableHead className="w-[200px]">VIN</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Tablica rejestracyjna</TableHead>
              <TableHead>Rok produkcji</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehiclesData.map((vehicle, index) => (
              <TableRow key={index}>
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
