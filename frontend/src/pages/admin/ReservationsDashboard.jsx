import React, { useState, useEffect } from 'react';
import ReservationApiService from '../../api/ReservationApiService';
import UserApiService from '../../api/UserApiService';
import RentalApiService from '../../api/RentalApiService';
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';

const ReservationsDashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [users, setUsers] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [error, setError] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        userId: '',
        rentalId: '',
        carIds: '',
        startDate: '',
        endDate: '',
        status: '',
    });

    useEffect(() => {
        fetchReservations();
        fetchUsers();
        fetchRentals();
    }, []);

    // Fetch all reservations
    const fetchReservations = async () => {
        try {
            const data = await ReservationApiService.getAllReservations();
            setReservations(data);
        } catch (err) {
            console.error('Error fetching reservations:', err);
            setError(err.message);
        }
    };

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const data = await UserApiService.getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message);
        }
    };

    // Fetch all rentals
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

    const handleEdit = (reservation) => {
        setFormData({
            ...reservation,
            carIds: reservation.carIds.join(', '),
        });
        setModalShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await ReservationApiService.deleteReservation(id);
            fetchReservations();
        } catch (err) {
            console.error('Error deleting reservation:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                carIds: formData.carIds.split(',').map(Number),
            };
            if (formData.id) {
                // Update existing reservation
                await ReservationApiService.updateReservation(formData.id, payload);
            } else {
                // Add new reservation
                await ReservationApiService.createReservation(payload);
            }
            setModalShow(false);
            fetchReservations();
        } catch (err) {
            console.error('Error saving reservation:', err);
        }
    };

    const handleAddNew = () => {
        setFormData({
            id: '',
            userId: '',
            rentalId: '',
            carIds: '',
            startDate: '',
            endDate: '',
            status: '',
        });
        setModalShow(true);
    };

    return (
        <div>
            <h1>Reservations Dashboard</h1>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <Button className="mb-3" onClick={handleAddNew}>
                Add New Reservation
            </Button>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Rental ID</th>
                        <th>Car IDs</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.userId}</td>
                            <td>{reservation.rentalId}</td>
                            <td>{reservation.carIds.join(', ')}</td>
                            <td>{reservation.startDate}</td>
                            <td>{reservation.endDate}</td>
                            <td>{reservation.status}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => handleEdit(reservation)}
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(reservation.id)}
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
                title={formData.id ? 'Edit Reservation' : 'Add New Reservation'}
            >
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>User</Form.Label>
                        <Form.Control
                            as="select"
                            name="userId"
                            value={formData.userId}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Rental</Form.Label>
                        <Form.Control
                            as="select"
                            name="rentalId"
                            value={formData.rentalId}
                            onChange={handleFormChange}
                            required
                        >
                            <option value="">Select Rental</option>
                            {rentals.map((rental) => (
                                <option key={rental.id} value={rental.id}>
                                    {rental.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Car IDs (comma separated)</Form.Label>
                        <Form.Control
                            type="text"
                            name="carIds"
                            value={formData.carIds}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="status"
                            value={formData.status}
                            onChange={handleFormChange}
                            required
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

export default ReservationsDashboard;
