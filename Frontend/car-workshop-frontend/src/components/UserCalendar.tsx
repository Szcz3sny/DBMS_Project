import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const UserCalendar = () => {
  // Użyj typu any dla argumentów funkcji obsługi, aby uniknąć konfliktów typów
  const handleDateChange = (value: any, event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(value);
  };

  return (
    <div>
      <h2>Kalendarz spotkań</h2>
      <Calendar onChange={handleDateChange} />
    </div>
  );
};

export default UserCalendar;
