import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardheader/DashboardHeader';
import '../../style/AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`admin-layout ${isSidebarVisible ? 'body-pd' : ''}`}>
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarVisible={isSidebarVisible} />
      <main className={`admin-main-content ${isSidebarVisible ? 'show-content' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
