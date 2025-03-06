import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGetCarsByTypeQuery,
  Car
} from "../api/CarsApi";
import CarCard from "./CarCard/CarCard";
import { SyncLoader } from "react-spinners";

const CarDisplayComponent = () => {
  const [carType, setCarType] = useState<string>("DEALERSHIP");
  const navigate = useNavigate();

  const { data: carsByType = [], error, isLoading } = useGetCarsByTypeQuery(carType);

  const handleCarTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setCarType(selectedType);
  };

  const handleViewDetails = (car: Car) => {
    navigate("/car-details", { state: { car } });
  };

  const renderError = error && (
    <p style={{ color: 'red' }}>
      Error: {
        'data' in error
          ? (error as { data: { message: string } }).data?.message || 'An unexpected error occurred.'
          : (error as { error: { message: string } }).error?.message || 'An unexpected error occurred.'
      }
    </p>
  );

  return (
    <>
      <div id="carDisplaySection" className="container vh-100 mt-5">
        <h3 className="text-center">Cars Display</h3>

        {/* Dropdown for selecting car type */}
        <div className="text-center mb-3">
          <label htmlFor="carType" className="me-2">
            Select Car Type:
          </label>
          <select
            id="carType"
            value={carType}
            onChange={handleCarTypeChange}
            className="form-select w-auto d-inline-block"
          >
            <option value="RENTAL">Rent a Car</option>
            <option value="DEALERSHIP">Buy a Car</option>
          </select>
        </div>

        {isLoading && (
          <div className="text-center mt-3">
            <p>Loading cars...<SyncLoader margin={3} size={5} /></p>
          </div>
        )}

        {renderError}

        {!isLoading && carsByType.length > 0 && (
          <Row className="my-5">
            {carsByType.map((car: Car) => (
              <Col className="my-5" key={car.id}>
                <CarCard
                  carBrand={car.model?.brand?.name}
                  carModel={car.model?.name}
                  carType={car.carType}
                  carPrice={car.price}
                  carFuelType={car.fuelType}
                  carTransmission={car.transmission}
                  carHorsepower={car.horsepower}
                  viewDetails={() => handleViewDetails(car)}
                />
              </Col>
            ))}
          </Row>
        )}

        {!isLoading && carsByType.length === 0 && (
          <div className="text-center mt-3">
            <p>No cars available for the selected type.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CarDisplayComponent;
