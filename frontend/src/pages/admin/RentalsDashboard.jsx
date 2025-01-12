import React, { useState, useEffect } from 'react';
import RentalApiService from '../../api/RentalApiService';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';

const RentalsDashboard = () => {
  const [rentals, setRentals] = useState([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    address: '',
    city: '',
    state: '',
    phoneNumber: '',
    email: '',
    website: '',
    openingHours: '',
  });

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const data = await RentalApiService.getAllRentals();
      setRentals(data);
    } catch (err) {
      console.error('Error fetching rentals:', err);
      setError(err.message);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (rental) => {
    setFormData(rental);
    setModalShow(true);
  };

  const handleDelete = async (id) => {
    try {
      await RentalApiService.deleteRental(id);
      fetchRentals();
    } catch (err) {
      console.error('Error deleting rental:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update existing rental
        await RentalApiService.updateRental(formData.id, formData);
      } else {
        // Add new rental
        await RentalApiService.addRental(formData);
      }
      setModalShow(false);
      fetchRentals();
    } catch (err) {
      console.error('Error saving rental:', err);
    }
  };

  const handleAddNew = () => {
    setFormData({
      id: '',
      name: '',
      address: '',
      city: '',
      state: '',
      phoneNumber: '',
      email: '',
      website: '',
      openingHours: '',
    });
    setModalShow(true);
  };

  return (
    <div>
      <h1>Rentals Dashboard</h1>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <Button className="mb-3" onClick={handleAddNew}>
        Add New Rental
      </Button>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">Website</th>
            <th scope="col">Opening Hours</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.id}>
              <th scope="row">{rental.id}</th>
              <td>{rental.name}</td>
              <td>{rental.address}</td>
              <td>{rental.city}</td>
              <td>{rental.state}</td>
              <td>{rental.phoneNumber}</td>
              <td>{rental.email}</td>
              <td>{rental.website}</td>
              <td>{rental.openingHours}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(rental)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(rental.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit */}
      <DefaultModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={formData.id ? 'Edit Rental' : 'Add New Rental'}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={formData.city}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={formData.state}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              name="website"
              value={formData.website}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Opening Hours</Form.Label>
            <Form.Control
              type="text"
              name="openingHours"
              value={formData.openingHours}
              onChange={handleFormChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </DefaultModal>
    </div>
  );
};

export default RentalsDashboard;
