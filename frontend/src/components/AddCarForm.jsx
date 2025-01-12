import React, { useState, useEffect } from 'react';
import AddCarApiService from '../api/AddCarApiService';

const AddCarForm = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setselectedCategoryId] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [carData, setCarData] = useState({
        modelId: '',
        year: '',
        price: '', // Unified price field for both car types
        horsepower: '',
        kilometers: '',
        description: '',
        exterior: '',
        interior: '',
        fuelType: '',
        transmission: '',
        categoryId: '',
        features: [],
        carType: '', // New field for car type
    });

    // Fetch brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brandData = await AddCarApiService.getAllBrands();
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
                const categoriesData = await AddCarApiService.getAllCategories();
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
                    const modelData = await AddCarApiService.getModelsByBrandId(selectedBrandId);
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
                const featuresData = await AddCarApiService.getAllFeatures();
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
        if(!selectedCategoryId){
            alert("Please select a category");
            return;
        }

        if (!carData.modelId) {
            alert("Please select a model.");
            return;
        }
        if (!carData.carType) {
            alert("Please select a car type.");
            return;
        }
        if (!carData.price) {
            alert("Price is required.");
            return;
        }

        const carDataWithNumbers = {
            ...carData,
            modelId: +carData.modelId,  // Converts to number
            categoryId: +carData.categoryId, // Converts to number
            features: selectedFeatures,
            // Add other fields as needed
        };

        try {
            // Call the addCar method from AddCarApiService
            const response = await AddCarApiService.addCar(carDataWithNumbers);

            alert("Car successfully added!");
            // Optionally reset the form or perform other post-success actions
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(`An error occurred while adding the car: ${error.response?.data?.message || error.message}`);
        }
    };

    useEffect(() => {
        setCarData((prevData) => ({
            ...prevData,
            categoryId: selectedCategoryId,
        }));
    }, [selectedCategoryId]);



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

                            {/* Category*/}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="categoryId"
                                    value={selectedCategoryId}
                                    onChange={(e) => setselectedCategoryId(e.target.value)}
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor="categoryId">Category</label>
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
                                <select className="form-select" id="fuelType" name="fuelType" value={carData.fuelType}
                                        onChange={handleChange} required>
                                    <option value="">Select Fuel Type</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Diesel">Diesel</option>
                                    <option value="Electric">Electric</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>

                            </div>

                            {/* Transmission */}
                            <div className="form-floating mb-3">
                                <select className="form-select" id="transmission" name="transmission" value={carData.transmission}
                                        onChange={handleChange} required>
                                    <option value="">Select Transmission</option>
                                    <option value="Petrol">Manual</option>
                                    <option value="Diesel">Automatic</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exterior and Interior Colors */}
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-header" style={{backgroundColor: '#cf0209', color: 'white'}}>
                            <h5>Colors</h5>
                        </div>
                        <div className="card-body">
                            {/* Exterior Color */}
                            <div className="form-floating mb-3">
                                <select
                                    className="form-select"
                                    id="exterior"
                                    name="exterior"
                                    value={carData.exterior}
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
                                    id="interior"
                                    name="interior"
                                    value={carData.interior}
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
                        <div className="card-header" style={{backgroundColor: '#cf0209', color: 'white'}}>
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
                                style={{height: "100px"}}
                            ></textarea>
                                <label htmlFor="description">Description</label>
                            </div>

                            {/* Features */}
                            <div className="mb-3">
                                <label htmlFor="features" className="form-label">Select Features:</label>
                                <div className="form-check" style={{maxHeight: '170px', overflowY: 'auto'}}>
                                    {features.map((feature) => (
                                        <div key={feature.id}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`feature-${feature.id}`}
                                                value={feature.id}
                                                checked={selectedFeatures.includes(feature.id)}
                                                onChange={handleFeatureChange}
                                            />
                                            <label htmlFor={`feature-${feature.id}`} className="form-check-label">
                                                {feature.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Car Type */}
                        <div className="form-floating mb-3">
                            <select
                                className="form-select"
                                id="carType"
                                name="carType"
                                value={carData.carType}
                                onChange={handleChange}
                                required
                            >
                            <option value=""></option>
                                <option value="DEALERSHIP">Dealership</option>
                                <option value="RENTAL">Rental</option>

                            </select>
                            <label htmlFor="interiorColor">Car Type</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="row">
                <div className="col-12 text-center mt-4">
                    <button type="submit" className="btn btn-primary px-5 py-2">
                        Add Car
                    </button>
                </div>
            </div>
        </form>
    );


};

export default AddCarForm;
