import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layouts/Layout'
import '../style/CarDetails.css'; // Import the CSS file for custom styles
import { useAddOrderMutation } from '../api/OrdersApi';
import { useGetCurrentUserQuery } from '../api/UsersApi';
import { useGetDealershipsQuery } from '../api/DealershipsApi';

const CarDetails = () => {
    const location = useLocation();
    const { car } = location.state;

    const { data: dealerships = [] } = useGetDealershipsQuery();
    const [selectedDealership, setSelectedDealership] = useState<number>(0);

    const { data: currentUser } = useGetCurrentUserQuery();

    const [addOrder] = useAddOrderMutation();

    const handleOrder = async () => {
        try {
            const order = {
                carId: car.id,
                userId: currentUser?.id,
                dealershipId: selectedDealership,
            };
            const response = await addOrder(order);
            console.log('Order successfully placed:', response);
            alert('Order successfully placed!');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    const handleDealershipSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedDealership(Number(value));
    }

    return (
        <Layout>
            <Container className="vh-100 mt-5">
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
                                        <Form.Select
                                            value={selectedDealership}
                                            onChange={handleDealershipSelect}
                                        >
                                            <option value="">Choose...</option>
                                            {dealerships.map((dealership) => (
                                                <option key={dealership.id} value={dealership.id}>
                                                    {dealership.name}
                                                </option>
                                            ))}
                                        </Form.Select>
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
                <Row className='m-2'>
                    <h3>Car Details</h3>
                    <hr className="border-primary" />
                    <Col className='m-3 d-flex flex-row justify-content-between' style={{height: '150px'}}>
                        <Card className='custom-card d-flex justify-content-center align-items-center' style={{width: '150px'}}>
                            <Card.Header className='custom-card-header d-flex justify-content-center' style={{width: '150px'}}>
                                <Card.Text>Power</Card.Text>
                            </Card.Header>
                            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                                <Card.Title>{car.horsepower}</Card.Title>
                                <Card.Text>horsepower</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='d-flex justify-content-center align-items-center' style={{width: '150px'}}>
                            <Card.Header className='custom-card-header d-flex justify-content-center' style={{width: '150px'}}>
                                <Card.Text>Mileage</Card.Text>
                            </Card.Header>
                            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                                <Card.Title>{car.kilometers}</Card.Title>
                                <Card.Text>kilometers</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='d-flex justify-content-center align-items-center' style={{width: '150px'}}>
                            <Card.Header className='custom-card-header d-flex justify-content-center' style={{width: '150px'}}>
                                <Card.Text>Exterior Color</Card.Text>
                            </Card.Header>
                            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                                <Card.Title>{car.exterior}</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className='d-flex justify-content-center align-items-center' style={{width: '150px'}}>
                            <Card.Header className='custom-card-header d-flex justify-content-center' style={{width: '150px'}}>
                                <Card.Text>Interior Color</Card.Text>
                            </Card.Header>
                            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                                <Card.Title>{car.interior}</Card.Title>
                            </Card.Body>
                        </Card>
                        <Card className='d-flex justify-content-center align-items-center' style={{width: '150px'}}>
                            <Card.Header className='custom-card-header d-flex justify-content-center' style={{width: '150px'}}>
                                <Card.Text>Fuel</Card.Text>
                            </Card.Header>
                            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                                <Card.Title>{car.fuelType}</Card.Title>
                                <Card.Text>type</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='d-flex justify-content-center align-items-center' style={{width: '150px'}}>
                            <Card.Header className='custom-card-header d-flex justify-content-center' style={{width: '150px'}}>
                                <Card.Text>Transmission</Card.Text>
                            </Card.Header>
                            <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                                <Card.Title>{car.transmission}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CarDetails;
