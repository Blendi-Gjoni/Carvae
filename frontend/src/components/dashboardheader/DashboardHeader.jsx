import React from 'react';
import { FaBars } from 'react-icons/fa';
import './DashboardHeader.css';

const DashboardHeader = ({ toggleSidebar }) => (
  <header className="dashboard-header" id="header">
    <div className="header-toggle" onClick={toggleSidebar}>
      <FaBars />
    </div>
    <div className="header-img">
      <img src="https://i.imgur.com/hczKIze.jpg" alt="Profile" />
    </div>
  </header>
);

export default DashboardHeader;
