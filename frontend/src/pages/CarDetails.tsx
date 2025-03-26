import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Container, Row, Col, Form, Card, Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/layouts/Layout'
import '../style/CarDetails.css'; // Import the CSS file for custom styles
import { useAddOrderMutation } from '../api/OrdersApi';
import { useAddReservationMutation } from '../api/ReservationsApi';
import { useGetCurrentUserQuery } from '../api/UsersApi';
import { useGetDealershipsQuery } from '../api/DealershipsApi';
import { useGetRentalsQuery } from '../api/RentalsApi';
import { useGetCarImportDutyQuery } from '../api/CarsApi';

const CarDetails = () => {
    const location = useLocation();
    const { car } = location.state;

    const { data: carImportDuty = [], isLoading: isImportDutyLoading } = useGetCarImportDutyQuery(car.id);

    const { data: dealerships = [] } = useGetDealershipsQuery();
    const [selectedDealership, setSelectedDealership] = useState<number>(0);

    const { data: rentals = [] } = useGetRentalsQuery();
    const [selectedRental, setSelectedRental] = useState<number>(0);

    const { data: currentUser } = useGetCurrentUserQuery();

    const [addOrder] = useAddOrderMutation();
    const [addReservation] = useAddReservationMutation();

    const [totalPrice, setTotalPrice] = useState<number | null>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const handleCalculatePrice = () => {
        if (carImportDuty) {
            setTotalPrice(carImportDuty[3]);
        }
    };

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };
    
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
    };

    const handleOrder = async () => {
        try {
            const order = {
                carId: car.id,
                userId: currentUser?.id,
                dealershipId: selectedDealership,
            };
            await addOrder(order);
            alert('Order successfully placed!');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleReserve = async () => {
        try {
            const today = new Date();
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);

            const reservation = {
                carId: car.id,
                userId: currentUser?.id,
                rentalId: selectedRental,
                startDate: startDate,
                endDate: endDate
            };
            await addReservation(reservation);
            alert('Reservation successfully placed!');
        } catch (error) {
            console.error('Error placing reservation:', error);
        }
    };

    const handleDealershipSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedDealership(Number(value));
    };

    const handleRentalSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedRental(Number(value));
    };

    return (
        <Layout>
            <Container className="vh-auto mt-5">
                {/* Hero Section */}
                <div className="hero-section text-white rounded">
                    <Row className="align-items-center p-4">
                        <Col md={6}>
                            <h1>{car.modelName}</h1>
                            <h5 className="text-light">{car.year} {car.categoryName}</h5>
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
                                        Place Order
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Form.Group controlId="dealershipSelect" className="mb-3">
                                        <Form.Label>Select Rental</Form.Label>
                                            <Form.Select
                                                value={selectedRental}
                                                onChange={handleRentalSelect}
                                            >
                                                <option value="">Choose...</option>
                                                {rentals.map((rental) => (
                                                    <option key={rental.id} value={rental.id}>
                                                        {rental.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control 
                                            type='date'
                                            value={startDate}
                                            onChange={handleStartDateChange}
                                            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control 
                                            type='date'
                                            value={endDate}
                                            onChange={handleEndDateChange}
                                            min={startDate || new Date().toISOString().split('T')[0]} // Can't be before start date
                                            required
                                        />
                                    </Form.Group>
                                    <Button 
                                        variant="warning" 
                                        className="me-2"
                                        onClick={handleReserve}
                                        disabled={!selectedRental}
                                    >
                                        Rent the Car
                                    </Button>
                                </>
                            )}
                        </Col>
                    </Row>
                </div>

                {/* Car Details Section */}
                <Row className='mx-2 my-4'>
                    <h3>Car Details</h3>
                    <hr className="border-primary"/>
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
                <Row className='mx-2 my-4'>
                    <h3>Car Price</h3>
                    <hr className="border-primary"/>
                    <Col>
                        <h4>Car price: <strong>{car.price}$</strong></h4>
                        {car.carType == "DEALERSHIP" &&
                        (<>
                            <Button 
                                className="btn mb-2"
                                style={{backgroundColor: '#a4250b', borderColor: '#fff'}} 
                                onClick={handleCalculatePrice} 
                                disabled={isImportDutyLoading}
                            >
                                {isImportDutyLoading ? "Calculating..." : "Calculate Total Price"}
                            </Button>
                            {totalPrice !== null && (
                                <>
                                    <h4>Customs Tax: <strong>{carImportDuty[0]}$</strong></h4>
                                    <h4>Excise Duty: <strong>{carImportDuty[1]}$</strong></h4>
                                    <h4>VAT: <strong>{carImportDuty[2]}$</strong></h4>
                                    <h4>Car total price (with import duty): <strong>{totalPrice}$</strong></h4>
                                </>
                            )}
                        </>)}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default CarDetails;
