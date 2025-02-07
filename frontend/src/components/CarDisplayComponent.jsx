import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AddCarApiService from "../api/AddCarApiService";

const CarDisplayComponent = () => {
    const [carType, setCarType] = useState("RENTAL"); // Default car type
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchCars = async (selectedCarType) => {
        try {
            setLoading(true);
            setError("");

            const response = await AddCarApiService.getCarsByType(selectedCarType.toUpperCase());

            // Ensure carType is included in each car object
            const carsWithCarType = (response.data || []).map(car => ({
                ...car,
                carType: selectedCarType.toUpperCase()
            }));

            setCars(carsWithCarType);
        } catch (err) {
            console.error("Fetch Cars Error:", err.message || err.response);
            setError("Failed to fetch cars. Please try again.");
            setCars([]);
        } finally {
            setLoading(false);
        }
    };


    const handleCarTypeChange = (event) => {
        const selectedType = event.target.value;
        setCarType(selectedType);
        fetchCars(selectedType);
    };

    const handleViewDetails = (car) => {
        navigate('/car-details', { state: { car } });
    };

    useEffect(() => {
        fetchCars(carType); // Fetch cars for the default car type on component mount
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center">Cars Display</h3>

            {/* Dropdown for selecting car type */}
            <div className="text-center mb-3">
                <label htmlFor="carType" className="me-2">Select Car Type:</label>
                <select
                    id="carType"
                    value={carType}
                    onChange={handleCarTypeChange}
                    className="form-select w-auto d-inline-block"
                >
                    <option value="RENTAL">Rental</option>
                    <option value="DEALERSHIP">Dealership</option>
                </select>
            </div>

            {loading && (
                <div className="text-center mt-3">
                    <p>Loading cars...</p>
                </div>
            )}

            {error && (
                <div className="text-center mt-3 text-danger">
                    <p>{error}</p>
                </div>
            )}

            {!loading && cars.length > 0 && (
                <Row className="my-5">
                    {cars.map((car, index) => (
                        <Col key={car.id} md={6} lg={4} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{car.model.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Year:</strong> {car.year}<br />
                                        <strong>Horsepower:</strong> {car.horsepower}<br />
                                        <strong>Kilometers:</strong> {car.kilometers}<br />
                                        <strong>Fuel Type:</strong> {car.fuelType}<br />
                                        <strong>Transmission:</strong> {car.transmission}<br />
                                        <strong>Price:</strong> {carType.toUpperCase() === "RENTAL" ? `${car.price} / month` : `${car.price}`}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleViewDetails(car)}>View Details</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {!loading && cars.length === 0 && (
                <div className="text-center mt-3">
                    <p>No cars available for the selected type.</p>
                </div>
            )}
        </div>
    );
};

export default CarDisplayComponent;
