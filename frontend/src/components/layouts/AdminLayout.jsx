import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardheader/DashboardHeader';
import '../../style/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="admin-layout">
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarVisible={isSidebarVisible} />
      <main className={`admin-main-content ${isSidebarVisible ? 'show-content' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
