import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './DashboardHeader.css';
import finallogo from '../../assets/finallogo.png';

interface DashboardHeaderProps {
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => (
  <header className="dashboard-header" id="header">
    <div className="header-toggle" onClick={toggleSidebar}>
      <FaBars />
    </div>
    <div className="header-img d-flex">
      <Link to="/" className="nav-link "><img style={{width: '50px'}} src={finallogo} alt="Brand" /></Link>
    </div>
  </header>
);

export default DashboardHeader;
