import React, { useState, useEffect } from 'react';
import ApiService from '../api/ApiService';

const AddCarForm = () => {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState('');
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

    // Fetch all brands on component mount
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
                setModels([]); // Clear models if no brand is selected
            }
        };

        fetchModels();
    }, [selectedBrandId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({ ...carData, [name]: value });
    };

    return (
        <form>
            {/* Brand */}
            <div className="mb-3">
                <label htmlFor="brandId" className="form-label">
                    Brand
                </label>
                <select
                    className="form-control"
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
            </div>

            {/* Model */}
            <div className="mb-3">
                <label htmlFor="modelId" className="form-label">
                    Model
                </label>
                <select
                    className="form-control"
                    id="modelId"
                    name="modelId"
                    value={carData.modelId}
                    onChange={handleChange}
                    required
                    disabled={!selectedBrandId || models.length === 0} // Disable if no brand is selected
                >
                    <option value="">Select a model</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Other fields (e.g., year, price) */}
            <div className="mb-3">
                <label htmlFor="year" className="form-label">
                    Year
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="year"
                    name="year"
                    value={carData.year}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Add other form fields as necessary... */}

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default AddCarForm;
