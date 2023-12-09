import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import warsztatImage from "../img/warsztatTło.png";

//Na razie suche dane bo nie mamy jeszcze zrobionego
const visitsData = [
  {
    fault: "Zmiana oleju",
    description: "Wymiana oleju w samochodzie",
    price: "100.00",
  },
  {
    fault: "Sprawdzenie hamulców",
    description: "Sprawdzenie hamulców w samochodzie czy wszystko działa.",
    price: "250.00",
  },
  {
    fault: "Zmiana opon",
    description: "Wymiana opon na nowe.",
    price: "800.00",
  },
];

const Offers = () => {
  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
      }}
      aria-label="Warsztat"
    >
      <div className="h-16 md:h-24"></div>

      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-20">
          <h1 className="text-4xl font-bold text-center">
            Nasza obecna oferta
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-screen-lg text-white ">
        <Table className="bg-black text-white bg-black bg-opacity-80">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Usterka</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead>Cena</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitsData.map((visit, index) => (
              <TableRow key={index}>
                <TableCell>{visit.fault}</TableCell>
                <TableCell>{visit.description}</TableCell>
                <TableCell>{visit.price} zł</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Offers;

/* SPRAWDZIĆ POTEM JAK BĘDZIE JUZ READY
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import warsztatImage from "../img/warsztatTło.png";

const Offers = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    fetch("naszeapi")
      .then(response => response.json())
      .then(data => setPrices(data))
      .catch(error => {
        console.error('There was an error fetching the prices:', error);
      });
  }, []);

  return (
    <div
      className="w-full bg-no-repeat bg-cover bg-center"
      style={{
        backgroundImage: `url(${warsztatImage})`,
        minHeight: "100vh",
      }}
      aria-label="Warsztat"
    >

{ <div className="h-16 md:h-24"></div>

      <div className="flex justify-center items-center h-1/5 mt-5">
        <div className="bg-black bg-opacity-80 text-white rounded-lg p-4 md:p-8 mb-20">
          <h1 className="text-4xl font-bold text-center">
            Nasza obecna oferta
          </h1>
        </div>
      </div> }
      <div className="mx-auto max-w-screen-lg text-white ">
        <Table className="bg-black text-white bg-opacity-80">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Usterka</TableHead>
              <TableHead>Opis</TableHead>
              <TableHead>Cena</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price, index) => (
              <TableRow key={index}>
                <TableCell>{price.name}</TableCell>
                <TableCell>{price.description}</TableCell>
                <TableCell>{price.price} zł</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// export default Offers;*/
