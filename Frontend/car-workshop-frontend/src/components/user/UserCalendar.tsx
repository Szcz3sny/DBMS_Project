import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

//import warsztatImage from "./img/warsztatTło.png";
//Na razie suche dane bo nie mamy jeszcze zrobionego
const visitsData = [
  { date: "2023-12-28", description: "Zmiana oleju", price: "100.00" },
  { date: "2024-01-15", description: "Sprawdzenie hamulców", price: "250.00" },
  { date: "2024-02-20", description: "Zmiana opon", price: "800.00" },
];

const CheckVisits = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div>
      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-5">
          <h1 className="text-4xl font-bold text-center">
            Twoje obecne wizyty
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg text-white mb-20">
        <Table className="bg-black text-white bg-black bg-opacity-80">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Termin</TableHead>
              <TableHead>Opis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitsData.map((visit, index) => (
              <TableRow key={index}>
                <TableCell>{visit.date}</TableCell>
                <TableCell>{visit.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CheckVisits;
