import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGetCarsByTypeQuery,
  Car,
  CarDTO
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

  const handleViewDetails = (car: CarDTO) => {
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
  
  console.log(carsByType);

  return (
    <>
      <div id="carDisplaySection" className="container vh-100 mt-5">
        <h3 className="text-center">Cars Display</h3>

        {/* Dropdown for selecting car type */}
        <div className="text-center m-4">
          <select
            id="carType"
            value={carType}
            onChange={handleCarTypeChange}
            className="form-select d-inline-block"
            style={{width: '150px'}}
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
            {carsByType.map((car: CarDTO) => (
              <Col className="my-5" key={car.id}>
                <CarCard
                  carImage={car.imagePaths[0]}
                  carBrand={car.brandName}
                  carModel={car.modelName}
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
