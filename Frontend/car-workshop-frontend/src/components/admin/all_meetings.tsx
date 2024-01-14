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
        console.log("Meetings data:", meetingsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
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
        console.log("Meeting deleted successfully");
        setMeetings(meetings.filter((meeting) => meeting.id !== meetingId));
      } else {
        setError(`Failed to delete meeting: Status code ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const getUserNameById = (userId: number): string => {
    console.log("Searching for user ID:", userId);
    console.log("Current users array:", users);
    const user = users.find((u) => u.id === userId);
    console.log("Found user:", user);
    return user ? user.fullName : "Unknown User";
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-4xl p-6 rounded-lg shadow-xl border border-gray-700 bg-black  text-white">
        <h2 className="text-3xl font-semibold mb-4 text-center">
          All Meetings
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul>
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="flex justify-between items-center p-2 bg-gray-800 text-white my-2 rounded"
            >
              <span>
                {getUserNameById(meeting.userId)} (ID: {meeting.userId}) -
                {meeting.datetime} - {meeting.defect} - {meeting.status} -
              </span>
              <button
                onClick={() => handleDeleteMeeting(meeting.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllMeetings;
