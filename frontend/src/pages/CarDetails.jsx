import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/CarDetails.css'; // Import the CSS file for custom styles
import OrderApiService from '../api/OrderApiService'; // Import the OrderApiService
import UserApiService from '../api/UserApiService';


const CarDetails = () => {
    const location = useLocation();
    const { car } = location.state;

    const handleOrder = async () => {
        try {
            const userId = await UserApiService.getCurrentUserId();
            console.log('User ID:', userId);
            if (!userId) {
                throw new Error('User ID not found');
            }
            const order = {
                carId:
                car.id,
                userId: userId,
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
        <Container className="mt-5">
            {/* Hero Section */}
            <div className="hero-section text-white rounded">
                <Row className="align-items-center p-4">
                    <Col md={6}>
                        <h1>{car.model.name}</h1>
                        <h5 className="text-light">{car.year} {car.category.name}</h5>
                        <p className="lead">{car.description}</p>
                        {car.carType === 'DEALERSHIP' ? (
                            <Button variant="light" className="me-2" onClick={handleOrder}>Order</Button>
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
    );
};

export default CarDetails;
