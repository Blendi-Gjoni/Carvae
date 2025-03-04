import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PiSpeedometerBold, PiUsersBold, PiTruckTrailerBold, PiGarageBold, PiCarSimpleBold, PiCardholderBold, PiClockCounterClockwiseBold, PiSignOutBold } from "react-icons/pi";
import { logoutAsync } from '../../redux/authSlice';
import './Sidebar.css';
import { AppDispatch } from '../../redux/store';

interface SidebarProps {
  isSidebarVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarVisible }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  

  const handleSignOut = async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
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
              <PiSpeedometerBold className="nav-icon" />
              <span className="nav-name"><b>Dashboard</b></span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/users')}>
              <PiUsersBold className="nav-icon" />
              <span className="nav-name"><b>Users</b></span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/rentals')}>
              <PiTruckTrailerBold className="nav-icon" />
              <span className="nav-name"><b>Rentals</b></span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/dealerships')}>
              <PiGarageBold className="nav-icon" />
              <span className="nav-name"><b>Dealerships</b></span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/cars')}>
              <PiCarSimpleBold className="nav-icon" />
              <span className="nav-name"><b>Cars</b></span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/orders')}>
              <PiCardholderBold className="nav-icon" />
              <span className="nav-name"><b>Car Orders</b></span>
            </button>
            <button className="nav-link" onClick={() => navigate('/admin/reservations')}>
              <PiClockCounterClockwiseBold className="nav-icon" />
              <span className="nav-name"><b>Car Reservations</b></span>
            </button>
            <button className="nav-link" onClick={handleSignOut}>
              <PiSignOutBold className="nav-icon" />
              <span className="nav-name"><b>Sign Out</b></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
