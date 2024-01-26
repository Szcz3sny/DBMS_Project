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
  const [editingOfferId, setEditingOfferId] = useState<number | null>(null);
  const [editedOffer, setEditedOffer] = useState<ApiData | null>(null);

  const { data, error } = useSWR(API_URL, fetcher);

  const handleEditOffer = (offerId: number) => {
    const offerToEdit = data.find((offer: ApiData) => offer.id === offerId);
    setEditingOfferId(offerId);
    setEditedOffer(offerToEdit ? { ...offerToEdit } : null);
  };

  const handleSaveChangesOffer = async () => {
    if (!editedOffer) {
      return;
    }

    try {
      const { name, description, price } = editedOffer;

      const response = await fetch(`${API_URL}/${editedOffer.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price,
        }),
      });

      if (response.ok) {
        console.log("Oferta została pomyślnie zaktualizowana");
        mutate(API_URL);
        setEditedOffer(null);
        setEditingOfferId(null);
      } else {
        console.error("Błąd podczas zapisywania zmian w ofercie");
      }
    } catch (error) {
      console.error("Błąd podczas zapisywania zmian w ofercie:", error);
    }
  };

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
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nazwa usterki"
            />
            <input
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Opis"
            />
            <input
              className="flex-grow p-2 rounded border border-gray-600 bg-gray-700 text-white"
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Cena"
            />
            <button
              className=" w-full inline-flex font-bold justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={addOffer}
            >
              Dodaj
            </button>
          </div>
        </div>

        <div className="overflow-auto max-h-60">
          {" "}
          <ul className="list-none space-y-3">
            {data &&
              data.map((offer: ApiData) => (
                <li
                  key={offer.id}
                  className="flex justify-between items-center p-2 rounded border border-gray-600 bg-gray-700 text-white"
                >
                  {editingOfferId === offer.id ? (
                    <div className="flex flex-wrap gap-4">
                      <input
                        type="text"
                        name="name"
                        value={editedOffer?.name || ""}
                        onChange={(e) =>
                          setEditedOffer((prev) =>
                            prev ? { ...prev, name: e.target.value } : null
                          )
                        }
                        className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                      />
                      <input
                        type="text"
                        name="description"
                        value={editedOffer?.description || ""}
                        onChange={(e) =>
                          setEditedOffer((prev) =>
                            prev
                              ? { ...prev, description: e.target.value }
                              : null
                          )
                        }
                        className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                      />
                      <input
                        type="text"
                        name="price"
                        value={editedOffer?.price || ""}
                        onChange={(e) =>
                          setEditedOffer((prev) =>
                            prev ? { ...prev, price: e.target.value } : null
                          )
                        }
                        className="p-2 rounded border border-gray-600 bg-gray-700 text-white"
                      />
                      <button
                        onClick={handleSaveChangesOffer}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Zapisz
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex flex-col justify-center items-center p-2  text-white">
                        {offer.name}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditOffer(offer.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded transition-colors duration-300"
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => deleteOffer(offer.id)}
                          className="bg-red-800 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition-colors duration-300"
                        >
                          Usuń
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
