import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CarDetails from './pages/CarDetails'; // Import CarDetails component
import store from './redux/store';
import AdminLayout from './components/layouts/AdminLayout';
import AdminPage from './pages/admin/AdminPage';
import UsersDashboard from './pages/admin/UsersDashboard';
import RentalsDashboard from './pages/admin/RentalsDashboard';
import CarsDashboard from "./pages/admin/CarsDashboard";
import OrdersDashboard from "./pages/admin/OrdersDashboard";
import DealershipsDashboard from "./pages/admin/DealershipsDashboard";
import ReservationsDashboard from './pages/admin/ReservationsDashboard';

function App() {
  return (
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div className="login-page"><Login /></div>} />
          <Route path="/car-details" element={<CarDetails />} /> {/* Add this route */}

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
                <Route path="page" element={<AdminPage />} /> {/* Admin Home (Dashboard) */}
                <Route path="users" element={<UsersDashboard />} />
                <Route path="rentals" element={<RentalsDashboard />} />
                <Route path="cars" element={<CarsDashboard />} />
                <Route path="orders" element={<OrdersDashboard />} />
                <Route path="dealerships" element={<DealershipsDashboard />} />
                <Route path="reservations" element={<ReservationsDashboard />} />
          </Route>
        </Routes>
      </Provider>
  );
}

export default App;
