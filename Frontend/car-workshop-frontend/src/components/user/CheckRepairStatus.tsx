import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
//suche dane
const repairsData = [
  {
    vin: "1HGBH41JXMN109186", // to ukradniemy z pojazdu po id
    description: "Wymiana opon",
    status: "Completed",
    price: 250.0,
  },
];

const CheckRepairStatus = () => {
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
            {repairsData.map((repair, index) => (
              <TableRow key={index}>
                <TableCell>{repair.vin}</TableCell>
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
