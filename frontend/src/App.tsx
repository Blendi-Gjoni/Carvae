import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import CarDetails from './pages/CarDetails';
import UserProfile from './pages/UserProfile';
import AdminLayout from './components/layouts/AdminLayout';
import AddCarForm from "./components/AddCarForm";
import { PacmanLoader } from 'react-spinners';
import { Scrollbars } from 'react-custom-scrollbars-2';

const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const UsersDashboard = lazy(() => import('./pages/admin/UsersDashboard'));
const RentalsDashboard = lazy(() => import('./pages/admin/RentalsDashboard'));
const CarsDashboard = lazy(() => import('./pages/admin/CarsDashboard'));
const OrdersDashboard = lazy(() => import('./pages/admin/OrdersDashboard'));
const DealershipsDashboard = lazy(() => import('./pages/admin/DealershipsDashboard'));
const ReservationsDashboard = lazy(() => import('./pages/admin/ReservationsDashboard'));

function App(): JSX.Element {
  return (
    <Suspense fallback={<div className='d-flex justify-content-center align-items-center'><PacmanLoader size={20} /></div>}>
      <Scrollbars style={{height: '100vh', width: '100vw'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div className="login-page"><Login /></div>} />
          <Route path="/car-details" element={<CarDetails />} />
          <Route path='/user-profile' element={<UserProfile />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
              <Route path="page" element={<AdminPage />} /> {/* Admin Home (Dashboard) */}
              <Route path="users" element={<UsersDashboard />} />
              <Route path="rentals" element={<RentalsDashboard />} />
              <Route path="cars" element={<CarsDashboard />} />
              <Route path="add-car" element={<AddCarForm />} />
              <Route path="orders" element={<OrdersDashboard />} />
              <Route path="dealerships" element={<DealershipsDashboard />} />
              <Route path="reservations" element={<ReservationsDashboard />} />
          </Route>
        </Routes>
      </Scrollbars>
    </Suspense>
  );
}

export default App;
