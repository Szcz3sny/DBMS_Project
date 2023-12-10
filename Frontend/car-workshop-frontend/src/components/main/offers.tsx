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
import useSWR from "swr";

type ApiData = {
  id: number;
  name: string;
  description: string;
  price: string;
};
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Offers() {
  const { data, error, isLoading } = useSWR(
    "https://api.bazydanych.fun/v1/price",
    fetcher
  );

  if (error) return "An error has occurred.";
  if (isLoading) return "Loading...";
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

      <div className="flex justify-center items-center">
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
            {data.map((item: ApiData, index: number) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{parseFloat(item.price).toFixed(2)} zł</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
