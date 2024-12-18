import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaLayerGroup, FaTachometerAlt, FaUsers, FaEnvelope, FaBookmark, FaFolder, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { logout } from '../../redux/authSlice';
import './Sidebar.css';

const Sidebar = ({ isSidebarVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());

    navigate('/login');
  };

  return (
    <nav className={`dashboard-sidebar ${isSidebarVisible ? 'show' : ''}`} id="nav-bar">
      <div className="nav">
        <div>
          <a href="#" className="nav-logo">
          </a>
          <div className="nav-list">
            <a href="#" className="nav-link active">
              <FaTachometerAlt className="nav-icon" />
              <span className="nav-name">Dashboard</span>
            </a>
            <a href="#" className="nav-link">
              <FaUsers className="nav-icon" />
              <span className="nav-name">Users</span>
            </a>
            <a href="#" className="nav-link">
              <FaEnvelope className="nav-icon" />
              <span className="nav-name">Messages</span>
            </a>
            <a href="#" className="nav-link">
              <FaBookmark className="nav-icon" />
              <span className="nav-name">Bookmark</span>
            </a>
            <a href="#" className="nav-link">
              <FaFolder className="nav-icon" />
              <span className="nav-name">Files</span>
            </a>
            <a href="#" className="nav-link">
              <FaChartBar className="nav-icon" />
              <span className="nav-name">Stats</span>
            </a>
          </div>
        </div>
        <a href="#" className="nav-link" onClick={handleSignOut}>
          <FaSignOutAlt className="nav-icon" />
          <span className="nav-name">Sign Out</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
