import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';

const AddCarForm = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [carData, setCarData] = useState({
        modelId: '',
        year: '',
        price: '',
        rentPrice: '',
        horsepower: '',
        kilometers: '',
        description: '',
        exterior: '',
        interior: '',
        fuelType: '',
        transmission: '',
        engine: '',
        categoryId: '',
        featuresId: [],
    });

    // Fetch brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandData = await ApiService.getAllBrands();
                setBrands(brandData);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };
        fetchBrands();
    }, []);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await ApiService.getAllCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    // Fetch models when a brand is selected
    useEffect(() => {
        const fetchModels = async () => {
            if (selectedBrandId) {
                try {
                    const modelData = await ApiService.getModelsByBrandId(selectedBrandId);
                    setModels(modelData);
                } catch (error) {
                    console.error('Error fetching models:', error);
                }
            } else {
                setModels([]);
            }
        };
        fetchModels();
    }, [selectedBrandId]);

    // Handle input changes for text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    // Fetch features on component mount
    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const featuresData = await ApiService.getAllFeatures();  // Assuming you have an API to get features
                setFeatures(featuresData);
            } catch (error) {
                console.error('Error fetching features:', error);
            }
        };
        fetchFeatures();
    }, []);

// Handle feature selection changes
    const handleFeatureChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setSelectedFeatures((prev) =>
            e.target.checked
                ? [...prev, value]
                : prev.filter((id) => id !== value)
        );
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!selectedBrandId) {
            alert("Please select a brand.");
            return;
        }
        if (!carData.modelId) {
            alert("Please select a model.");
            return;
        }

        try {
            const car = {
                ...carData,
                features: selectedFeatures,
            };

            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(car),
            });

            if (response.ok) {
                alert("Car successfully added!");
                // Reset form or handle post-success logic
            } else {
                const errorData = await response.json();
                alert(`Failed to add car: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred while adding the car.");
        }
    };



    return (
        <form onSubmit={handleSubmit} className="container py-4">
            <div className="row gy-4">
                {/* General Details */}
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header" style={{ backgroundColor: '#cf0209', color: 'white' }}>
                            <h5>General Details</h5>
                        </div>
                        <div className="card-body">
                            {/* Brand */}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="brandId"
                                    value={selectedBrandId}
                                    onChange={(e) => setSelectedBrandId(e.target.value)}
                                    required
                                >
                                    <option value="">Select a brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="brandId">Brand</label>
                            </div>

                            {/* Model */}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="modelId"
                                    name="modelId"
                                    value={carData.modelId}
                                    onChange={handleChange}
                                    required
                                    disabled={!selectedBrandId || models.length === 0}
                                >
                                    <option value="">Select a model</option>
                                    {models.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="modelId">Model</label>
                            </div>

                            {/* Year */}
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    name="year"
                                    value={carData.year}
                                    onChange={handleChange}
                                    required
                                    placeholder="Year"
                                />
                                <label htmlFor="year">Year</label>
                            </div>

                            {/* Price */}
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={carData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="Price"
                                />
                                <label htmlFor="price">Price</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-header" style={{ backgroundColor: '#cf0209', color: 'white' }}>
                            <h5>Specifications</h5>
                        </div>
                        <div className="card-body">
                            {/* Rent Price */}
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="rentPrice"
                                    name="rentPrice"
                                    value={carData.rentPrice}
                                    onChange={handleChange}
                                    required
                                    placeholder="Rent Price"
                                />
                                <label htmlFor="rentPrice">Rent Price</label>
                            </div>

                            {/* Horsepower */}
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="horsepower"
                                    name="horsepower"
                                    value={carData.horsepower}
                                    onChange={handleChange}
                                    required
                                    placeholder="Horsepower"
                                />
                                <label htmlFor="horsepower">Horsepower</label>
                            </div>

                            {/* Kilometers */}
                            <div className="form-floating mb-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="kilometers"
                                    name="kilometers"
                                    value={carData.kilometers}
                                    onChange={handleChange}
                                    required
                                    placeholder="Kilometers"
                                />
                                <label htmlFor="kilometers">Kilometers</label>
                            </div>

                            {/* Fuel Type */}
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fuelType"
                                    name="fuelType"
                                    value={carData.fuelType}
                                    onChange={handleChange}
                                    required
                                    placeholder="Fuel Type"
                                />
                                <label htmlFor="fuelType">Fuel Type</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exterior and Interior Colors */}
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header" style={{ backgroundColor: '#cf0209', color: 'white' }}>
                            <h5>Colors</h5>
                        </div>
                        <div className="card-body">
                            {/* Exterior Color */}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="exteriorColor"
                                    name="exteriorColor"
                                    value={carData.exteriorColor}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Red">Red</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Black">Black</option>
                                    <option value="White">White</option>
                                    <option value="Silver">Silver</option>
                                </select>
                                <label htmlFor="exteriorColor">Exterior Color</label>
                            </div>

                            {/* Interior Color */}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="interiorColor"
                                    name="interiorColor"
                                    value={carData.interiorColor}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value=""></option>
                                    <option value="Beige">Beige</option>
                                    <option value="Black">Black</option>
                                    <option value="Gray">Gray</option>
                                    <option value="White">White</option>
                                    <option value="Brown">Brown</option>
                                </select>
                                <label htmlFor="interiorColor">Interior Color</label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description and Features */}
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header" style={{ backgroundColor: '#cf0209', color: 'white' }}>
                            <h5>Description & Features</h5>
                        </div>
                        <div className="card-body">
                            {/* Description */}
                            <div className="form-floating mb-3">
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={carData.description}
                                onChange={handleChange}
                                required
                                placeholder="Description"
                                style={{ height: "100px" }}
                            ></textarea>
                                <label htmlFor="description">Description</label>
                            </div>

                            {/* Features */}
                            <div className="mb-3">
                                <label htmlFor="features" className="form-label">
                                    Features
                                </label>
                                <select
                                    multiple
                                    className="form-select"
                                    id="features"
                                    name="features"
                                    value={selectedFeatures}  // Make sure you're using `selectedFeatures`
                                    onChange={handleFeatureChange}
                                    required
                                >
                                    {features.map((feature) => (
                                        <option key={feature.id} value={feature.id}>
                                            {feature.name}
                                        </option>
                                    ))}
                                </select>
                                <small className="text-muted">Hold Ctrl/Cmd to select multiple features</small>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#cf0209', color: 'white' }}>
                    Submit
                </button>
            </div>
        </form>
    );



};

export default AddCarForm;
