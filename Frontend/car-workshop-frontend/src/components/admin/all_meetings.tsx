import React, { useState, useEffect } from "react";
import axios from "axios";
import { cwd } from "process";

type User = {
  id: number;
  fullName: string;
};

type Meeting = {
  id: number;
  userId: number;
  vehicleId: number;
  datetime: string;
  defect: string;
  status: string;
};

const AllMeetings: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [editingMeetingId, setEditingMeetingId] = useState<number | null>(null);
  const [editedMeeting, setEditedMeeting] = useState<Meeting | null>(null);
  const [filterFirstName, setFilterFirstName] = useState("");
  const [filterLastName, setFilterLastName] = useState("");
  
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const [meetingsResponse, usersResponse] = await Promise.all([
          axios.get("https://api.bazydanych.fun/v1/calendar", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("https://api.bazydanych.fun/v1/user/names", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        
        setMeetings(meetingsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("Błąd");
        }
      }
    };

    fetchMeetings();
  }, []);

  const handleDeleteMeeting = async (meetingId: number) => {
    try {
      const response = await axios.delete(
        `https://api.bazydanych.fun/v1/calendar/${meetingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        console.log("Spotkanie zostało pomyślnie usunięte");
        setMeetings(meetings.filter((meeting) => meeting.id !== meetingId));
      } else {
        setError(`Błąd podczas usuwania spotkania: Kod błędu ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Błąd: ${error.response.data.message}`);
      } else {
        setError("Nastąpił nieznany błąd");
      }
    }
  };

  const handleEditMeeting = async (meetingId: number) => {
    try {
      const response = await axios.get(`https://api.bazydanych.fun/v1/calendar/${meetingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      const meetingToEdit = response.data;
      setEditingMeetingId(meetingId);
      setEditedMeeting(meetingToEdit ? { ...meetingToEdit } : null);
    } catch (error) {
    }
  };
  
  const handleSaveChanges = async () => {
    if (!editedMeeting) {
      return;
    }
  
    try {
      const { userId, vehicleId, defect, datetime, status } = editedMeeting;
      
      console.log(editedMeeting);
      const response = await axios.put(
        `https://api.bazydanych.fun/v1/calendar/${editedMeeting.id}`,
        {
        
          userId,
          vehicleId,
          defect,
          datetime,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Spotkanie zostało pomyślnie zaktualizowane");
        setMeetings((prevMeetings) =>
          prevMeetings.map((meeting) =>
            meeting.id === editingMeetingId ? { ...meeting, ...response.data } : meeting
          )
        );
        setEditingMeetingId(null);
        setEditedMeeting(null);
      } else {
        setError(`Błąd podczas zapisywania zmian: Kod błędu ${response.status}`);
      }
    } catch (error) {
    }
  };
  
  

  const handleCancelEdit = () => {
    setEditingMeetingId(null);
    setEditedMeeting(null);
  };

  const getUserNameById = (userId: number): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.fullName : "Nieznany użytkownik";
  };


  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-xl border border-gray-700 bg-black text-white">
        <h2 className="text-3xl font-semibold mb-4 text-center">Wszystkie spotkania</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Imię"
            value={filterFirstName}
            onChange={(e) => setFilterFirstName(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Nazwisko"
            value={filterLastName}
            onChange={(e) => setFilterLastName(e.target.value)}
            className="p-2 border border-gray-600 rounded bg-gray-700 text-white"
          />
        </div>
        <ul>
          {meetings
            .filter((meeting) => {
              const user = users.find((u) => u.id === meeting.userId);
              const fullName = user ? user.fullName.toLowerCase() : "";
              const firstNameMatch = fullName.includes(filterFirstName.toLowerCase());
              const lastNameMatch = fullName.includes(filterLastName.toLowerCase());
              return firstNameMatch && lastNameMatch;
            })
            .map((meeting) => (
              <li
                key={meeting.id}
                className={`flex flex-col p-2 bg-gray-800 text-white my-2 rounded ${
                  editingMeetingId === meeting.id ? "border-2 border-blue-500" : ""
                }`}
              >
            {editingMeetingId === meeting.id ? (
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="text"
                  value={editedMeeting?.status || ""}
                  onChange={(e) =>
                    setEditedMeeting((prev) =>
                      prev ? { ...prev, status: e.target.value } : null
                    )
                  }
                  className="p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  value={editedMeeting?.datetime || ""}
                  onChange={(e) =>
                    setEditedMeeting((prev) =>
                      prev ? { ...prev, datetime: e.target.value } : null
                    )
                  }
                  className="p-2 border border-gray-600 rounded bg-gray-700 text-white"
                />
              </div>
            ) : (
              <span>
                {getUserNameById(meeting.userId)} (ID: {meeting.userId}) - {meeting.datetime} -
                {meeting.defect} - {meeting.status} 
              </span>
            )}
            <div className="flex space-x-2 items-center justify-center mt-2">
              {editingMeetingId === meeting.id ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Zapisz
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0"
                  >
                    Anuluj
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditMeeting(meeting.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Edytuj
                  </button>
                  <button
                    onClick={() => handleDeleteMeeting(meeting.id)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 md:mt-0"
                  >
                    Usuń
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

};

export default AllMeetings;
