import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaEnvelope, FaBookmark, FaFolder, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { logoutAsync } from '../../redux/authSlice';
import './Sidebar.css';

const Sidebar = ({ isSidebarVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <nav className={`dashboard-sidebar ${isSidebarVisible ? 'show' : ''}`} id="nav-bar">
      <div className="nav">
        <div>
          <button className="nav-logo" aria-label="Dashboard Logo">
          </button>
          <div className="nav-list">
            <button className="nav-link" onClick={() => navigate('/admin/page')}>
              <FaTachometerAlt className="nav-icon" />
              <span className="nav-name">Dashboard</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/users')}>
              <FaUsers className="nav-icon" />
              <span className="nav-name">Users</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/rentals')}>
              <FaEnvelope className="nav-icon" />
              <span className="nav-name">Rentals</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/dealerships')}>
              <FaBookmark className="nav-icon" />
              <span className="nav-name">Dealerships</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/cars')}>
              <FaFolder className="nav-icon" />
              <span className="nav-name">Cars</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/orders')}>
              <FaFolder className="nav-icon" />
              <span className="nav-name">Car Orders</span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/reservations')}>
              <FaChartBar className="nav-icon" />
              <span className="nav-name">Car Reservations</span>
            </button>
            <button className="nav-link" onClick={handleSignOut}>
              <FaSignOutAlt className="nav-icon" />
              <span className="nav-name">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
