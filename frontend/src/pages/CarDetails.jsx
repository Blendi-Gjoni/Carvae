import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layouts/Layout'
import '../style/CarDetails.css'; // Import the CSS file for custom styles
import OrderApiService from '../api/OrderApiService'; // Import the OrderApiService
import UserApiService from '../api/UserApiService';
import DealershipApiService from '../api/DealershipApiService'; // Import the DealershipApiService

const CarDetails = () => {
    const location = useLocation();
    const { car } = location.state;

    const [dealerships, setDealerships] = useState([]);
    const [selectedDealership, setSelectedDealership] = useState(null);

    useEffect(() => {
        fetchDealerships();
    }, []);

    const fetchDealerships = async () => {
        try {
            const data = await DealershipApiService.getAllDealerships();
            setDealerships(data);
        } catch (error) {
            console.error('Error fetching dealerships:', error);
        }
    };

    const handleOrder = async () => {
        try {
            const userId = await UserApiService.getCurrentUserId();
            console.log('User ID:', userId);
            if (!userId) {
                throw new Error('User ID not found');
            }
            const order = {
                carId: car.id,
                userId: userId,
                dealershipId: selectedDealership,
            };
            const response = await OrderApiService.addOrder(order);
            console.log('Order successfully placed:', response);
            alert('Order successfully placed!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    return (
        <Layout>
            <Container className="mt-5">
                {/* Hero Section */}
                <div className="hero-section text-white rounded">
                    <Row className="align-items-center p-4">
                        <Col md={6}>
                            <h1>{car.model.name}</h1>
                            <h5 className="text-light">{car.year} {car.category.name}</h5>
                            <p className="lead">{car.description}</p>
                            {car.carType === 'DEALERSHIP' ? (
                                <>
                                    <Form.Group controlId="dealershipSelect" className="mb-3">
                                        <Form.Label>Select Dealership</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={selectedDealership}
                                            onChange={(e) => setSelectedDealership(e.target.value)}
                                        >
                                            <option value="">Choose...</option>
                                            {dealerships.map((dealership) => (
                                                <option key={dealership.id} value={dealership.id}>
                                                    {dealership.name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        variant="light"
                                        className="me-2"
                                        onClick={handleOrder}
                                        disabled={!selectedDealership}
                                    >
                                        Order
                                    </Button>
                                </>
                            ) : (
                                <Button variant="warning" className="me-2">Reserve</Button>
                            )}
                        </Col>
                    </Row>
                </div>

                {/* Car Details Section */}
                <Row>
                    <Col>
                        <h3>Car Details</h3>
                        <hr className="border-primary" />
                        <ul className="list-unstyled">
                            <li><strong className="text-primary">Horsepower:</strong> {car.horsepower} HP</li>
                            <li><strong className="text-primary">Kilometers:</strong> {car.kilometers} km</li>
                            <li><strong className="text-primary">Exterior:</strong> {car.exterior}</li>
                            <li><strong className="text-primary">Interior:</strong> {car.interior}</li>
                            <li><strong className="text-primary">Fuel Type:</strong> {car.fuelType}</li>
                            <li><strong className="text-primary">Transmission:</strong> {car.transmission}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CarDetails;
