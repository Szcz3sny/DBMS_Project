import React, { useState } from 'react';
import './userDashboard.css';
import './Calendar.css';
import CheckRepairStatus from './CheckRepairStatus';
import MyVehicles from './MyVehicles';
import ScheduleAppointment from './ScheduleAppointment';
import UserCalendar from './components/UserCalendar';


interface UserDashboardProps {
  username: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ username }) => {
    const [activeComponent, setActiveComponent] = useState<string | null>(null);
  
    const renderComponent = () => {
      switch (activeComponent) {
        case 'schedule-appointment':
          return <ScheduleAppointment />;
        case 'my-vehicles':
           return <MyVehicles />;
          break;
        case 'check-repair-status':
           return <CheckRepairStatus />;
          break;
        case 'calendar':
          return <UserCalendar />;
        default:
          return <p className="username-display">Witaj, {username}!</p>;

      }
    };
  
    return (
      <div className="dashboard">
        <aside className="dashboard-sidebar">
          <h2>Panel użytkownika</h2>
          <nav className="dashboard-nav">
            <ul>
              <li onClick={() => setActiveComponent('schedule-appointment')}>Umów się na wizytę</li>
              <li onClick={() => setActiveComponent('my-vehicles')}>Zobacz moje pojazdy</li>
              <li onClick={() => setActiveComponent('check-repair-status')}>Sprawdź stan naprawy</li>
              <li onClick={() => setActiveComponent('calendar')}>Kalendarz spotkań</li>
            </ul>
          </nav>
        </aside>
        <div className="dashboard-main-content">
          {renderComponent()}
        </div>
      </div>
    );
  };
  
  export default UserDashboard;
