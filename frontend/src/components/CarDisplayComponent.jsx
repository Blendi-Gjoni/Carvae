import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import AddCarApiService from "../api/AddCarApiService";
import CarCard from "./CarCard/CarCard.jsx";

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
                    {cars.map((car) => (
                        <Col key={car.id}>
                            <CarCard carType={carType} carPrice={car.price} carFuelType={car.fuelType} carTransmission={car.transmission} carHorsepower={car.horsepower} viewDetails={() => handleViewDetails(car)} />
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
