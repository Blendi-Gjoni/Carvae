import React from 'react';
import './carCard.css';
import carCardPhoto from '../../assets/car-card-default-photo.jpg';
import { motion } from 'framer-motion';

const CarCard = ({ carType, carBrand, carModel, carPrice, carFuelType, carTransmission, carHorsepower, viewDetails }) => {
  return (
    <div className="car-card-container col-sm-4">
      <motion.div 
        animate={{ x: 100, scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ type: "spring" }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="card">
          <img src={carCardPhoto} className="card-img-top" width="100%" alt="car-card-photo" />
          <div className="card-body pt-0 px-0">
            <div className="d-flex flex-row justify-content-between mt-1">
              <div className="d-flex flex-column justify-content-between px-3">
                <span className="text-muted">Car Brand</span>
                <h6>{carBrand}</h6>
              </div>
              <div className="d-flex flex-column justify-content-between align-items-center px-3">
                <span className="text-muted">Car Model</span>
                <h6>{carModel}</h6>
              </div>
            </div>
            <hr className="mt-2 mx-3" />
            <div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-0 px-3">
              <span className="text-muted">{carType === 'RENTAL' ? 'STARTING RENT AT' : 'FULL PRICE'}</span>
              <h6>${carPrice}</h6>
            </div>
            <hr className="mt-2 mx-3" />
            <div className="d-flex flex-row justify-content-between align-items-center px-3 pb-4">
              <div className="d-flex flex-column">
                <span className="text-muted">Fuel Type</span>
              </div>
              <div className="d-flex flex-column">
                <h5 className="mb-0">{carFuelType}</h5>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between p-3 mid">
              <div className="d-flex flex-column">
                <small className="text-muted mb-1">ENGINE</small>
                <div className="d-flex flex-row">
                  <img src="https://imgur.com/iPtsG7I.png" width="35px" height="25px" alt="transmission-icon" />
                  <div className="d-flex flex-column ml-1">
                    <small className="ghj">Transmission</small>
                    <small className="ghj">{carTransmission}</small>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <small className="text-muted mb-2">HORSEPOWER</small>
                <div className="d-flex flex-row">
                  <img src="https://imgur.com/J11mEBq.png" alt="horsepower-icon" />
                  <h6 className="ml-1">{carHorsepower} hp*</h6>
                </div>
              </div>
            </div>
            <small className="text-muted key ms-3 pl-3">Standard key Features</small>
            <div className="mx-3 mt-3 mb-2">
              <motion.button 
                whileHover={{ backgroundColor: '#999999' }}
                transition={{ duration: 0 }}
                type="button" 
                className="btn btn-dark btn-block" 
                onClick={viewDetails}
              >
                <small>VIEW &amp; PRICE</small>
              </motion.button>
            </div>
            <small className="d-flex justify-content-center text-muted">*Legal Disclaimer</small>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CarCard;
