import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardHeader.css';

const DashboardHeader = ({ toggleSidebar }) => (
  <header className="dashboard-header" id="header">
    <div className="header-toggle" onClick={toggleSidebar}>
      <FaBars />
    </div>
    <div className="header-img d-flex">
      <Link to="/" className="nav-link "><img src="https://i.imgur.com/hczKIze.jpg" alt="Profile" /></Link>
    </div>
  </header>
);

export default DashboardHeader;
