import React, { useState } from "react";
import useSWR, { mutate } from "swr";

type ApiData = {
  id: number;
  name: string;
  description: string;
  price: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const API_URL = "https://api.bazydanych.fun/v1/price";

export default function ChangeOfferPanel() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const { data, error } = useSWR(API_URL, fetcher);

  const addOffer = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          description: "",
          price: "",
        });
        mutate(API_URL);
      }
    } catch (error) {
      console.error("Error while adding offer:", error);
    }
  };

  const deleteOffer = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    mutate(API_URL);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 bg-black rounded-lg shadow-xl border border-gray-700">
        <h2 className="text-3xl font-semibold mb-4 text-center text-white">
          Panel zarządzania ofertami
        </h2>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-white">
            Dodaj ofertę
          </h3>
          <div className="flex flex-wrap gap-4 mb-4">
            <input
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nazwa usterki"
            />
            <input
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Opis"
            />
            <input
              className="flex-grow p-2 rounded border border-gray-600 text-black"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Cena"
            />
            <button
              className="bg-green-800 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              onClick={addOffer}
            >
              Dodaj
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <ul className="list-none space-y-3">
            {data &&
              data.map((offer: ApiData) => (
                <li
                  key={offer.id}
                  className="flex justify-between items-center p-2 rounded border border-gray-600 bg-gray-700 text-white"
                >
                  <span>{offer.name}</span>
                  <button
                    className="bg-red-800 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition-colors duration-300"
                    onClick={() => deleteOffer(offer.id)}
                  >
                    Usuń
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
