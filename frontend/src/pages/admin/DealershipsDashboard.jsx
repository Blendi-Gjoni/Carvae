import React, { useState, useEffect } from 'react';
import DealershipApiService from '../../api/DealershipApiService';  // Update the import to DealershipApiService
import DefaultModal from '../../components/modals/DefaultModal';
import { Button, Form } from 'react-bootstrap';

const DealershipsDashboard = () => {
    const [dealerships, setDealerships] = useState([]);
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
        fetchDealerships();
    }, []);

    const fetchDealerships = async () => {
        try {
            const data = await DealershipApiService.getAllDealerships();  // Update to getAllDealerships
            setDealerships(data);
        } catch (err) {
            console.error('Error fetching dealerships:', err);
            setError(err.message);
        }
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = (dealership) => {
        setFormData(dealership);
        setModalShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await DealershipApiService.deleteDealership(id);  // Update to deleteDealership
            fetchDealerships();
        } catch (err) {
            console.error('Error deleting dealership:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                // Update existing dealership
                await DealershipApiService.updateDealership(formData.id, formData);  // Update to updateDealership
            } else {
                // Add new dealership
                await DealershipApiService.addDealership(formData);  // Update to addDealership
            }
            setModalShow(false);
            fetchDealerships();
        } catch (err) {
            console.error('Error saving dealership:', err);
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
            <h1>Dealerships Dashboard</h1>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            <Button className="mb-3" onClick={handleAddNew}>
                Add New Dealership
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
                {dealerships.map((dealership) => (
                    <tr key={dealership.id}>
                        <th scope="row">{dealership.id}</th>
                        <td>{dealership.name}</td>
                        <td>{dealership.address}</td>
                        <td>{dealership.city}</td>
                        <td>{dealership.state}</td>
                        <td>{dealership.phoneNumber}</td>
                        <td>{dealership.email}</td>
                        <td>{dealership.website}</td>
                        <td>{dealership.openingHours}</td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={() => handleEdit(dealership)}
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(dealership.id)}
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
                title={formData.id ? 'Edit Dealership' : 'Add New Dealership'}
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

export default DealershipsDashboard;
