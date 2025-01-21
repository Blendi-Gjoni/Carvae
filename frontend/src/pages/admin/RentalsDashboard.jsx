import React, { useState } from 'react';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';
import {
  useGetRentalsQuery,
  useAddRentalMutation,
  useUpdateRentalMutation,
  useDeleteRentalMutation,
} from '../../api/RenalsApi';

const RentalsDashboard = () => {
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

  const { data: rentals = [], error, isLoading, refetch  } = useGetRentalsQuery();

  const [addRental, { isLoading: isAdding }] = useAddRentalMutation();
  const [updateRental, { isLoading: isUpdating }] = useUpdateRentalMutation();
  const [deleteRental, { isLoading: isDeleting }] = useDeleteRentalMutation();

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
    if (id) {
      try {
        await deleteRental({ id });
        refetch();
      } catch (err) {
        console.error('Error deleting rental:', err);
      }
    } else {
      console.error('Rental ID is missing');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateRental({ id: formData.id, ...formData });
      } else {
        await addRental(formData);
      }
      setModalShow(false);
      refetch();
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

  const renderError = error && <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div>
      <h1>Rentals Dashboard</h1>

      {renderError}

      {isLoading ? (
        <p>Loading rentals...</p>
      ) : (
        <>
          <Button className="mb-3" onClick={handleAddNew}>
            Add New Rental
          </Button>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col"><b>ID</b></th>
                <th scope="col"><b>Name</b></th>
                <th scope="col"><b>Address</b></th>
                <th scope="col"><b>City</b></th>
                <th scope="col"><b>State</b></th>
                <th scope="col"><b>Phone</b></th>
                <th scope="col"><b>Email</b></th>
                <th scope="col"><b>Website</b></th>
                <th scope="col"><b>Oppening Hours</b></th>
                <th scope="col"><b>Actions</b></th>
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
                  <td className='align-items-center'>
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(rental)}
                      className="me-2"
                      disabled={isUpdating}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(rental.id)}
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

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

          <Button variant="primary" type="submit" disabled={isAdding || isUpdating}>
            {isAdding || isUpdating ? 'Saving...' : 'Save'}
          </Button>
        </Form>
      </DefaultModal>
    </div>
  );
};

export default RentalsDashboard;
